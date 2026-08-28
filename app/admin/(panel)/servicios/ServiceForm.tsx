"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveService } from "./actions";

type Service = {
  id: string;
  icon: string;
  name: string;
  description: string;
  schedule: string;
  image?: string | null;
  published: boolean;
};

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      await saveService(formData);
      router.push("/admin/servicios");
      router.refresh();
    });
  };

  return (
    <form action={onSubmit} className="mt-6 max-w-xl space-y-4">
      {service && <input type="hidden" name="id" value={service.id} />}

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Ícono (emoji)</label>
        <input name="icon" defaultValue={service?.icon} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Nombre</label>
        <input name="name" defaultValue={service?.name} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Descripción</label>
        <textarea name="description" defaultValue={service?.description} required rows={3} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Horario</label>
        <input name="schedule" defaultValue={service?.schedule} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
      </div>

      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Foto de portada (link de imagen)</label>
        <input
          type="url"
          name="image"
          defaultValue={service?.image ?? ""}
          placeholder="https://... (pega el link de una imagen, ej. desde Google Imágenes)"
          className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={service?.published ?? true} className="h-4 w-4 accent-[#9BFF3B]" />
        Publicado
      </label>

      <button type="submit" disabled={pending} className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow disabled:opacity-60">
        {pending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
