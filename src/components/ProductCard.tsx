"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
    });
  };

  return (
    <Link href={`/profumi/${product.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="overflow-hidden border-border/60 transition-shadow duration-500 hover:shadow-[0_28px_60px_-28px_rgba(30,40,35,0.28)]">
          <div className="relative aspect-square overflow-hidden bg-muted/20">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.badge && (
              <Badge className="absolute top-2 right-2" variant="secondary">
                {product.badge}
              </Badge>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="font-display text-xl font-light tracking-tight">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
            <p className="font-medium mt-2">€{product.price} / {product.size}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              size="sm"
            >
              Aggiungi al Carrello
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}
