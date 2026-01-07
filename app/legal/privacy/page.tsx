import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy – StopTheTea™",
  description: "Learn how StopTheTea handles data while removing posts from Tea, TeaOnHer, and similar apps.",
  alternates: { canonical: "https://www.stopthetea.com/legal/privacy" },
};

type SectionProps = {
  title: string;
  children: ReactNode;
};

function PrivacySection({ title, children }: SectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#0B1F3A]">{title}</h2>
      <div className="space-y-3 text-base leading-7 text-[#3E4A56]">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {

  return (
    <section className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Legal</p>
        <h1 className="text-4xl font-bold text-[#0B1F3A]">Privacy Policy</h1>
        <p className="text-sm text-[#3E4A56]">Last updated: November 26, 2025</p>
      </header>

      <div className="space-y-8 rounded-2xl border border-[#E5E7EB] bg-white/90 p-6 shadow-sm">
        <PrivacySection title="Information We Collect">
          <p>
            We collect only the information required to build a complete removal request: your name, contact details, preferred
            communication channels, descriptions of the infringing content, relevant links, account usernames for Tea, TeaOnHer,
            or comparable platforms, and supporting screenshots or video captures. When you sign in with Google we receive basic
            profile data from the provider.
          </p>
        </PrivacySection>

        <PrivacySection title="How We Use Your Data">
          <p>
            Data is used to authenticate your account, draft DMCA notices, submit forms to Tea, TeaOnHer, and similar anonymous
            gossip apps, and keep you informed about case progress. We may reference anonymized aggregates to improve our
            workflows, but we do not profile users for advertising or share information with unrelated third parties.
          </p>
        </PrivacySection>

        <PrivacySection title="No Sale of Personal Data">
          <p>
            StopTheTea never sells or rents customer information. We share data only with service providers directly involved in
            delivering our product (for example, Stripe for payments and hosting vendors for infrastructure), each bound by
            confidentiality obligations.
          </p>
        </PrivacySection>

        <PrivacySection title="Data Retention">
          <p>
            Case records are retained for as long as needed to document our takedown process, respond to escalations, or comply
            with legal requirements. When data is no longer required, we delete or anonymize it during scheduled retention reviews.
          </p>
        </PrivacySection>

        <PrivacySection title="Security">
          <p>
            We implement industry-standard safeguards, including encrypted transport (HTTPS), role-based access controls, and
            restricted storage, to protect personal information. No system is perfect, but we actively monitor for unauthorized
            access and remediate issues promptly.
          </p>
        </PrivacySection>

        <PrivacySection title="Your Choices & Contact">
          <p>
            You may request access, corrections, or deletion of your data by emailing <a className="text-[#0B1F3A] underline" href="mailto:support@stopthetea.com">support@stopthetea.com</a>. For
            privacy-specific questions, contact <a className="text-[#0B1F3A] underline" href="mailto:privacy@stopthetea.com">privacy@stopthetea.com</a>. We respond to verified requests within 30
            days.
          </p>
        </PrivacySection>

        <PrivacySection title="Platform Coverage">
          <p>
            This privacy policy applies to every removal we pursue across Tea, TeaOnHer, and any similar anonymous gossip or
            exposure app. If a new app mirrors the same behavior, we treat your information with the same protections described
            here.
          </p>
        </PrivacySection>
      </div>
    </section>
  );
}
