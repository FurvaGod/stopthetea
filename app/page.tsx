import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StartRemovalButton } from "@/components/StartRemovalButton";

export const metadata: Metadata = {
  title: "StopTheTea™ – Remove Harmful Posts from Tea, TeaOnHer & Similar Apps",
  description:
    "Professional DMCA-style takedown support for Tea, TeaOnHer, and other anonymous gossip apps. Confidential, fast, and backed by a money-back guarantee.",
  alternates: {
    canonical: "https://www.stopthetea.com",
  },
};


const stats = [
  {
    title: "1 focused service",
    subtitle: "Profile & content removal",
  },
  {
    title: "Fixed $99.99 fee",
    subtitle: "No subscriptions or hidden charges",
  },
  {
    title: "100% money-back guarantee",
    subtitle: "If we can’t remove it, you get a refund",
  },
];

const processSteps = [
  {
    title: "Submit the link to the post.",
    description: "Share the post or profile URL from Tea, TeaOnHer, or a similar app plus any screenshots.",
  },
  {
    title: "We review the content.",
    description: "Our team determines the best removal pathway for that platform and situation.",
  },
  {
    title: "We prepare and send the request.",
    description: "We draft the takedown based on each platform’s policies and file it through compliant channels.",
  },
  {
    title: "We confirm the outcome.",
    description: "Once the post is removed or updated, we notify you (or explain the next escalation).",
  },
];

const trustBadges = [
  "Secure payments via Stripe",
  "100% money-back guarantee",
  "Requests handled by real people",
];

