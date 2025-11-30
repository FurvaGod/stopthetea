import type { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getAllCasesForAdmin, CASE_STATUS_LABELS, type AdminCaseSummary } from "@/lib/cases";
import { buildScreenshotDownloadUrl, parseScreenshotKeys } from "@/lib/screenshots";
import { updateCaseStatusAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com/admin/cases",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const statusEntries = Object.entries(CASE_STATUS_LABELS);

function getPlatformLink(record: AdminCaseSummary) {
  return record.profileLink ?? record.teaProfileUrl ?? null;
}

export default async function AdminCasesPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/signin?callback=/admin/cases");
  }
  if (!session.user?.email || !isAdminEmail(session.user.email)) {
    notFound();
  }

  const cases = await getAllCasesForAdmin();

  return (
    <section className="mx-auto max-w-6xl space-y-8 px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Internal</p>
          <h1 className="text-3xl font-semibold text-[#0B1F3A]">Case Tracker</h1>
          <p className="text-sm text-[#3E4A56]">Only approved admin accounts can view this feed.</p>
        </div>
        <Link
          href="/admin/cases/export"
          className="inline-flex items-center rounded-full border border-[#38B7B0] px-4 py-2 text-sm font-semibold text-[#38B7B0] transition hover:bg-[#38B7B0] hover:text-white"
        >
          Download CSV
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#D1D5DB] bg-white shadow-sm">
        <table className="min-w-full divide-y divide-[#E5E7EB] text-sm">
          <thead className="bg-[#F9FAFB] text-left text-xs font-semibold uppercase tracking-wider text-[#6B7280]">
            <tr>
              <th className="px-4 py-3">Case</th>
              <th className="px-4 py-3">User email</th>
              <th className="px-4 py-3">Platform link</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Screenshots</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6] text-[#1F2530]">
            {cases.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-[#6B7280]">
                  No cases are on file yet.
                </td>
              </tr>
            )}
            {cases.map((record) => {
              const platformLink = getPlatformLink(record);
              const screenshotKeys = parseScreenshotKeys(record.screenshotUrls);
              const firstScreenshot = screenshotKeys[0];
              const extraShots = Math.max(0, screenshotKeys.length - 1);
              return (
                <tr key={record.id}>
                  <td className="px-4 py-3 align-top">
                    <div className="font-semibold">{record.caseNumber}</div>
                    <div className="text-xs text-[#6B7280]">{record.targetPlatform}</div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {record.user?.email ? (
                      <a href={`mailto:${record.user.email}`} className="text-[#38B7B0]">
                        {record.user.email}
                      </a>
                    ) : (
                      <span className="text-[#6B7280]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    {platformLink ? (
                      <Link href={platformLink} className="text-[#38B7B0]" target="_blank" rel="noopener noreferrer">
                        Open
                      </Link>
                    ) : (
                      <span className="text-[#6B7280]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <time dateTime={record.createdAt.toISOString()}>{dateFormatter.format(record.createdAt)}</time>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {firstScreenshot ? (
                      <div className="space-y-1">
                        <Link
                          href={buildScreenshotDownloadUrl(record.id, firstScreenshot)}
                          className="text-[#38B7B0]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View evidence
                        </Link>
                        {extraShots > 0 && <p className="text-xs text-[#6B7280]">+{extraShots} more</p>}
                      </div>
                    ) : (
                      <span className="text-[#6B7280]">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <form action={updateCaseStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="caseId" value={record.id} />
                      <select
                        name="status"
                        defaultValue={record.status}
                        className="rounded-full border border-[#D1D5DB] px-3 py-1 text-sm text-[#0B1F3A]"
                      >
                        {statusEntries.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full bg-[#0B1F3A] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white"
                      >
                        Update
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
