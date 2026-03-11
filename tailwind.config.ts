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
        primary: {
          DEFAULT: "#356175",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#ae6036",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#68a48d",
          foreground: "#1A1A1A",
        },
        muted: {
          DEFAULT: "#5e191b",
          foreground: "#6b7280",
        },
        border: "var(--border)",
        input: "var(--input)",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
