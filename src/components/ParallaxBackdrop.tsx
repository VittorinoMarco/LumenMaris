"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxBackdropProps {
  text: string;
  className?: string;
  /** Parallax intensity: higher = more movement vs scroll */
  scrub?: number;
}

export function ParallaxBackdrop({
  text,
  className = "",
  scrub = 0.35,
}: ParallaxBackdropProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        layer,
        { yPercent: 8 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: layer.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        }
      );
    }, layer);

    return () => ctx.revert();
  }, [scrub]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden
    >
      <div
        ref={layerRef}
        className="absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 text-center font-display text-[clamp(5rem,22vw,16rem)] font-light leading-none tracking-tight text-primary/[0.07] md:text-[clamp(6rem,18vw,14rem)]"
      >
        {text}
      </div>
    </div>
  );
}
