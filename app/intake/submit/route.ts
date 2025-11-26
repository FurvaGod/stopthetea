import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { OWNERSHIP_TYPES, type CreateCaseInput, type OwnershipType } from "@/lib/cases";
import { storeIntakeSession } from "@/lib/intakeSession";

function optionalString(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseDateField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return null;
  }
  const raw = value.trim();
  if (!raw) {
    return null;
  }
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
}

function parseScreenshotValue(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || value.length === 0) {
    return [];
  }
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch (error) {
    console.error("Unable to parse screenshot URLs", error);
    return [];
  }
}

function normalizeOwnership(value: FormDataEntryValue | null): OwnershipType {
  const raw = typeof value === "string" ? value.trim() : "";
  if (OWNERSHIP_TYPES.includes(raw as OwnershipType)) {
    return raw as OwnershipType;
  }
  return OWNERSHIP_TYPES[0];
}

function buildCasePayload(formData: FormData): CreateCaseInput {
  const copyrightDescriptionRaw = optionalString(formData.get("copyrightedWorkDescription"));
  const fallbackDescription = "DMCA takedown request submitted via StopTheTea";
  const caseDescription = copyrightDescriptionRaw ?? fallbackDescription;
  const dateCreated = parseDateField(formData.get("dateCreated"));
  const originalPublicationLocation = optionalString(formData.get("originalPublicationLocation"));
  const ownershipType = normalizeOwnership(formData.get("ownershipType"));
  const teaUsername = optionalString(formData.get("teaUsername"));
  const teaProfileUrl = optionalString(formData.get("teaProfileUrl"));
  const whereContentAppears = optionalString(formData.get("whereContentAppears"));
  const fullLegalName = optionalString(formData.get("fullLegalName"));
  const addressLine1 = optionalString(formData.get("addressLine1"));
  const city = optionalString(formData.get("city"));
  const state = optionalString(formData.get("state"));
  const zip = optionalString(formData.get("zip"));
  const countryRaw = optionalString(formData.get("country")) ?? "United States";
  const country = countryRaw.length > 0 ? countryRaw : "United States";
  const email = optionalString(formData.get("email"));
  const phone = optionalString(formData.get("phone"));
  const electronicSignature = optionalString(formData.get("electronicSignature"));
  const signatureDate = parseDateField(formData.get("signatureDate"));
  const screenshotKeys = parseScreenshotValue(formData.get("screenshotFileKeys"));
  const commentsOrCaptions = optionalString(formData.get("commentsOrCaptions"));
  const addressLine2 = optionalString(formData.get("addressLine2"));

  return {
    targetPlatform: "Tea",
    description: caseDescription,
    profileLink: teaProfileUrl ?? undefined,
    contactEmail: email ?? undefined,
    screenshots: screenshotKeys.map((key) => ({ storageKey: key })),
    dmcaDetails: {
      ownershipType,
      copyrightedWorkDescription: copyrightDescriptionRaw ?? null,
      dateCreated,
      originalPublicationLocation: originalPublicationLocation ?? null,
      teaUsername: teaUsername ?? null,
      teaProfileUrl: teaProfileUrl ?? null,
      whereContentAppears: whereContentAppears ?? null,
      commentsOrCaptions,
      fullLegalName: fullLegalName ?? null,
      addressLine1: addressLine1 ?? null,
      addressLine2,
      city: city ?? null,
      state: state ?? null,
      zip: zip ?? null,
      country,
      email: email ?? null,
      phone: phone ?? null,
      electronicSignature: electronicSignature ?? null,
      signatureDate,
    },
  };
}

function redirectWithMessage(request: Request, message: string, status = 302) {
  const url = new URL(`/intake?error=${encodeURIComponent(message)}`, request.url);
  return NextResponse.redirect(url, { status });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    const signinUrl = new URL("/signin?callback=/intake", request.url);
    return NextResponse.redirect(signinUrl, { status: 302 });
  }

  const formData = await request.formData();
  try {
    const casePayload = buildCasePayload(formData);
    const redirectUrl = new URL("/api/create-checkout-session", request.url);
    const response = NextResponse.redirect(redirectUrl, { status: 303 });
    storeIntakeSession(response.cookies, session.user.id, casePayload);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit intake.";
    return redirectWithMessage(request, message);
  }
}
