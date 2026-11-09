"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const freeShipping = subtotal >= 100;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex flex-col" data-lenis-prevent aria-describedby={undefined}>
        <SheetHeader className="flex-row items-end justify-between space-y-0 border-b border-[var(--t-line)] pb-5">
          <SheetTitle>
            Il tuo <span className="lm-script t-accent text-[2.3rem]">carrello</span>
          </SheetTitle>
          <button
            type="button"
            onClick={closeCart}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--t-line)] transition-colors hover:border-[var(--t-fg)]"
            aria-label="Chiudi il carrello"
          >
            <X className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="lm-script t-accent text-[2rem]">è ancora vuoto</p>
              <Link href="/profumi" onClick={closeCart} className="lm-btn lm-btn-outline mt-8">
                Scopri i profumi
              </Link>
            </div>
          ) : (
            <ul>
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 40, height: 0, paddingBlock: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-4 overflow-hidden border-b border-[var(--t-line)] py-5 last:border-0"
                  >
                    <div className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden rounded-t-full bg-[var(--lm-sand-deep)]">
                      <Image src={item.image} alt={item.name} fill sizes="72px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h4 className="lm-italic truncate text-[1.25rem] leading-tight">{item.name}</h4>
                          <p className="lm-eyebrow mt-1">{item.size}</p>
                        </div>
                        <p className="lm-italic text-[1.15rem] tabular-nums">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-[var(--t-line)]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--t-card)]"
                            aria-label="Diminuisci quantità"
                          >
                            <Minus className="h-3 w-3" strokeWidth={1.4} />
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--t-card)]"
                            aria-label="Aumenta quantità"
                          >
                            <Plus className="h-3 w-3" strokeWidth={1.4} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="lm-link lm-ui text-[10px] uppercase tracking-[0.2em] text-[var(--t-muted)] hover:text-[var(--t-fg)]"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-[var(--t-line)] pt-5">
            <p className="lm-ui text-xs text-[var(--t-muted)]">
              {freeShipping ? "Spedizione gratuita ✦" : `Ancora €${(100 - subtotal).toFixed(2)} per la spedizione gratuita`}
            </p>
            <div className="flex items-baseline justify-between">
              <span className="lm-eyebrow">Subtotale</span>
              <span className="lm-italic text-[1.9rem] tabular-nums">€{subtotal.toFixed(2)}</span>
            </div>
            <Link href="/cart" onClick={closeCart} className="lm-btn lm-btn-solid w-full !py-4">
              Vai al checkout <span className="lm-btn-arrow">→</span>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
