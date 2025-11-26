"use client";

import { useRouter } from "next/navigation";

export function CreateCaseForm() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">New request</p>
        <h2 className="mt-2 text-xl font-semibold text-[#0B1F3A]">Need to file a DMCA today?</h2>
        <p className="mt-2 text-sm text-[#3E4A56]">
          Use our guided intake form to capture every detail we need to generate a compliant DMCA takedown notice for
          Tea.
        </p>
      </div>
      <div className="rounded-xl bg-[#F4F6F8] p-4 text-sm text-[#1F2530]">
        <p className="font-semibold text-[#0B1F3A]">What you&apos;ll need</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[#3E4A56]">
          <li>Proof you own the original work</li>
          <li>Where the infringing content appears on Tea</li>
          <li>Contact details for legal follow-up</li>
        </ul>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <button
          type="button"
          onClick={() => router.push("/intake")}
          className="w-full rounded-lg bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#38B7B0] hover:text-[#0B1F3A] md:w-auto"
        >
          Open Intake Form
        </button>
        <button
          type="button"
          onClick={() => router.push("/legal/terms")}
          className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#38B7B0] hover:text-[#38B7B0] md:w-auto"
        >
          Review Terms
        </button>
      </div>
    </div>
  );
}
