"use client";

import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });}

export { gsap, ScrollTrigger, SplitText };

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface MotionEnv {
  /** viewport >= 768px */
  desktop: boolean;
}

/**
 * Esegue animazioni GSAP dentro un matchMedia con scope.
 * - Se l'utente ha "riduci movimento" attivo, NON parte nulla (il CSS mostra tutto statico).
 * - Tutto (tween, ScrollTrigger, SplitText) viene ripulito allo smontaggio.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (env: MotionEnv) => void | (() => void),
  deps: DependencyList = []
) {
  useIsoLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 768px)",
      },
      (ctx) => {
        const c = ctx.conditions as { motion?: boolean; desktop?: boolean };
        if (!c.motion) return;
        return setup({ desktop: !!c.desktop });
      }
    );
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Aspetta i font prima di misurare/spezzare il testo. */
export function fontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }
  return document.fonts.ready.then(() => undefined);
}

/** Evento globale: la preloader ha finito, può partire l'intro dell'hero. */
export const READY_EVENT = "lm:ready";

export function onSiteReady(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  if ((window as unknown as { __lmReady?: boolean }).__lmReady) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(READY_EVENT, handler);
}
