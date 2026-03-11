"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  video?: string;
  image?: string;
  overlay?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  video,
  image,
  overlay = true,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
      {image && !video && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      {!video && !image && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80)`,
          }}
        />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-primary/60" />
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {ctaLabel && ctaHref && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white border-0"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </motion.div>
        )}
      </div>
      </section>
  );
}
