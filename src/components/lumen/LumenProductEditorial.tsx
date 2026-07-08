"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const noteGroups = [
  { key: "topNotes" as const, label: "Note di testa" },
  { key: "heartNotes" as const, label: "Note di cuore" },
  { key: "baseNotes" as const, label: "Note di fondo" },
];

interface LumenProductEditorialProps {
  product: Product;
  reversed?: boolean;
  /** Pagina dedicata: immagini e testi più grandi + piramide olfattiva */
  variant?: "section" | "page";
}

export function LumenProductEditorial({
  product,
  reversed = false,
  variant = "section",
}: LumenProductEditorialProps) {
  const isPage = variant === "page";
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  return (
    <GsapScrollReveal
      delay={reversed ? 0.06 : 0}
      className={cn(
        "grid items-center gap-12 lg:grid-cols-2",
        isPage ? "gap-14 lg:gap-20 xl:gap-24" : "lg:gap-16",
        reversed && "lg:[&>div:first-child]:order-2"
      )}
    >
      <Link
        href={`/profumi/${product.slug}`}
        className="lm-photo group block shadow-[0_24px_60px_-24px_rgba(15,61,82,0.3)]"
      >
        <div
          className={cn(
            "relative w-full bg-[var(--lm-cream)]",
            isPage
              ? "aspect-[3/4] max-h-[min(78vh,720px)]"
              : "aspect-[3/4] max-h-[520px]"
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={isPage && !reversed}
          />
        </div>
      </Link>

      <div className={cn(reversed ? "lg:pr-8 xl:pr-12" : "lg:pl-4 xl:pl-8")}>
        {product.badge && (
          <p className="lm-eyebrow mb-4 text-[var(--lm-ocean)]">{product.badge}</p>
        )}
        <h2
          className={cn(
            "lm-serif font-normal text-[var(--lm-text)]",
            isPage
              ? "text-[clamp(2.25rem,5vw,3.25rem)]"
              : "text-[clamp(2rem,4vw,2.75rem)]"
          )}
        >
          {product.name}
        </h2>
        <p
          className={cn(
            "lm-script mt-3 text-[var(--lm-ocean-mid)]",
            isPage ? "text-[clamp(1.75rem,3.5vw,2.5rem)]" : "text-2xl md:text-3xl"
          )}
        >
          {product.tagline}
        </p>
        <p
          className={cn(
            "lm-body mt-8 text-[var(--lm-text-muted)]",
            isPage ? "max-w-lg text-base leading-[1.85] md:text-[17px]" : "max-w-md"
          )}
        >
          {product.description}
        </p>

        <p className="lm-ui mt-6 text-[11px] uppercase tracking-[0.2em] text-[var(--lm-ocean)]">
          {product.family} · {product.gender === "uomo" ? "Uomo" : "Donna"}
        </p>

        {isPage && (
          <div className="mt-12 grid gap-8 border-t border-[var(--border)] pt-10 sm:grid-cols-3">
            {noteGroups.map(({ key, label }) => (
              <div key={key}>
                <p className="lm-eyebrow mb-3 text-[var(--lm-ocean)]">{label}</p>
                <ul className="space-y-1.5">
                  {product[key].map((note) => (
                    <li
                      key={note}
                      className="lm-ui text-sm font-light text-[var(--lm-text-muted)]"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <p className="lm-ui mt-8 text-sm tracking-[0.1em] text-[var(--lm-text)]">
          €{product.price} · {product.size}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
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
            Compra in pre-order
          </button>
          <Link
            href={`/profumi/${product.slug}`}
            className="lm-btn lm-btn-outline"
          >
            Scheda completa
          </Link>
        </div>
      </div>
    </GsapScrollReveal>
  );
}
