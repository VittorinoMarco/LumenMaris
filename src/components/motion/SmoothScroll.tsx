"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCartStore } from "@/store/cart-store";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll inerziale (Lenis) sincronizzato con GSAP ScrollTrigger. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
    });
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Blocca lo scroll quando il carrello (drawer) è aperto
    const unsub = useCartStore.subscribe((s, prev) => {
      if (s.isOpen !== prev.isOpen) {
        if (s.isOpen) lenis.stop();
        else lenis.start();
      }
    });

    // Link ancora (#sezione) con scroll morbido
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6, offset: 0 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      unsub();
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Cambio pagina: torna in cima (o all'ancora) senza animazione
  useEffect(() => {
    const lenis = window.__lenis;
    const hash = window.location.hash;
    const run = () => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { immediate: true });
          else el.scrollIntoView();
          return;
        }
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    run();
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
