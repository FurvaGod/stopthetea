import type { CaseEmailPayload } from "@/lib/email";

type CaseWithUser = {
  id: string;
  caseNumber: string;
  targetPlatform: string;
  profileLink: string | null;
  teaProfileUrl: string | null;
  description: string | null;
  screenshotUrls: string | null;
  fullLegalName: string | null;
  contactEmail: string | null;
  email: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  } | null;
};

function parseScreenshotUrls(raw: string | null): string[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .filter((value): value is string => value.length > 0);
    }
  } catch (error) {
    console.error("Unable to parse screenshot URLs from case record", error);
  }

  return [];
}

function formatSubmittedAt(date: Date): string {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
}

export function buildCaseEmailPayload(record: CaseWithUser): CaseEmailPayload {
  const screenshotUrls = parseScreenshotUrls(record.screenshotUrls);
  const fullName = record.fullLegalName ?? record.user?.name ?? "StopTheTea customer";
  const email = record.contactEmail ?? record.email ?? record.user?.email ?? "";

  return {
    fullName,
    email,
    caseNumber: record.caseNumber,
    targetPlatform: record.targetPlatform ?? "Tea",
    profileLink: record.profileLink ?? record.teaProfileUrl ?? undefined,
    description: record.description ?? undefined,
    screenshotUrls: screenshotUrls.length > 0 ? screenshotUrls : undefined,
    submittedAt: formatSubmittedAt(record.createdAt),
  };
}

export function buildScreenshotList(raw: string | null): string[] {
  return parseScreenshotUrls(raw);
}

export function formatCaseSubmittedAt(date: Date): string {
  return formatSubmittedAt(date);
}
