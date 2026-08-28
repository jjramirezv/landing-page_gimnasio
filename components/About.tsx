import Reveal from "@/components/ui/Reveal";
import { about, values } from "@/lib/data";

export default function About() {
  return (
    <>
      <section className="bg-gradient-dark py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
              Nosotros
            </span>
            <h1 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
              Quiénes <span className="text-gradient">Somos</span>
            </h1>
            <p className="mt-6 text-white/70">{about.intro}</p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/10 bg-azul-oscuro/60 p-8">
                <div className="text-3xl">🎯</div>
                <h2 className="mt-4 font-heading text-xl font-black">Misión</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{about.mission}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-white/10 bg-azul-oscuro/60 p-8">
                <div className="text-3xl">🔭</div>
                <h2 className="mt-4 font-heading text-xl font-black">Visión</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{about.vision}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-negro-profundo py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
              Nuestros Valores
            </span>
            <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
              Lo que nos <span className="text-gradient">Mueve</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60}>
                <div className="h-full rounded-2xl border border-white/10 bg-azul-oscuro/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-fuego/60 hover:shadow-glow">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-fuego text-2xl">
                    {value.icon}
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
