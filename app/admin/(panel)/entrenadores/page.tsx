import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteTrainer } from "./actions";

export default async function AdminTrainersPage() {
  const trainers = await prisma.trainer.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Entrenadores</h1>
          <p className="mt-1 text-sm text-white/50">{trainers.length} entrenadores registrados.</p>
        </div>
        <Link href="/admin/entrenadores/new" className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          + Nuevo entrenador
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Especialidad</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {trainers.map((t) => (
              <tr key={t.id}>
                <td className="px-4 py-3">
                  {t.photo ? (
                    <Image src={t.photo} alt={t.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-fuego text-xs font-bold text-negro-profundo">{t.initials}</div>
                  )}
                </td>
                <td className="px-4 py-3 font-semibold">{t.name}</td>
                <td className="px-4 py-3 text-white/60">{t.specialty}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${t.published ? "bg-fuego/20 text-fuego" : "bg-white/10 text-white/50"}`}>
                    {t.published ? "Publicado" : "Oculto"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/entrenadores/${t.id}`} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                      Editar
                    </Link>
                    <form action={deleteTrainer}>
                      <input type="hidden" name="id" value={t.id} />
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
