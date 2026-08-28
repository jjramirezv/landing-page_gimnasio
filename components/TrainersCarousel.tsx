"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  certification: string;
  initials: string;
  photo?: string | null;
};

function TrainerAvatar({ trainer }: { trainer: Trainer }) {
  const [failed, setFailed] = useState(false);

  if (trainer.photo && !failed) {
    return (
      <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-full shadow-glow">
        <Image
          src={trainer.photo}
          alt={trainer.name}
          fill
          sizes="96px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid h-24 w-24 flex-shrink-0 place-items-center rounded-full bg-gradient-fuego font-heading text-2xl font-black text-negro-profundo shadow-glow">
      {trainer.initials}
    </div>
  );
}

export default function TrainersCarousel({ trainers }: { trainers: Trainer[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="relative mt-14">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="flex w-64 flex-shrink-0 snap-center flex-col rounded-2xl border border-white/10 bg-azul-oscuro/60 p-6 text-center transition-all hover:border-fuego/60"
          >
            <TrainerAvatar trainer={trainer} />
            <h3 className="mt-4 font-heading text-lg font-bold">{trainer.name}</h3>
            <p className="mt-1 text-sm text-fuego">{trainer.specialty}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-white/40">
              {trainer.certification}
            </p>
            <div className="mt-auto flex justify-center gap-3 pt-4 text-white/50">
              <a href="#" aria-label="Facebook" className="hover:text-fuego">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-fuego">
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Anterior"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-fuego hover:text-fuego"
        >
          ←
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Siguiente"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-fuego hover:text-fuego"
        >
          →
        </button>
      </div>
    </div>
  );
}
