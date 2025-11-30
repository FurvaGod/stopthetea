import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment Canceled – StopTheTea™",
  description: "Your payment was canceled. You may restart your request anytime.",
};

export const dynamic = "force-dynamic";

export default function CheckoutCancelPage() {
  redirect("/intake");
}
