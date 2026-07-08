"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface EditorialProductShowcaseProps {
  product: Product;
  reversed?: boolean;
  /** Base path per scheda prodotto (default /profumi) */
  productBasePath?: string;
  /** Solo CTA pre-order (aggiunge al carrello e apre il drawer) */
  ctaMode?: "default" | "preorder";
}

export function EditorialProductShowcase({
  product,
  reversed = false,
  productBasePath = "/profumi",
  ctaMode = "default",
}: EditorialProductShowcaseProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const productHref = `${productBasePath}/${product.slug}`;
  const blockRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const block = blockRef.current;
    const imgWrap = imgWrapRef.current;
    const text = textRef.current;
    if (!block || !imgWrap || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrap,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        text,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, block);

    return () => ctx.revert();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    });
  };

  const handlePreorder = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    });
    openCart();
  };

  return (
    <article
      ref={blockRef}
      className={`grid items-center gap-14 md:gap-20 lg:grid-cols-12 lg:gap-8 ${
        reversed ? "" : ""
      }`}
    >
      <div
        className={`lg:col-span-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}
      >
        <Link href={productHref} className="group block">
          <div
            ref={imgWrapRef}
            className="relative aspect-[3/4] max-h-[min(72vh,640px)] w-full overflow-visible"
          >
            <div className="absolute -inset-3 -z-10 rounded-[2px] bg-gradient-to-br from-cream-deep/80 to-transparent opacity-60 blur-xl md:-inset-6" />
            <div className="lm-photo relative h-full w-full overflow-hidden bg-[var(--lm-sand)] shadow-[0_28px_60px_-20px_rgba(15,61,82,0.3)]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-[transform,filter] duration-1000 ease-editorial group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Link>
      </div>

      <div
        ref={textRef}
        className={`lg:col-span-5 ${reversed ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-4"}`}
      >
        {product.badge && (
          <p className="mb-5 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-primary/90">
            {product.badge}
          </p>
        )}
        <h3 className="font-display text-display-sm font-light tracking-[-0.02em] text-foreground">
          {product.name}
        </h3>
        <p className="mt-4 font-sans text-sm font-light italic text-muted-foreground/95">
          {product.tagline}
        </p>
        <p className="editorial-body mt-8 max-w-md">{product.description}</p>
        <p className="mt-10 font-sans text-sm font-normal tracking-[0.08em] text-foreground/90">
          €{product.price} · {product.size}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {ctaMode === "preorder" ? (
            <Button type="button" variant="pill" onClick={handlePreorder}>
              Compra in pre-order
            </Button>
          ) : (
            <>
              <Button asChild variant="pill">
                <Link href={productHref}>Scopri</Link>
              </Button>
              <Button type="button" variant="pillOutline" onClick={handleAdd}>
                Aggiungi al carrello
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
