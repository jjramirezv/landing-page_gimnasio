import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteGalleryItem } from "./actions";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Galería</h1>
          <p className="mt-1 text-sm text-white/50">{items.length} fotos registradas.</p>
        </div>
        <Link href="/admin/galeria/new" className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          + Nueva foto
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-white/10 bg-azul-oscuro/60">
            <div className="relative aspect-square w-full bg-azul-oscuro">
              {item.src && (
                <Image src={item.src} alt={item.label} fill sizes="25vw" className="object-cover" />
              )}
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-semibold">{item.label}</p>
              <div className="mt-2 flex gap-2">
                <Link href={`/admin/galeria/${item.id}`} className="flex-1 rounded-lg border border-white/15 px-3 py-1.5 text-center text-xs font-semibold hover:border-fuego hover:text-fuego">
                  Editar
                </Link>
                <form action={deleteGalleryItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="rounded-lg border border-energia/40 px-3 py-1.5 text-xs font-semibold text-energia hover:bg-energia/10">
                    Eliminar
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
