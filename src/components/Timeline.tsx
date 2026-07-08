"use client";

import { motion } from "framer-motion";

interface TimelineStep {
  title: string;
  description: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export function Timeline({ steps }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--lm-ocean)]/20" />
      <div className="space-y-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-12"
          >
            <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lm-ocean)] text-sm text-white">
              {i + 1}
            </div>
            <h4 className="mb-2 font-display text-xl font-light tracking-tight">{step.title}</h4>
            <p className="text-[15px] font-light leading-relaxed text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
