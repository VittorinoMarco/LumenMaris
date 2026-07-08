"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const items = useCartStore((s) => s.items);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Checkout non riuscito");
        setLoading(false);
        return;
      }

      if (data.url) {
        if (data.mode === "stripe") {
          window.location.href = data.url;
        } else {
          useCartStore.getState().clearCart();
          router.push(data.url);
        }
      }
    } catch {
      setError("Errore di connessione. Riprova.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full"
        size="lg"
      >
        {loading ? "Elaborazione..." : "Procedi al Pagamento"}
      </Button>
      {error && (
        <p className="mt-2 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
