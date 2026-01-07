import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "StopTheTea™ – Maintenance",
  description: "StopTheTea is temporarily offline for scheduled maintenance.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#0B1F3A] px-4 text-center text-white">
      <div className="max-w-xl space-y-6 rounded-3xl border border-white/20 bg-white/5 p-10 shadow-2xl backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-[#38B7B0]">Scheduled Maintenance</p>
        <h1 className="text-3xl font-semibold">StopTheTea™ will be back soon</h1>
        <p className="text-base text-white/80">
          We&apos;re performing extended maintenance and temporarily paused new requests. Thanks for your patience while we
          finish the upgrades. Existing cases are still monitored behind the scenes.
        </p>
        <div className="space-y-2 text-sm text-white/70">
          <p>If you need urgent help with an active case, email us and we&apos;ll respond as soon as we&apos;re back.</p>
          <p>
            <Link href="mailto:support@stopthetea.com" className="font-semibold text-[#38B7B0]">
              support@stopthetea.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