const caseStatuses = [
  {
    title: "Case received",
    description: "We confirm your submission, secure evidence, and gather any missing details.",
  },
  {
    title: "Request prepared",
    description: "We draft your formal removal request with supporting documentation.",
  },
  {
    title: "Submitted & escalated",
    description: "We send the request to the platform and escalate if responses are delayed.",
  },
  {
    title: "Removed or refunded",
    description: "If a platform will not remove the content, we refund your payment under our guarantee.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <section className="relative flex h-[500px] w-full items-center justify-center px-4 text-center text-white md:h-[650px]">
        <Image
          src="/stopthetea-hero2.png"
          alt="StopTheTea profile removal assistance"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/70" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-[#38B7B0]">StopTheTea™ Profile Desk</p>
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Get your post removed from Tea, TeaOnHer, and similar anonymous gossip apps.
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 md:text-lg">
            StopTheTea™ removes harmful posts and profiles from Tea, TeaOnHer, and other exposure-style apps using real legal-compliance methods.
          </p>
          <StartRemovalButton className="inline-block rounded-lg bg-[#38B7B0] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#2C8F8A]" />
          <p className="mt-3 text-sm text-slate-200">100% Removal Guarantee — or your money back.</p>
        </div>
      </section>

      <section id="what-we-do" className="bg-white px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">What We Do</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Focused removal work for exposure apps</h2>
            <p className="mt-3 text-base text-[#1F2530]">
              We remove harmful posts from Tea, TeaOnHer, and similar anonymous gossip or exposure apps.
            </p>
            <p className="mt-3 text-base text-[#1F2530]">
              Whether someone shared lies, harassment, threats, or private information about you, we help get it taken down
              through verified legal-compliance channels.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1F3A] px-4 py-8 text-white">
        <div className="mx-auto grid max-w-5xl gap-6 text-center md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.title} className="space-y-1">
              <p className="text-xl font-semibold">{stat.title}</p>
              <p className="text-sm text-white/75">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">How It Works</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Tea, TeaOnHer & similar app removal steps</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article key={step.title} className="rounded-xl border border-[#D1D5DB] p-6 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38B7B0]">Step {index + 1}</p>
                <h3 className="mt-3 text-base font-semibold text-[#0B1F3A]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#1F2530]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6F8] px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src="/stopthetea-illustration.png"
            alt="Why StopTheTea illustration"
            width={96}
            height={96}
            className="mx-auto mb-4 h-24 w-24 object-contain"
          />
          <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Why StopTheTea Exists</p>
          <h2 className="mt-4 text-2xl font-semibold text-[#0B1F3A]">Structured removal for exposure platforms</h2>
          <p className="mt-6 text-base leading-7 text-[#3E4A56]">
            Exposure apps like Tea, TeaOnHer, and other anonymous gossip platforms have become known for posting individuals’
            photos, names, and personal details without their consent — often accompanied by harmful commentary. StopTheTea™
            exists to give people a structured, effective way to get these profiles taken down. We document the issue, prepare
            your case, and submit formal removal requests through the appropriate escalation channels so you don’t have to
            navigate the process alone.
          </p>
          <p className="mt-4 text-sm text-[#3E4A56] italic">
            Inspired by a long tradition of pushing back against unwanted tea.
          </p>
          <div className="mt-8 aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ApT0N4zqy6M?si=gbhUDpxlKkMNRicm"
              title="Tea and similar app data breach video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#D1D5DB] bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-[#CBAF6B]">Transparent Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A]">Takedown Processing Fee: $99.99</h2>
          <p className="mt-4 text-base text-[#1F2530]">
            One-time flat fee for removing a post on Tea, TeaOnHer, or a similar anonymous gossip app.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Covers one link/URL on Tea, TeaOnHer, or similar exposure-style apps.
          </p>
          <p className="mt-4 text-center text-base text-slate-600">
            Backed by our 100% Removal Guarantee. If we cannot complete the removal after our full submission and escalation
            process, you receive a full refund.
          </p>
          <Link
            href="/intake"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#38B7B0] hover:text-[#0B1F3A]"
          >
            Start Removal
          </Link>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid max-w-4xl gap-4 rounded-2xl bg-white/80 p-6 shadow-sm md:grid-cols-3">
          {[
            {
              title: "Secure Stripe Payments",
              subtitle: "Encrypted checkout with automatic receipts.",
            },
            {
              title: "Human-Handled Requests",
              subtitle: "No bots. Real analysts manage every case.",
            },
            {
              title: "100% Money-Back Guarantee",
              subtitle: "Refund issued if removal cannot be completed.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D1D5DB] bg-[#F9FAFB] text-[#0B1F3A]">
                <span className="text-base font-semibold">•</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B1F3A]">{item.title}</p>
                <p className="text-sm text-[#3E4A56]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {trustBadges.map((badge) => (
            <div
              key={badge}
              className="rounded-full border border-[#D1D5DB] bg-white px-5 py-2 text-sm font-medium text-[#1F2530]"
            >
              {badge}
            </div>
          ))}
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white/70 p-4 text-center text-sm text-[#1F2530]">
          If you’re searching for how to remove a post from Tea, TeaOnHer, or similar anonymous gossip apps, you’re in the
          right place — we specialize in removing posts from these platforms.
        </div>
      </section>

      <section id="case-status" className="bg-white px-4 py-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">What to Expect After You Pay</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Case status updates from intake to resolution</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {caseStatuses.map((step) => (
              <article key={step.title} className="rounded-xl border border-[#D1D5DB] p-5 text-left">
                <h3 className="text-base font-semibold text-[#0B1F3A]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#1F2530]">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-slate-950">
        <section className="max-w-5xl mx-auto px-4 py-12 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-50">Why people trust StopTheTea</h2>
          <p className="text-slate-300 text-sm max-w-2xl">
            StopTheTea is built around clear, legal-first removal requests and straightforward communication.
          </p>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Legal-based process</p>
              <p className="text-xs text-slate-300">
                Structured takedown notices, not ignored support tickets.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Confidential intake</p>
              <p className="text-xs text-slate-300">
                Your details are secured and never shared for marketing.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Money-back guarantee</p>
              <p className="text-xs text-slate-300">
                If we can&rsquo;t remove it within the agreed scope, you get a refund.
              </p>
            </div>

          </div>
        </section>

        <section id="faq" className="max-w-5xl mx-auto px-4 py-12 space-y-6">
          <h2 className="text-2xl font-semibold text-slate-50">Frequently asked questions</h2>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Do you only work with Tea?</p>
              <p className="text-xs text-slate-300">No. We handle Tea, TeaOnHer, and similar anonymous gossip or exposure apps.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">What apps do you support?</p>
              <p className="text-xs text-slate-300">
                Tea, TeaOnHer, and most similar anonymous posting apps. If you’re unsure, submit the link and we’ll review it.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">What if a new Tea-like app appears?</p>
              <p className="text-xs text-slate-300">
                These platforms come and go. Our legal-compliance process adapts to new apps as they pop up.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">How long does removal take?</p>
              <p className="text-xs text-slate-300">Most cases begin seeing movement within a few days.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">What if you can’t remove the content?</p>
              <p className="text-xs text-slate-300">Our refund guarantee applies if we can’t meet the agreed scope.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Do you contact the user who posted it?</p>
              <p className="text-xs text-slate-300">No. We only contact platform channels, never individuals.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Is my information confidential?</p>
              <p className="text-xs text-slate-300">
                Yes. Your intake details are secured and never reused or sold.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-50">Is StopTheTea a law firm?</p>
              <p className="text-xs text-slate-300">
                No. We are a removal support service and do not provide legal advice.
              </p>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
