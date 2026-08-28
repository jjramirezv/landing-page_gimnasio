"use server";

import { revalidatePath } from "next/cache";
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
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  revalidatePath("/");
}

export async function saveService(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string | null;

  const data = {
    icon: formData.get("icon") as string,
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    schedule: formData.get("schedule") as string,
    published: formData.get("published") === "on",
  };

  const imagePath = normalizeImageUrl(formData.get("image"));

  if (id) {
    await prisma.service.update({
      where: { id },
      data: { ...data, ...(imagePath ? { image: imagePath } : {}) },
    });
    await logChange(userId, "Service", "update", data.name);
  } else {
    await prisma.service.create({ data: { ...data, image: imagePath } });
    await logChange(userId, "Service", "create", data.name);
  }

  refresh();
}

export async function deleteService(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const service = await prisma.service.delete({ where: { id } });
  await logChange(userId, "Service", "delete", service.name);
  refresh();
}
