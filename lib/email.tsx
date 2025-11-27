import "server-only";

import { Resend } from "resend";
import { env } from "@/lib/env";
import { CaseReceivedEmail } from "@/lib/email-templates/CaseReceivedEmail";
import { InternalNewCaseEmail } from "@/lib/email-templates/InternalNewCaseEmail";

const resendApiKey = env.resendApiKey;
export const resend = resendApiKey ? new Resend(resendApiKey) : null;

const FROM_EMAIL = env.emailFrom;
const INTERNAL_ALERT_EMAIL = process.env.INTERNAL_ALERT_EMAIL || "support@stopthetea.com";
const INTERNAL_CC = process.env.INTERNAL_CC || "";

export type CaseEmailPayload = {
  fullName: string;
  email: string;
  caseNumber: string;
  targetPlatform: string;
  profileLink?: string;
  description?: string;
  screenshotUrls?: string[];
  submittedAt: string;
};

async function safeSendEmail(actionName: string, fn: () => Promise<unknown>, caseNumber?: string): Promise<void> {
  if (!resend) {
    console.warn(`[Resend] Client missing; skipped ${actionName} email for case:`, caseNumber ?? "unknown");
    return;
  }

  try {
    await fn();
  } catch (error) {
    console.error(`[Resend] Failed sending ${actionName} email for case:`, caseNumber ?? "unknown", error);
  }
}

export async function sendCaseReceivedEmail(payload: CaseEmailPayload): Promise<void> {
  await safeSendEmail("CaseReceived", () =>
    resend!.emails.send({
      from: FROM_EMAIL,
      to: payload.email,
      subject: `We Received Your Case – ${payload.caseNumber}`,
      react: (
        <CaseReceivedEmail
          fullName={payload.fullName}
          caseNumber={payload.caseNumber}
          targetPlatform={payload.targetPlatform}
          profileLink={payload.profileLink}
          submittedAt={payload.submittedAt}
        />
      ),
    }),
  payload.caseNumber);
}

export async function sendInternalNewCaseAlert(payload: CaseEmailPayload): Promise<void> {
  const to = [INTERNAL_ALERT_EMAIL].filter(Boolean);
  const cc = INTERNAL_CC ? [INTERNAL_CC] : [];

  await safeSendEmail("InternalNewCase", () =>
    resend!.emails.send({
      from: FROM_EMAIL,
      to,
      cc,
      subject: `New Case Submitted – ${payload.caseNumber}`,
      react: (
        <InternalNewCaseEmail
          caseNumber={payload.caseNumber}
          fullName={payload.fullName}
          email={payload.email}
          targetPlatform={payload.targetPlatform}
          profileLink={payload.profileLink}
          description={payload.description}
          screenshotUrls={payload.screenshotUrls}
          submittedAt={payload.submittedAt}
        />
      ),
    }),
  payload.caseNumber);
}
