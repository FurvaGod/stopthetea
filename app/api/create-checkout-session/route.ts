import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { createCaseForUser } from "@/lib/cases";
import { clearIntakeSession, readIntakeSession } from "@/lib/intakeSession";
import { env } from "@/lib/env";

const stripeSecretKey = env.stripeSecretKey;
const priceId = env.stripePriceId;

function getStripeClient() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }
  return new Stripe(stripeSecretKey);
}

function buildOrigin(request: Request): string {
  const headerOrigin = request.headers.get("origin");
  if (headerOrigin) {
    return headerOrigin;
  }
  try {
    return new URL(request.url).origin;
  } catch {
    return "http://localhost:3000";
  }
}

function redirectWithError(request: Request, message: string) {
  const url = new URL(`/intake?error=${encodeURIComponent(message)}`, request.url);
  return NextResponse.redirect(url, { status: 302 });
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      const signinUrl = new URL("/signin?callback=/intake", request.url);
      return NextResponse.redirect(signinUrl, { status: 302 });
    }

    if (!priceId) {
      return redirectWithError(request, "Checkout is temporarily unavailable. Contact support.");
    }

    const storedPayload = await readIntakeSession(session.user.id);
    if (!storedPayload) {
      return redirectWithError(request, "Your form data expired. Please submit again.");
    }

    const caseRecord = await createCaseForUser(session.user.id, storedPayload);

    const origin = buildOrigin(request);
    const stripe = getStripeClient();
    const metadata = {
      caseId: caseRecord.id,
      caseNumber: caseRecord.caseNumber,
      userId: session.user.id,
    } satisfies Record<string, string>;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata,
      payment_intent_data: {
        metadata,
      },
      client_reference_id: session.user.id,
      customer_email: session.user.email ?? undefined,
      success_url: `${origin}/intake/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake`,
    });

    if (!stripeSession.url) {
      return redirectWithError(request, "Unable to start checkout. Please try again.");
    }

    const response = NextResponse.redirect(stripeSession.url, { status: 303 });
    clearIntakeSession(response.cookies);
    return response;
  } catch (error) {
    console.error("Stripe checkout session error:", error);
    return redirectWithError(request, "Unable to create checkout session.");
  }
}

export function POST() {
  return NextResponse.json(
    { error: "Use GET /api/create-checkout-session after submitting the intake form." },
    { status: 405 },
  );
}
