"use client";

import Link from "next/link";
import { getMainPerfumes } from "@/lib/products";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { LumenDisplayTitle } from "./LumenDisplayTitle";
import { ProductScene } from "./ProductScene";

export function LumenPerfumiSection() {
  const perfumes = getMainPerfumes();

  return (
    <>
      <div data-theme="mist" className="pb-6 pt-4 md:pb-10">
        <Marquee
          items={["underwater parfume", "35 metri", "sei mesi", "Calabria", "Tirreno", "sale e sole"]}
        />
      </div>

      <section data-theme="sand" className="lm-section !pb-0 text-center">
        <Reveal as="p" className="lm-eyebrow mb-6">
          La collezione
        </Reveal>
        <LumenDisplayTitle size="lg" lines={[{ serif: "Due profumi", script: "un mare" }]} />
        <SplitLines className="lm-body mx-auto mt-8 max-w-lg">
          Saracenum e Thalasi, affinati a 35 metri nel Tirreno. Nessuna griglia, nessuna fretta: solo racconto olfattivo e
          pre-order.
        </SplitLines>
      </section>

      {perfumes.map((product, i) => (
        <ProductScene key={product.id} product={product} index={i} theme={i === 0 ? "sand" : "blush"} />
      ))}

      <section data-theme="blush" className="pb-[clamp(4rem,9vw,7rem)] text-center">
        <Reveal>
          <Link href="/profumi" className="lm-btn lm-btn-outline">
            Tutti i dettagli <span className="lm-btn-arrow">→</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}
