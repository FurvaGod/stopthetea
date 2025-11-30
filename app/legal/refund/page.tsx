import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Refund Policy – StopTheTea™",
  description: "Understand our money-back guarantee and refund terms.",
  alternates: { canonical: "https://www.stopthetea.com/legal/refund" },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

function RefundSection({ title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0B1F3A]">{title}</h2>
      <div className="space-y-3 text-base leading-7 text-[#3E4A56]">{children}</div>
    </section>
  );
}

export default function RefundPolicyPage() {

  return (
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Legal</p>
        <h1 className="text-4xl font-bold text-[#0B1F3A]">Refund Policy</h1>
        <p className="text-sm text-[#3E4A56]">Last updated: November 26, 2025</p>
      </header>

      <div className="space-y-8 rounded-2xl border border-[#E5E7EB] bg-white/90 p-6 shadow-sm">
        <RefundSection title="100% Removal Guarantee">
          <p>
            Every case includes our Removal Guarantee: if we cannot secure removal after completing our entire submission and
            escalation process with the relevant platform(s), we issue a full refund of the $99.99 fee. This guarantee is the sole
            remedy for unsuccessful removals and applies per individual case purchased through Stripe.
          </p>
        </RefundSection>

        <RefundSection title="What the Full Process Includes">
          <ul className="list-disc space-y-2 pl-5">
            <li>Verification of your identity and ownership or authorization to request removal.</li>
            <li>Preparation of DMCA or policy-compliant documentation tailored to the target platform.</li>
            <li>Submission through the platform&rsquo;s official reporting channel with required evidence.</li>
            <li>Follow-up on ticket status, including additional evidence requests.</li>
            <li>Escalation to platform trust-and-safety contacts when standard queues stall or reject the request.</li>
          </ul>
        </RefundSection>

        <RefundSection title="When Refunds Are Not Available">
          <ul className="list-disc space-y-2 pl-5">
            <li>When a client withholds essential facts, documentation, or required attestations, preventing us from filing.</li>
            <li>When the infringing content is already removed, altered, or no longer accessible upon our review.</li>
            <li>When a client initiates chargebacks, fraudulent disputes, or otherwise acts in bad faith.</li>
            <li>When the client abandons communication for 14 days after we request clarifications.</li>
          </ul>
        </RefundSection>

        <RefundSection title="How to Request a Refund">
          <p>
            Email <a className="text-[#0B1F3A] underline" href="mailto:support@stopthetea.com">support@stopthetea.com</a> with your case number, payment receipt, and a short summary of the
            request. We review all refund submissions within five business days and process approved refunds to the original
            Stripe payment method.
          </p>
        </RefundSection>
      </div>
    </section>
  );
}
