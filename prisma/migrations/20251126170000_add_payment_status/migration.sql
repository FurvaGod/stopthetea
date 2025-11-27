-- Track payment lifecycle on cases
ALTER TABLE "Case"
ADD COLUMN "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING';
