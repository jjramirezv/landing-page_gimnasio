"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logChange } from "@/lib/audit";

async function requireUserId() {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");
  return session.user.id;
}

export async function saveEmailTemplate(formData: FormData) {
  const userId = await requireUserId();
  const key = formData.get("key") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;

  await prisma.emailTemplate.update({ where: { key }, data: { subject, body } });
  await logChange(userId, "EmailTemplate", "update", key);

  revalidatePath("/admin/correos");
  redirect("/admin/correos");
}
