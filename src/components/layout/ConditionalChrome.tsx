"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ThemeScroller } from "@/components/motion/ThemeScroller";
import { Preloader } from "@/components/motion/Preloader";

export function ConditionalChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <ThemeScroller />
      <Header />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
