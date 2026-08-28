"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/lib/auth";

export async function registerAction(_prevState: string | undefined, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password || password.length < 6) {
    return "Completa todos los campos. La contraseña debe tener al menos 6 caracteres.";
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return "Ya existe una cuenta con ese correo.";
  }

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      role: "USUARIO",
    },
  });

  await signIn("credentials", { email, password, redirect: false });
  redirect("/cuenta");
}
