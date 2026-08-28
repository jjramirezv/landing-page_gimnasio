"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

type Benefit = { text: string; included: boolean };
type Plan = {
  id: string;
  name: string;
  icon: string;
  priceMonthly: number;
  featured: boolean;
  benefits: Benefit[];
};

export default function PricingClient({ plans }: { plans: Plan[] }) {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
        <div role="tablist" aria-label="Frecuencia de facturación" className="inline-flex rounded-full border border-white/10 bg-azul-oscuro/60 p-1">
          <button
            role="tab"
            aria-selected={!annual}
            onClick={() => setAnnual(false)}
            className={`rounded-full px-5 py-2 font-heading text-sm font-bold transition-all ${
              !annual ? "bg-gradient-fuego text-negro-profundo shadow-glow" : "text-white/60 hover:text-white"
            }`}
          >
            Mensual
          </button>
          <button
            role="tab"
            aria-selected={annual}
            onClick={() => setAnnual(true)}
            className={`rounded-full px-5 py-2 font-heading text-sm font-bold transition-all ${
              annual ? "bg-gradient-fuego text-negro-profundo shadow-glow" : "text-white/60 hover:text-white"
            }`}
          >
            Anual
          </button>
        </div>
        <span className="whitespace-nowrap rounded-full bg-dorado/15 px-3 py-1 text-xs font-heading font-bold uppercase text-dorado">
          Ahorra 20%
        </span>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
        {plans.map((plan, i) => {
          const price = annual ? Math.round(plan.priceMonthly * 0.8) : plan.priceMonthly;
          return (
            <Reveal key={plan.id} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-2 ${
                  plan.featured ? "border-fuego/60 bg-azul-oscuro shadow-glow lg:scale-105" : "border-white/10 bg-azul-oscuro/50"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-fuego px-4 py-1.5 text-xs font-heading font-black uppercase tracking-wide text-negro-profundo shadow-glow">
                    Más Popular
                  </span>
                )}

                <div className="text-3xl">{plan.icon}</div>
                <h3 className="mt-3 font-heading text-2xl font-black">{plan.name}</h3>

                <div className="mt-4 flex items-end gap-1">
                  <span className="font-heading text-5xl font-black">${price}</span>
                  <span className="mb-1 text-white/50">/mes</span>
                </div>
                {annual && <p className="mt-1 text-xs text-dorado">Facturado anualmente</p>}

                <ul className="mt-8 space-y-3">
                  {plan.benefits.map((b) => (
                    <li key={b.text} className="flex items-start gap-3 text-sm">
                      <span className={b.included ? "text-fuego" : "text-white/30 line-through decoration-white/30"}>
                        {b.included ? "✓" : "✕"}
                      </span>
                      <span className={b.included ? "text-white/80" : "text-white/30"}>{b.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <button
                    className={`w-full rounded-full py-3.5 font-heading text-sm font-bold uppercase tracking-wide transition-all duration-200 active:scale-95 ${
                      plan.featured
                        ? "bg-gradient-fuego text-negro-profundo shadow-glow hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(155,255,59,0.55)]"
                        : "border-2 border-white/20 hover:scale-[1.03] hover:border-fuego hover:bg-fuego/10 hover:text-fuego"
                    }`}
                  >
                    Seleccionar Plan
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}
