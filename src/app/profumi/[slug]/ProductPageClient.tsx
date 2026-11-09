"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf, Minus, Package, Plus, Waves } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { LumenDisplayTitle } from "@/components/lumen/LumenDisplayTitle";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductPageClientProps {
  product: Product;
  relatedProduct?: Product;
}

const features = [
  { icon: Leaf, title: "Botanica locale", desc: "Bergamotto e agrumi calabresi" },
  { icon: Waves, title: "Affinamento sottomarino", desc: "6 mesi a 35 metri di profondità" },
  { icon: Package, title: "Imbottigliamento artigianale", desc: "Ogni flacone è unico" },
];

export function ProductPageClient({ product, relatedProduct }: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [active, setActive] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const [first, ...rest] = product.name.split(" ");

  const handlePreorder = () => {
    addItem(
      { id: product.id, name: product.name, price: product.price, image: product.image, size: product.size },
      quantity
    );
    openCart();
  };

  const notes = [
    { label: "Note di testa", items: product.topNotes },
    { label: "Note di cuore", items: product.heartNotes },
    { label: "Note di fondo", items: product.baseNotes },
  ];

  return (
    <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-24">
      {/* galleria */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="mx-auto max-w-[30rem]">
          <ClipReveal>
            <div className="relative aspect-[3/4.2] lm-arch bg-[var(--lm-sand)] shadow-[0_40px_80px_-38px_rgba(30,40,45,0.55)]">
              {gallery.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={product.name}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className={cn(
                    "object-cover transition-[opacity,transform] [transition-duration:900ms] ease-editorial",
                    i === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                  )}
                />
              ))}
            </div>
          </ClipReveal>

          {gallery.length > 1 && (
            <div className="mt-5 flex justify-center gap-3">
              {gallery.slice(0, 5).map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Foto ${i + 1}`}
                  aria-current={i === active}
                  className={cn(
                    "relative h-16 w-12 overflow-hidden rounded-t-full transition-all duration-500 ease-editorial",
                    i === active ? "opacity-100 ring-1 ring-[var(--t-fg)] ring-offset-4 ring-offset-transparent" : "opacity-50 hover:opacity-90"
                  )}
                >
                  <Image src={src} alt="" fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* dettagli */}
      <div className="lg:pt-6">
        <Reveal as="div">
          <Link href="/profumi" className="lm-link lm-ui mb-8 inline-block text-[11px] uppercase tracking-[0.24em]">
            ← Profumi
          </Link>
        </Reveal>
        {product.badge && (
          <Reveal as="p" className="lm-eyebrow mb-5">
            {product.badge}
          </Reveal>
        )}
        <LumenDisplayTitle
          as="h1"
          align="left"
          size="lg"
          lines={[{ serif: first, script: rest.join(" ").toLowerCase() }]}
        />
        <SplitLines className="lm-script t-accent mt-6 text-[clamp(1.7rem,3vw,2.4rem)] leading-[1.1]">
          {product.tagline}
        </SplitLines>
        <Reveal as="p" className="lm-italic mt-8 text-[1.9rem] leading-none" delay={0.1}>
          €{product.price}{" "}
          <span className="lm-ui ml-1 text-[11px] uppercase tracking-[0.22em] text-[var(--t-muted)]">{product.size}</span>
        </Reveal>
        <Reveal as="p" className="lm-body mt-8 max-w-xl md:text-[17px]" delay={0.12}>
          {product.description}
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          <p className="lm-eyebrow mb-4">Piramide olfattiva</p>
          <dl className="border-y border-[var(--t-line)]">
            {notes.map((n) => (
              <div key={n.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-[var(--t-line)] py-5 last:border-b-0">
                <dt className="lm-eyebrow pt-[4px]">{n.label}</dt>
                <dd className="lm-italic text-[1.2rem] leading-snug">{n.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-[var(--t-line)]">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-[var(--t-card)]"
              aria-label="Diminuisci quantità"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
            <span className="lm-italic min-w-8 text-center text-xl tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-[var(--t-card)]"
              aria-label="Aumenta quantità"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
            </button>
          </div>
          <button type="button" className="lm-btn lm-btn-solid !px-10 !py-4" onClick={handlePreorder}>
            Compra in pre-order
          </button>
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-1 gap-8 border-t border-[var(--t-line)] pt-12 sm:grid-cols-3" stagger={0.1}>
          {features.map((f) => (
            <div key={f.title}>
              <f.icon className="t-accent mb-4 h-6 w-6" strokeWidth={1.2} />
              <h4 className="lm-italic text-[1.15rem] leading-tight">{f.title}</h4>
              <p className="lm-body mt-2 text-sm">{f.desc}</p>
            </div>
          ))}
        </Reveal>

        {relatedProduct && (
          <Reveal className="mt-16 border-t border-[var(--t-line)] pt-12">
            <p className="lm-eyebrow mb-6">L&apos;altro profumo</p>
            <Link
              href={`/profumi/${relatedProduct.slug}`}
              className="group flex items-center gap-6 rounded-[var(--lm-radius-soft)] border border-[var(--t-line)] p-4 transition-all duration-500 ease-editorial hover:-translate-y-1 hover:border-[var(--t-fg)]"
            >
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-t-full">
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform [transition-duration:900ms] ease-editorial group-hover:scale-110"
                />
              </div>
              <div>
                <p className="lm-italic text-[1.6rem] leading-none">{relatedProduct.name}</p>
                <p className="lm-eyebrow mt-3">
                  €{relatedProduct.price} · {relatedProduct.size}
                </p>
              </div>
              <span className="lm-btn-arrow ml-auto pr-3 text-xl transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        )}
      </div>
    </div>
  );
}
