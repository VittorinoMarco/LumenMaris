"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

interface OrderSummary {
  id: string;
  status: string;
  total: string | null;
  email: string | null;
  items: { name: string; quantity: number; total: string }[];
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const mock = searchParams.get("mock");
  const orderId = searchParams.get("order_id");

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useCartStore.getState().clearCart();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (sessionId) params.set("session_id", sessionId);
    if (mock) params.set("mock", mock);
    if (orderId) params.set("order_id", orderId);

    if (!sessionId && !orderId) {
      setLoading(false);
      return;
    }

    fetch(`/api/orders?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.order) setOrder(data.order);
      })
      .finally(() => setLoading(false));
  }, [sessionId, mock, orderId]);

  return (
    <div className="max-w-md text-center">
      <p className="lm-eyebrow mb-4">Pre-order confermato</p>
      <h1 className="lm-serif text-4xl font-normal text-[var(--lm-text)]">
        Grazie per il tuo ordine
      </h1>
      <p className="lm-body mt-6 text-[var(--lm-text-muted)]">
        {loading
          ? "Caricamento dettagli ordine..."
          : order?.email
            ? `Conferma inviata a ${order.email}. I tuoi profumi Lumen Maris saranno spediti alla messa in commercio.`
            : "Riceverai una conferma via email. I tuoi profumi Lumen Maris saranno in viaggio verso di te."}
      </p>

      {order && order.total && (
        <div className="mt-8 rounded-[var(--lm-radius-soft)] border border-[var(--border)] bg-[var(--lm-cream)] p-6 text-left">
          <p className="lm-ui text-[10px] uppercase tracking-[0.24em] text-[var(--lm-ocean)]">
            Ordine {order.id.slice(0, 8)}
          </p>
          <ul className="mt-4 space-y-2">
            {order.items.map((item) => (
              <li
                key={`${item.name}-${item.quantity}`}
                className="flex justify-between text-sm text-[var(--lm-text-muted)]"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>€{item.total}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-[var(--border)] pt-4 font-medium text-[var(--lm-text)]">
            <span>Totale</span>
            <span>€{order.total}</span>
          </p>
        </div>
      )}

      <Button asChild size="lg" className="mt-10">
        <Link href="/profumi">Continua con i profumi</Link>
      </Button>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div
      data-nav-surface="light"
      className="flex min-h-screen items-center justify-center px-4 pb-20 pt-24"
    >
      <Suspense fallback={<p className="text-muted-foreground">Caricamento...</p>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
