"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";
import { GsapScrollReveal } from "@/components/GsapScrollReveal";
import { LumenDisplayTitle } from "./LumenDisplayTitle";

export function LumenContattiSection() {
  return (
    <footer
      id="contatti"
      data-nav-surface="dark"
      className="bg-[var(--lm-ocean-deep)] text-[var(--lm-text-on-dark)]"
    >
      <div className="lm-section mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <GsapScrollReveal>
            <div className="lm-on-dark">
              <LumenDisplayTitle
                onDark
                lines={[{ serif: "Lumen", script: "Maris" }]}
              />
            </div>
            <p className="lm-body mt-8 max-w-md text-white/80">
              Underwater parfume · San Nicola Arcella, Calabria. Scrivici per
              pre-order, collaborazioni o visite in cantina.
            </p>
            <div className="mt-10 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 p-3 text-white/90 transition-colors hover:bg-white/10"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/30 p-3 text-white/90 transition-colors hover:bg-white/10"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </GsapScrollReveal>

          <GsapScrollReveal delay={0.08}>
            <p className="lm-ui mb-6 text-[10px] uppercase tracking-[0.24em] text-white/60">
              Navigazione
            </p>
            <ul className="space-y-3">
              {[
                { href: "#hero", label: "Home" },
                { href: "#profumi", label: "Profumi" },
                { href: "/profumi", label: "Pre-order" },
                { href: "/cart", label: "Carrello" },
                { href: "/contatti", label: "Contatti" },
                { href: "/privacy", label: "Privacy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="lm-serif text-lg text-white/90 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </GsapScrollReveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="lm-ui text-xs text-white/55">
            © {new Date().getFullYear()} Lumen Maris. Tutti i diritti riservati.
          </p>
          <p className="lm-script text-xl text-[var(--lm-sky-soft)]">
            underwater parfume
          </p>
        </div>
      </div>
    </footer>
  );
}
