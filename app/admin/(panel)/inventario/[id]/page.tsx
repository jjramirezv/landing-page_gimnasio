import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import InventoryForm from "../InventoryForm";

export default async function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const item = await prisma.inventoryItem.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Editar producto</h1>
      <InventoryForm item={item} />
    </div>
  );
}
