"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useMotion } from "@/lib/gsap";
import { useCartStore } from "@/store/cart-store";
import { ParallaxImage } from "@/components/motion/Parallax";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductSceneProps {
  product: Product;
  index: number;
  theme: "sand" | "blush";
}

/**
 * Una "scena" per profumo: nome gigante che scorre dietro, flacone in cornice
 * ad arco con parallasse, testo ai lati. Ogni scena ha un suo colore di sfondo.
 */
export function ProductScene({ product, index, theme }: ProductSceneProps) {
  const root = useRef<HTMLElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const first = product.name.split(" ")[0];
  const kind = product.gender === "uomo" ? "Uomo" : "Donna";

  useMotion(root, ({ desktop }) => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    gsap.fromTo(
      q("[data-name]"),
      { xPercent: index % 2 ? 8 : -8 },
      {
        xPercent: index % 2 ? -8 : 8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 },
      }
    );
    gsap.fromTo(
      q("[data-outline]"),
      { yPercent: 8, scale: 0.96 },
      {
        yPercent: -8,
        scale: 1.04,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      }
    );
    if (desktop) {
      gsap.fromTo(
        q("[data-col]"),
        { y: 60 },
        {
          y: -40,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.2 },
        }
      );
    }
  });

  const notes = [
    { label: "Testa", items: product.topNotes },
    { label: "Cuore", items: product.heartNotes },
    { label: "Fondo", items: product.baseNotes },
  ];

  return (
    <section
      ref={root}
      data-theme={theme}
      id={index === 0 ? "profumi" : undefined}
      className="relative overflow-hidden px-[var(--lm-section-px)] py-[clamp(5rem,11vw,9rem)]"
    >
      {/* nome gigante sullo sfondo */}
      <div className="pointer-events-none absolute inset-x-0 top-[7%] select-none" aria-hidden>
        <p
          data-name
          className="lm-italic whitespace-nowrap text-center text-[clamp(6rem,24vw,23rem)] leading-[0.85] tracking-[-0.045em] text-[color-mix(in_srgb,var(--t-accent)_17%,transparent)]"
        >
          {first}
        </p>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-[1fr_minmax(260px,24rem)_1fr] lg:gap-12 xl:grid-cols-[1fr_32rem_1fr] xl:gap-20">
        {/* sinistra: racconto */}
        <div data-col className={cn("order-2 lg:order-none", index % 2 && "lg:order-3")}>
          <Reveal>
            <p className="lm-eyebrow mb-5 flex items-center gap-3">
              <span className="t-accent lm-italic text-[1.5rem] tracking-normal normal-case">0{index + 1}</span>
              <span className="h-px w-10 bg-[var(--t-line)]" />
              {product.badge}
            </p>
            <p className="lm-script t-accent text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[1.05]">{product.tagline}</p>
            <p className="lm-body mt-7 max-w-md">{product.description}</p>
          </Reveal>
        </div>

        {/* centro: flacone */}
        <div className="order-1 mx-auto w-full max-w-[28rem] lg:order-none lg:max-w-none">
          <div className="relative">
            <div
              data-outline
              className="pointer-events-none absolute -inset-x-5 -inset-y-6 hidden rounded-t-full border border-[var(--t-line)] md:block"
              aria-hidden
            />
            <ClipReveal>
              <Link href={`/profumi/${product.slug}`} className="group block" aria-label={`Scopri ${product.name}`}>
                <ParallaxImage
                  src={product.image}
                  alt={product.name}
                  sizes="(max-width: 1024px) 90vw, 520px"
                  speed={7}
                  frameClassName="lm-arch aspect-[3/4.35] shadow-[0_40px_80px_-38px_rgba(30,40,45,0.55)]"
                  className="transition-transform [transition-duration:1400ms] ease-editorial group-hover:scale-[1.04]"
                />
              </Link>
            </ClipReveal>
          </div>
        </div>

        {/* destra: note e acquisto */}
        <div data-col className={cn("order-3 lg:order-none", index % 2 && "lg:order-1")}>
          <Reveal delay={0.1}>
            <p className="lm-eyebrow mb-4">
              {product.family} · {kind}
            </p>
            <dl className="border-y border-[var(--t-line)]">
              {notes.map((n) => (
                <div key={n.label} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-[var(--t-line)] py-4 last:border-b-0">
                  <dt className="lm-eyebrow pt-[3px]">{n.label}</dt>
                  <dd className="lm-italic text-[1.05rem] leading-snug">{n.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
            <p className="lm-italic mt-7 text-[1.8rem] leading-none">
              €{product.price} <span className="lm-ui ml-1 text-[11px] uppercase tracking-[0.22em] text-[var(--t-muted)]">{product.size}</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="lm-btn lm-btn-solid"
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: product.size,
                  });
                  openCart();
                }}
              >
                Pre-order
              </button>
              <Link href={`/profumi/${product.slug}`} className="lm-btn lm-btn-outline">
                Scheda <ArrowUpRight className="lm-btn-arrow h-3.5 w-3.5" strokeWidth={1.4} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
