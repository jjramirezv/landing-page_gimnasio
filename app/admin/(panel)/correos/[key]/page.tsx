import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveEmailTemplate } from "../actions";

export default async function EditEmailTemplatePage({ params }: { params: { key: string } }) {
  const template = await prisma.emailTemplate.findUnique({ where: { key: params.key } });
  if (!template) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">{template.name}</h1>
      <form action={saveEmailTemplate} className="mt-6 max-w-xl space-y-4">
        <input type="hidden" name="key" value={template.key} />

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Asunto</label>
          <input name="subject" defaultValue={template.subject} required className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-white/60">Cuerpo del mensaje</label>
          <textarea name="body" defaultValue={template.body} required rows={8} className="w-full rounded-lg border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego" />
          <p className="mt-1 text-xs text-white/40">Puedes usar variables como {"{{nombre}}"}, {"{{fecha}}"}, {"{{producto}}"} según la plantilla.</p>
        </div>

        <button type="submit" className="rounded-full bg-gradient-fuego px-6 py-3 font-heading text-sm font-bold text-negro-profundo shadow-glow">
          Guardar
        </button>
      </form>
    </div>
  );
}
