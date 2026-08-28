import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const siteUrl = "https://www.powerfitnessgym.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Power Fitness Gym | Transforma tu cuerpo, transforma tu vida",
    template: "%s | Power Fitness Gym",
  },
  description:
    "Power Fitness Gym: musculación, CrossFit, yoga, spinning, box y entrenamiento personal. 3 sedes, +15 entrenadores certificados y más de 2,000 miembros activos. ¡Únete hoy!",
  keywords: [
    "gimnasio",
    "power fitness gym",
    "crossfit",
    "musculación",
    "entrenamiento personal",
    "clases de yoga",
    "gym cerca de mi",
  ],
  openGraph: {
    title: "Power Fitness Gym | Transforma tu cuerpo, transforma tu vida",
    description:
      "Instalaciones de primer nivel, clases grupales y entrenadores certificados. Descubre nuestros planes de membresía.",
    url: siteUrl,
    siteName: "Power Fitness Gym",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Fitness Gym | Transforma tu cuerpo, transforma tu vida",
    description:
      "Instalaciones de primer nivel, clases grupales y entrenadores certificados. Descubre nuestros planes de membresía.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Gym",
  name: "Power Fitness Gym",
  image: `${siteUrl}/og-image.jpg`,
  url: siteUrl,
  telephone: "+1-555-010-2030",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Principal 123",
    addressLocality: "Ciudad",
    addressCountry: "PE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "05:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "07:00",
      closes: "20:00",
    },
  ],
  sameAs: ["https://www.facebook.com", "https://www.instagram.com", "https://www.tiktok.com"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${roboto.variable}`}>
      <body className="font-body bg-negro-profundo text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
