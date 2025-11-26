import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendCaseReceivedEmail({
  to,
  fullName,
  caseNumber,
}: {
  to: string;
  fullName: string;
  caseNumber: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not configured; skipping email send.");
    return;
  }

  try {
    await resend.emails.send({
      from: "StopTheTea Support <support@stopthetea.com>",
      to,
      subject: "We’ve Received Your StopTheTea Removal Request",
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="color:#0B1F3A;">Your case has been received</h2>
          <p>Hi ${fullName},</p>

          <p>Thanks for submitting your removal request. We’ve created your case and started preparing your takedown notice.</p>

          <p><strong>Case Number:</strong> ${caseNumber}</p>

          <p>You can track your progress anytime in your dashboard.</p>

          <p>If you have urgent questions, reply directly to this email or contact us at support@stopthetea.com.</p>

          <br />
          <p>— The StopTheTea Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}
