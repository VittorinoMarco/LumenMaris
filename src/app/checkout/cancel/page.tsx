import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Pagamento annullato",
  description: "Il checkout è stato annullato.",
};

export default function CheckoutCancelPage() {
  return (
    <div
      data-nav-surface="light"
      className="flex min-h-screen items-center justify-center px-4 pb-20 pt-24"
    >
      <div className="max-w-md text-center">
        <p className="lm-eyebrow mb-4">Checkout annullato</p>
        <h1 className="lm-serif text-3xl font-normal text-[var(--lm-text)]">
          Nessun addebito effettuato
        </h1>
        <p className="lm-body mt-6 text-[var(--lm-text-muted)]">
          Il pagamento non è stato completato. I prodotti restano nel carrello.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/cart">Torna al carrello</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/profumi">Sfoglia i profumi</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
