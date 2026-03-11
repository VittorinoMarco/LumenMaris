import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrello",
  description: "Il tuo carrello Spirito Alchemico. Procedi al checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
