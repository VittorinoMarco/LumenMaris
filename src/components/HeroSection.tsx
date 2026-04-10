"use client";

import Link from "next/link";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  video?: string;
  image?: string;
  /** Large decorative word behind content (parallax + low opacity) */
  backdropWord?: string;
  overlay?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  video,
  image,
  backdropWord = "mare",
  overlay = true,
}: HeroSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (wordRef.current) {
        gsap.fromTo(
          wordRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.4, ease: "power2.out" }
        );
      }

      if (blobRef.current) {
        gsap.fromTo(
          blobRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.15 }
        );
      }

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 1.05 },
          0.2
        );
      }
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.45
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.65
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
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
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-[#1a1a18]/55"
          aria-hidden
        />
      )}

      {/* Layered display word — editorial depth */}
      <div
        ref={wordRef}
        className="pointer-events-none absolute inset-0 flex items-end justify-center pb-[18vh] md:pb-[22vh]"
        aria-hidden
      >
        <span className="font-display text-[clamp(4.5rem,18vw,14rem)] font-light leading-none tracking-[-0.04em] text-white/[0.12]">
          {backdropWord}
        </span>
      </div>

      {/* Soft organic highlight behind headline cluster */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(42vh,420px)] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-[48%_52%_48%_52%] bg-gradient-to-br from-white/25 via-white/12 to-transparent blur-2xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[42rem] px-6 text-center text-white md:max-w-4xl md:px-10">
        <h1
          ref={titleRef}
          className="font-display text-display-md font-light leading-[1.08] tracking-[-0.03em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            ref={subRef}
            className="mx-auto mt-8 max-w-xl font-sans text-lg font-light leading-relaxed tracking-[0.06em] text-white/92 md:text-xl"
          >
            {subtitle}
          </p>
        )}
        {ctaLabel && ctaHref && (
          <div ref={ctaRef} className="mt-12 flex justify-center">
            <Button asChild size="lg" variant="hero">
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
