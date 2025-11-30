import Link from "next/link";

export const metadata = {
  title: "Tea App Removal Guide – How to Get Harmful Posts Taken Down | StopTheTea™",
  description:
    "Step-by-step guide to removing harmful Tea app posts and profiles. Learn the DMCA process, what evidence to collect, and when to use a professional removal service.",
  alternates: {
    canonical: "https://www.stopthetea.com/tea-app-removal-guide",
  },
};

export default function TeaAppRemovalGuidePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-8">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Tea App · Online Exposure
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold">
            Tea App Removal Guide: How to Get Harmful Posts Taken Down
          </h1>
          <p className="text-slate-300">
            If you've discovered yourself on the Tea app or a similar exposure
            platform, it can feel like your privacy and reputation are completely
            out of your control. This guide walks through practical steps you can
            take to get posts removed, including how the DMCA process works and
            when it makes sense to use a professional removal service.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/intake"
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition"
            >
              Start a removal with StopTheTea
            </Link>
            <p className="text-xs text-slate-400">
              No vague forms. Clear process. Money-back guarantee if we can't remove it.
            </p>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            1. What is the Tea app and why is removal difficult?
          </h2>
          <p className="text-slate-300">
            The Tea app and similar platforms are built around anonymous posts,
            screenshots, and submissions about private people. Content often spreads
            quickly, gets screen-recorded, and can be re-uploaded multiple times.
            That makes simple "report" buttons feel useless when you're the
            one being exposed.
          </p>
          <p className="text-slate-300">
            The core problem is that your photo or information may be:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Hosted inside the app itself</li>
            <li>Stored on a separate hosting provider or CDN</li>
            <li>Duplicated by users who save and repost it elsewhere</li>
          </ul>
          <p className="text-slate-300">
            That's why effective removal usually requires a legal-based process,
            not just tapping "report" and hoping someone on support answers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            2. Your rights and the DMCA in plain language
          </h2>
          <p className="text-slate-300">
            In many cases, harmful Tea-style posts involve unauthorized use of
            photos, screenshots, or other copyrighted material. The{" "}
            <span className="font-medium">Digital Millennium Copyright Act (DMCA)</span>{" "}
            gives rights-holders (or their authorized representatives) a way to
            demand removal of that content from online platforms and app stores.
          </p>
          <p className="text-slate-300">
            A proper DMCA notice usually includes:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>A description of the original work (e.g., your photo or video)</li>
            <li>Where it was originally created or posted</li>
            <li>Exact links or descriptions of where it appears in the app</li>
            <li>A statement that you have a good-faith belief the use is unauthorized</li>
            <li>A statement under penalty of perjury that the information is accurate</li>
            <li>Your full legal name and contact information</li>
            <li>Your electronic signature</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            3. DIY removal: A practical checklist
          </h2>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
            <h3 className="text-base font-semibold">Step 1: Collect evidence</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Screenshots of the Tea app post or profile</li>
              <li>Username or profile ID</li>
              <li>Any shareable or web URLs</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
            <h3 className="text-base font-semibold">Step 2: Describe the original content</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>Describe the photo in simple language</li>
              <li>State when and where it was taken</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
            <h3 className="text-base font-semibold">Step 3: Draft a DMCA notice</h3>
            <p className="text-slate-300">Include all required components.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-2">
            <h3 className="text-base font-semibold">Step 4: Send the notice</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              <li>The app’s support portal</li>
              <li>The app’s DMCA/legal email</li>
              <li>App store copyright contacts</li>
            </ul>
          </div>

        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. When DIY removal isn't enough</h2>
          <p className="text-slate-300">
            Some people get results alone; others face delays or ignored tickets.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. How StopTheTea helps</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            <li>Structured intake</li>
            <li>Formal takedown notices</li>
            <li>Dashboard tracking</li>
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/5 px-4 py-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-400">Ready to begin?</p>
              <p className="text-xs text-slate-300">
                Start a removal request in minutes.
              </p>
            </div>
            <Link
              href="/intake"
              className="inline-flex items-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition"
            >
              Start removal
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
