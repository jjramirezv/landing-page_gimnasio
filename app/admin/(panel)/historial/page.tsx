import { prisma } from "@/lib/prisma";

const actionLabels: Record<string, string> = {
  create: "creó",
  update: "editó",
  delete: "eliminó",
  "update-role": "cambió el rol de",
  "update-status": "cambió el estado de",
};

export default async function AdminHistoryPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: true },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Historial de cambios</h1>
      <p className="mt-1 text-sm text-white/50">Últimas {logs.length} acciones realizadas en el panel.</p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3">Acción</th>
              <th className="px-4 py-3">Detalle</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-white/40">Sin actividad registrada aún.</td>
              </tr>
            )}
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3 font-semibold">{log.user.name}</td>
                <td className="px-4 py-3 text-white/70">
                  {actionLabels[log.action] ?? log.action} <span className="text-white/40">{log.entity}</span>
                </td>
                <td className="px-4 py-3 text-white/60">{log.detail}</td>
                <td className="px-4 py-3 text-white/40">{new Date(log.createdAt).toLocaleString("es")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
