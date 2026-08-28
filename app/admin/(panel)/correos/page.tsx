import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { gmailConfigured } from "@/lib/email/mailer";

export default async function AdminEmailsPage() {
  const [templates, logs] = await Promise.all([
    prisma.emailTemplate.findMany({ orderBy: { name: "asc" } }),
    prisma.emailLog.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);
  const connected = gmailConfigured();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Correos</h1>

      <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${connected ? "bg-fuego/20 text-fuego" : "bg-energia/20 text-energia"}`}>
        <span className={`h-2 w-2 rounded-full ${connected ? "bg-fuego" : "bg-energia"}`} />
        {connected ? "Gmail conectado" : "Gmail no conectado — los correos se registran pero no se envían"}
      </div>

      <h2 className="mt-10 font-heading text-lg font-bold">Plantillas</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {templates.map((t) => (
          <div key={t.id} className="rounded-2xl border border-white/10 bg-azul-oscuro/60 p-5">
            <p className="font-heading font-bold">{t.name}</p>
            <p className="mt-1 text-sm text-white/60">{t.subject}</p>
            <Link href={`/admin/correos/${t.key}`} className="mt-3 inline-block rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
              Editar
            </Link>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-heading text-lg font-bold">Historial de correos</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Destinatario</th>
              <th className="px-4 py-3">Asunto</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/40">Sin correos registrados aún.</td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3">{log.to}</td>
                <td className="px-4 py-3 text-white/60">{log.subject}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${log.status === "enviado" ? "bg-fuego/20 text-fuego" : "bg-energia/20 text-energia"}`}>
                    {log.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40">{new Date(log.createdAt).toLocaleString("es")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
