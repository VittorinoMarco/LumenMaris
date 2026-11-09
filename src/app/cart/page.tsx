"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LumenDisplayTitle } from "@/components/lumen/LumenDisplayTitle";
import { Reveal } from "@/components/motion/Reveal";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();

  useEffect(() => setMounted(true), []);

  const subtotal = getSubtotal();
  const freeShipping = subtotal >= 100;
  const shipping = freeShipping ? 0 : 9.9;
  const progress = Math.min(100, (subtotal / 100) * 100);

  return (
    <div data-theme="sand" className="min-h-screen px-[var(--lm-section-px)] pb-24 pt-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <LumenDisplayTitle as="h1" size="lg" lines={[{ serif: "Il tuo", script: "carrello" }]} />

        {!mounted ? (
          <p className="lm-body mt-16 text-center">Caricamento…</p>
        ) : items.length === 0 ? (
          <Reveal className="mt-16 text-center">
            <p className="lm-script t-accent text-[2.2rem]">è ancora vuoto</p>
            <p className="lm-body mx-auto mt-4 max-w-sm">Il mare ha ancora molto da raccontarti. Scegli il tuo profumo.</p>
            <Link href="/profumi" className="lm-btn lm-btn-solid mt-10">
              Vai ai profumi
            </Link>
          </Reveal>
        ) : (
          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <ul className="divide-y divide-[var(--t-line)] border-y border-[var(--t-line)]">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 py-6 md:gap-7">
                  <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-t-full bg-[var(--lm-sand-deep)]">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="lm-italic text-[1.5rem] leading-tight">{item.name}</h3>
                        <p className="lm-eyebrow mt-2">{item.size}</p>
                      </div>
                      <p className="lm-italic text-[1.4rem] tabular-nums">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-[var(--t-line)]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--t-card)]"
                          aria-label="Diminuisci"
                        >
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.4} />
                        </button>
                        <span className="w-7 text-center tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--t-card)]"
                          aria-label="Aumenta"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.4} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="lm-link lm-ui flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[var(--t-muted)] hover:text-[var(--t-fg)]"
                        aria-label={`Rimuovi ${item.name}`}
                      >
                        <X className="h-3 w-3" strokeWidth={1.4} /> Rimuovi
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside>
              <div className="rounded-[var(--lm-radius-soft)] border border-[var(--t-line)] bg-[var(--t-card)] p-7 backdrop-blur-sm lg:sticky lg:top-28">
                <h2 className="lm-italic text-[1.8rem]">Riepilogo</h2>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[var(--t-muted)]">Subtotale</span>
                    <span className="tabular-nums">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--t-muted)]">Spedizione</span>
                    <span className="tabular-nums">{freeShipping ? "Gratuita" : `€${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="h-[3px] overflow-hidden rounded-full bg-[var(--t-line)]">
                    <div
                      className="h-full rounded-full bg-[var(--t-accent)] transition-[width] duration-[900ms] ease-editorial"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="lm-ui mt-3 text-xs text-[var(--t-muted)]">
                    {freeShipping
                      ? "Hai la spedizione gratuita ✦"
                      : `Aggiungi €${(100 - subtotal).toFixed(2)} per la spedizione gratuita`}
                  </p>
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-[var(--t-line)] pt-6">
                  <span className="lm-eyebrow">Totale</span>
                  <span className="lm-italic text-[2rem] tabular-nums">€{(subtotal + shipping).toFixed(2)}</span>
                </div>
                <div className="mt-6">
                  <CheckoutButton />
                </div>
                <p className="lm-ui mt-4 text-center text-xs text-[var(--t-muted)]">Pagamento sicuro tramite Stripe</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
