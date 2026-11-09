"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useMotion } from "@/lib/gsap";

export interface JourneyStep {
  num: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
}

/**
 * Il viaggio del flacone, guidato dallo scroll: le foto si aprono una sull'altra,
 * il testo cambia e il contatore di profondità scende a 35 m (step 04) e risale (05).
 */
export function DepthJourney({ steps }: { steps: JourneyStep[] }) {
  const root = useRef<HTMLDivElement>(null);
  const n = steps.length;

  useMotion(root, () => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const imgs = q("[data-step-img]");
    const texts = q("[data-step-text]");
    const numEl = q("[data-depth-num]")[0] as HTMLElement;
    const stepEl = q("[data-step-count]")[0] as HTMLElement;
    const marker = q("[data-marker]");
    const depthBg = q("[data-depth-bg]");
    const state = { v: 0 };
    const diveAt = n - 2; // l'immersione è il penultimo step
    const riseAt = n - 1;

    gsap.set(texts.slice(1), { opacity: 0, y: 40 });
    gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(q("[data-step-photo]"), { scale: 1.22 });
    gsap.set(q("[data-step-photo]")[0], { scale: 1.0 });

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n + 0.06));
          stepEl.textContent = `0${i + 1}`;
        },
      },
    });

    for (let i = 0; i < n; i++) {
      if (i > 0) {
        tl.to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.35, ease: "power2.inOut" }, i - 0.3)
          .to(q("[data-step-photo]")[i], { scale: 1, duration: 1.2 }, i - 0.3)
          .to(texts[i], { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, i - 0.05);
      }
      if (i < n - 1) {
        tl.to(texts[i], { opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }, i + 0.78);
      }
    }

    const ease = "power1.inOut";
    tl.to(
      state,
      {
        v: 35,
        duration: 0.9,
        ease,
        onUpdate: () => {
          numEl.textContent = String(Math.round(state.v));
        },
      },
      diveAt + 0.05
    )
      .fromTo(marker, { top: "0%" }, { top: "100%", duration: 0.9, ease, immediateRender: false }, diveAt + 0.05)
      .fromTo(depthBg, { opacity: 0 }, { opacity: 1, duration: 0.9, ease, immediateRender: false }, diveAt + 0.05)
      .to(
        state,
        {
          v: 0,
          duration: 0.9,
          ease,
          onUpdate: () => {
          numEl.textContent = String(Math.round(state.v));
        },
        },
        riseAt + 0.05
      )
      .fromTo(marker, { top: "100%" }, { top: "0%", duration: 0.9, ease, immediateRender: false }, riseAt + 0.05)
      .fromTo(depthBg, { opacity: 1 }, { opacity: 0.0, duration: 0.9, ease, immediateRender: false }, riseAt + 0.05)
      .to({}, { duration: 0.01 }, n - 0.01);
  });

  return (
    <div ref={root} className="relative" style={{ height: `${n * 95 + 30}svh` }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          data-depth-bg
          className="absolute inset-0 bg-[linear-gradient(180deg,#0a2c3c_0%,#03161f_100%)] opacity-0"
          aria-hidden
        />

        <div className="relative mx-auto flex h-full max-w-[1400px] flex-col px-[var(--lm-section-px)] pb-8 pt-24 md:pt-28">
          <div className="flex items-center justify-between">
            <p className="lm-eyebrow">Il metodo</p>
            <p className="lm-eyebrow flex items-center gap-3">
              <span data-step-count className="lm-italic text-[1.4rem] normal-case tracking-normal text-[var(--t-fg)]">
                01
              </span>
              <span className="h-px w-8 bg-[var(--t-line)]" />0{n}
            </p>
          </div>

          <div className="grid min-h-0 flex-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-16 xl:gap-24">
            {/* immagini */}
            <div className="order-1 flex justify-center lg:order-2">
              <div className="relative aspect-[3/4.3] h-[34svh] sm:h-[40svh] lg:h-[66svh]">
                <div
                  className="pointer-events-none absolute -inset-x-3 -inset-y-4 rounded-t-full border border-[var(--t-line)]"
                  aria-hidden
                />
                <div className="lm-arch absolute inset-0 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.6)]">
                  {steps.map((s, i) => (
                    <div key={s.num} data-step-img className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
                      <div data-step-photo className="absolute inset-0">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          sizes="(max-width: 1024px) 60vw, 460px"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* testi */}
            <div className="relative order-2 h-[24svh] min-h-[13.5rem] lg:order-1 lg:h-[56svh]">
              {steps.map((s) => (
                <div key={s.num} data-step-text className="absolute inset-0 flex flex-col justify-start lg:justify-center">
                  <p className="lm-eyebrow mb-3 flex items-center gap-3 lg:mb-5">
                    <span className="t-accent">{s.num}</span>
                    <span className="h-px w-8 bg-[var(--t-line)]" />
                    {s.accent}
                  </p>
                  <h3 className="lm-italic text-[clamp(2.2rem,4vw,4rem)] leading-[0.98] tracking-[-0.035em]">{s.title}</h3>
                  <p className="lm-body mt-4 max-w-[26rem] text-[13.5px] leading-[1.7] md:text-[15px] lg:mt-7 lg:leading-[1.85]">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>

            {/* profondimetro */}
            <div className="absolute right-[var(--lm-section-px)] top-[5.2rem] z-10 flex items-start gap-5 md:top-28 lg:static lg:order-3 lg:h-[56svh] lg:justify-self-end">
              <div className="text-right lg:self-center">
                <p className="lm-eyebrow mb-1 lg:mb-3">Profondità</p>
                <p className="lm-italic leading-none tracking-[-0.04em]">
                  <span data-depth-num className="text-[clamp(2.6rem,9vw,8.5rem)] tabular-nums">
                    0
                  </span>
                  <span className="t-accent ml-1 text-[clamp(1.2rem,3vw,2.2rem)]">m</span>
                </p>
              </div>
              <div className="relative hidden h-full w-6 lg:block">
                <div className="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-[var(--t-line)]" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((t) => (
                  <span
                    key={t}
                    className="absolute left-1/2 h-px -translate-x-1/2 bg-[var(--t-line)]"
                    style={{ top: `calc(1rem + (100% - 2rem) * ${t / 7})`, width: t % 7 === 0 ? 16 : 8 }}
                  />
                ))}
                <div className="absolute inset-x-0 inset-y-4">
                  <span
                    data-marker
                    className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--t-accent)] shadow-[0_0_0_6px_color-mix(in_srgb,var(--t-accent)_25%,transparent)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
