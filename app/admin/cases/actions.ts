"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin";
import { updateCaseStatusById, type CaseStatusKey } from "@/lib/cases";

export async function updateCaseStatusAction(formData: FormData) {
  await requireAdminSession();
  const caseId = formData.get("caseId");
  const statusValue = formData.get("status");

  if (typeof caseId !== "string" || caseId.length === 0) {
    throw new Error("Missing case identifier");
  }

  if (typeof statusValue !== "string") {
    throw new Error("Missing status value");
  }

  const status = statusValue as CaseStatusKey;
  await updateCaseStatusById(caseId, status);
  revalidatePath("/admin/cases");
}
