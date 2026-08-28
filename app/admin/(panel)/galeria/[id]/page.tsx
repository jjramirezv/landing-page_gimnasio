import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GalleryForm from "../GalleryForm";

export default async function EditGalleryItemPage({ params }: { params: { id: string } }) {
  const item = await prisma.galleryItem.findUnique({ where: { id: params.id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Editar foto</h1>
      <GalleryForm item={item} />
    </div>
  );
}
