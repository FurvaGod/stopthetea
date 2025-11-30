import type { Metadata } from "next";
import Image from "next/image";
import { auth } from "@/lib/auth";
import {
  getCasesForUser,
  mapStatusAccent,
  mapStatusLabel,
  type CaseStatusKey,
} from "@/lib/cases";
import { buildScreenshotDownloadUrl, extractUploadthingKey, parseScreenshotKeys } from "@/lib/screenshots";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CreateCaseForm } from "./CreateCaseForm";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.stopthetea.com/dashboard",
  },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const TIMELINE_FLOW: CaseStatusKey[] = [
  "RECEIVED",
  "REQUEST_PREPARED",
  "SUBMITTED",
  "ESCALATED",
  "REMOVED",
  "REFUNDED",
];

const PROGRESSION_STEPS = TIMELINE_FLOW.slice(0, 4);
const RESOLUTION_STEPS = TIMELINE_FLOW.slice(4);

type StepState = "completed" | "current" | "upcoming";

function normalizeStatus(status: string): CaseStatusKey {
  return TIMELINE_FLOW.includes(status as CaseStatusKey) ? (status as CaseStatusKey) : "RECEIVED";
}

function getStepState(currentStatus: CaseStatusKey, step: CaseStatusKey): StepState {
  const currentIndex = TIMELINE_FLOW.indexOf(currentStatus);
  const stepIndex = TIMELINE_FLOW.indexOf(step);

  if (currentIndex === -1 || stepIndex === -1) {
    return "upcoming";
  }

  if (stepIndex < currentIndex) {
    return "completed";
  }

  if (stepIndex === currentIndex) {
    return "current";
  }

  return "upcoming";
}

const BADGE_STYLES: Record<StepState, string> = {
  completed: "bg-[#38B7B0] text-white border-[#38B7B0]",
  current: "border-[#38B7B0] text-[#0B1F3A]",
  upcoming: "border-[#E5E7EB] text-[#9CA3AF]",
};

