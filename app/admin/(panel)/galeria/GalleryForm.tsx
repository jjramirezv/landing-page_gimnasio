import { saveGalleryItem } from "./actions";

type GalleryItem = {
  id: string;
  label: string;
  src?: string | null;
};

export default function GalleryForm({ item }: { item?: GalleryItem }) {
  return (
    <form action={saveGalleryItem} className="mt-6 max-w-xl space-y-4">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Etiqueta (texto sobre la foto)</label>
        <input name="label" defaultValue={item?.label} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Foto (link de imagen)</label>
        <input
          type="url"
          name="src"
          defaultValue={item?.src ?? ""}
          required={!item}
          placeholder="https://... (pega el link de una imagen, ej. desde Google Imágenes)"
          className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego"
        />
      </div>

      <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
        Guardar
      </button>
    </form>
  );
}
