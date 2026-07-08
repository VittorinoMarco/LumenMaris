"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type NavSurface = "dark" | "light";

/**
 * Rileva `[data-nav-surface="dark"|"light"]` nei contenuti proprio sotto il bordo
 * inferiore dell’header così nav e contrasto si adattano allo scroll.
 */
export function useNavSurfaceUnderHeader(
  headerRef: RefObject<HTMLElement | null>
): NavSurface {
  const pathname = usePathname();
  const [surface, setSurface] = useState<NavSurface>(() =>
    pathname === "/" ? "dark" : "light"
  );
  const rafRef = useRef<number>();

  const measure = useCallback(() => {
    const headerEl = headerRef.current;
    if (!headerEl || typeof document === "undefined") return;

    const rect = headerEl.getBoundingClientRect();
    const x = Math.min(Math.max(innerWidth / 2, 8), innerWidth - 8);
    const y = rect.bottom + 6;
    const yClamped = Math.min(Math.max(y, 1), innerHeight - 2);

    try {
      const stack = document.elementsFromPoint(x, yClamped);
      for (let i = 0; i < stack.length; i++) {
        const node = stack[i];
        if (!(node instanceof Element)) continue;
        if (headerEl.contains(node)) continue;
        const region = node.closest("[data-nav-surface]");
        if (region) {
          const v = region.getAttribute("data-nav-surface");
          const next = v === "dark" ? "dark" : "light";
          setSurface(next);
          return;
        }
      }
    } catch {
      /* ignore */
    }

    /* Gap tra blocchi / marker non ancora in DOM */
    const scrolled = typeof window !== "undefined" ? window.scrollY : 0;
    setSurface(scrolled < 120 && pathname === "/" ? "dark" : "light");
  }, [pathname, headerRef]);

  useEffect(() => {
    setSurface(pathname === "/" ? "dark" : "light");
    requestAnimationFrame(measure);
  }, [pathname, measure]);

  useEffect(() => {
    measure();

    const onScrollResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [measure]);

  return surface;
}
