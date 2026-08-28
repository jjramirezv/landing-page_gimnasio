import Reveal from "@/components/ui/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { prisma } from "@/lib/prisma";

export default async function Services() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section id="servicios" className="bg-negro-profundo py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Nuestros Servicios
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Clases y <span className="text-gradient">Entrenamientos</span>
          </h2>
          <p className="mt-4 text-white/60">
            {services.length} disciplinas diseñadas para cada objetivo, nivel y estilo de vida.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
