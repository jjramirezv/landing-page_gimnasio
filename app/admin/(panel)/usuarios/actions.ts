"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { logChange } from "@/lib/audit";
import type { Role } from "@prisma/client";

const ROLES: Role[] = ["ADMIN", "RECEPCION", "ENTRENADOR", "USUARIO"];

async function requireAdmin() {
  const session = await auth();
  if (!session?.user.id || session.user.role !== "ADMIN") throw new Error("No autorizado");
  return session.user.id;
}

export async function createStaffUser(formData: FormData) {
  const adminId = await requireAdmin();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as Role;

  if (!ROLES.includes(role)) throw new Error("Rol inválido");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return;

  await prisma.user.create({
    data: { name, email, role, passwordHash: await bcrypt.hash(password, 10) },
  });
  await logChange(adminId, "User", "create", `${name} (${role})`);

  revalidatePath("/admin/usuarios");
  redirect("/admin/usuarios");
}

export async function updateUserRole(formData: FormData) {
  const adminId = await requireAdmin();
  const id = formData.get("id") as string;
  const role = formData.get("role") as Role;
  if (!ROLES.includes(role)) throw new Error("Rol inválido");

  const user = await prisma.user.update({ where: { id }, data: { role } });
  await logChange(adminId, "User", "update-role", `${user.name} -> ${role}`);

  revalidatePath("/admin/usuarios");
}

export async function deleteUser(formData: FormData) {
  const adminId = await requireAdmin();
  const id = formData.get("id") as string;
  if (id === adminId) return;

  const user = await prisma.user.delete({ where: { id } });
  await logChange(adminId, "User", "delete", user.name);

  revalidatePath("/admin/usuarios");
}
