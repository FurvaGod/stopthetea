import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { getAllCasesForAdmin } from "@/lib/cases";
import { buildScreenshotDownloadUrl, parseScreenshotKeys } from "@/lib/screenshots";

function escapeCsvValue(value: string) {
  const sanitized = value.replace(/"/g, '""');
  return `"${sanitized}"`;
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const cases = await getAllCasesForAdmin();
  const origin = new URL(request.url).origin;

  const header = [
    "case_number",
    "user_email",
    "platform_link",
    "created_at",
    "screenshot_links",
    "status",
  ];

  const rows = cases.map((record) => {
    const platformLink = record.profileLink ?? record.teaProfileUrl ?? "";
    const screenshotKeys = parseScreenshotKeys(record.screenshotUrls);
    const screenshotLinks = screenshotKeys
      .map((key) => `${origin}${buildScreenshotDownloadUrl(record.id, key)}`)
      .join(" | ");

    return [
      record.caseNumber,
      record.user?.email ?? "",
      platformLink,
      record.createdAt.toISOString(),
      screenshotLinks,
      record.status,
    ];
  });

  const csvLines = [header, ...rows]
    .map((line) => line.map((value) => escapeCsvValue(value ?? "")).join(","))
    .join("\r\n");

  const fileName = `stopthetea-cases-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csvLines, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${fileName}"`,
    },
  });
}
