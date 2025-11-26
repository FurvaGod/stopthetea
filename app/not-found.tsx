import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0B1F3A] px-4 py-12 text-white">
      <div className="max-w-lg space-y-6 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[#38B7B0]">404</p>
        <h1 className="text-3xl font-semibold">We couldn&apos;t find that page.</h1>
        <p className="text-sm text-white/80">
          The link may be outdated or the content was already removed. Head back to StopTheTea™ and we&apos;ll keep working on
          shutting down the bad tea.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
          <Link href="/" className="rounded-md bg-white px-5 py-2 text-[#0B1F3A] transition hover:bg-[#38B7B0]">
            Return home
          </Link>
          <Link href="/intake" className="rounded-md border border-white/40 px-5 py-2 text-white transition hover:border-[#38B7B0]">
            Submit a case
          </Link>
        </div>
      </div>
    </section>
  );
}
