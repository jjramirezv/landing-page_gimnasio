import { prisma } from "@/lib/prisma";
import { updateLeadStatus, deleteLead } from "./actions";

const statusStyles: Record<string, string> = {
  nuevo: "bg-fuego/20 text-fuego",
  contactado: "bg-dorado/20 text-dorado",
  cerrado: "bg-white/10 text-white/50",
};

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-bold">Leads</h1>
        <p className="mt-1 text-sm text-white/50">{leads.length} mensajes recibidos desde el formulario de contacto.</p>
      </div>

      <div className="mt-8 space-y-4">
        {leads.length === 0 && (
          <p className="rounded-2xl border border-white/10 bg-azul-oscuro/60 p-8 text-center text-sm text-white/50">
            Aún no hay mensajes de contacto.
          </p>
        )}

        {leads.map((lead) => (
          <div key={lead.id} className="rounded-2xl border border-white/10 bg-azul-oscuro/60 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-heading font-bold">{lead.name}</p>
                <p className="text-sm text-white/60">{lead.email}{lead.phone ? ` · ${lead.phone}` : ""}</p>
                <p className="mt-1 text-xs text-white/40">{new Date(lead.createdAt).toLocaleString("es")}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${statusStyles[lead.status] ?? "bg-white/10 text-white/50"}`}>
                {lead.status}
              </span>
            </div>

            <p className="mt-4 text-sm text-white/80">{lead.message}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <form action={updateLeadStatus} className="flex items-center gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select
                  name="status"
                  defaultValue={lead.status}
                  className="rounded-lg border border-white/15 bg-negro-profundo px-3 py-1.5 text-xs outline-none focus:border-fuego"
                >
                  <option value="nuevo">Nuevo</option>
                  <option value="contactado">Contactado</option>
                  <option value="cerrado">Cerrado</option>
                </select>
                <button type="submit" className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                  Actualizar
                </button>
              </form>
              <form action={deleteLead}>
                <input type="hidden" name="id" value={lead.id} />
                <button type="submit" className="rounded-lg border border-energia/40 px-3 py-1.5 text-xs font-semibold text-energia hover:bg-energia/10">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
