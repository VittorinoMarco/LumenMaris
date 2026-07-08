"use client";

import Image from "next/image";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { lumenImages } from "@/lib/lumen-images";

const shots = [
  {
    src: lumenImages.saracenumScoglio,
    label: "Costa calabrese",
  },
  {
    src: lumenImages.saracenumAcquaRiflesso,
    label: "Riflessi sul Tirreno",
  },
  {
    src: lumenImages.saracenumScoglioVerticale,
    label: "Scogliera",
  },
  {
    src: lumenImages.saracenumScoglioAcqua,
    label: "Mare e roccia",
  },
];

export function LumenTerritorioSection() {
  return (
    <section
      id="territorio"
      data-nav-surface="light"
      className="lm-section overflow-hidden bg-[var(--lm-cream)]"
    >
      <div className="mx-auto max-w-6xl">
        <GsapScrollReveal className="mb-14 text-center md:mb-20">
          <p className="lm-eyebrow mb-4">Origini</p>
          <LumenDisplayTitle
            lines={[{ serif: "Il", script: "territorio" }]}
          />
          <p className="lm-body mx-auto mt-8 max-w-xl">
            Dalle coltivazioni di bergamotto alla costa di San Nicola Arcella:
            la Calabria è l&apos;anima di ogni fragranza Lumen Maris.
          </p>
        </GsapScrollReveal>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {shots.map((shot) => (
            <div
              key={shot.label}
              className="lm-photo w-[min(78vw,320px)] shrink-0 snap-center shadow-[0_20px_48px_-20px_rgba(15,61,82,0.28)]"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--lm-ocean-deep)]/70 to-transparent px-4 py-6">
                  <p className="lm-ui text-[10px] uppercase tracking-[0.22em] text-white">
                    {shot.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
