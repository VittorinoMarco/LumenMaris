import type { Metadata } from "next";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumenmaris.it"),
  icons: {
    icon: "/FaviconLumen.png",
  },
  title: {
    default: "Lumen Maris | Underwater Parfume",
    template: "%s | Lumen Maris",
  },
  description:
    "Profumi affinati a 35 metri nel mare calabrese. Saracenum e Thalasi — Lumen Maris, underwater parfume.",
  keywords: [
    "Lumen Maris",
    "profumi",
    "Calabria",
    "underwater parfume",
    "affinamento sottomarino",
    "Saracenum",
    "Thalasi",
  ],
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
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
