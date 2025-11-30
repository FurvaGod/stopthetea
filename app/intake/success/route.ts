export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { clearIntakeSession } from "@/lib/intakeSession";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = env.stripeSecretKey;
const stripePriceId = env.stripePriceId;

function getStripeClient() {
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  }
  return new Stripe(stripeSecretKey);
}

function errorRedirect(request: Request, message: string) {
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

    if (!stripePriceId) {
      return errorRedirect(request, "Checkout verification unavailable. Contact support with your receipt.");
    }

    const stripe = getStripeClient();
    const url = new URL(request.url);
    const stripeSessionId = url.searchParams.get("session_id");
    if (!stripeSessionId) {
      return errorRedirect(request, "Missing Stripe session reference.");
    }

    // This route only confirms that the signed-in user reached the success URL. Stripe's webhook finalizes payment status and case work.
    const checkoutSession = await stripe.checkout.sessions.retrieve(stripeSessionId, {
      expand: ["line_items.data.price"],
    });
    if (checkoutSession.payment_status !== "paid" || checkoutSession.status !== "complete") {
      return errorRedirect(request, "Stripe payment not confirmed. Please try again.");
    }

    const lineItems = checkoutSession.line_items?.data ?? [];
    const singleLineItem = lineItems[0];
    const lineItemPrice = singleLineItem?.price as Stripe.Price | undefined;
    const lineItemQuantity = singleLineItem?.quantity ?? 0;
    const expectedUnitAmount = lineItemPrice?.unit_amount ?? 0;
    const sessionAmountTotal = checkoutSession.amount_total ?? 0;

    // Defensive validation so users cannot spoof callbacks with cheaper amounts or different products.
    if (!singleLineItem || !lineItemPrice || lineItems.length !== 1) {
      return errorRedirect(request, "Unexpected Stripe line item details. Contact support with your receipt.");
    }

    if (lineItemPrice.id !== stripePriceId || lineItemQuantity !== 1) {
      return errorRedirect(request, "Line item mismatch detected. Contact support with your receipt.");
    }

    if (!expectedUnitAmount || expectedUnitAmount !== sessionAmountTotal) {
      return errorRedirect(request, "Charged amount did not match this product. Contact support.");
    }

    if (!checkoutSession.currency || checkoutSession.currency !== lineItemPrice.currency) {
      return errorRedirect(request, "Currency mismatch detected for this checkout. Contact support.");
    }

    const metadataUserId = checkoutSession.metadata?.userId ?? checkoutSession.client_reference_id;
    if (!metadataUserId || metadataUserId !== session.user.id) {
      return errorRedirect(request, "This payment does not belong to your account.");
    }

    const caseId = checkoutSession.metadata?.caseId as string | undefined;
    if (!caseId) {
      console.error("Stripe checkout session missing caseId metadata", checkoutSession.id);
      return errorRedirect(request, "We could not match your payment to a case. Contact support with your receipt.");
    }

    const existingCase = await prisma.case.findUnique({
      where: { id: caseId },
      select: { userId: true, caseNumber: true },
    });

    if (!existingCase || existingCase.userId !== session.user.id) {
      return errorRedirect(request, "This case does not belong to your account.");
    }

    const dashboardUrl = new URL("/dashboard", request.url);
    dashboardUrl.searchParams.set("caseCreated", "1");
    dashboardUrl.searchParams.set("caseId", caseId);
    if (existingCase.caseNumber) {
      dashboardUrl.searchParams.set("caseNumber", existingCase.caseNumber);
    }
    const response = NextResponse.redirect(dashboardUrl, { status: 303 });
    clearIntakeSession(response.cookies);
    return response;
  } catch (error) {
    console.error("Intake success handler error:", error);
    return errorRedirect(request, "We could not finish creating your case. Contact support with your receipt.");
  }
}
