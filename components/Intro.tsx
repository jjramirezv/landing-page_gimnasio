import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/lib/data";

export default function Intro() {
  return (
    <section className="bg-negro-profundo py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="font-heading text-sm font-bold uppercase tracking-widest text-fuego">
            Bienvenido
          </span>
          <h2 className="mt-4 font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
            Más que un Gimnasio, <span className="text-gradient">una Comunidad</span>
          </h2>
          <p className="mt-6 text-white/70">{about.intro}</p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/nosotros"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide transition-all duration-200 hover:scale-[1.03] hover:border-fuego hover:bg-fuego/10 hover:text-fuego"
            >
              Conócenos
              <span>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
