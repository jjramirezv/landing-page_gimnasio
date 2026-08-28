import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ServiceForm from "../ServiceForm";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Editar servicio</h1>
      <ServiceForm service={service} />
    </div>
  );
}
