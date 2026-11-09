"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, fontsReady, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  /** se impostato, anima i figli diretti in sequenza invece del blocco intero */
  stagger?: number;
  start?: string;
}

/** Dissolvenza + salita morbida quando l'elemento entra in vista. */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 40,
  stagger,
  start = "top 88%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : el;
      if (stagger) gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    },
    [delay, y, stagger, start]
  );

  return (
    <Tag ref={ref} data-r className={className}>
      {children}
    </Tag>
  );
}

interface SplitLinesProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  start?: string;
  /** "lines" (default) o "words" */
  by?: "lines" | "words";
}

/**
 * Il testo sale da una maschera riga per riga (o parola per parola).
 * Si ri-calcola da solo al resize.
 */
export function SplitLines({
  children,
  className,
  as: Tag = "p",
  delay = 0,
  start = "top 88%",
  by = "lines",
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useMotion(
    ref,
    () => {
      const el = ref.current;
      if (!el) return;
      let dead = false;
      let ctx: gsap.Context | undefined;
      let split: SplitText | undefined;

      fontsReady().then(() => {
        if (dead) return;
        ctx = gsap.context(() => {
          split = SplitText.create(el, {
            type: by === "words" ? "lines,words" : "lines",
            mask: "lines",
            linesClass: "lm-split-line",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { visibility: "visible" });
              return gsap.from(by === "words" ? self.words : self.lines, {
                yPercent: 112,
                duration: 1.3,
                delay,
                stagger: by === "words" ? 0.035 : 0.1,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start, once: true },
              });
            },
          });
        }, el);
      });

      return () => {
        dead = true;
        ctx?.revert();
        split?.revert();
      };
    },
    [delay, start, by]
  );

  return (
    <Tag ref={ref} data-split className={className}>
      {children}
    </Tag>
  );
}

/** Wrapper compatibile con il vecchio GsapScrollReveal. */
export function GsapScrollReveal(props: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <Reveal {...props} className={cn(props.className)} />;
}
