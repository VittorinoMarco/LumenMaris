"use client";

import Link from "next/link";
import { LumenDisplayTitle } from "./LumenDisplayTitle";

export function LumenHero() {
  return (
    <section
      id="hero"
      data-nav-surface="dark"
      className="relative -mt-[4.5rem] flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-[4.5rem] md:-mt-20 md:pt-20"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-b from-[color-mix(in_srgb,var(--lm-ocean-deep)_35%,transparent)] via-[color-mix(in_srgb,var(--lm-ocean)_25%,transparent)] to-[color-mix(in_srgb,var(--lm-ocean-deep)_55%,transparent)]"
        aria-hidden
      />

      <div className="relative z-10 flex w-full flex-col items-center px-[var(--lm-section-px)] py-28 text-center md:py-32">
        <p className="lm-ui mb-6 text-[10px] uppercase tracking-[0.32em] text-white/75">
          Underwater parfume · Calabria
        </p>
        <LumenDisplayTitle
          onDark
          lines={[
            { serif: "Lumen", script: "Maris" },
            { serif: "UNDERWATER", script: "Parfume" },
          ]}
        />
        <p className="lm-ui mx-auto mt-10 max-w-md text-sm font-light leading-relaxed text-white/85">
          Il primo affinamento di profumi a 35 metri di profondità. Nato dal mare
          calabrese.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href="/profumi" className="lm-btn lm-btn-ghost-light">
            Scopri i profumi
          </Link>
          <Link href="/profumi" className="lm-btn lm-btn-solid">
            Pre-order
          </Link>
        </div>
      </div>
    </section>
  );
}
