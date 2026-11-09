"use client";

import Image from "next/image";
import { ScrubText } from "@/components/motion/ScrubText";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Float, ParallaxFrame } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { lumenImages } from "@/lib/lumen-images";

/** Manifesto: il testo si accende parola per parola, le foto fluttuano a velocità diverse. */
export function LumenPoetrySection() {
  return (
    <section
      id="manifesto"
      data-theme="mist"
      className="lm-section relative overflow-hidden !pb-[clamp(4rem,9vw,7rem)] !pt-[clamp(3rem,6vw,5rem)]"
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* foto fluttuanti (solo schermi larghi) */}
        <Float distance={70} className="absolute left-0 top-[2%] hidden w-[21%] lg:block">
          <ClipReveal>
            <ParallaxFrame speed={7} className="lm-arch aspect-[3/4.2] shadow-[0_30px_60px_-30px_rgba(14,54,71,0.45)]">
              <Image src={lumenImages.saracenumScoglioAcqua} alt="Scogliera e mare" fill sizes="22vw" className="object-cover" />
            </ParallaxFrame>
          </ClipReveal>
        </Float>
        <Float distance={110} className="absolute right-[1%] top-[26%] hidden w-[19%] lg:block">
          <ClipReveal from="left" delay={0.1}>
            <ParallaxFrame speed={7} className="aspect-[4/5] rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(14,54,71,0.45)]">
              <Image src={lumenImages.thalasiImmersa} alt="Thalasi immersa" fill sizes="20vw" className="object-cover" />
            </ParallaxFrame>
          </ClipReveal>
        </Float>
        <Float distance={50} className="absolute bottom-[0%] left-[13%] hidden w-[13%] lg:block">
          <ClipReveal from="top" delay={0.2}>
            <ParallaxFrame speed={6} className="aspect-square rounded-full shadow-[0_24px_50px_-26px_rgba(14,54,71,0.5)]">
              <Image src={lumenImages.profumiMurettoPalazzo} alt="Profumi sul muretto" fill sizes="14vw" className="object-cover" />
            </ParallaxFrame>
          </ClipReveal>
        </Float>

        <div className="relative z-[1] mx-auto flex min-h-[min(72svh,680px)] max-w-[56rem] flex-col items-center justify-center text-center">
          <Reveal as="p" className="lm-eyebrow mb-10">
            Il manifesto
          </Reveal>
          <ScrubText
            text="Un profumo affinato dove la luce non arriva. *Mare* profondo, sale marino, botaniche calabresi e *sole* mediterraneo, sigillati in un solo flacone."
            className="lm-serif text-[clamp(1.9rem,4.3vw,3.9rem)] font-normal leading-[1.18] tracking-[-0.025em]"
          />
        </div>

        {/* mobile: foto in riga */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:hidden">
          <ClipReveal>
            <div className="lm-arch relative aspect-[3/4.2]">
              <Image src={lumenImages.saracenumScoglioAcqua} alt="Scogliera e mare" fill sizes="45vw" className="object-cover" />
            </div>
          </ClipReveal>
          <ClipReveal from="top" delay={0.12}>
            <div className="relative mt-10 aspect-[3/4.2] rounded-[1.6rem] overflow-hidden">
              <Image src={lumenImages.thalasiImmersa} alt="Thalasi immersa" fill sizes="45vw" className="object-cover" />
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
