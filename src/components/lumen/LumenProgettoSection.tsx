"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { ProcessJourneyCards, type ProcessStepData } from "./ProcessJourneyCards";
import { lumenImages } from "@/lib/lumen-images";

const processSteps: ProcessStepData[] = [
  {
    num: "01",
    title: "Raccolta",
    accent: "Botaniche calabresi",
    description:
      "Bergamotto e agrumi da Reggio Calabria, erbe aromatiche e legni arabi — materie prime scelte a mano sulla costa.",
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
      "Il flacone intero scende nel Tirreno: pressione, sale, minerali e buio affinano la fragranza già imbottigliata — non il liquido a parte.",
    image: lumenImages.thalasiImmersa,
    alt: "Thalasi sott'acqua",
  },
];

const finaleStep = {
  num: "05",
  title: "Emersione",
  description:
    "Recupero in superficie e stabilizzazione: ogni bottiglia esce dal mare con una storia olfattiva irripetibile.",
};

function EditorialSeal({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--lm-ocean)_35%,transparent)] bg-[var(--lm-cream)]/90 text-center shadow-[0_8px_28px_-8px_rgba(15,61,82,0.2)] backdrop-blur-sm md:h-20 md:w-20"
      aria-hidden
    >
      {children}
    </div>
  );
}

