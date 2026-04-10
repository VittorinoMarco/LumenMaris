"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          if (started.current) return;
          started.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: () => setCount(Math.floor(obj.val)),
            onComplete: () => setCount(end),
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

interface CounterItem {
  value: number | string;
  label: string;
  suffix?: string;
}

interface CounterAnimationProps {
  items: CounterItem[];
}

export function CounterAnimation({ items }: CounterAnimationProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        row.querySelectorAll("[data-counter-cell]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, row);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-2 gap-y-14 gap-x-8 md:grid-cols-4 md:gap-10"
    >
      {items.map((item) => (
        <div
          key={item.label}
          data-counter-cell
          className="text-left md:text-center"
        >
          <div className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-light leading-none tracking-[-0.03em] text-primary">
            {typeof item.value === "number" ? (
              <Counter end={item.value} suffix={item.suffix || ""} />
            ) : (
              item.value
            )}
          </div>
          <p className="mt-4 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
