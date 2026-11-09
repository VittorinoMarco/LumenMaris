"use client";

import { useEffect, useRef } from "react";
import { gsap, READY_EVENT } from "@/lib/gsap";

declare global {
  interface Window {
    __lmReady?: boolean;
  }
}

/**
 * Sipario d'ingresso (solo prima visita della sessione): un arco si disegna,
 * il nome appare e il tutto si solleva sul sito. Poi parte l'intro dell'hero.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const done = () => {
      window.__lmReady = true;
      window.dispatchEvent(new Event(READY_EVENT));
    };
    const el = root.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem("lm-intro");
    } catch {}

    if (!el || seen || reduce) {
      if (el) el.style.display = "none";
      done();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
        document.documentElement.style.overflow = "";
        window.__lenis?.start();
        try {
          sessionStorage.setItem("lm-intro", "1");
        } catch {}
      },
    });

    tl.fromTo(
      el.querySelector("[data-arch]"),
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" }
    )
      .fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.12 },
        0.35
      )
      .to(el.querySelector("[data-sub]"), { opacity: 1, duration: 0.8 }, 0.9)
      .to(el.querySelectorAll("[data-word], [data-sub], svg"), {
        opacity: 0,
        y: -14,
        duration: 0.55,
        ease: "power2.in",
        stagger: 0.04,
      }, 2.05)
      .to(el, { yPercent: -100, duration: 1.15, ease: "expo.inOut" }, 2.35)
      .add(done, 2.75);

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div
      id="lm-preloader"
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--lm-ocean-deep)] text-[var(--lm-text-on-dark)]"
      aria-hidden
    >
      <svg width="46" height="72" viewBox="0 0 46 72" fill="none" className="mb-8">
        <path
          data-arch
          pathLength={1}
          strokeDasharray={1}
          d="M3 70V23C3 10.8 11.9 3 23 3s20 7.8 20 20v47Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <div className="flex items-baseline gap-3 overflow-hidden px-6 py-3">
        <span data-word className="lm-italic text-[clamp(2.4rem,7vw,4.2rem)] leading-none">
          Lumen
        </span>
        <span data-word className="lm-script text-[clamp(3.2rem,9vw,5.6rem)] leading-none text-[var(--lm-sky-soft)]">
          Maris
        </span>
      </div>
      <p
        data-sub
        className="lm-ui mt-4 text-[10px] uppercase tracking-[0.42em] text-white/60 opacity-0"
      >
        Profumi dal mare
      </p>
    </div>
  );
}
