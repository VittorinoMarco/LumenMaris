"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { gsap, onSiteReady } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/profumi", label: "Profumi" },
  { href: "/#progetto", label: "Il processo" },
  { href: "/#territorio", label: "Territorio" },
  { href: "/contatti", label: "Contatti" },
];

export function ArchMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 34" fill="none" className={className} aria-hidden>
      <path d="M2 33V11.5C2 5.7 6.5 2 11 2s9 3.7 9 9.5V33" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 33V13c0-3 2.2-5 5-5s5 2 5 5v20" stroke="currentColor" strokeWidth="0.8" opacity=".55" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => setMounted(true), []);

  // Entrata dell'header dopo la preloader
  useEffect(() => {
    const el = document.getElementById("site-header");
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(el, { y: -40, opacity: 0 });
    return onSiteReady(() => {
      gsap.to(el, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.25, clearProps: "transform,opacity" });
    });
  }, []);

  // Nasconde l'header scorrendo giù, lo mostra scorrendo su
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 480 && y > last + 6) setHidden(true);
      else if (y < last - 6 || y < 480) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        id="site-header"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-700 ease-editorial",
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-[var(--t-line)] bg-[color-mix(in_srgb,var(--t-bg)_78%,transparent)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-[var(--lm-section-px)] py-4 md:py-5">
          <Link href="/" className="t-fg group flex shrink-0 items-center gap-3" aria-label="Lumen Maris — home">
            <ArchMark className="h-7 w-auto transition-transform duration-700 ease-editorial group-hover:-translate-y-0.5" />
            <span className="flex items-baseline gap-1.5 leading-none">
              <span className="lm-italic text-[1.35rem] md:text-[1.5rem]">Lumen</span>
              <span className="lm-script t-accent text-[1.9rem] md:text-[2.1rem]">Maris</span>
            </span>
          </Link>

          <nav className="t-fg hidden items-center gap-10 lg:flex" aria-label="Principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-active={pathname === link.href || (link.href === "/profumi" && pathname.startsWith("/profumi"))}
                className="lm-link lm-ui text-[10.5px] uppercase tracking-[0.26em] opacity-85 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="t-fg flex items-center gap-3">
            <button
              type="button"
              onClick={openCart}
              className="group relative flex h-11 items-center gap-2 rounded-full border border-[var(--t-line)] px-4 transition-colors duration-500 hover:border-[var(--t-fg)]"
              aria-label={`Apri il carrello${mounted && count ? ` (${count})` : ""}`}
            >
              <ShoppingBag className="h-[15px] w-[15px]" strokeWidth={1.4} />
              <span className="lm-ui hidden text-[10.5px] uppercase tracking-[0.22em] sm:inline">Carrello</span>
              <AnimatePresence>
                {mounted && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="lm-ui flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--t-fg)] px-1 text-[10px] tabular-nums text-[var(--t-bg)]"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              type="button"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-[var(--t-line)] lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Apri il menu"
            >
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-3 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="nav-mobile"
                className="fixed inset-0 z-[9998] flex flex-col bg-[var(--lm-ocean-deep)] text-[var(--lm-text-on-dark)] lg:hidden"
                initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
                animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)" }}
                exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <div className="flex items-center justify-between px-[var(--lm-section-px)] py-4">
                  <span className="flex items-center gap-3">
                    <ArchMark className="h-7 w-auto" />
                    <span className="lm-script text-[2rem] text-[var(--lm-sky-soft)]">Lumen Maris</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25"
                    aria-label="Chiudi il menu"
                  >
                    <X className="h-5 w-5" strokeWidth={1.4} />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col justify-center gap-2 px-[var(--lm-section-px)]">
                  {navLinks.map((link, i) => (
                    <div key={link.href} className="overflow-hidden py-1">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ duration: 0.9, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="lm-italic block text-[clamp(2.6rem,12vw,4.2rem)] leading-[1.05]"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </nav>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.7 }}
                  className="lm-ui px-[var(--lm-section-px)] pb-10 text-[10px] uppercase tracking-[0.3em] text-white/55"
                >
                  Underwater parfume · San Nicola Arcella
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
