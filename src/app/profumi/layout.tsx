import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profumi",
  description:
    "Saracenum e Thalasi: i due profumi Spirito Alchemico affinati a 35 metri nel mare calabrese. Pre-order disponibile.",
};

export default function ProfumiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
