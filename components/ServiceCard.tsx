"use client";

import { useState } from "react";
import Image from "next/image";

type Service = {
  icon: string;
  name: string;
  description: string;
  schedule: string;
  image?: string | null;
};

export default function ServiceCard({ service }: { service: Service }) {
  const [failed, setFailed] = useState(false);
  const hasImage = Boolean(service.image) && !failed;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-azul-oscuro/60 transition-all duration-300 hover:-translate-y-2 hover:border-fuego/60 hover:shadow-glow">
      {hasImage ? (
        <div className="relative h-40 w-full">
          <Image
            src={service.image as string}
            alt={service.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            onError={() => setFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-negro-profundo/90 via-negro-profundo/10 to-transparent" />
          <div className="absolute bottom-3 left-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-fuego text-xl shadow-glow">
            {service.icon}
          </div>
        </div>
      ) : (
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-fuego text-2xl mx-8 mt-8">
          {service.icon}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8 pt-5">
        <h3 className="font-heading text-xl font-bold">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{service.description}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-dorado">
          {service.schedule}
        </p>
        <button className="mt-auto inline-flex items-center gap-1 self-start pt-6 font-heading text-sm font-bold text-fuego transition-colors group-hover:text-energia">
          Más Info
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
