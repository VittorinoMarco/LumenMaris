"use client";

import Link from "next/link";
import { getMainPerfumes } from "@/lib/products";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { LumenProductEditorial } from "./LumenProductEditorial";

export function LumenPerfumiSection() {
  const perfumes = getMainPerfumes();

  return (
    <section
      id="profumi"
      data-nav-surface="light"
      className="lm-section bg-[var(--lm-sand)]"
    >
      <div className="mx-auto max-w-6xl">
        <GsapScrollReveal className="mb-16 text-center md:mb-24">
          <p className="lm-eyebrow mb-4">Collezione</p>
          <LumenDisplayTitle
            lines={[
              { serif: "Due", script: "profumi" },
              { serif: "Un", script: "mare" },
            ]}
          />
          <p className="lm-body mx-auto mt-8 max-w-lg">
            Saracenum e Thalasi, affinati a 35 metri. Nessuna griglia: solo narrazione
            olfattiva e pre-order.
          </p>
        </GsapScrollReveal>

        <div className="space-y-24 md:space-y-32">
          {perfumes.map((product, i) => (
            <LumenProductEditorial
              key={product.id}
              product={product}
              reversed={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-16 text-center md:mt-20">
          <Link href="/profumi" className="lm-btn lm-btn-outline">
            Pagina profumi
          </Link>
        </div>
      </div>
    </section>
  );
}
