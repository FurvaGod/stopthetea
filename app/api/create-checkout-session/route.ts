import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/lib/auth";
import { readIntakeSession } from "@/lib/intakeSession";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const priceId = process.env.STRIPE_PRICE_ID;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable");
}

if (!priceId) {
  throw new Error("Missing STRIPE_PRICE_ID environment variable");
}

const stripe = new Stripe(stripeSecretKey);

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

    const storedPayload = await readIntakeSession(session.user.id);
    if (!storedPayload) {
      return redirectWithError(request, "Your form data expired. Please submit again.");
    }

    const origin = buildOrigin(request);

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
      },
      client_reference_id: session.user.id,
      customer_email: session.user.email ?? undefined,
      success_url: `${origin}/intake/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake`,
    });

    if (!stripeSession.url) {
      return redirectWithError(request, "Unable to start checkout. Please try again.");
    }

    return NextResponse.redirect(stripeSession.url, { status: 303 });
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
