import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TrainerForm from "../TrainerForm";

export default async function EditTrainerPage({ params }: { params: { id: string } }) {
  const trainer = await prisma.trainer.findUnique({ where: { id: params.id } });
  if (!trainer) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Editar entrenador</h1>
      <TrainerForm trainer={trainer} />
    </div>
  );
}
