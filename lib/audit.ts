import { prisma } from "@/lib/prisma";

export async function logChange(userId: string, entity: string, action: string, detail?: string) {
  await prisma.auditLog.create({
    data: { userId, entity, action, detail },
  });
}
