import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com",
  },
};

const offerings = [
  {
    title: "Profile Removal",
    body: "We target unauthorized Tea and exposure app profiles created without consent.",
  },
  {
    title: "Content Cleanup",
    body: "We work to remove posts, photos, and uploads that misuse your image or personal details.",
  },
  {
    title: "Damage Control",
    body: "We address harmful or misleading commentary by preparing detailed removal requests.",
  },
];

const stats = [
  {
    title: "1 focused service",
    subtitle: "Profile & content removal",
  },
  {
    title: "Fixed $399 fee",
    subtitle: "No subscriptions or hidden charges",
  },
  {
    title: "100% money-back guarantee",
    subtitle: "If we can’t remove it, you get a refund",
  },
];

const processSteps = [
  {
    title: "Tell us what was posted.",
    description: "You share links, screenshots, and the context around the unauthorized profile or content.",
  },
  {
    title: "We prepare your formal removal request.",
    description: "We document the issue, collect supporting evidence, and draft a platform-compliant submission.",
  },
  {
    title: "We submit and escalate.",
    description: "We send the request through the proper channels, follow up, and escalate until the removal is completed or deemed impossible.",
  },
];

const faqs = [
  {
    question: "What types of profiles can you remove?",
    answer:
      "We focus on removing unauthorized or harmful profiles from the Tea app and similar exposure platforms.",
  },
  {
    question: "Can you remove damaging or defamatory commentary?",
    answer:
      "Yes. When platforms permit removal based on harmful or false commentary, we include those details in your request and structure the case accordingly.",
  },
  {
    question: "Can you remove photos posted without my consent?",
    answer:
      "Yes. We prioritize requests involving personal photos or details uploaded without permission or used in a misleading way.",
  },
  {
    question: "What if my content isn’t removed?",
    answer:
      "Our service is backed by a 100% Removal Guarantee. If we cannot secure removal after completing the full request and escalation process, we issue a full refund.",
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
          <h1 className="text-3xl font-bold leading-tight md:text-4xl">Take Back Control of Your Online Image</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-200 md:text-lg">
            We remove unauthorized profiles, posts, and harmful “tea” from the Tea app and similar exposure platforms — quickly, discreetly, and through the proper channels.
          </p>
          <Link
            href="/intake"
            className="inline-block rounded-lg bg-[#38B7B0] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#2C8F8A]"
          >
            Start Removal
          </Link>
          <p className="mt-3 text-sm text-slate-200">100% Removal Guarantee — or your money back.</p>
        </div>
      </section>

      <section id="what-we-do" className="bg-white px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">What We Do</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Focused removal work for exposure apps</h2>
            <p className="mt-3 text-base text-[#1F2530]">
              StopTheTea™ documents unauthorized profiles, misused photos, and harmful commentary, then prepares formal removal
              requests handled by real analysts.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offerings.map((item) => (
              <article
                key={item.title}
                className="rounded-xl border border-[#D1D5DB] bg-[#F4F6F8] p-6 text-left shadow-sm"
              >
                <h3 className="text-lg font-semibold text-[#0B1F3A]">{item.title}</h3>
                <p className="mt-3 text-sm text-[#1F2530]">{item.body}</p>
              </article>
            ))}
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
          <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">A transparent, three-step workflow</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
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
            Exposure apps like Tea have become known for posting individuals’ photos, names, and personal details without their
            consent — often accompanied by harmful commentary. StopTheTea™ exists to give people a structured, effective way to
            get these profiles taken down. We document the issue, prepare your case, and submit formal removal requests through
            the appropriate escalation channels so you don’t have to navigate the process alone.
          </p>
          <p className="mt-4 text-sm text-[#3E4A56] italic">
            Inspired by a long tradition of pushing back against unwanted tea.
          </p>
          <div className="mt-8 aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/ApT0N4zqy6M?si=gbhUDpxlKkMNRicm"
              title="Tea App Data Breach Video"
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
          <h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A]">Takedown Processing Fee: $399</h2>
          <p className="mt-4 text-base text-[#1F2530]">
            A one-time service covering full case handling: documenting your situation, preparing a formal removal request, and
            submitting it to the appropriate platform channels to remove unauthorized profiles, photos, and harmful commentary
            from Tea and similar apps.
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

      <section id="faq" className="px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">FAQ</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Answers to common questions</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-lg border border-[#D1D5DB] border-l-4 border-l-[#38B7B0] bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-[#0B1F3A]">{faq.question}</h3>
                <p className="mt-2 text-sm text-[#1F2530]">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
