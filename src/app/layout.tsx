import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Outfit, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { ConditionalChrome } from "@/components/layout/ConditionalChrome";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
  adjustFontFallback: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
  display: "swap",
});

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

export const viewport: Viewport = {
  themeColor: "#f6f0e6",
};

/**
 * Eseguito prima del paint: abilita gli stati iniziali delle animazioni (.js)
 * e salta l'intro se già vista in questa sessione.
 */
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('lm-intro')){d.classList.add('no-intro')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${bodoni.variable} ${outfit.variable} ${pinyon.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="antialiased">
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  );
}
