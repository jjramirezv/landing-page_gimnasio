"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";

const STAFF_ROLES = new Set(["ADMIN", "RECEPCION", "ENTRENADOR"]);

export async function loginAction(_prevState: string | undefined, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    await signIn("credentials", {
      email,
      password: formData.get("password"),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return "Credenciales incorrectas.";
    }
    throw error;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  redirect(user && STAFF_ROLES.has(user.role) ? "/admin" : "/cuenta");
}
