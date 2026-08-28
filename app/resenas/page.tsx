import type { Metadata } from "next";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Reseñas",
  description: "Historias reales de transformación de nuestros miembros en Power Fitness Gym.",
};

export default function ResenasPage() {
  return (
    <main className="pt-24">
      <Testimonials />
    </main>
  );
}
