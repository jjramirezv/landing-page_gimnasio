"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

type GalleryImage = {
  id: string;
  label: string;
  src?: string | null;
};

const gradients = [
  "from-fuego to-energia",
  "from-azul-noche to-azul-oscuro",
  "from-energia to-dorado",
  "from-fuego to-azul-oscuro",
];

function GalleryMedia({
  img,
  index,
  failed,
  onError,
  sizes,
}: {
  img: GalleryImage;
  index: number;
  failed: boolean;
  onError: () => void;
  sizes: string;
}) {
  if (img.src && !failed) {
    return (
      <Image
        src={img.src}
        alt={img.label}
        fill
        sizes={sizes}
        className="object-cover"
        onError={onError}
      />
    );
  }

  return (
    <span
      className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
      aria-hidden
    />
  );
}

export default function GalleryClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  const markFailed = useCallback((id: string) => {
    setFailedIds((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % galleryImages.length)),
    [galleryImages.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    [galleryImages.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {galleryImages.map((img, i) => (
          <Reveal key={img.id} delay={(i % 6) * 60}>
            <button
              onClick={() => setOpenIndex(i)}
              className="group relative flex aspect-square w-full items-end overflow-hidden rounded-2xl p-4 text-left transition-transform hover:scale-[1.03]"
            >
              <GalleryMedia
                img={img}
                index={i}
                failed={Boolean(failedIds[img.id])}
                onError={() => markFailed(img.id)}
                sizes="(min-width: 640px) 33vw, 50vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 transition-opacity group-hover:from-black/80" />
              <span className="relative font-heading text-sm font-bold text-white drop-shadow">
                {img.label}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-6"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-white/20 text-xl hover:border-fuego hover:text-fuego"
          >
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute left-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-xl hover:border-fuego hover:text-fuego sm:left-8"
          >
            ←
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl"
          >
            <GalleryMedia
              img={galleryImages[openIndex]}
              index={openIndex}
              failed={Boolean(failedIds[galleryImages[openIndex].id])}
              onError={() => markFailed(galleryImages[openIndex].id)}
              sizes="100vw"
            />
            <span className="relative rounded-full bg-black/50 px-4 py-2 font-heading text-lg font-black text-white backdrop-blur-sm sm:text-2xl">
              {galleryImages[openIndex].label}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Foto siguiente"
            className="absolute right-4 grid h-12 w-12 place-items-center rounded-full border border-white/20 text-xl hover:border-fuego hover:text-fuego sm:right-8"
          >
            →
          </button>
        </div>
      )}
    </>
  );
}
