import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Ordine Confermato",
  description: "Grazie per il tuo ordine Spirito Alchemico.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-4xl font-semibold mb-4">
          Grazie per il tuo ordine
        </h1>
        <p className="text-muted-foreground mb-8">
          Riceverai una conferma via email. I tuoi profumi Spirito Alchemico
          saranno in viaggio verso di te.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Continua lo Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
