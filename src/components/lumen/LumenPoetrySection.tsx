"use client";

import Image from "next/image";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";

import { lumenImages } from "@/lib/lumen-images";

const collage = [
  {
    src: lumenImages.saracenumScoglioAcqua,
    alt: "Scogliera e mare",
    className: "left-[4%] top-[8%] w-[38%] md:left-[6%] md:w-[28%]",
  },
  {
    src: lumenImages.thalasiImmersa,
    alt: "Thalasi immersa",
    className: "right-[5%] top-[18%] w-[34%] md:right-[12%] md:w-[24%]",
  },
  {
    src: lumenImages.profumiMurettoPalazzo,
    alt: "Profumi sul muretto",
    className: "bottom-[12%] left-[18%] w-[42%] md:left-[22%] md:w-[30%]",
  },
];

export function LumenPoetrySection() {
  return (
    <section
      id="poetry"
      data-nav-surface="light"
      className="lm-section relative overflow-hidden bg-[var(--lm-cream)]"
    >
      <div className="relative mx-auto min-h-[min(90vh,820px)] max-w-5xl py-8 md:min-h-[720px]">
        {collage.map((img) => (
          <div
            key={img.src}
            className={`lm-photo absolute shadow-[0_20px_50px_-20px_rgba(15,61,82,0.35)] ${img.className}`}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="30vw"
              />
            </div>
          </div>
        ))}

        <GsapScrollReveal className="relative z-[1] flex min-h-[min(85vh,760px)] flex-col items-center justify-center px-4 py-24">
          <LumenDisplayTitle
            lines={[
              { serif: "Mare", script: "profondo" },
              { serif: "Sale", script: "marino" },
              { serif: "Botaniche", script: "calabresi" },
              { serif: "Sole", script: "mediterraneo" },
            ]}
          />
          <p className="lm-script mt-14 text-center text-[clamp(1.75rem,4vw,2.75rem)] text-[var(--lm-ocean-mid)]">
            lumen maris
          </p>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
