import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePlan } from "./actions";

export default async function AdminPlansPage() {
  const plans = await prisma.plan.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Planes</h1>
          <p className="mt-1 text-sm text-white/50">{plans.length} planes registrados.</p>
        </div>
        <Link href="/admin/planes/new" className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          + Nuevo plan
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Precio / mes</th>
              <th className="px-4 py-3">Destacado</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {plans.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-semibold">{p.icon} {p.name}</td>
                <td className="px-4 py-3 text-white/60">${p.priceMonthly}</td>
                <td className="px-4 py-3">{p.featured ? "Sí" : "No"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.published ? "bg-fuego/20 text-fuego" : "bg-white/10 text-white/50"}`}>
                    {p.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/planes/${p.id}`} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                      Editar
                    </Link>
                    <form action={deletePlan}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="rounded-lg border border-energia/40 px-3 py-1.5 text-xs font-semibold text-energia hover:bg-energia/10">
                        Eliminar
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
