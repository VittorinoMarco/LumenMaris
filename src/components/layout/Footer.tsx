"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = [
  { href: "/progetto", label: "Il Progetto" },
  { href: "/territorio", label: "Il Territorio" },
  { href: "/shop", label: "Shop" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" },
  { href: "/cart", label: "Carrello" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-border/80 bg-cream-deep/50">
      <div className="section-x section-y mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="font-display text-3xl font-light tracking-[-0.02em] text-foreground md:text-4xl">
              Spirito Alchemico
            </h3>
            <p className="editorial-body mt-8 max-w-md text-muted-foreground">
              Il primo affinamento di profumi a 35 metri di profondità. Nato dal
              mare calabrese, portato nel mondo attraverso fragranze che
              raccontano territorio, mito e mare.
            </p>
            <div className="mt-10 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/20 p-3 text-primary transition-colors hover:border-primary/40 hover:bg-primary/[0.06]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/20 p-3 text-primary transition-colors hover:border-primary/40 hover:bg-primary/[0.06]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/80">
              Navigazione
            </h4>
            <ul className="mt-8 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/80">
              Newsletter
            </h4>
            {subscribed ? (
              <p className="editorial-body mt-8 text-muted-foreground">
                Grazie per esserti iscritto.
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="mt-8 space-y-4">
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full border-border bg-background/80 px-5 text-sm font-light"
                  required
                />
                <Button type="submit" variant="pill" className="w-full sm:w-auto">
                  Iscriviti
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border/70 pt-10 sm:flex-row sm:items-center">
          <p className="font-sans text-xs font-light tracking-[0.06em] text-muted-foreground">
            © {new Date().getFullYear()} Spirito Alchemico. San Nicola Arcella,
            Calabria, Italia.
          </p>
          <Link
            href="/privacy"
            className="font-sans text-xs font-light tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
