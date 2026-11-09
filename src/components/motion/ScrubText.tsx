"use client";

import { useMemo, useRef } from "react";
import { gsap, useMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ScrubTextProps {
  /** Testo; le parole tra *asterischi* diventano corsivo script d'accento */
  text: string;
  className?: string;
  start?: string;
  end?: string;
}

/**
 * Le parole si "accendono" una alla volta mentre si scorre:
 * lo stesso effetto del titolo del video di riferimento.
 */
export function ScrubText({ text, className, start = "top 78%", end = "bottom 42%" }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => {
    const out: { w: string; accent: boolean }[] = [];
    const re = /\*([^*]+)\*|(\S+)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      if (m[1]) m[1].split(/\s+/).forEach((w) => out.push({ w, accent: true }));
      else out.push({ w: m[2], accent: false });
    }
    return out;
  }, [text]);

  useMotion(
    ref,
    () => {
      const spans = ref.current?.querySelectorAll("[data-w]");
      if (!spans?.length) return;
      gsap.fromTo(
        spans,
        { opacity: 0.14, y: 8 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 0.6,
          },
        }
      );
    },
    [start, end]
  );

  return (
    <p ref={ref} className={cn("text-balance", className)}>
      {words.map((x, i) => (
        <span key={i} className="inline-block whitespace-pre">
          <span
            data-w
            className={cn(
              "inline-block",
              x.accent && "lm-script t-accent text-[1.32em] leading-[0.7]"
            )}
          >
            {x.w}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
