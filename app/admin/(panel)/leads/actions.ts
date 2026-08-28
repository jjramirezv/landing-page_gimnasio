"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logChange } from "@/lib/audit";

async function requireUserId() {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");
  return session.user.id;
}

export async function updateLeadStatus(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const lead = await prisma.lead.update({ where: { id }, data: { status } });
  await logChange(userId, "Lead", "update-status", `${lead.name} -> ${status}`);

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const lead = await prisma.lead.delete({ where: { id } });
  await logChange(userId, "Lead", "delete", lead.name);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
