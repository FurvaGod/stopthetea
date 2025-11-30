import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com/checkout/cancel",
  },
};

export const dynamic = "force-dynamic";

export default function CheckoutCancelPage() {
  redirect("/intake");
}
