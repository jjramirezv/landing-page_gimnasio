import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Galería",
  description: "Conoce nuestras instalaciones: zona de pesas, CrossFit, cardio, yoga, boxeo y más.",
};

export default function GaleriaPage() {
  return (
    <main className="pt-24">
      <Gallery />
    </main>
  );
}
