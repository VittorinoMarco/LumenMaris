"use client";

import Link from "next/link";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { ProductScene } from "./ProductScene";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { getMainPerfumes } from "@/lib/products";

const highlights = [
  { label: "Profondità", value: "35 m", detail: "Affinamento sott'acqua nel Tirreno calabrese" },
  { label: "Collezione", value: "02", detail: "Saracenum e Thalasi: maschile e femminile" },
  { label: "Disponibilità", value: "Pre-order", detail: "Spedizione alla messa in commercio" },
];

export function ProfumiPageContent() {
  const perfumes = getMainPerfumes();

  return (
    <div>
      <section data-theme="mist" className="lm-section text-center !pb-[clamp(3rem,7vw,5rem)] !pt-[clamp(8rem,16vw,12rem)]">
        <Reveal as="p" className="lm-eyebrow mb-6">
          La collezione
        </Reveal>
        <LumenDisplayTitle as="h1" size="lg" lines={[{ serif: "Due profumi", script: "un mare" }]} />
        <SplitLines className="lm-body mx-auto mt-10 max-w-2xl md:text-[17px]">
          Lumen Maris imbottiglia ogni profumo, poi immerge il flacone intero a 35 metri: sale, pressione e buio del Tirreno
          calabrese affinano Saracenum e Thalasi. Ogni bottiglia è unica.
        </SplitLines>
        <Reveal className="mt-8" delay={0.1}>
          <Link href="/" className="lm-link lm-ui text-[11px] uppercase tracking-[0.24em]">
            ← Torna alla home
          </Link>
        </Reveal>
      </section>

      <section data-theme="mist" className="px-[var(--lm-section-px)] pb-[clamp(3rem,8vw,6rem)]">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-[var(--t-line)] pt-12 md:grid-cols-3 md:gap-8">
          {highlights.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="text-center md:text-left">
              <p className="lm-eyebrow mb-3">{item.label}</p>
              <p className="lm-italic text-[clamp(2.2rem,4.4vw,3.2rem)] leading-none">{item.value}</p>
              <p className="lm-body mt-4 max-w-xs md:max-w-none">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {perfumes.map((product, i) => (
        <ProductScene key={product.id} product={product} index={i} theme={i === 0 ? "sand" : "blush"} />
      ))}

      <section data-theme="deep" className="lm-section text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="lm-eyebrow mb-4">Pre-order</p>
          <p className="lm-script t-accent text-[clamp(2.2rem,5vw,3.6rem)] leading-tight">Nel buio, il mare completa l&apos;opera</p>
          <p className="lm-body mx-auto mt-8 max-w-lg">
            Ordina Saracenum o Thalasi in pre-order: riceverai il profumo alla messa in commercio ufficiale. Spedizione in
            tutta Italia.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/cart" className="lm-btn lm-btn-solid">
              Vai al carrello
            </Link>
            <Link href="/#progetto" className="lm-btn lm-btn-outline">
              Il processo
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
