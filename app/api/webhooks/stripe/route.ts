export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { buildCaseEmailPayload } from "@/lib/caseEmailPayload";
import { sendCaseReceivedEmail, sendInternalNewCaseAlert } from "@/lib/email";
import { env } from "@/lib/env";

const stripeSecretKey = env.stripeSecretKey;
const webhookSecret = env.stripeWebhookSecret;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20" as Stripe.StripeConfig["apiVersion"],
});

// Debug tip: Stripe webhook logs surface in Vercel function logs. Use them to trace case/payment status updates.

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const caseId = session.metadata?.caseId;
  if (!caseId) {
    console.error("[StripeWebhook] checkout.session.completed missing caseId", session.id, session.metadata);
    return;
  }

  const caseRecord = await prisma.case.findUnique({
    where: { id: caseId },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!caseRecord) {
    console.warn("[StripeWebhook] Case not found for checkout session", { sessionId: session.id, caseId });
    return;
  }

  if (caseRecord.paymentStatus === "PAID") {
    console.log("[StripeWebhook] Case already marked paid", { caseId, caseNumber: caseRecord.caseNumber });
    return;
  }

  await prisma.case.update({
    where: { id: caseId },
    data: {
      paymentStatus: "PAID",
      status: caseRecord.status ?? "RECEIVED",
    },
  });

  if (!caseRecord.emailSent) {
    const payload = buildCaseEmailPayload(caseRecord);
    void sendInternalNewCaseAlert(payload);
    if (payload.email) {
      void sendCaseReceivedEmail(payload);
    }
    await prisma.case.update({
      where: { id: caseId },
      data: { emailSent: true },
    });
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  const caseId = paymentIntent.metadata?.caseId;
  if (!caseId) {
    console.warn("[StripeWebhook] payment_intent.payment_failed missing caseId", paymentIntent.id);
    return;
  }

  await prisma.case.updateMany({
    where: { id: caseId, paymentStatus: { not: "PAID" } },
    data: { paymentStatus: "FAILED" },
  });

  console.warn("[StripeWebhook] Marked case payment as FAILED", {
    caseId,
    paymentIntentId: paymentIntent.id,
    lastError: paymentIntent.last_payment_error?.message,
  });
}

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await req.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      }
      case "payment_intent.payment_failed": {
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      }
      case "payment_intent.succeeded": {
        // Redundant with checkout.session.completed but logged for completeness.
        console.log("[StripeWebhook] payment_intent.succeeded", {
          paymentIntentId: (event.data.object as Stripe.PaymentIntent).id,
          metadata: (event.data.object as Stripe.PaymentIntent).metadata,
        });
        break;
      }
      default: {
        console.log("[StripeWebhook] Unhandled event", event.type);
      }
    }
  } catch (error) {
    console.error(`[StripeWebhook] Handler error for ${event.type}`, error);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
