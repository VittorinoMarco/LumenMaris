"use client";

import Image from "next/image";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { cn } from "@/lib/utils";

export type ProcessStepData = {
  num: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
  imageContain?: boolean;
};

const stepLayout = [
  { side: "left" as const, offset: "md:ml-[2%]" },
  { side: "right" as const, offset: "md:mr-[4%]" },
  { side: "left" as const, offset: "md:ml-[8%]" },
  { side: "right" as const, offset: "md:mr-[1%]" },
] as const;

function ProcessStepCard({ step }: { step: ProcessStepData }) {
  return (
    <article className="group lm-photo relative min-h-[min(78vw,380px)] w-full overflow-hidden rounded-[var(--lm-radius-photo)] shadow-[0_32px_72px_-28px_rgba(15,61,82,0.5)] ring-1 ring-[color-mix(in_srgb,white_12%,transparent)] md:min-h-[420px] lg:min-h-[460px]">
      {step.imageContain && (
        <div className="absolute inset-0 bg-[var(--lm-sand-deep)]" aria-hidden />
      )}
      <Image
        src={step.image}
        alt={step.alt}
        fill
        className={cn(
          "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]",
          !step.imageContain && "scale-[1.03]"
        )}
        sizes="(max-width: 768px) 100vw, 620px"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a2d3d]/95 via-[#0f3d52]/55 to-[#1a5f7a]/15"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_110%,rgba(8,40,55,0.85),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[inherit] flex-col justify-end p-8 md:p-11 lg:p-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="lm-ui flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[10px] tracking-[0.2em] text-white backdrop-blur-sm">
            {step.num}
          </span>
          <span className="lm-ui text-[9px] uppercase tracking-[0.3em] text-[var(--lm-sky-soft)]">
            {step.accent}
          </span>
        </div>
        <h3 className="lm-serif text-[clamp(1.75rem,4.2vw,2.5rem)] font-normal italic leading-[1.05] text-white">
          {step.title}
        </h3>
        <p className="lm-ui mt-5 max-w-[34ch] text-sm font-light leading-[1.9] text-white/92 md:text-[15px]">
          {step.description}
        </p>
      </div>
    </article>
  );
}

interface ProcessJourneyCardsProps {
  steps: ProcessStepData[];
}

export function ProcessJourneyCards({ steps }: ProcessJourneyCardsProps) {
  return (
    <div className="relative mx-auto max-w-5xl py-4 md:py-8">
      <div className="flex flex-col gap-[30px] md:gap-[70px] lg:gap-[100px]">
        {steps.map((step, i) => {
          const layout = stepLayout[i] ?? stepLayout[0];

          return (
            <GsapScrollReveal
              key={step.num}
              delay={i * 0.07}
              className={cn(
                "relative w-full max-w-[min(100%,600px)] md:max-w-[min(88%,620px)]",
                layout.side === "left" ? "mr-auto" : "ml-auto",
                layout.offset
              )}
            >
              <ProcessStepCard step={step} />
            </GsapScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
