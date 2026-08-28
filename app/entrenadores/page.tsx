import type { Metadata } from "next";
import Trainers from "@/components/Trainers";

export const metadata: Metadata = {
  title: "Entrenadores",
  description: "Profesionales con certificación internacional listos para guiar tu progreso.",
};

export default function EntrenadoresPage() {
  return (
    <main className="pt-24">
      <Trainers />
    </main>
  );
}
