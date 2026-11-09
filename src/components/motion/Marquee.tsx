"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Fascia scorrevole in corsivo script: accelera e inverte con lo scroll. */
export function Marquee({ items, className }: MarqueeProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(root, () => {
    if (!track.current) return;
    const tween = gsap.to(track.current, {
      xPercent: -50,
      duration: 46,
      ease: "none",
      repeat: -1,
    });
    let dir = 1;
    ScrollTrigger.create({
      trigger: root.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        dir = self.direction;
        const v = Math.min(Math.abs(self.getVelocity()) / 250, 6);
        gsap.to(tween, { timeScale: dir * (1 + v), duration: 0.4, overwrite: true });
        gsap.to(tween, { timeScale: dir, duration: 1.2, delay: 0.4 });
      },
    });
  });

  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex shrink-0 items-center gap-[0.9em] pr-[0.9em]">
          <span className={i % 2 ? "lm-script t-accent text-[1.35em] leading-none" : "lm-italic"}>{t}</span>
          <span aria-hidden className="t-accent text-[0.5em]">
            ✦
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={root}
      className={cn("overflow-hidden whitespace-nowrap text-[clamp(2rem,5.4vw,4.6rem)] leading-none", className)}
      aria-hidden
    >
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
