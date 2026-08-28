import { prisma } from "@/lib/prisma";

async function getStats() {
  const [leadsNuevos, stockBajo, servicios, entrenadores] = await Promise.all([
    prisma.lead.count({ where: { status: "nuevo" } }),
    prisma.inventoryItem.count({ where: { status: "bajo" } }),
    prisma.service.count({ where: { published: true } }),
    prisma.trainer.count({ where: { published: true } }),
  ]);
  return { leadsNuevos, stockBajo, servicios, entrenadores };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Leads nuevos", value: stats.leadsNuevos },
    { label: "Alertas de stock bajo", value: stats.stockBajo },
    { label: "Servicios publicados", value: stats.servicios },
    { label: "Entrenadores activos", value: stats.entrenadores },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">Resumen general del gimnasio.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-white/10 bg-azul-oscuro/60 p-6">
            <p className="text-3xl font-heading font-black text-fuego">{c.value}</p>
            <p className="mt-1 text-sm text-white/60">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
