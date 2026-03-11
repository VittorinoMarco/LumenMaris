import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://spiritoalchemico.it"),
  icons: {
    icon: "/FaviconLumen.png",
  },
  title: {
    default: "Spirito Alchemico | Profumi Affinati nel Mare Calabrese",
    template: "%s | Spirito Alchemico",
  },
  description:
    "Il primo affinamento di profumi a 35 metri di profondità. Arcomagno e Thalasi, nati dal mare calabrese, tra bergamotto, legni arabi e acqua di mare.",
  keywords: [
    "profumi",
    "Calabria",
    "bergamotto",
    "affinamento sottomarino",
    "Arcomagno",
    "Thalasi",
    "niche perfume",
  ],
  authors: [{ name: "Spirito Alchemico" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
