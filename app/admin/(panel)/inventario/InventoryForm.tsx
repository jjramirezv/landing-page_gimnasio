import { saveInventoryItem } from "./actions";

type InventoryItem = {
  id: string;
  product: string;
  stock: number;
  minStock: number;
};

export default function InventoryForm({ item }: { item?: InventoryItem }) {
  return (
    <form action={saveInventoryItem} className="mt-6 max-w-xl space-y-4">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Producto</label>
        <input name="product" defaultValue={item?.product} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Stock disponible</label>
          <input type="number" name="stock" defaultValue={item?.stock ?? 0} required min={0} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Stock mínimo</label>
          <input type="number" name="minStock" defaultValue={item?.minStock ?? 0} required min={0} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>
      </div>

      <p className="text-xs text-white/40">El estado (OK / Stock bajo) se calcula automáticamente comparando stock disponible contra stock mínimo.</p>

      <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
        Guardar
      </button>
    </form>
  );
}
