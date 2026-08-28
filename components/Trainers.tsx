import Reveal from "@/components/ui/Reveal";
import TrainersCarousel from "@/components/TrainersCarousel";
import { prisma } from "@/lib/prisma";

export default async function Trainers() {
  const trainers = await prisma.trainer.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section id="entrenadores" className="bg-negro-profundo py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Nuestro Equipo
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Entrenadores <span className="text-gradient">Certificados</span>
          </h2>
          <p className="mt-4 text-white/60">
            Profesionales con certificación internacional listos para guiar tu progreso.
          </p>
        </Reveal>

        <TrainersCarousel trainers={trainers} />
      </div>
    </section>
  );
}
