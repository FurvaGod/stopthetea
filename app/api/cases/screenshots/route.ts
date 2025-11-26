import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const utapi = new UTApi();

function normalizeKey(value?: string | null) {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith("http")) {
    try {
      const parsed = new URL(trimmed);
      const segments = parsed.pathname.split("/").filter(Boolean);
      return segments.pop() ?? null;
    } catch {
      return null;
    }
  }
  return trimmed;
}

function parseStoredKeys(raw?: string | null) {
  if (!raw) {
    return [] as string[];
  }
  try {
    const parsed = JSON.parse(raw);
    const values = Array.isArray(parsed) ? parsed : typeof parsed === "string" ? [parsed] : [];
    return values
      .map((value) => (typeof value === "string" ? normalizeKey(value) : null))
      .filter((value): value is string => typeof value === "string" && value.length > 0);
  } catch {
    return [] as string[];
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const caseId = url.searchParams.get("caseId");
  const requestedKey = normalizeKey(url.searchParams.get("fileKey"));

  if (!caseId || !requestedKey) {
    return NextResponse.json({ error: "Missing case or file reference." }, { status: 400 });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await prisma.case.findUnique({
    where: { id: caseId },
    select: { userId: true, screenshotUrls: true },
  });

  if (!record || record.userId !== session.user.id) {
    return NextResponse.json({ error: "Screenshot not found" }, { status: 404 });
  }

  const storedKeys = parseStoredKeys(record.screenshotUrls);
  if (!storedKeys.includes(requestedKey)) {
    return NextResponse.json({ error: "Screenshot not found" }, { status: 404 });
  }

  try {
    const signed = await utapi.generateSignedURL(requestedKey);
    if (!signed?.ufsUrl) {
      throw new Error("Missing signed URL response");
    }
    return NextResponse.redirect(signed.ufsUrl, { status: 302 });
  } catch (error) {
    console.error("Screenshot retrieval error:", error);
    return NextResponse.json({ error: "Unable to load screenshot" }, { status: 500 });
  }
}
