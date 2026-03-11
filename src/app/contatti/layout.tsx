import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contattaci per informazioni sui profumi Spirito Alchemico. San Nicola Arcella, Calabria, Italia.",
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
