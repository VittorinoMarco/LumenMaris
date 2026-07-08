"use client";

import Link from "next/link";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = [
  { href: "/#profumi", label: "Profumi" },
  { href: "/#progetto", label: "Progetto" },
  { href: "/profumi", label: "Pre-order" },
  { href: "/cart", label: "Carrello" },
  { href: "/contatti", label: "Contatti" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--lm-sand)]">
      <div className="mx-auto max-w-6xl px-[var(--lm-section-px)] py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div>
            <p className="lm-serif text-2xl text-[var(--lm-text)]">Lumen Maris</p>
            <p className="lm-script mt-2 text-xl text-[var(--lm-ocean-mid)]">
              underwater parfume
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lm-ui text-[10px] uppercase tracking-[0.2em] text-[var(--lm-text-muted)] hover:text-[var(--lm-ocean)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--lm-ocean)]/25 p-2.5 text-[var(--lm-ocean)]"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--lm-ocean)]/25 p-2.5 text-[var(--lm-ocean)]"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <p className="lm-ui mt-10 text-xs text-[var(--lm-text-muted)]">
          © {new Date().getFullYear()} Lumen Maris · San Nicola Arcella, Calabria
        </p>
      </div>
    </footer>
  );
}
