import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuego: "#9BFF3B",
        energia: "#FF4D5E",
        "azul-oscuro": "#17181C",
        "azul-noche": "#1F2126",
        "negro-profundo": "#0A0B0D",
        dorado: "#FFC02E",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-roboto)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-fuego": "linear-gradient(135deg, #9BFF3B 0%, #4ADE80 100%)",
        "gradient-dark": "linear-gradient(180deg, #0A0B0D 0%, #17181C 100%)",
      },
      boxShadow: {
        glow: "0 0 25px rgba(155,255,59,0.35)",
        "glow-gold": "0 0 25px rgba(255,192,46,0.3)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease forwards",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
