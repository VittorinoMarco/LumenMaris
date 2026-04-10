"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/progetto", label: "Il Progetto" },
  { href: "/territorio", label: "Il Territorio" },
  { href: "/shop", label: "Shop" },
  { href: "/chi-siamo", label: "Chi Siamo" },
  { href: "/contatti", label: "Contatti" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const useGlassCapsule = isHome && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-40 transition-all duration-500 ease-editorial",
          useGlassCapsule
            ? "border-transparent bg-transparent py-4 md:py-5"
            : "border-b border-border/60 bg-background/85 py-0 text-foreground shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl"
        )}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl transition-[padding] duration-500",
            useGlassCapsule ? "px-4 sm:px-6" : "px-4 sm:px-6 lg:px-8"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              useGlassCapsule
                ? "rounded-full border border-white/25 bg-white/12 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl md:px-8 md:py-3"
                : "h-16 lg:h-[4.25rem]"
            )}
          >
            <Link href="/" className="flex items-center">
              <Image
                src="/LogoLumenMaris.png"
                alt="Spirito Alchemico"
                width={140}
                height={50}
                className={cn(
                  "h-9 w-auto transition-[filter] duration-300 md:h-10",
                  useGlassCapsule && "brightness-0 invert"
                )}
                priority
              />
            </Link>

            <nav className="hidden items-center gap-9 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans text-[12px] font-normal uppercase tracking-[0.16em] transition-colors",
                    useGlassCapsule
                      ? "text-white/88 hover:text-white"
                      : "text-muted-foreground hover:text-primary",
                    pathname === link.href &&
                      (useGlassCapsule ? "text-white" : "text-primary")
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                type="button"
                onClick={openCart}
                className={cn(
                  "relative rounded-full p-2.5 transition-colors",
                  useGlassCapsule
                    ? "text-white hover:bg-white/15"
                    : "text-foreground hover:bg-muted/60"
                )}
                aria-label="Apri carrello"
              >
                <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
                {getItemCount() > 0 && (
                  <span
                    className={cn(
                      "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-medium",
                      useGlassCapsule
                        ? "bg-white text-primary"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {getItemCount()}
                  </span>
                )}
              </button>

              <button
                type="button"
                className={cn(
                  "rounded-full p-2.5 md:hidden",
                  useGlassCapsule ? "text-white" : "text-foreground"
                )}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="space-y-1 px-5 py-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block py-2.5 font-sans text-[12px] uppercase tracking-[0.14em] text-muted-foreground",
                      pathname === link.href && "text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer />
    </>
  );
}
