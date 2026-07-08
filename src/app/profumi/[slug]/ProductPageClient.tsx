"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OlfactoryPyramid } from "@/components/OlfactoryPyramid";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/products";
import { Leaf, Waves, Package } from "lucide-react";

interface ProductPageClientProps {
  product: Product;
  relatedProduct?: Product;
}

export function ProductPageClient({
  product,
  relatedProduct,
}: ProductPageClientProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handlePreorder = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: product.size,
      },
      quantity
    );
    openCart();
  };

  const features = [
    {
      icon: Leaf,
      title: "Botanica locale",
      desc: "Bergamotto e agrumi calabresi",
    },
    {
      icon: Waves,
      title: "Affinamento sottomarino",
      desc: "6 mesi a 35 metri di profondità",
    },
    {
      icon: Package,
      title: "Imbottigliamento artigianale",
      desc: "Ogni flacone è unico",
    },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative mx-auto w-full max-w-lg lg:mx-0"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--lm-sand)] shadow-[0_28px_60px_-24px_rgba(30,40,35,0.28)]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {product.images && product.images.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {product.images.slice(1, 5).map((src) => (
              <div
                key={src}
                className="relative aspect-[3/4] overflow-hidden bg-[var(--lm-sand)]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        )}
        {product.badge && (
          <Badge className="absolute right-4 top-4" variant="secondary">
            {product.badge}
          </Badge>
        )}
      </motion.div>

      <div>
        <Link
          href="/profumi"
          className="mb-6 inline-block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-primary/90 hover:text-primary"
        >
          ← Profumi
        </Link>
        <h1 className="font-display text-4xl font-light tracking-[-0.02em] md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-4 font-sans text-lg font-light italic text-muted-foreground">
          {product.tagline}
        </p>
        <p className="mt-6 font-sans text-sm tracking-[0.08em] text-foreground/90">
          €{product.price} · {product.size}
        </p>
        <p className="editorial-body mt-8">{product.description}</p>

        {product.topNotes.length > 0 && (
          <div className="mb-8 mt-10">
            <OlfactoryPyramid
              topNotes={product.topNotes}
              heartNotes={product.heartNotes}
              baseNotes={product.baseNotes}
            />
          </div>
        )}

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-full border border-border/80">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 font-light hover:bg-muted/50"
            >
              −
            </button>
            <span className="min-w-[3rem] px-4 py-2 text-center font-light">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 font-light hover:bg-muted/50"
            >
              +
            </button>
          </div>
          <Button variant="pill" size="lg" onClick={handlePreorder}>
            Compra in pre-order
          </Button>
        </div>

        <section className="border-t border-border/60 py-12">
          <h3 className="mb-6 font-display text-xl font-light">
            Come è nato
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center"
              >
                <f.icon className="mb-2 h-10 w-10 text-primary" />
                <h4 className="font-sans text-sm font-medium">{f.title}</h4>
                <p className="text-sm font-light text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {relatedProduct && (
          <section className="border-t border-border/60 py-12">
            <h3 className="mb-6 font-display text-xl font-light">
              L&apos;altro profumo
            </h3>
            <Link href={`/profumi/${relatedProduct.slug}`}>
              <div className="flex gap-4 rounded-sm border border-border/60 p-4 transition-colors hover:border-primary/40">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-cream-deep/40">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h4 className="font-display font-light">
                    {relatedProduct.name}
                  </h4>
                  <p className="text-sm font-light text-muted-foreground">
                    €{relatedProduct.price} · {relatedProduct.size}
                  </p>
                </div>
              </div>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
