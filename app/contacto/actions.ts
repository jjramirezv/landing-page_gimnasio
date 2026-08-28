"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createLead(data: { name: string; email: string; phone: string; message: string }) {
  await prisma.lead.create({ data });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
