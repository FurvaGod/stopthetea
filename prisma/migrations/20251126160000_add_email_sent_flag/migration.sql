-- Add emailSent flag to prevent duplicate Resend notifications
ALTER TABLE "Case"
ADD COLUMN "emailSent" BOOLEAN NOT NULL DEFAULT false;
