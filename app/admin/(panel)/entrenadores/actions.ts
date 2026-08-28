"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logChange } from "@/lib/audit";
import { normalizeImageUrl } from "@/lib/upload";

async function requireUserId() {
  const session = await auth();
  if (!session?.user.id) throw new Error("No autenticado");
  return session.user.id;
}

function refresh() {
  revalidatePath("/admin/entrenadores");
  revalidatePath("/entrenadores");
}

export async function saveTrainer(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string | null;

  const data = {
    name: formData.get("name") as string,
    specialty: formData.get("specialty") as string,
    certification: formData.get("certification") as string,
    initials: formData.get("initials") as string,
    published: formData.get("published") === "on",
  };

  const photoPath = normalizeImageUrl(formData.get("photo"));

  if (id) {
    await prisma.trainer.update({
      where: { id },
      data: { ...data, ...(photoPath ? { photo: photoPath } : {}) },
    });
    await logChange(userId, "Trainer", "update", data.name);
  } else {
    await prisma.trainer.create({ data: { ...data, photo: photoPath } });
    await logChange(userId, "Trainer", "create", data.name);
  }

  refresh();
  redirect("/admin/entrenadores");
}

export async function deleteTrainer(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const trainer = await prisma.trainer.delete({ where: { id } });
  await logChange(userId, "Trainer", "delete", trainer.name);
  refresh();
}
