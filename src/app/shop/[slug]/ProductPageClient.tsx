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

  const handleAddToCart = () => {
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
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative aspect-square max-w-lg mx-auto lg:mx-0"
      >
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-muted/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-8"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {product.badge && (
          <Badge className="absolute top-4 right-4" variant="secondary">
            {product.badge}
          </Badge>
        )}
      </motion.div>

      <div>
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2">
          {product.name}
        </h1>
        <p className="text-lg text-muted-foreground italic mb-6">
          {product.tagline}
        </p>
        <p className="text-2xl font-semibold mb-6">
          €{product.price} / {product.size}
        </p>
        <p className="text-muted-foreground mb-8">{product.description}</p>

        {product.topNotes.length > 0 && (
          <div className="mb-8">
            <OlfactoryPyramid
              topNotes={product.topNotes}
              heartNotes={product.heartNotes}
              baseNotes={product.baseNotes}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center mb-8">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-muted"
            >
              −
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 hover:bg-muted"
            >
              +
            </button>
          </div>
          <Button size="lg" onClick={handleAddToCart}>
            Aggiungi al Carrello
          </Button>
        </div>

        <section className="py-12 border-t border-border">
          <h3 className="font-serif text-xl font-semibold mb-6">
            Come è Nato
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center">
                <f.icon className="h-10 w-10 text-primary mb-2" />
                <h4 className="font-medium">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedProduct && (
          <section className="py-12 border-t border-border">
            <h3 className="font-serif text-xl font-semibold mb-6">
              Potrebbe piacerti anche
            </h3>
            <Link href={`/shop/${relatedProduct.slug}`}>
              <div className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary transition-colors">
                <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-muted/20">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-semibold">{relatedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    €{relatedProduct.price} / {relatedProduct.size}
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
