import type { Metadata } from "next";
import { redirect } from "next/navigation";

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
  if (sessionId) {
    redirect(`/intake/success?session_id=${encodeURIComponent(sessionId)}`);
  }
  redirect("/intake");
}
