import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const maintenanceEnabled = process.env.MAINTENANCE_MODE === "true";

function allowPath(pathname: string) {
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/sitemap") ||
    pathname === "/maintenance" ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/api/webhooks")
  ) {
    return true;
  }
  return false;
}

export function middleware(request: NextRequest) {
  if (!maintenanceEnabled) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (allowPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.json(
      { message: "StopTheTea is undergoing maintenance. Please try again later." },
      { status: 503 },
    );
  }

  const url = request.nextUrl.clone();
  url.pathname = "/maintenance";
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
