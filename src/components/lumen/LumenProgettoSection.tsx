"use client";

import type { ReactNode } from "react";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { ParallaxFrame } from "@/components/motion/Parallax";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { DepthJourney, type JourneyStep } from "./DepthJourney";
import { lumenImages } from "@/lib/lumen-images";

const steps: JourneyStep[] = [
  {
    num: "01",
    title: "Raccolta",
    accent: "Botaniche calabresi",
    description:
      "Bergamotto e agrumi da Reggio Calabria, erbe aromatiche e legni arabi: materie prime scelte a mano sulla costa.",
    image: lumenImages.profumiMurettoPalazzo,
    alt: "Territorio calabrese",
  },
  {
    num: "02",
    title: "Miscelazione",
    accent: "Formula segreta",
    description:
      "Le essenze vengono fuse in laboratorio secondo la nostra ricetta: la composizione olfattiva nasce prima del flacone.",
    image: lumenImages.saracenumAcquaRiflesso,
    alt: "Essenza e mare",
  },
  {
    num: "03",
    title: "Imbottigliamento",
    accent: "Ogni flacone unico",
    description:
      "Il profumo viene sigillato nel vetro artigianalmente. Solo così ogni bottiglia può vivere il suo affinamento sottomarino.",
    image: lumenImages.saracenumMuretto,
    alt: "Flacone Saracenum sul muretto",
  },
  {
    num: "04",
    title: "Immersione",
    accent: "35 metri · 6 mesi",
    description:
      "Il flacone intero scende nel Tirreno: pressione, sale, minerali e buio affinano la fragranza già imbottigliata.",
    image: lumenImages.thalasiImmersa,
    alt: "Thalasi sott'acqua",
  },
  {
    num: "05",
    title: "Emersione",
    accent: "Pezzo unico",
    description:
      "Recupero in superficie e stabilizzazione: ogni bottiglia esce dal mare con una storia olfattiva irripetibile.",
    image: lumenImages.thalasiMuretto,
    alt: "Flacone Thalasi Lumen Maris",
  },
];

function Seal({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full border border-[var(--t-line)] bg-[var(--lm-cream)] text-center text-[var(--lm-ocean-deep)] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5)] md:h-24 md:w-24"
      aria-hidden
    >
      <span className="lm-ui text-[8px] uppercase leading-tight tracking-[0.2em]">{children}</span>
    </div>
  );
}

export function LumenProgettoSection() {
  return (
    <section id="progetto" data-theme="deep" className="relative">
      {/* Apertura */}
      <div className="lm-section mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal as="p" className="lm-eyebrow mb-8">
            Il processo
          </Reveal>
          <LumenDisplayTitle
            align="left"
            size="lg"
            lines={[{ serif: "Affinamento" }, { serif: "sotto", script: "il mare" }]}
          />
          <SplitLines className="lm-body mt-10 max-w-md" by="lines">
            Prima imbottigliamo, poi immergiamo l&apos;intero flacone. Per la prima volta al mondo ogni bottiglia affina sotto
            pressione marina: sale, minerali e temperatura costante, senza alterare l&apos;anima botanica.
          </SplitLines>
          <Reveal as="p" className="lm-body mt-6 max-w-md" delay={0.1}>
            A 35 metri, circa 4,5 bar, per sei mesi: così ogni profumo Lumen Maris resta irripetibile.
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0">
          <div className="absolute -right-3 top-10 z-10 md:-right-10 md:top-16">
            <Reveal>
              <Seal>
                Primo
                <br />
                al mondo
              </Seal>
            </Reveal>
          </div>
          <ClipReveal>
            <ParallaxFrame speed={6} className="lm-arch aspect-[3/4.5] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/hero-poster.jpg"
                className="h-full w-full object-cover"
              >
                <source src="/hero-video-1080.mp4" type="video/mp4" />
              </video>
            </ParallaxFrame>
          </ClipReveal>
          <p className="lm-script t-accent mt-8 text-center text-[clamp(1.8rem,3vw,2.4rem)]">35 metri · 6 mesi</p>
        </div>
      </div>

      {/* Il viaggio, guidato dallo scroll */}
      <DepthJourney steps={steps} />

      {/* Citazione */}
      <div className="lm-section">
        <div className="mx-auto max-w-[62rem] text-center">
          <Reveal as="p" className="lm-script t-accent mb-8 text-[3rem] leading-none">
            &ldquo;
          </Reveal>
          <ScrubText
            text="Il mare non separa, unisce. Nelle profondità abbiamo trovato il segreto per portare la *Calabria* nel mondo."
            className="lm-serif text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.22] tracking-[-0.02em]"
          />
          <Reveal as="p" className="lm-script t-accent mt-10 text-[2rem]">
            lumen maris
          </Reveal>
        </div>
      </div>
    </section>
  );
}
