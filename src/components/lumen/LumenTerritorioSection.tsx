"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/gsap";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { lumenImages } from "@/lib/lumen-images";
import { cn } from "@/lib/utils";

const shots = [
  { src: lumenImages.saracenumScoglio, label: "Costa calabrese", shape: "lm-arch", offset: "md:mt-0" },
  { src: lumenImages.saracenumAcquaRiflesso, label: "Riflessi sul Tirreno", shape: "rounded-[2.2rem]", offset: "md:mt-24" },
  { src: lumenImages.saracenumScoglioVerticale, label: "Scogliera", shape: "lm-arch", offset: "md:mt-6" },
  { src: lumenImages.saracenumScoglioAcqua, label: "Mare e roccia", shape: "rounded-[999px]", offset: "md:mt-28" },
];

/**
 * Su desktop la sezione si "aggancia" e le foto scorrono in orizzontale con lo scroll;
 * su mobile resta una galleria a scorrimento nativo con snap.
 */
export function LumenTerritorioSection() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useMotion(root, ({ desktop }) => {
    const tr = track.current;
    if (!desktop || !tr) return;

    const dist = () => Math.max(0, tr.scrollWidth - window.innerWidth + 120);
    const move = gsap.to(tr, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: () => `+=${dist() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    gsap.utils.toArray<HTMLElement>("[data-shot]").forEach((card) => {
      const img = card.querySelector("[data-shot-img]");
      if (!img) return;
      gsap.fromTo(
        img,
        { xPercent: -9 },
        {
          xPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: move,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <section
      id="territorio"
      ref={root}
      data-theme="blush"
      className="relative overflow-hidden md:flex md:h-svh md:items-center"
    >
      <div
        ref={track}
        className="no-scrollbar flex snap-x snap-mandatory items-center gap-6 overflow-x-auto px-[var(--lm-section-px)] py-[var(--lm-section-py)] md:w-max md:snap-none md:gap-[4vw] md:overflow-visible md:py-0 md:pr-[10vw] will-change-transform"
      >
        {/* pannello iniziale */}
        <div className="w-[82vw] shrink-0 snap-start md:w-[34vw] md:max-w-[36rem]">
          <Reveal as="p" className="lm-eyebrow mb-6">
            Origini
          </Reveal>
          <LumenDisplayTitle align="left" size="lg" lines={[{ serif: "Il", script: "territorio" }]} />
          <SplitLines className="lm-body mt-8 max-w-sm">
            Dalle coltivazioni di bergamotto alla costa di San Nicola Arcella: la Calabria è l&apos;anima di ogni
            fragranza Lumen Maris.
          </SplitLines>
          <p className="lm-script t-accent mt-8 hidden text-[2rem] md:block">scorri →</p>
        </div>

        {shots.map((shot, i) => (
          <figure
            key={shot.label}
            data-shot
            className={cn("w-[74vw] shrink-0 snap-center sm:w-[52vw] md:w-[24vw] md:max-w-[26rem]", shot.offset)}
          >
            <div
              className={cn(
                "relative aspect-[3/4.2] overflow-hidden shadow-[0_34px_70px_-34px_rgba(59,47,44,0.55)]",
                shot.shape
              )}
            >
              <div data-shot-img className="absolute inset-y-0 -inset-x-[12%]">
                <Image
                  src={shot.src}
                  alt={shot.label}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-5 flex items-baseline gap-3">
              <span className="t-accent lm-italic text-[1.3rem]">0{i + 1}</span>
              <span className="lm-eyebrow">{shot.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
