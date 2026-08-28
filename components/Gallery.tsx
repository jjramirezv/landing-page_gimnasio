import Reveal from "@/components/ui/Reveal";
import GalleryClient from "@/components/GalleryClient";
import { prisma } from "@/lib/prisma";

export default async function Gallery() {
  const galleryImages = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <section id="galeria" className="bg-negro-profundo py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Galería
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Nuestras <span className="text-gradient">Instalaciones</span>
          </h2>
        </Reveal>

        <GalleryClient galleryImages={galleryImages} />
      </div>
    </section>
  );
}
