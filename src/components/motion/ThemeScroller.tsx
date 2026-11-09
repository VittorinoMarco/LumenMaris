"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { applyTheme, type ThemeName } from "@/lib/theme";

/**
 * Cerca tutte le sezioni con data-theme="mist|sand|blush|deep|light" e, quando
 * attraversano il centro della finestra, fonde lo sfondo e i colori del sito
 * verso il loro tema. È l'effetto "le sezioni cambiano colore" del riferimento.
 */
export function ThemeScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyTheme("light", { immediate: true });

    let ctx: gsap.Context | undefined;
    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-theme]");
        sections.forEach((el) => {
          const name = el.dataset.theme as ThemeName;
          ScrollTrigger.create({
            trigger: el,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => applyTheme(name, { immediate: reduce }),
            onEnterBack: () => applyTheme(name, { immediate: reduce }),
          });
        });
      });
      // tema corretto subito, in base a dove ci si trova al caricamento
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
