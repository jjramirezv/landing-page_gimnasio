import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const PHONE_NUMBER = "15550102030";
const MESSAGE = "Hola, quiero más información sobre los planes de Power Fitness Gym.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
