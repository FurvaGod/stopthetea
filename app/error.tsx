"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("App route error:", error);
  }, [error]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0B1F3A] px-4 py-12 text-white">
      <div className="max-w-lg space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#38B7B0]">500</p>
        <h1 className="text-3xl font-semibold">Something went wrong on our side.</h1>
        <p className="text-sm text-white/80">
          Our removal team has been alerted and is investigating. Try again, or head back to the dashboard while we calm the
          tea down.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-white px-5 py-2 text-[#0B1F3A] transition hover:bg-[#38B7B0]"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="rounded-md border border-white/40 px-5 py-2 text-white transition hover:border-[#38B7B0]"
          >
            Go to dashboard
          </a>
        </div>
      </div>
    </section>
  );
}
