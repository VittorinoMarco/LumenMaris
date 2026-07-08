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
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        lm: {
          ocean: "var(--lm-ocean)",
          "ocean-deep": "var(--lm-ocean-deep)",
          "ocean-mid": "var(--lm-ocean-mid)",
          sky: "var(--lm-sky)",
          cream: "var(--lm-cream)",
          sand: "var(--lm-sand)",
          text: "var(--lm-text)",
          "text-muted": "var(--lm-text-muted)",
        },
      },
      fontFamily: {
        serif: ["var(--lm-font-serif)", "Georgia", "serif"],
        script: ["var(--lm-font-script)", "cursive"],
        sans: ["var(--lm-font-ui)", "system-ui", "sans-serif"],
        display: ["var(--lm-font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        photo: "var(--lm-radius-photo)",
        soft: "var(--lm-radius-soft)",
        block: "var(--lm-radius-block)",
        ui: "var(--lm-radius-ui)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
