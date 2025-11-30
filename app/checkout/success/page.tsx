import type { Metadata } from "next";
import { CheckoutSuccessClient } from "./CheckoutSuccessClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com/checkout/success",
  },
};

export const dynamic = "force-dynamic";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const sessionId =
    typeof searchParams?.session_id === "string" ? searchParams.session_id : undefined;

  return <CheckoutSuccessClient sessionId={sessionId} />;
}
