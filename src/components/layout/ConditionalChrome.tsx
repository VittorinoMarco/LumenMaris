"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      <Header />
      <main className={isHome ? "" : "min-h-screen bg-[var(--lm-cream)]"}>
        {children}
      </main>
      {!isHome && <Footer />}
      <CartDrawer />
    </>
  );
}
