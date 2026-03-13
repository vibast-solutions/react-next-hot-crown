import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        crown: {
          gold: "#D4A017",
          "gold-light": "#F0C040",
          ember: "#E8720C",
          flame: "#FF4500",
        },
        royal: {
          purple: "#2D1B69",
          "purple-deep": "#1A0F3C",
          midnight: "#0D0B1A",
          "midnight-light": "#161230",
        },
        attack: {
          DEFAULT: "#DC2626",
          light: "#EF4444",
          dark: "#991B1B",
        },
        defend: {
          DEFAULT: "#2563EB",
          light: "#3B82F6",
          dark: "#1E40AF",
        },
      },
      fontFamily: {
        cinzel: ["Cinzel", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "timer-urgent": "timer-urgent 1s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "timer-urgent": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
