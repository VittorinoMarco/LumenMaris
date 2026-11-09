import gsap from "gsap";

/**
 * Temi di sezione. Lo scroll li fonde uno nell'altro: lo sfondo e i colori del
 * testo cambiano lentamente mentre si passa da una sezione alla successiva.
 * Usare rgb()/rgba() così GSAP interpola correttamente le variabili CSS.
 */
export const themes = {
  light: {
    bg: "rgb(246, 240, 230)",
    fg: "rgb(23, 66, 79)",
    muted: "rgb(95, 120, 130)",
    accent: "rgb(45, 122, 154)",
    line: "rgba(23, 66, 79, 0.16)",
    card: "rgba(255, 255, 255, 0.5)",
  },
  mist: {
    bg: "rgb(223, 233, 227)",
    fg: "rgb(23, 66, 79)",
    muted: "rgb(79, 111, 120)",
    accent: "rgb(31, 111, 134)",
    line: "rgba(23, 66, 79, 0.18)",
    card: "rgba(255, 255, 255, 0.45)",
  },
  sand: {
    bg: "rgb(241, 229, 211)",
    fg: "rgb(44, 62, 69)",
    muted: "rgb(108, 98, 88)",
    accent: "rgb(185, 116, 79)",
    line: "rgba(44, 62, 69, 0.16)",
    card: "rgba(255, 255, 255, 0.45)",
  },
  blush: {
    bg: "rgb(239, 211, 195)",
    fg: "rgb(59, 47, 44)",
    muted: "rgb(122, 95, 85)",
    accent: "rgb(180, 95, 69)",
    line: "rgba(59, 47, 44, 0.16)",
    card: "rgba(255, 255, 255, 0.4)",
  },
  deep: {
    bg: "rgb(14, 54, 71)",
    fg: "rgb(246, 239, 227)",
    muted: "rgba(246, 239, 227, 0.74)",
    accent: "rgb(159, 211, 230)",
    line: "rgba(246, 239, 227, 0.2)",
    card: "rgba(246, 239, 227, 0.07)",
  },
} as const;

export type ThemeName = keyof typeof themes;

let current: ThemeName | null = null;

export function currentTheme() {
  return current;
}

/** Applica un tema con una dissolvenza morbida sulle variabili CSS di :root. */
export function applyTheme(name: ThemeName, opts?: { immediate?: boolean }) {
  if (typeof document === "undefined") return;
  const t = themes[name] ?? themes.light;
  if (current === name && !opts?.immediate) return;
  current = name;

  const vars = {
    "--t-bg": t.bg,
    "--t-fg": t.fg,
    "--t-muted": t.muted,
    "--t-accent": t.accent,
    "--t-line": t.line,
    "--t-card": t.card,
  };

  document.documentElement.dataset.lmTheme = name;

  if (opts?.immediate) {
    gsap.set(document.documentElement, vars);
    return;
  }
  gsap.to(document.documentElement, {
    ...vars,
    duration: 1.1,
    ease: "power2.inOut",
    overwrite: "auto",
  });
}
