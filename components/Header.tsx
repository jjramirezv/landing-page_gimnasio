"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-negro-profundo/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-24">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.png" alt="Power Fitness Gym" width={96} height={96} className="h-[88px] w-[88px] object-contain drop-shadow-[0_0_18px_rgba(155,255,59,0.45)]" priority />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 font-heading text-sm font-semibold uppercase tracking-wide">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative py-1 transition-colors hover:text-fuego ${
                  active ? "text-fuego" : "text-white/80"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-0.5 bg-fuego transition-all duration-200 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/registro"
            className="text-sm font-semibold text-white/70 transition-colors hover:text-fuego"
          >
            Registrarse
          </Link>

          <Link
            href="/login"
            aria-label="Iniciar sesión"
            title="Iniciar sesión"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-fuego hover:text-fuego"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          <Link
            href="/planes"
            className="inline-flex items-center rounded-full bg-gradient-fuego px-6 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-negro-profundo shadow-glow transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(155,255,59,0.55)] active:scale-95"
          >
            ¡Únete Ahora!
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="lg:hidden relative z-50 grid h-10 w-10 place-items-center rounded-lg border border-white/20"
        >
          <span className="sr-only">Menú</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-24 bg-negro-profundo/98 backdrop-blur-md transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 pt-16 font-heading text-lg font-semibold uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`${pathname === link.href ? "text-fuego" : "text-white/90"} hover:text-fuego`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/planes"
            onClick={() => setMenuOpen(false)}
            className="mt-4 rounded-full bg-gradient-fuego px-8 py-3 text-sm font-bold text-negro-profundo shadow-glow"
          >
            ¡Únete Ahora!
          </Link>

          <div className="mt-2 flex gap-4 text-xs font-semibold uppercase tracking-wide text-white/50">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="hover:text-fuego">
              Iniciar Sesión
            </Link>
            <Link href="/registro" onClick={() => setMenuOpen(false)} className="hover:text-fuego">
              Registrarse
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
