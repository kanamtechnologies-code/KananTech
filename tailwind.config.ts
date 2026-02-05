import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "section-bg": "#F8FAFC",
        "card-bg": "#FFFFFF",
        "border": "#E2E8F0",
        "primary-text": "#0F172A",
        "secondary-text": "#334155",
        "muted-text": "#64748B",
        // Emerald (Primary Accent)
        emerald: {
          primary: "#059669",
          hover: "#047857",
          dark: "#065F46",
          tint: "#D1FAE5",
        },
        // Gold (Secondary Accent - Use Sparingly)
        gold: {
          50: "#FFFBEB",
          500: "#D4AF37",
          600: "#B9922E",
          800: "#8A6F1A",
        },
      },
    },
  },
  plugins: [],
};
export default config;

