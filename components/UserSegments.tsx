import Reveal from "@/components/ui/Reveal";
import { userSegments } from "@/lib/data";

export default function UserSegments() {
  return (
    <section id="para-ti" className="bg-negro-profundo py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            ¿Es Power Fitness para Ti?
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Un Plan para <span className="text-gradient">Cada Objetivo</span>
          </h2>
          <p className="mt-4 text-white/60">
            Sin importar tu punto de partida, tenemos un camino pensado para ti.
          </p>
        </Reveal>

        <Reveal className="mt-14 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gradient-fuego text-negro-profundo">
                <th className="px-5 py-4 font-heading text-xs font-black uppercase tracking-wide">
                  Segmento
                </th>
                <th className="px-5 py-4 font-heading text-xs font-black uppercase tracking-wide">
                  Descripción
                </th>
                <th className="px-5 py-4 font-heading text-xs font-black uppercase tracking-wide">
                  Necesidad Principal
                </th>
                <th className="px-5 py-4 font-heading text-xs font-black uppercase tracking-wide">
                  Acción Esperada
                </th>
              </tr>
            </thead>
            <tbody>
              {userSegments.map((row, i) => (
                <tr
                  key={row.segment}
                  className={`border-t border-white/10 ${i % 2 === 0 ? "bg-azul-oscuro/40" : "bg-transparent"}`}
                >
                  <td className="px-5 py-4 font-heading font-bold text-fuego">{row.segment}</td>
                  <td className="px-5 py-4 text-white/70">{row.description}</td>
                  <td className="px-5 py-4 text-white/70">{row.mainNeed}</td>
                  <td className="px-5 py-4 text-white/70">{row.expectedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
