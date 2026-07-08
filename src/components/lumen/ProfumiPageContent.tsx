"use client";

import Link from "next/link";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { LumenProductEditorial } from "./LumenProductEditorial";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { getMainPerfumes } from "@/lib/products";

const highlights = [
  {
    label: "Profondità",
    value: "35 m",
    detail: "Affinamento sott'acqua nel Tirreno calabrese",
  },
  {
    label: "Collezione",
    value: "02",
    detail: "Saracenum e Thalasi — maschile e femminile",
  },
  {
    label: "Disponibilità",
    value: "Pre-order",
    detail: "Spedizione alla messa in commercio",
  },
];

export function ProfumiPageContent() {
  const perfumes = getMainPerfumes();

  return (
    <div data-nav-surface="light" className="bg-[var(--lm-cream)]">
      {/* Intro */}
      <section className="lm-section border-b border-[var(--border)] bg-[var(--lm-cream)] pb-[clamp(4rem,10vw,7rem)] pt-[clamp(6rem,14vw,9rem)]">
        <div className="mx-auto max-w-6xl">
          <GsapScrollReveal className="text-center">
            <p className="lm-eyebrow mb-4">Collezione</p>
            <LumenDisplayTitle
              lines={[
                { serif: "Due", script: "profumi" },
                { serif: "Un", script: "mare" },
              ]}
            />
            <p className="lm-body mx-auto mt-10 max-w-2xl text-base md:text-[17px]">
              Lumen Maris imbottiglia ogni profumo, poi immerge il flacone intero a
              35 metri: sale, pressione e buio del Tirreno calabrese affinano
              Saracenum e Thalasi — ogni bottiglia è unica.
            </p>
            <Link href="/" className="lm-ui mt-8 inline-block text-[11px] uppercase tracking-[0.22em] text-[var(--lm-ocean)] hover:underline">
              Torna alla home
            </Link>
          </GsapScrollReveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-[var(--border)] bg-[var(--lm-sand)] py-[clamp(3rem,8vw,5rem)] px-[var(--lm-section-px)]">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
          {highlights.map((item, i) => (
            <GsapScrollReveal key={item.label} delay={i * 0.05} className="text-center md:text-left">
              <p className="lm-eyebrow mb-3">{item.label}</p>
              <p className="lm-serif text-[clamp(2rem,4vw,2.75rem)] font-normal text-[var(--lm-text)]">
                {item.value}
              </p>
              <p className="lm-body mt-4 max-w-xs md:max-w-none">{item.detail}</p>
            </GsapScrollReveal>
          ))}
        </div>
      </section>

      {/* Saracenum */}
      {perfumes[0] && (
        <section className="lm-section bg-[var(--lm-cream)]">
          <div className="mx-auto max-w-7xl">
            <LumenProductEditorial product={perfumes[0]} variant="page" />
          </div>
        </section>
      )}

      {/* Interstitial */}
      <section className="relative overflow-hidden bg-[var(--lm-sand)] py-[clamp(4rem,12vw,8rem)] px-[var(--lm-section-px)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, var(--lm-ocean) 0%, transparent 50%), radial-gradient(circle at 80% 30%, var(--lm-ocean-mid) 0%, transparent 45%)",
          }}
        />
        <GsapScrollReveal className="relative mx-auto max-w-3xl text-center">
          <p className="lm-eyebrow mb-6">Il metodo</p>
          <p className="lm-script text-[clamp(2rem,5vw,3.25rem)] leading-snug text-[var(--lm-ocean-mid)]">
            Nel buio, il mare completa l&apos;opera
          </p>
          <p className="lm-body mx-auto mt-8 max-w-xl text-base leading-[1.9]">
            Ogni flacone sigillato scende già imbottigliato: pressione, temperatura e
            salinità modellano la piramide olfattiva nel vetro. Non è una
            maturazione in tanica — è il Mediterraneo che affina ogni bottiglia.
          </p>
        </GsapScrollReveal>
      </section>

      {/* Thalasi */}
      {perfumes[1] && (
        <section className="lm-section bg-[var(--lm-cream)]">
          <div className="mx-auto max-w-7xl">
            <LumenProductEditorial
              product={perfumes[1]}
              reversed
              variant="page"
            />
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section
        data-nav-surface="dark"
        className="lm-section bg-[var(--lm-ocean-deep)] text-center"
      >
        <GsapScrollReveal className="mx-auto max-w-2xl">
          <p className="lm-eyebrow mb-4 text-[var(--lm-text-on-dark-muted)]">
            Pre-order
          </p>
          <h2 className="lm-serif text-[clamp(2rem,5vw,3rem)] font-normal text-[var(--lm-text-on-dark)]">
            Porta il mare a casa
          </h2>
          <p className="lm-body mx-auto mt-8 max-w-lg text-[var(--lm-text-on-dark-muted)]">
            Ordina Saracenum o Thalasi in pre-order: riceverai il profumo alla
            messa in commercio ufficiale. Spedizione in tutta Italia.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/cart" className="lm-btn lm-btn-ghost-light">
              Vai al carrello
            </Link>
            <Link href="/#progetto" className="lm-btn lm-btn-ghost-light">
              Il progetto
            </Link>
          </div>
        </GsapScrollReveal>
      </section>
    </div>
  );
}
