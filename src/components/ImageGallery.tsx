"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    wrap.animate(
      [{ transform: "translateY(12px)", opacity: 0.96 }, { transform: "translateY(0)", opacity: 1 }],
      { duration: 900, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-deep/50 shadow-[0_24px_64px_-32px_rgba(30,40,35,0.35)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={current === 0}
            />
            {images[current].label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent px-6 py-6 pt-16">
                <p className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/95">
                  {images[current].label}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/75 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Immagine precedente"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/75 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
            aria-label="Immagine successiva"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="mt-8 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-editorial",
                  i === current
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-border hover:bg-primary/40"
                )}
                aria-label={`Vai all'immagine ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
