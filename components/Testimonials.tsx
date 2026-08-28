"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-gradient-dark py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Testimonios
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Historias de <span className="text-gradient">Transformación</span>
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-azul-oscuro/60 p-10 text-center">
            <div className="text-dorado" aria-label={`${current.rating} de 5 estrellas`}>
              {"★".repeat(current.rating)}
              <span className="text-white/20">{"★".repeat(5 - current.rating)}</span>
            </div>
            <p className="mt-6 font-body text-lg leading-relaxed text-white/80">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-fuego font-heading font-bold text-negro-profundo">
                {current.initials}
              </div>
              <div className="text-left">
                <p className="font-heading font-bold">{current.name}</p>
                <p className="text-xs text-white/50">{current.role}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setIndex(i)}
                aria-label={`Ver testimonio de ${t.name}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gradient-fuego" : "w-2.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
