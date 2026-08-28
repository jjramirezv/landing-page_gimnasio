import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/ui/Counter";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-dark pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-fuego/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-energia/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F0F1A_85%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-negro-profundo via-negro-profundo/40 to-negro-profundo/70" />
      </div>

      <div className="container-x relative z-10 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuego/40 bg-fuego/10 px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-widest text-fuego">
            🔥 Power Fitness Gym
          </span>

          <h1 className="mt-6 font-heading text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            TRANSFORMA TU CUERPO,
            <br />
            <span className="text-gradient">TRANSFORMA TU VIDA</span>
          </h1>

          <p className="mt-6 max-w-xl font-body text-base text-white/70 md:text-lg">
            Instalaciones de primer nivel, entrenadores certificados internacionalmente y una
            comunidad que te empuja a superar tus límites. Empieza tu transformación hoy.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/planes"
              className="rounded-full bg-gradient-fuego px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-negro-profundo shadow-glow transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(155,255,59,0.55)] active:scale-95"
            >
              Empieza Hoy
            </Link>
            <Link
              href="/planes"
              className="rounded-full border-2 border-white/30 px-8 py-4 font-heading text-sm font-bold uppercase tracking-wide text-white transition-all duration-200 hover:scale-[1.03] hover:border-fuego hover:bg-fuego/10 hover:text-fuego active:scale-95"
            >
              Ver Planes
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4">
          <Counter target={2000} suffix="+" label="Miembros Activos" />
          <Counter target={5} suffix="+" label="Años de Experiencia" />
          <Counter target={15} suffix="+" label="Entrenadores" />
          <Counter target={50} suffix="+" label="Clases / Semana" />
        </div>
      </div>
    </section>
  );
}
