-- Add indexes to speed up Case lookups by user and creation date
CREATE INDEX "Case_userId_idx" ON "Case"("userId");
CREATE INDEX "Case_createdAt_idx" ON "Case"("createdAt");
