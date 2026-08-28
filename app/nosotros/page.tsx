import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la misión, visión y valores de Power Fitness Gym: más de 5 años transformando vidas a través del entrenamiento.",
};

export default function NosotrosPage() {
  return (
    <main className="pt-24">
      <About />
    </main>
  );
}
