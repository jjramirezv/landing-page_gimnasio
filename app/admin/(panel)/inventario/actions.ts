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

function refresh() {
  revalidatePath("/admin/inventario");
  revalidatePath("/admin");
}

function computeStatus(stock: number, minStock: number) {
  return stock <= minStock ? "bajo" : "ok";
}

export async function saveInventoryItem(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string | null;

  const stock = Number(formData.get("stock"));
  const minStock = Number(formData.get("minStock"));

  const data = {
    product: formData.get("product") as string,
    stock,
    minStock,
    status: computeStatus(stock, minStock),
  };

  if (id) {
    await prisma.inventoryItem.update({ where: { id }, data });
    await logChange(userId, "InventoryItem", "update", data.product);
  } else {
    await prisma.inventoryItem.create({ data });
    await logChange(userId, "InventoryItem", "create", data.product);
  }

  refresh();
  redirect("/admin/inventario");
}

export async function deleteInventoryItem(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const item = await prisma.inventoryItem.delete({ where: { id } });
  await logChange(userId, "InventoryItem", "delete", item.product);
  refresh();
}
