"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    updateQuantity,
    removeItem,
    getSubtotal,
  } = useCartStore();

  useEffect(() => setMounted(true), []);

  const subtotal = getSubtotal();
  const freeShipping = subtotal >= 100;
  const shipping = freeShipping ? 0 : 9.9;

  if (!mounted) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl font-semibold mb-12">Carrello</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-6">
              Il tuo carrello è vuoto
            </p>
            <Button asChild>
              <Link href="/shop">Vai allo Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-4 rounded-lg border border-border"
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-muted/20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                    <p className="font-medium mt-1">€{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded hover:bg-muted"
                        aria-label="Diminuisci"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded hover:bg-muted"
                        aria-label="Aumenta"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded hover:bg-red-100 text-red-600 ml-2"
                        aria-label="Rimuovi"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <div className="sticky top-28 p-6 rounded-lg border border-border bg-card">
                <h3 className="font-serif text-xl font-semibold mb-4">
                  Riepilogo
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotale</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spedizione</span>
                    <span>
                      {freeShipping ? (
                        <span className="text-accent font-medium">Gratuita</span>
                      ) : (
                        `€${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>
                {!freeShipping && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Aggiungi €{(100 - subtotal).toFixed(2)} per la spedizione
                    gratuita
                  </p>
                )}
                <div className="flex justify-between text-lg font-semibold border-t pt-4 mb-6">
                  <span>Totale</span>
                  <span>€{(subtotal + shipping).toFixed(2)}</span>
                </div>
                <CheckoutButton />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Pagamento sicuro tramite Stripe (demo)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
