"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { LumenDisplayTitle } from "@/components/lumen/LumenDisplayTitle";

const footerLinks = [
  { href: "/profumi", label: "Profumi" },
  { href: "/#progetto", label: "Il processo" },
  { href: "/#territorio", label: "Territorio" },
  { href: "/contatti", label: "Contatti" },
  { href: "/cart", label: "Carrello" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer
      id="contatti"
      data-theme="deep"
      className="relative overflow-hidden text-[var(--t-fg)]"
    >
      <div className="lm-section mx-auto max-w-[1600px] !pb-10">
        <Reveal className="flex flex-col items-center text-center">
          <p className="lm-eyebrow mb-8">Pre-order aperti</p>
          <LumenDisplayTitle size="lg" lines={[{ serif: "Porta il mare", script: "a casa" }]} />
          <Link href="/profumi" className="lm-btn lm-btn-solid mt-12 !px-10 !py-4">
            Scopri i profumi <ArrowUpRight className="lm-btn-arrow h-4 w-4" strokeWidth={1.4} />
          </Link>
        </Reveal>

        <div className="mt-24 grid gap-14 border-t border-[var(--t-line)] pt-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="lm-italic text-[2rem] leading-tight">Lumen Maris</p>
            <p className="lm-script t-accent mt-1 text-[2rem]">underwater parfume</p>
            <p className="lm-body mt-6 max-w-sm">
              San Nicola Arcella, Calabria. Scrivici per pre-order, collaborazioni o visite.
            </p>
          </Reveal>

          <Reveal className="md:col-span-4" delay={0.08}>
            <p className="lm-eyebrow mb-6">Esplora</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="lm-link lm-italic text-[1.2rem]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-3" delay={0.16}>
            <p className="lm-eyebrow mb-6">Seguici</p>
            <div className="flex gap-3">
              {[
                { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
                { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--t-line)] transition-all duration-500 hover:-translate-y-1 hover:border-[var(--t-fg)] hover:bg-[var(--t-fg)] hover:text-[var(--t-bg)]"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--t-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="lm-ui text-xs text-[var(--t-muted)]">
            © {new Date().getFullYear()} Lumen Maris · Tutti i diritti riservati
          </p>
          <button
            type="button"
            onClick={() =>
              window.__lenis ? window.__lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="lm-link lm-ui text-[10px] uppercase tracking-[0.28em] text-[var(--t-muted)] hover:text-[var(--t-fg)]"
          >
            Torna su ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
