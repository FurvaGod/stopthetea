import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/lib/env";

if (process.env.NODE_ENV === "production") {
  const prefix = process.env.DATABASE_URL?.slice(0, 80) ?? "undefined";
  console.log("[StopTheTea] DATABASE_URL prefix (prod):", prefix);
}

const pool = new Pool({ connectionString: env.databaseUrl });
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
