import type { Metadata } from "next";
import Pricing from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Planes",
  description: "Elige el plan ideal para tus objetivos. Sin permanencia, cancela cuando quieras.",
};

export default function PlanesPage() {
  return (
    <main className="pt-24">
      <Pricing />
    </main>
  );
}
