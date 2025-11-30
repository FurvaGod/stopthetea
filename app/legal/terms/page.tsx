import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service – StopTheTea™",
  description: "Review the terms governing your use of StopTheTea.",
  alternates: { canonical: "https://www.stopthetea.com/legal/terms" },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

function TermsSection({ title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0B1F3A]">{title}</h2>
      <div className="space-y-3 text-base leading-7 text-[#3E4A56]">{children}</div>
    </section>
  );
}

export default function TermsOfServicePage() {

  return (
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Legal</p>
        <h1 className="text-4xl font-bold text-[#0B1F3A]">Terms of Service</h1>
        <p className="text-sm text-[#3E4A56]">Last updated: November 26, 2025</p>
      </header>

      <div className="space-y-8 rounded-2xl border border-[#E5E7EB] bg-white/90 p-6 shadow-sm">
        <TermsSection title="Our Role">
          <p>
            StopTheTea provides administrative support for removing unauthorized Tea App profiles, posts, and related
            impersonation content across similar platforms. We are not a law firm, and nothing on this site or within our
            communications should be interpreted as legal advice. Clients remain responsible for any legal decisions and for
            consulting licensed counsel when legal advice is required.
          </p>
        </TermsSection>

        <TermsSection title="Scope of Services">
          <p>
            Engagements focus on the preparation, submission, and follow-up of content removal requests targeting Tea and
            comparable services that replicate Tea-hosted material. Our team drafts DMCA notices, compiles evidence, and liaises
            with platform abuse teams. We do not litigate, subpoena, or compel third parties beyond established platform
            workflows. Because the final decision rests with the platform, no outcome is guaranteed; our commitment is a refund
            if we cannot complete the full process described on the Refund Policy page.
          </p>
        </TermsSection>

        <TermsSection title="Client Responsibilities">
          <p>
            You agree to provide accurate contact details, detailed descriptions of the infringing content, and complete
            screenshots or recordings that demonstrate the violation. Delays or inaccuracies caused by missing information may
            pause or terminate our work without refund. You also confirm that you have the authority to request removal of the
            referenced content.
          </p>
        </TermsSection>

        <TermsSection title="Payment & Guarantee">
          <p>
            StopTheTea charges a flat $399 fee processed securely through Stripe at the start of each case. Fees cover research,
            drafting, platform submission, and escalation attempts. If our team completes the full process yet the platform
            refuses to remove the content, you may request a refund under the terms outlined at <a className="text-[#0B1F3A] underline" href="/legal/refund">/legal/refund</a>.
          </p>
        </TermsSection>

        <TermsSection title="No Guarantee of Legal Outcome">
          <p>
            Platform actions, timelines, and ultimate removal decisions are outside our control. We cannot guarantee a specific
            legal result, a particular timeline, or acceptance of your request by any third party. Our services are limited to
            administrative assistance, and your sole remedy for unsuccessful removal after our complete process is the refund
            described above.
          </p>
        </TermsSection>

        <TermsSection title="Limitation of Liability">
          <p>
            To the fullest extent permitted by law, StopTheTea, its employees, and contractors are not liable for indirect,
            incidental, special, or consequential damages arising from your use of the service. Total liability is capped at the
            amount you paid for the case giving rise to the claim.
          </p>
        </TermsSection>

        <TermsSection title="Third-Party Relationships">
          <p>
            StopTheTea is an independent service and is not affiliated with Tea, Apple, Google, or any other platform referenced
            in our submissions. Brand names are used for identification only. All third-party policies and trademarks remain the
            property of their respective owners.
          </p>
        </TermsSection>

        <TermsSection title="Contact">
          <p>
            Questions regarding these terms can be sent to <a className="text-[#0B1F3A] underline" href="mailto:support@stopthetea.com">support@stopthetea.com</a>.
          </p>
        </TermsSection>
      </div>
    </section>
  );
}
