import { saveTrainer } from "./actions";

type Trainer = {
  id: string;
  name: string;
  specialty: string;
  certification: string;
  initials: string;
  photo?: string | null;
  published: boolean;
};

export default function TrainerForm({ trainer }: { trainer?: Trainer }) {
  return (
    <form action={saveTrainer} className="mt-6 max-w-xl space-y-4">
      {trainer && <input type="hidden" name="id" value={trainer.id} />}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Nombre</label>
        <input name="name" defaultValue={trainer?.name} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Especialidad</label>
        <input name="specialty" defaultValue={trainer?.specialty} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Certificación</label>
        <input name="certification" defaultValue={trainer?.certification} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Iniciales (si no hay foto)</label>
        <input name="initials" defaultValue={trainer?.initials} required maxLength={3} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Foto (link de imagen)</label>
        <input
          type="url"
          name="photo"
          defaultValue={trainer?.photo ?? ""}
          placeholder="https://... (pega el link de una imagen, ej. desde Google Imágenes)"
          className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={trainer?.published ?? true} className="h-4 w-4 accent-[#9BFF3B]" />
        Publicado
      </label>

      <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
        Guardar
      </button>
    </form>
  );
}
