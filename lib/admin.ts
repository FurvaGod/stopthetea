import { auth } from "@/lib/auth";

const adminEmailConfig = process.env.ADMIN_EMAILS ?? "";

const adminEmailSet = new Set(
  adminEmailConfig
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter((value) => value.length > 0),
);

export function getAdminEmails(): string[] {
  return Array.from(adminEmailSet.values());
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) {
    return false;
  }
  return adminEmailSet.has(email.trim().toLowerCase());
}

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    throw new Error("Unauthorized admin access");
  }
  return session;
}
