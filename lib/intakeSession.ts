import { cookies } from "next/headers";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import type { CreateCaseInput } from "@/lib/cases";
import type { ResponseCookies } from "next/dist/server/web/spec-extension/cookies";

const COOKIE_NAME = "stt_intake_payload";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

type SerializedCaseInput = Omit<CreateCaseInput, "dmcaDetails"> & {
  dmcaDetails?: (Omit<NonNullable<CreateCaseInput["dmcaDetails"]>, "dateCreated" | "signatureDate"> & {
    dateCreated?: string | null;
    signatureDate?: string | null;
  }) | null;
};

type IntakeSessionRecord = {
  userId: string;
  createdAt: number;
  data: SerializedCaseInput;
};

const ENCODING = "base64";
const IV_LENGTH = 12;
const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: COOKIE_MAX_AGE_SECONDS,
};

function getSecretKey(): Buffer {
  const secret = process.env.INTAKE_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("INTAKE_SESSION_SECRET must be set to at least 16 characters");
  }
  return createHash("sha256").update(secret).digest();
}

function encodeRecord(record: IntakeSessionRecord): string {
  const key = getSecretKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const json = JSON.stringify(record);
  const encrypted = Buffer.concat([cipher.update(json, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([iv, authTag, encrypted]).toString(ENCODING);
}

function decodeRecord(value: string): IntakeSessionRecord | null {
  try {
    const raw = Buffer.from(value, ENCODING);
    const iv = raw.subarray(0, IV_LENGTH);
    const authTag = raw.subarray(IV_LENGTH, IV_LENGTH + 16);
    const encrypted = raw.subarray(IV_LENGTH + 16);
    const key = getSecretKey();
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return JSON.parse(decrypted.toString("utf8")) as IntakeSessionRecord;
  } catch (error) {
    console.error("Unable to decode intake session", error);
    return null;
  }
}

function serializeCaseInput(input: CreateCaseInput): SerializedCaseInput {
  const { dmcaDetails, ...rest } = input;
  if (!dmcaDetails) {
    return { ...rest };
  }

  const { dateCreated, signatureDate, ...details } = dmcaDetails;
  return {
    ...rest,
    dmcaDetails: {
      ...details,
      dateCreated: dateCreated ? dateCreated.toISOString() : null,
      signatureDate: signatureDate ? signatureDate.toISOString() : null,
    },
  };
}

function deserializeCaseInput(input: SerializedCaseInput): CreateCaseInput {
  const { dmcaDetails, ...rest } = input;
  if (!dmcaDetails) {
    return { ...rest };
  }

  const { dateCreated, signatureDate, ...details } = dmcaDetails;
  return {
    ...rest,
    dmcaDetails: {
      ...details,
      dateCreated: dateCreated ? new Date(dateCreated) : null,
      signatureDate: signatureDate ? new Date(signatureDate) : null,
    },
  };
}

export function storeIntakeSession(cookieStore: ResponseCookies, userId: string, payload: CreateCaseInput) {
  const serialized: IntakeSessionRecord = {
    userId,
    createdAt: Date.now(),
    data: serializeCaseInput(payload),
  };

  cookieStore.set(COOKIE_NAME, encodeRecord(serialized), COOKIE_OPTIONS);
}

export async function readIntakeSession(userId: string): Promise<CreateCaseInput | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) {
    return null;
  }

  const decoded = decodeRecord(value);
  if (!decoded) {
    return null;
  }

  const expired = Date.now() - decoded.createdAt > COOKIE_MAX_AGE_SECONDS * 1000;
  if (expired || decoded.userId !== userId) {
    return null;
  }

  return deserializeCaseInput(decoded.data);
}

export function clearIntakeSession(cookieStore: ResponseCookies) {
  cookieStore.delete(COOKIE_NAME);
}
