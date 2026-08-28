import type { Metadata } from "next";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Musculación, CrossFit, yoga, spinning, box, zumba, entrenamiento funcional y personal training. Ocho disciplinas para cada objetivo.",
};

export default function ServiciosPage() {
  return (
    <main className="pt-24">
      <Services />
    </main>
  );
}
