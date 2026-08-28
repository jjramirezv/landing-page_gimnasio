import Reveal from "@/components/ui/Reveal";
import PricingClient from "@/components/PricingClient";
import { prisma } from "@/lib/prisma";

type Benefit = { text: string; included: boolean };

export default async function Pricing() {
  const plansRaw = await prisma.plan.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const plans = plansRaw.map((p) => ({
    id: p.id,
    name: p.name,
    icon: p.icon,
    priceMonthly: p.priceMonthly,
    featured: p.featured,
    benefits: p.benefits as unknown as Benefit[],
  }));

  return (
    <section id="planes" className="bg-gradient-dark py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Membresías
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Planes que se <span className="text-gradient">Adaptan a Ti</span>
          </h2>
          <p className="mt-4 text-white/60">
            Elige el plan ideal para tus objetivos. Sin permanencia, cancela cuando quieras.
          </p>
        </Reveal>

        <PricingClient plans={plans} />
      </div>
    </section>
  );
}
