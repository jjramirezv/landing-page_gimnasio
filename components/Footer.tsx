"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { FacebookIcon, InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/SocialIcons";

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-white/10 bg-negro-profundo pt-16">
      <div className="container-x grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Power Fitness Gym" width={96} height={96} className="h-[88px] w-[88px] object-contain" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-white/50">
            Más de 5 años transformando vidas a través del entrenamiento. Tu mejor versión empieza
            aquí.
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-fuego hover:text-fuego"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide">Navegación</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-fuego">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide">Legal</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li><a href="#" className="transition-colors hover:text-fuego">Términos y Condiciones</a></li>
            <li><a href="#" className="transition-colors hover:text-fuego">Política de Privacidad</a></li>
            <li><a href="#" className="transition-colors hover:text-fuego">Política de Cookies</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold uppercase tracking-wide">Newsletter</h4>
          <p className="mt-4 text-sm text-white/60">
            Recibe tips de entrenamiento y promociones exclusivas.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex gap-2" noValidate>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              aria-label="Correo para newsletter"
              className="w-full rounded-full border border-white/15 bg-azul-oscuro/60 px-4 py-2.5 text-sm outline-none focus:border-fuego"
            />
            <button
              type="submit"
              className="flex-shrink-0 rounded-full bg-gradient-fuego px-5 py-2.5 text-sm font-heading font-bold text-negro-profundo"
            >
              OK
            </button>
          </form>
          {error && <p className="mt-2 text-xs text-energia">{error}</p>}
          {subscribed && <p className="mt-2 text-xs text-dorado">¡Suscripción exitosa!</p>}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Power Fitness Gym. Todos los derechos reservados.
      </div>
    </footer>
  );
}
