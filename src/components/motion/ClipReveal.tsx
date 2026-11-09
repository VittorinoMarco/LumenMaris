"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** direzione da cui si apre la maschera */
  from?: "bottom" | "top" | "left" | "right";
  start?: string;
}

const hidden = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/** L'immagine si "apre" con una maschera quando entra in vista. */
export function ClipReveal({ children, className, delay = 0, from = "bottom", start = "top 90%" }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    ref,
    () => {
      gsap.fromTo(
        ref.current,
        { clipPath: hidden[from] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          delay,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start, once: true },
        }
      );
    },
    [from, delay, start]
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
