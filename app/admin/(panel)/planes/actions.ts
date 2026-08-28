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
  revalidatePath("/admin/planes");
  revalidatePath("/planes");
  revalidatePath("/");
}

function parseBenefits(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const included = !line.startsWith("-");
      const text = line.replace(/^[-+]\s*/, "");
      return { text, included };
    });
}

export async function savePlan(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string | null;

  const data = {
    name: formData.get("name") as string,
    icon: formData.get("icon") as string,
    priceMonthly: Number(formData.get("priceMonthly")),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    benefits: parseBenefits(formData.get("benefits") as string),
  };

  if (id) {
    await prisma.plan.update({ where: { id }, data });
    await logChange(userId, "Plan", "update", data.name);
  } else {
    await prisma.plan.create({ data });
    await logChange(userId, "Plan", "create", data.name);
  }

  refresh();
  redirect("/admin/planes");
}

export async function deletePlan(formData: FormData) {
  const userId = await requireUserId();
  const id = formData.get("id") as string;
  const plan = await prisma.plan.delete({ where: { id } });
  await logChange(userId, "Plan", "delete", plan.name);
  refresh();
}
