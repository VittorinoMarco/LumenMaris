"use client";

import { useRef } from "react";
import { gsap, fontsReady, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export interface DisplayLine {
  serif: string;
  script?: string;
  /** serif in maiuscolo, dritto (per "UNDERWATER") */
  upper?: boolean;
}

interface LumenDisplayTitleProps {
  lines: DisplayLine[];
  onDark?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "center" | "left";
  /** false = nessuna rivelazione automatica (la gestisce il genitore) */
  animate?: boolean;
  as?: "div" | "h1" | "h2" | "h3";
  start?: string;
}

/**
 * Titolo editoriale: parole serif in corsivo + parole script d'accento.
 * Ogni parola sale da una maschera quando entra in vista.
 */
export function LumenDisplayTitle({
  lines,
  onDark = false,
  className,
  size = "md",
  align = "center",
  animate = true,
  as: Tag = "div",
  start = "top 85%",
}: LumenDisplayTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotion(
    ref,
    () => {
      if (!animate) return;
      const el = ref.current;
      if (!el) return;
      let dead = false;
      let ctx: gsap.Context | undefined;
      fontsReady().then(() => {
        if (dead) return;
        ctx = gsap.context(() => {
          gsap.fromTo(
            el.querySelectorAll(".lm-mask-inner"),
            { yPercent: 115, rotate: 2, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              rotate: 0,
              duration: 1.5,
              ease: "expo.out",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start, once: true },
            }
          );
        }, el);
      });
      return () => {
        dead = true;
        ctx?.revert();
      };
    },
    [animate, start]
  );

  return (
    <Tag
      ref={ref as never}
      data-title={animate ? "" : undefined}
      data-size={size}
      data-align={align}
      className={cn("lm-display", onDark && "lm-on-dark", className)}
    >
      {lines.map((line) => (
        <span key={`${line.serif}-${line.script}`} className="lm-display-line">
          <span className="lm-mask">
            <span className="lm-mask-inner lm-word-serif" data-upper={line.upper ? "true" : undefined}>
              {line.serif}
            </span>
          </span>
          {line.script && (
            <span className="lm-mask">
              <span className="lm-mask-inner lm-word-script">{line.script}</span>
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
