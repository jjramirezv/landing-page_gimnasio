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
  revalidatePath("/admin/galeria");
  revalidatePath("/galeria");
}

export async function saveGalleryItem(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string | null;
  const label = formData.get("label") as string;

  const srcPath = normalizeImageUrl(formData.get("src"));

  if (id) {
    await prisma.galleryItem.update({
      where: { id },
      data: { label, ...(srcPath ? { src: srcPath } : {}) },
    });
    await logChange(userId, "GalleryItem", "update", label);
  } else {
    await prisma.galleryItem.create({ data: { label, src: srcPath } });
    await logChange(userId, "GalleryItem", "create", label);
  }

  refresh();
  redirect("/admin/galeria");
}

export async function deleteGalleryItem(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const item = await prisma.galleryItem.delete({ where: { id } });
  await logChange(userId, "GalleryItem", "delete", item.label);
  refresh();
}