export default async function DashboardPage() {
  let session: Awaited<ReturnType<typeof auth>> = null;
  try {
    session = await auth();
  } catch (error) {
    console.error("Dashboard session retrieval error:", error);
  }

  if (!session?.user?.id) {
    redirect("/signin?callback=/dashboard");
  }

  const cases = await getCasesForUser(session.user.id);
  const firstCase = cases.length > 0 ? cases[cases.length - 1] : undefined;
  const latestCase = cases[0];
  const activeCases = cases.filter(
    (caseItem) => caseItem.status !== "REMOVED" && caseItem.status !== "REFUNDED"
  ).length;

  return (
    <section className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.2em] text-[#38B7B0]">Dashboard</p>
        <h1 className="text-3xl font-semibold text-[#0B1F3A]">Your Removal Cases</h1>
        <p className="text-base text-[#3E4A56]">
          Track the status of your active and archived requests. Questions? Contact us at
          <a href="mailto:support@stopthetea.com" className="text-[#38B7B0]"> support@stopthetea.com</a>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0B1F3A]">Account summary</h2>
          <dl className="space-y-2 text-sm text-[#1F2530]">
            <div className="flex justify-between">
              <dt>Email</dt>
              <dd>{session.user?.email ?? "Not provided"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Cases opened</dt>
              <dd>{cases.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Active cases</dt>
              <dd>{activeCases}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Last activity</dt>
              <dd>{latestCase ? dateFormatter.format(latestCase.updatedAt) : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>First case opened</dt>
              <dd>{firstCase ? dateFormatter.format(firstCase.createdAt) : "—"}</dd>
            </div>
          </dl>
          <Link href="/intake" className="inline-flex items-center text-sm font-semibold text-[#38B7B0]">
            Need another removal? Start a new request →
          </Link>
        </div>
        <CreateCaseForm />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#0B1F3A]">Case activity</h2>
          <p className="text-sm text-[#3E4A56]">{cases.length} case{cases.length === 1 ? "" : "s"} on record</p>
        </div>
        <div className="space-y-4">
          {cases.map((caseItem) => {
            const resolvedStatus = normalizeStatus(caseItem.status);
            const screenshotKeys = parseScreenshotKeys(caseItem.screenshotUrls);
            if (
              screenshotKeys.length === 0 &&
              typeof caseItem.screenshotUrl === "string" &&
              caseItem.screenshotUrl.trim().length > 0
            ) {
              const legacyKey = extractUploadthingKey(caseItem.screenshotUrl);
              if (legacyKey) {
                screenshotKeys.push(legacyKey);
              }
            }
            const evidenceLinks = screenshotKeys.map((key, index) => ({
              key,
              href: buildScreenshotDownloadUrl(caseItem.id, key),
              label: `Screenshot ${index + 1}`,
            }));
            const cityState = [caseItem.city, caseItem.state]
              .map((value: string | null) => (typeof value === "string" ? value.trim() : ""))
              .filter((value) => value.length > 0)
              .join(", ");
            const localityLine = [cityState, caseItem.zip]
              .map((value: string | null) => (typeof value === "string" ? value.trim() : ""))
              .filter((value) => value.length > 0)
              .join(" ");
            const mailingAddress = [caseItem.addressLine1, caseItem.addressLine2, localityLine, caseItem.country]
              .map((value: string | null) => (typeof value === "string" ? value.trim() : ""))
              .filter((value) => value.length > 0)
              .join("\n");

            return (
              <article key={caseItem.id} className="rounded-2xl border border-[#D1D5DB] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#38B7B0]">{caseItem.caseNumber}</p>
                    <h3 className="text-xl font-semibold text-[#0B1F3A]">{caseItem.targetPlatform}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${mapStatusAccent(caseItem.status)}`}>
                    {mapStatusLabel(caseItem.status)}
                  </span>
                </div>
                <p className="mt-4 text-sm text-[#3E4A56]">{caseItem.description}</p>
                <dl className="mt-4 grid gap-4 text-sm text-[#1F2530] md:grid-cols-2">
                  <div>
                    <dt className="text-[#3E4A56]">Created</dt>
                    <dd className="font-medium">{dateFormatter.format(caseItem.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-[#3E4A56]">Last updated</dt>
                    <dd className="font-medium">{dateFormatter.format(caseItem.updatedAt)}</dd>
                  </div>
                  {caseItem.profileLink && (
                    <div>
                      <dt className="text-[#3E4A56]">Profile link</dt>
                      <dd>
                        <Link
                          href={caseItem.profileLink as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-[#38B7B0]"
                        >
                          View profile
                        </Link>
                      </dd>
                    </div>
                  )}
                  {caseItem.contactEmail && (
                    <div>
                      <dt className="text-[#3E4A56]">Contact email</dt>
                      <dd>
                        <a href={`mailto:${caseItem.contactEmail}`} className="font-medium text-[#38B7B0]">
                          {caseItem.contactEmail}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
                <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-4 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#0B1F3A]">Case timeline</p>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${BADGE_STYLES[getStepState(resolvedStatus, resolvedStatus)]}`}>
                      {mapStatusLabel(resolvedStatus)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
                    {PROGRESSION_STEPS.map((step, index) => {
                      const state = getStepState(resolvedStatus, step);
                      return (
                        <div key={step} className="flex items-center gap-2">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${BADGE_STYLES[state]}`}>
                            {mapStatusLabel(step)}
                          </span>
                          {index < PROGRESSION_STEPS.length - 1 && (
                            <>
                              <span className="hidden h-px w-8 bg-[#E5E7EB] md:block" />
                              <span className="md:hidden h-6 w-px bg-[#E5E7EB]" />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {RESOLUTION_STEPS.map((step) => {
                      const state = getStepState(resolvedStatus, step);
                      const isActive = state === "current" || state === "completed";
                      return (
                        <div
                          key={step}
                          className={`rounded-xl border px-4 py-3 text-center ${isActive ? "border-[#38B7B0] bg-white" : "border-[#E5E7EB] bg-white/60"}`}
                        >
                          <p className={`text-sm font-semibold ${isActive ? "text-[#0B1F3A]" : "text-[#9CA3AF]"}`}>
                            {mapStatusLabel(step)}
                          </p>
                          <p className="mt-1 text-xs text-[#6B7280]">
                            {step === "REMOVED" ? "Platform removed content" : "Issued refund under guarantee"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38B7B0]">Copyrighted Work</h4>
                    <dl className="mt-4 space-y-2 text-sm text-[#1F2530]">
                      <div>
                        <dt className="text-[#6B7280]">Description</dt>
                        <dd>{caseItem.copyrightedWorkDescription ?? "Not provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Date created</dt>
                        <dd>{caseItem.dateCreated ? dateFormatter.format(caseItem.dateCreated) : "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">First published at</dt>
                        <dd>{caseItem.originalPublicationLocation ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Ownership type</dt>
                        <dd>{caseItem.ownershipType ?? "—"}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38B7B0]">Infringing Material</h4>
                    <dl className="mt-4 space-y-2 text-sm text-[#1F2530]">
                      <div>
                        <dt className="text-[#6B7280]">Tea username</dt>
                        <dd>{caseItem.teaUsername ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Tea profile</dt>
                        <dd>
                          {caseItem.teaProfileUrl ? (
                            <Link
                              href={caseItem.teaProfileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#38B7B0]"
                            >
                              View profile
                            </Link>
                          ) : (
                            "—"
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Content location</dt>
                        <dd>{caseItem.whereContentAppears ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Comments / captions</dt>
                        <dd>{caseItem.commentsOrCaptions ?? "None provided"}</dd>
                      </div>
                      {evidenceLinks.length > 0 && (
                        <div>
                          <dt className="text-[#6B7280]">Screenshots</dt>
                          <dd className="space-y-2">
                            <div className="flex flex-wrap gap-3">
                              {evidenceLinks.map((item, index) => (
                                <Link
                                  key={`${item.key}-thumb`}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block rounded-2xl border border-[#E5E7EB] bg-white/80 p-1 shadow-sm transition hover:border-[#38B7B0]"
                                >
                                  <Image
                                    src={item.href}
                                    alt={`Takedown evidence screenshot ${index + 1}`}
                                    width={160}
                                    height={100}
                                    unoptimized
                                    className="h-24 w-40 rounded-xl object-cover"
                                  />
                                </Link>
                              ))}
                            </div>
                            <div className="space-y-1 text-xs">
                              {evidenceLinks.map((item) => (
                                <Link
                                  key={item.key}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block truncate text-[#38B7B0]"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38B7B0]">Contact Information</h4>
                    <dl className="mt-4 space-y-2 text-sm text-[#1F2530]">
                      <div>
                        <dt className="text-[#6B7280]">Point of contact</dt>
                        <dd>{caseItem.fullLegalName ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Email</dt>
                        <dd>
                          {caseItem.email ? (
                            <a href={`mailto:${caseItem.email}`} className="text-[#38B7B0]">
                              {caseItem.email}
                            </a>
                          ) : (
                            "—"
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Phone</dt>
                        <dd>{caseItem.phone ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Mailing address</dt>
                        <dd className="whitespace-pre-line">{mailingAddress.length > 0 ? mailingAddress : "—"}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#38B7B0]">Electronic Signature</h4>
                    <dl className="mt-4 space-y-2 text-sm text-[#1F2530]">
                      <div>
                        <dt className="text-[#6B7280]">Signed by</dt>
                        <dd>{caseItem.electronicSignature ?? caseItem.fullLegalName ?? "—"}</dd>
                      </div>
                      <div>
                        <dt className="text-[#6B7280]">Signature date</dt>
                        <dd>{caseItem.signatureDate ? dateFormatter.format(caseItem.signatureDate) : "—"}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 rounded-lg bg-[#F9FAFB] px-4 py-2 text-xs text-[#6B7280]">
                      DMCA attestation stored for this case.
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
          {cases.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white/60 p-8 text-center">
              <p className="text-lg font-semibold text-[#0B1F3A]">No cases yet</p>
              <p className="mt-2 text-sm text-[#3E4A56]">
                Use the form above to add your first removal request. It will appear here immediately.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end border-t border-[#E5E7EB] pt-6">
        <LogoutButton />
      </div>
    </section>
  );
}
