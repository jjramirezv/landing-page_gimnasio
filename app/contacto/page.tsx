import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos y un asesor te contactará para ayudarte a elegir el mejor plan.",
};

export default function ContactoPage() {
  return (
    <main className="pt-24">
      <Contact />
    </main>
  );
}
