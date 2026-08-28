import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PlanForm from "../PlanForm";

type Benefit = { text: string; included: boolean };

export default async function EditPlanPage({ params }: { params: { id: string } }) {
  const planRaw = await prisma.plan.findUnique({ where: { id: params.id } });
  if (!planRaw) notFound();

  const plan = { ...planRaw, benefits: planRaw.benefits as unknown as Benefit[] };

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Editar plan</h1>
      <PlanForm plan={plan} />
    </div>
  );
}
