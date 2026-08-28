import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteInventoryItem } from "./actions";

export default async function AdminInventoryPage() {
  const items = await prisma.inventoryItem.findMany({ orderBy: { product: "asc" } });
  const lowStockCount = items.filter((i) => i.status === "bajo").length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Inventario</h1>
          <p className="mt-1 text-sm text-white/50">
            {items.length} productos.{" "}
            {lowStockCount > 0 && <span className="text-energia">{lowStockCount} con stock bajo.</span>}
          </p>
        </div>
        <Link href="/admin/inventario/new" className="rounded-full bg-gradient-fuego px-5 py-2.5 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          + Nuevo producto
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-azul-oscuro/60 text-xs uppercase text-white/50">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Stock mínimo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Actualizado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-semibold">{item.product}</td>
                <td className="px-4 py-3 text-white/60">{item.stock}</td>
                <td className="px-4 py-3 text-white/60">{item.minStock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.status === "bajo" ? "bg-energia/20 text-energia" : "bg-fuego/20 text-fuego"}`}>
                    {item.status === "bajo" ? "Stock bajo" : "OK"}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40">{new Date(item.updatedAt).toLocaleDateString("es")}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/inventario/${item.id}`} className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold hover:border-fuego hover:text-fuego">
                      Editar
                    </Link>
                    <form action={deleteInventoryItem}>
                      <input type="hidden" name="id" value={item.id} />
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
