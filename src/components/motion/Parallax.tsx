"use client";

import { useRef, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";
import { gsap, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  /** percentuale di spostamento (default 10 → ±10%) */
  speed?: number;
}

/**
 * Cornice (qualsiasi forma, grazie a className) con contenuto che scorre più
 * lentamente dello scroll: effetto profondità tipico dei siti editoriali.
 */
export function ParallaxFrame({ children, className, speed = 10 }: ParallaxFrameProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useMotion(
    frame,
    () => {
      if (!inner.current) return;
      gsap.fromTo(
        inner.current,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: frame.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    [speed]
  );

  const over = speed * 2 + 6;
  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div
        ref={inner}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${over / 2}%`, height: `${100 + over}%` }}
      >
        {children}
      </div>
    </div>
  );
}

type ParallaxImageProps = Omit<ImageProps, "fill"> & {
  frameClassName?: string;
  speed?: number;
};

export function ParallaxImage({ frameClassName, speed = 10, className, alt, ...img }: ParallaxImageProps) {
  return (
    <ParallaxFrame className={frameClassName} speed={speed}>
      <Image fill alt={alt} className={cn("object-cover", className)} {...img} />
    </ParallaxFrame>
  );
}

/** Sposta un elemento in verticale in base allo scroll (per collage fluttuanti). */
export function Float({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMotion(
    ref,
    () => {
      gsap.fromTo(
        ref.current,
        { y: distance },
        {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    },
    [distance]
  );
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
