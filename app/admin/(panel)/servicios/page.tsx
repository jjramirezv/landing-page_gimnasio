import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Servicios</h1>
          <p className="mt-1 text-sm text-white/50">{services.length} servicios registrados.</p>
        </div>
        <Link
          href="/admin/servicios/new"
          className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow"
        >
          + Nuevo servicio
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Horario</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3">
                  {s.image ? (
                    <Image src={s.image} alt={s.name} width={48} height={48} className="h-12 w-12 rounded-lg object-cover" />
                  ) : (
                    <div className="grid h-12 w-12 place-items-center rounded-lg bg-azul-oscuro text-lg">{s.icon}</div>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold">{s.name}</td>
                <td className="px-4 py-3 text-white/60">{s.schedule}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${s.published ? "bg-fuego/20 text-fuego" : "bg-white/10 text-white/50"}`}>
                    {s.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/servicios/${s.id}`} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                      Editar
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={s.id} />
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
