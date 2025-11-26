export function extractUploadthingKey(value?: string | null) {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith("http")) {
    try {
      const parsed = new URL(trimmed);
      const segments = parsed.pathname.split("/").filter(Boolean);
      return segments.pop() ?? null;
    } catch {
      return null;
    }
  }
  return trimmed;
}

export function parseScreenshotKeys(raw?: string | null): string[] {
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    const values = Array.isArray(parsed) ? parsed : typeof parsed === "string" ? [parsed] : [];
    return values
      .map((value) => (typeof value === "string" ? extractUploadthingKey(value) : null))
      .filter((value): value is string => typeof value === "string" && value.length > 0);
  } catch {
    const extracted = extractUploadthingKey(raw);
    return extracted ? [extracted] : [];
  }
}

export function buildScreenshotDownloadUrl(caseId: string, fileKey: string) {
  const params = new URLSearchParams({ caseId, fileKey });
  return `/api/cases/screenshots?${params.toString()}`;
}
