"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, isInView, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="text-center"
        >
          <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2">
            {typeof item.value === "number" ? (
              <Counter end={item.value} suffix={item.suffix || ""} />
            ) : (
              item.value
            )}
          </div>
          <p className="text-muted-foreground text-sm uppercase tracking-wider">
            {item.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