export function LumenProgettoSection() {
  return (
    <section id="progetto" data-nav-surface="light" className="overflow-hidden">
      {/* Hero */}
      <div className="grid lg:grid-cols-2">
        <div className="lm-section flex flex-col justify-center bg-[var(--lm-ocean)] text-[var(--lm-text-on-dark)] lg:min-h-[min(85vh,720px)]">
          <GsapScrollReveal>
            <p className="lm-ui mb-6 text-[10px] uppercase tracking-[0.28em] text-white/70">
              Il processo
            </p>
            <div className="lm-on-dark mb-8">
              <LumenDisplayTitle
                onDark
                lines={[{ serif: "Affinamento", script: "sottomarino" }]}
              />
            </div>
            <p className="lm-body max-w-md text-white/85">
              Prima imbottigliamo, poi immergiamo l&apos;intero flacone. Per la prima
              volta al mondo ogni bottiglia affina sotto pressione marina — sale,
              minerali e temperatura costante senza alterare l&apos;anima botanica.
            </p>
            <p className="lm-body mt-6 max-w-md text-white/75">
              A 35 metri, circa 4,5 bar, per sei mesi: così ogni profumo Lumen Maris
              resta irripetibile.
            </p>
          </GsapScrollReveal>
        </div>

        <div className="relative lm-section flex items-center justify-center bg-[var(--lm-cream)]">
          <p
            className="lm-ui pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 text-[10px] uppercase tracking-[0.35em] text-[var(--lm-ocean)]/50 [writing-mode:vertical-rl] lg:block"
            aria-hidden
          >
            Tirreno · Calabria
          </p>
          <GsapScrollReveal className="relative w-full max-w-md">
            <div className="absolute -right-2 top-8 z-10 md:-right-6 md:top-12">
              <EditorialSeal>
                <span className="lm-ui text-[8px] uppercase leading-tight tracking-[0.2em] text-[var(--lm-ocean)]">
                  Primo
                  <br />
                  al mondo
                </span>
              </EditorialSeal>
            </div>
            <div className="lm-photo relative mx-auto aspect-[3/4] w-full max-w-sm bg-[var(--lm-sand)] shadow-[0_28px_64px_-28px_rgba(15,61,82,0.25)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
            </div>
            <p className="lm-script mt-8 text-center text-[clamp(1.5rem,3vw,2rem)] text-[var(--lm-ocean-mid)]">
              35 metri · 6 mesi
            </p>
          </GsapScrollReveal>
        </div>
      </div>

      {/* Il metodo — card fotografiche collegate */}
      <div className="bg-[var(--lm-cream)] px-[var(--lm-section-px)] pb-[clamp(6rem,16vw,11rem)] pt-[clamp(4rem,10vw,7rem)]">
        <div className="mx-auto max-w-6xl">
          <GsapScrollReveal className="mb-16 text-center md:mb-24 lg:mb-28">
            <p className="lm-eyebrow mb-6">Il metodo</p>
            <h2 className="text-balance">
              <span className="lm-serif block text-[clamp(1.75rem,4.5vw,2.5rem)] font-normal uppercase tracking-[0.12em] text-[var(--lm-text)]">
                Dal
              </span>
              <span className="lm-serif mt-2 block text-[clamp(2rem,5.5vw,3.25rem)] font-normal italic text-[var(--lm-text)]">
                territorio
              </span>
              <span className="lm-script mt-3 block text-[clamp(2.25rem,6vw,3.5rem)] leading-none text-[var(--lm-ocean-mid)]">
                al mare
              </span>
            </h2>
            <p className="lm-body mx-auto mt-10 max-w-lg text-base leading-[1.9] md:mt-12 md:text-[17px]">
              Quattro gesti — raccolta, miscelazione, imbottigliamento, immersione
              del flacone intero — prima che la profondità completi
              l&apos;opera.
            </p>
          </GsapScrollReveal>

          <ProcessJourneyCards steps={processSteps} />
        </div>
      </div>

      {/* Emersione + flacone */}
      <div className="grid border-t border-[var(--border)] lg:grid-cols-2">
        <div className="lm-section flex flex-col justify-center bg-[var(--lm-ocean)] text-[var(--lm-text-on-dark)] lg:min-h-[min(65vh,520px)] lg:py-20">
          <GsapScrollReveal>
            <p className="lm-ui mb-10 text-[10px] uppercase tracking-[0.28em] text-white/65">
              Fase finale
            </p>
            <p className="lm-ui text-[10px] uppercase tracking-[0.3em] text-[var(--lm-sky-soft)]">
              {finaleStep.num}
            </p>
            <h3 className="lm-serif mt-4 text-[clamp(1.75rem,3.5vw,2.25rem)] font-normal uppercase tracking-[0.06em]">
              {finaleStep.title}
            </h3>
            <p className="lm-body mt-6 max-w-md text-base leading-[1.85] text-white/85">
              {finaleStep.description}
            </p>
            <p className="lm-body mt-10 max-w-sm text-sm text-white/70">
              Ogni bottiglia che ricevi è stata immersa e recuperata come un pezzo
              unico — non un lotto anonimo in tanica.
            </p>
          </GsapScrollReveal>
        </div>

        <div className="relative flex min-h-[420px] items-stretch bg-[var(--lm-sand)] lg:min-h-[min(65vh,520px)]">
          <p
            className="lm-ui pointer-events-none absolute left-6 top-1/2 z-10 -translate-y-1/2 text-[10px] uppercase tracking-[0.32em] text-[var(--lm-ocean)]/40 [writing-mode:vertical-rl] lg:left-10"
            aria-hidden
          >
            Underwater parfume
          </p>
          <GsapScrollReveal className="relative flex w-full items-center justify-center p-10 md:p-16 lg:p-20">
            <div className="lm-photo relative aspect-[3/5] w-full max-w-[320px] bg-[var(--lm-cream)] shadow-[0_32px_72px_-28px_rgba(15,61,82,0.35)] lg:max-w-[360px]">
              <Image
                src={lumenImages.thalasiMuretto}
                alt="Flacone Thalasi Lumen Maris"
                fill
                className="object-cover object-center"
                sizes="360px"
              />
            </div>
            <div className="absolute bottom-12 right-10 md:bottom-16 md:right-16">
              <EditorialSeal>
                <span className="lm-ui text-[8px] uppercase leading-tight tracking-[0.18em] text-[var(--lm-ocean)]">
                  Lumen
                  <br />
                  Maris
                </span>
              </EditorialSeal>
            </div>
          </GsapScrollReveal>
        </div>
      </div>

      {/* Citazione */}
      <div className="lm-section bg-[var(--lm-cream)]">
        <GsapScrollReveal className="mx-auto max-w-3xl">
          <blockquote className="border-l-2 border-[var(--lm-ocean)]/30 pl-8 md:pl-12">
            <p className="lm-serif text-xl font-normal italic leading-relaxed text-[var(--lm-text-muted)] md:text-[clamp(1.25rem,2.5vw,1.75rem)]">
              &ldquo;Il mare non separa, unisce. Nelle profondità abbiamo trovato
              il segreto per portare la Calabria nel mondo.&rdquo;
            </p>
            <footer className="lm-script mt-6 text-2xl text-[var(--lm-ocean-mid)]">
              lumen maris
            </footer>
          </blockquote>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
