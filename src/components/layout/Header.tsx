"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useNavSurfaceUnderHeader } from "@/hooks/use-nav-surface-under-header";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/profumi", label: "Profumi" },
  { href: "/cart", label: "Carrello" },
];

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const surface = useNavSurfaceUnderHeader(headerRef);
  const onDarkSurface = surface === "dark";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getItemCount } = useCartStore();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const useSolidBar = scrolled || !onDarkSurface;

  return (
    <>
      <header
        ref={headerRef}
        id="site-header"
        className={cn(
          "sticky left-0 right-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ease-editorial",
          useSolidBar
            ? "border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--lm-cream)_92%,transparent)] shadow-[0_8px_32px_-12px_rgba(15,61,82,0.12)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-[var(--lm-section-px)] py-4 md:py-5">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/LogoLumenMaris.png"
              alt="Lumen Maris"
              width={160}
              height={56}
              className="h-9 w-auto md:h-11"
              priority
            />
          </Link>

          <div className="ml-auto flex items-center gap-6 md:gap-10">
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "lm-ui text-[10px] uppercase tracking-[0.24em] transition-colors",
                    useSolidBar
                      ? "text-[var(--lm-text-muted)] hover:text-[var(--lm-ocean)]"
                      : "text-white/88 hover:text-white",
                    pathname === link.href ||
                      (link.href === "/profumi" &&
                        pathname.startsWith("/profumi"))
                      ? useSolidBar
                        ? "text-[var(--lm-ocean)]"
                        : "text-white"
                      : ""
                  )}
                >
                  {link.label}
                  {link.href === "/cart" && getItemCount() > 0 && (
                    <span className="ml-1.5 tabular-nums opacity-80">
                      ({getItemCount()})
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className={cn(
                "rounded-full p-2.5 md:hidden",
                useSolidBar ? "text-[var(--lm-text)]" : "text-white"
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                key="nav-mobile"
                className="fixed inset-0 z-[9998] flex flex-col bg-[var(--lm-ocean-deep)] md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center justify-between px-6 py-5">
                  <Image
                    src="/LogoLumenMaris.png"
                    alt="Lumen Maris"
                    width={140}
                    height={48}
                    className="h-9 w-auto brightness-0 invert"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="text-white"
                    aria-label="Chiudi"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col items-center justify-center gap-10">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="lm-ui text-sm uppercase tracking-[0.28em] text-white"
                    >
                      {link.label}
                      {link.href === "/cart" && getItemCount() > 0
                        ? ` (${getItemCount()})`
                        : ""}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
