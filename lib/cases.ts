import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export type CaseStatusKey =
  | "RECEIVED"
  | "REQUEST_PREPARED"
  | "SUBMITTED"
  | "ESCALATED"
  | "REMOVED"
  | "REFUNDED";

export type ScreenshotPayload = {
  fileName?: string;
  mimeType?: string;
  data?: string;
  url?: string;
  storageKey?: string;
};

const CASE_DETAIL_SELECT = {
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  targetPlatform: true,
  description: true,
  caseNumber: true,
  profileLink: true,
  contactEmail: true,
  screenshotUrl: true,
  screenshotData: true,
  screenshotUrls: true,
  copyrightedWorkDescription: true,
  dateCreated: true,
  originalPublicationLocation: true,
  ownershipType: true,
  teaUsername: true,
  teaProfileUrl: true,
  whereContentAppears: true,
  commentsOrCaptions: true,
  fullLegalName: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  state: true,
  zip: true,
  country: true,
  email: true,
  phone: true,
  electronicSignature: true,
  signatureDate: true,
} as const;

export type CaseDetail = Prisma.CaseGetPayload<{ select: typeof CASE_DETAIL_SELECT }>;

export type OwnershipType =
  | "Owner/Photographer"
  | "Subject with rights"
  | "Business owner"
  | "Authorized agent";

export const OWNERSHIP_TYPES: OwnershipType[] = [
  "Owner/Photographer",
  "Subject with rights",
  "Business owner",
  "Authorized agent",
];

export type DmcaDetailsInput = {
  ownershipType: OwnershipType;
  copyrightedWorkDescription?: string | null;
  dateCreated?: Date | null;
  originalPublicationLocation?: string | null;
  teaUsername?: string | null;
  teaProfileUrl?: string | null;
  whereContentAppears?: string | null;
  commentsOrCaptions?: string | null;
  fullLegalName?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  email?: string | null;
  phone?: string | null;
  electronicSignature?: string | null;
  signatureDate?: Date | null;
};

export type CreateCaseInput = {
  targetPlatform?: string;
  description: string;
  status?: CaseStatusKey;
  profileLink?: string;
  contactEmail?: string;
  screenshots?: ScreenshotPayload[];
  dmcaDetails?: DmcaDetailsInput;
};

export const CASE_STATUS_LABELS: Record<CaseStatusKey, string> = {
  RECEIVED: "Case received",
  REQUEST_PREPARED: "Request being prepared",
  SUBMITTED: "Submitted to platform",
  ESCALATED: "Escalated",
  REMOVED: "Content removed",
  REFUNDED: "Refunded",
};

export const CASE_STATUS_ACCENTS: Record<CaseStatusKey, string> = {
  RECEIVED: "bg-[#E5E7EB] text-[#1F2530]",
  REQUEST_PREPARED: "bg-[#DBEAFE] text-[#1F2530]",
  SUBMITTED: "bg-[#E0F2FE] text-[#0B1F3A]",
  ESCALATED: "bg-[#FEF3C7] text-[#7C5A11]",
  REMOVED: "bg-[#D1FAE5] text-[#065F46]",
  REFUNDED: "bg-[#F3F4F6] text-[#1F2530]",
};

const STATUS_KEYS = Object.keys(CASE_STATUS_LABELS) as CaseStatusKey[];

export async function createCaseForUser(userId: string, data: CreateCaseInput): Promise<CaseDetail> {
  const status = data.status ?? "RECEIVED";
  if (!STATUS_KEYS.includes(status)) {
    throw new Error("Invalid status provided.");
  }

  const caseNumber = `STT-${randomUUID().slice(0, 8).toUpperCase()}`;
  const normalizeStorageKey = (value?: string | null) => {
    if (!value) {
      return null;
    }
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    if (trimmed.startsWith("http")) {
      try {
        const parsedUrl = new URL(trimmed);
        const segments = parsedUrl.pathname.split("/").filter(Boolean);
        return segments.pop() ?? null;
      } catch {
        return null;
      }
    }
    return trimmed;
  };

  const screenshotKeys =
    data.screenshots
      ?.map((item) => normalizeStorageKey(item.storageKey ?? item.url ?? null))
      .filter((key): key is string => typeof key === "string" && key.length > 0) ?? [];
  const screenshotData = data.screenshots && data.screenshots.length > 0 ? JSON.stringify(data.screenshots) : null;
  const screenshotUrl = null;
  const dmca = data.dmcaDetails;

  const record = {
    userId,
    targetPlatform: data.targetPlatform ?? "Tea",
    description: data.description,
    status,
    caseNumber,
    profileLink: data.profileLink ?? dmca?.teaProfileUrl ?? null,
    contactEmail: data.contactEmail ?? dmca?.email ?? null,
    screenshotUrl,
    screenshotData,
    screenshotUrls: screenshotKeys.length > 0 ? JSON.stringify(screenshotKeys) : null,
    copyrightedWorkDescription: dmca?.copyrightedWorkDescription ?? null,
    dateCreated: dmca?.dateCreated ?? null,
    originalPublicationLocation: dmca?.originalPublicationLocation ?? null,
    ownershipType: dmca?.ownershipType ?? null,
    teaUsername: dmca?.teaUsername ?? null,
    teaProfileUrl: dmca?.teaProfileUrl ?? null,
    whereContentAppears: dmca?.whereContentAppears ?? null,
    commentsOrCaptions: dmca?.commentsOrCaptions ?? null,
    fullLegalName: dmca?.fullLegalName ?? null,
    addressLine1: dmca?.addressLine1 ?? null,
    addressLine2: dmca?.addressLine2 ?? null,
    city: dmca?.city ?? null,
    state: dmca?.state ?? null,
    zip: dmca?.zip ?? null,
    country: dmca?.country ?? null,
    email: dmca?.email ?? null,
    phone: dmca?.phone ?? null,
    electronicSignature: dmca?.electronicSignature ?? null,
    signatureDate: dmca?.signatureDate ?? null,
  };

  const created = await prisma.case.create({
    data: record as unknown as Prisma.CaseUncheckedCreateInput,
    select: CASE_DETAIL_SELECT,
  });

  return created;
}

export function mapStatusLabel(status: string): string {
  const key = status as CaseStatusKey;
  return CASE_STATUS_LABELS[key] ?? status;
}

export function mapStatusAccent(status: string): string {
  const key = status as CaseStatusKey;
  return CASE_STATUS_ACCENTS[key] ?? "bg-[#E5E7EB] text-[#1F2530]";
}

export async function getCasesForUser(userId: string): Promise<CaseDetail[]> {
  return prisma.case.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: CASE_DETAIL_SELECT,
  });
}

const ADMIN_CASE_SELECT = {
  id: true,
  caseNumber: true,
  status: true,
  targetPlatform: true,
  profileLink: true,
  teaProfileUrl: true,
  contactEmail: true,
  screenshotUrls: true,
  createdAt: true,
  updatedAt: true,
  user: { select: { email: true } },
} as const;

export type AdminCaseSummary = Prisma.CaseGetPayload<{ select: typeof ADMIN_CASE_SELECT }>;

export async function getAllCasesForAdmin(): Promise<AdminCaseSummary[]> {
  return prisma.case.findMany({
    orderBy: { createdAt: "desc" },
    select: ADMIN_CASE_SELECT,
  });
}

export async function updateCaseStatusById(caseId: string, status: CaseStatusKey) {
  if (!STATUS_KEYS.includes(status)) {
    throw new Error("Invalid status provided.");
  }
  await prisma.case.update({
    where: { id: caseId },
    data: { status },
  });
}
