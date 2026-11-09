"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, fontsReady, onSiteReady, useMotion } from "@/lib/gsap";
import { applyTheme } from "@/lib/theme";
import { LumenDisplayTitle } from "./LumenDisplayTitle";

/**
 * Hero a scorrimento: il video a tutto schermo si chiude in un arco mentre lo
 * sfondo passa dal blu profondo alla salvia marina — come nel riferimento.
 */
export function LumenHero() {
  const root = useRef<HTMLElement>(null);

  useMotion(root, ({ desktop }) => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);

    const arch = desktop
      ? "inset(10% 32% 0% 32% round 999px 999px 0px 0px)"
      : "inset(15% 9% 0% 9% round 999px 999px 0px 0px)";

    // Stato iniziale dell'intro (parte quando la preloader finisce)
    gsap.set(q("[data-hero-in]"), { opacity: 0, y: 28 });
    gsap.set(q("[data-hero-wrap]"), { scale: 1.25 });
    gsap.set(q("[data-media]"), { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)" });

    let killed = false;
    let stopReady = () => {};

    fontsReady().then(() => {
      if (killed) return;
      stopReady = onSiteReady(() => {
        if (killed) return;
        const tl = gsap.timeline();
        tl.to(q("[data-hero-wrap]"), { scale: 1, duration: 2.6, ease: "expo.out" }, 0)
          .fromTo(
            q("[data-hero-title] .lm-mask-inner"),
            { yPercent: 115, rotate: 3, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 1.7, ease: "expo.out", stagger: 0.14 },
            0.15
          )
          .to(q("[data-hero-in]"), { opacity: 1, y: 0, duration: 1.3, ease: "expo.out", stagger: 0.12 }, 0.7);
      });
    });

    // Scrub principale
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.9,
        onUpdate: (self) => applyTheme(self.progress > 0.3 ? "mist" : "deep"),
      },
    });

    tl.to(q("[data-media]"), { clipPath: arch, duration: 0.55, ease: "power2.inOut" }, 0)
      .to(q("[data-bg]"), { backgroundColor: "rgb(223, 233, 227)", duration: 0.55 }, 0)
      .to(q("[data-video]"), { scale: 1.02, duration: 0.8 }, 0)
      .to(q("[data-overlay]"), { opacity: 0.1, duration: 0.5 }, 0)
      .to(q("[data-hero-title]"), { yPercent: -26, scale: 0.9, duration: 0.45 }, 0)
      .to(q("[data-hero-title]"), { opacity: 0, duration: 0.18 }, 0.2)
      .to(q("[data-hero-in]"), { opacity: 0, y: -24, duration: 0.18, stagger: 0.02, overwrite: "auto" }, 0.02)
      .fromTo(
        q("[data-cap]"),
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.25, stagger: 0.08, ease: "power2.out" },
        0.5
      )
      .fromTo(q("[data-script]"), { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }, 0.58)
      .to({}, { duration: 0.2 });

    return () => {
      killed = true;
      stopReady();
      tl.scrollTrigger?.kill();
    };
  });

  return (
    <section id="hero" ref={root} data-theme="deep" className="relative h-[215svh]">
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        {/* sfondo che sfuma verso la salvia */}
        <div data-bg className="absolute inset-0 bg-[var(--lm-ocean-deep)]" aria-hidden />

        {/* video che si chiude in un arco */}
        <div data-media className="absolute inset-0 overflow-hidden [will-change:clip-path]">
          <div data-hero-wrap className="absolute inset-0">
            <video
              data-video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/hero-poster.jpg"
              className="h-full w-full object-cover"
            >
              <source src="/hero-video-1080.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            data-overlay
            className="absolute inset-0 bg-gradient-to-b from-[#0a2c3b]/55 via-[#0e3647]/20 to-[#0a2c3b]/70"
            aria-hidden
          />
        </div>

        {/* titolo */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-[var(--lm-section-px)] text-center">
          <p data-hero-in className="lm-ui mb-6 text-[10px] uppercase tracking-[0.42em] text-white/75 md:mb-8">
            Underwater parfume · Calabria
          </p>
          <div data-hero-title className="will-change-transform">
            <LumenDisplayTitle
              as="h1"
              onDark
              size="xl"
              animate={false}
              lines={[{ serif: "Lumen", script: "Maris" }]}
            />
          </div>
          <p data-hero-in className="lm-ui mx-auto mt-8 max-w-md text-[13.5px] font-light leading-relaxed text-white/85 md:mt-10 md:text-sm">
            Il primo affinamento di profumi a 35 metri di profondità. Nato dal mare calabrese.
          </p>
          <div data-hero-in className="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3 md:mt-12 md:gap-4">
            <Link href="/profumi" className="lm-btn lm-btn-ghost-light">
              Scopri i profumi
            </Link>
            <Link href="/profumi" className="lm-btn lm-btn-solid !bg-white !text-[var(--lm-ocean-deep)]">
              Pre-order
            </Link>
          </div>
        </div>

        {/* indicatore di scroll */}
        <div
          data-hero-in
          className="lm-ui absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] uppercase tracking-[0.4em] text-white/70"
        >
          Scorri
          <span className="relative block h-10 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_var(--ease-out-expo)_infinite] bg-white" />
          </span>
        </div>

        {/* didascalie intorno all'arco */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          <div data-cap className="absolute bottom-[14%] left-[var(--lm-section-px)] max-w-[15rem] text-[var(--t-fg)] opacity-0">
            <p className="lm-italic text-[clamp(3rem,6vw,5.5rem)] leading-none">35 m</p>
            <p className="lm-eyebrow mt-3">di profondità, nel Tirreno</p>
          </div>
          <div data-cap className="absolute bottom-[14%] right-[var(--lm-section-px)] max-w-[15rem] text-right text-[var(--t-fg)] opacity-0">
            <p className="lm-italic text-[clamp(3rem,6vw,5.5rem)] leading-none">6 mesi</p>
            <p className="lm-eyebrow mt-3">di buio, sale e silenzio</p>
          </div>
        </div>
        <div
          data-script
          className="lm-script pointer-events-none absolute inset-x-0 bottom-[7%] text-[var(--lm-text-on-dark)] [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] z-10 text-center text-[clamp(2.2rem,5vw,4rem)] leading-none opacity-0 md:bottom-[5%]"
        >
          underwater parfume
        </div>
      </div>
    </section>
  );
}
