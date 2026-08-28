import { savePlan } from "./actions";

type Benefit = { text: string; included: boolean };
type Plan = {
  id: string;
  name: string;
  icon: string;
  priceMonthly: number;
  featured: boolean;
  published: boolean;
  benefits: Benefit[];
};

export default function PlanForm({ plan }: { plan?: Plan }) {
  const benefitsText = plan?.benefits.map((b) => `${b.included ? "+" : "-"} ${b.text}`).join("\n") ?? "";

  return (
    <form action={savePlan} className="mt-6 max-w-xl space-y-4">
      {plan && <input type="hidden" name="id" value={plan.id} />}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Ícono (emoji)</label>
        <input name="icon" defaultValue={plan?.icon} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Nombre</label>
        <input name="name" defaultValue={plan?.name} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Precio mensual (USD)</label>
        <input type="number" name="priceMonthly" defaultValue={plan?.priceMonthly} required min={0} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">
          Beneficios (uno por línea; empieza con + si está incluido, - si no)
        </label>
        <textarea
          name="benefits"
          defaultValue={benefitsText}
          required
          rows={6}
          placeholder={"+ Acceso ilimitado\n+ Casillero incluido\n- Acceso a las 3 sedes"}
          className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={plan?.featured} className="h-4 w-4 accent-[#9BFF3B]" />
        Destacado (&quot;Más Popular&quot;)
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={plan?.published ?? true} className="h-4 w-4 accent-[#9BFF3B]" />
        Publicado
      </label>

      <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
        Guardar
      </button>
    </form>
  );
}
