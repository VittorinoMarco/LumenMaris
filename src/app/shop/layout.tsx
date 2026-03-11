import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Acquista Arcomagno e Thalasi, i profumi Spirito Alchemico affinati nel mare calabrese. Discovery set e sample kit disponibili.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
