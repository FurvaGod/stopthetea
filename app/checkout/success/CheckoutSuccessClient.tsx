"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

type CheckoutSuccessClientProps = {
  sessionId?: string;
};

export function CheckoutSuccessClient({ sessionId }: CheckoutSuccessClientProps) {
  const router = useRouter();

  useEffect(() => {
    const pageLocation = typeof window !== "undefined" ? window.location.href : undefined;

    trackEvent("checkout_success", {
      value: 499,
      currency: "USD",
      transaction_id: sessionId,
      page_location: pageLocation,
    });

    if (sessionId) {
      router.replace(`/intake/success?session_id=${encodeURIComponent(sessionId)}`);
    } else {
      router.replace("/intake");
    }
  }, [router, sessionId]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0B1F3A] px-4 text-center text-white">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[#38B7B0]">Processing</p>
        <h1 className="text-2xl font-semibold">Hang tight while we confirm your payment…</h1>
        <p className="text-sm text-white/80">You’ll be redirected to your dashboard in a moment.</p>
      </div>
    </section>
  );
}
