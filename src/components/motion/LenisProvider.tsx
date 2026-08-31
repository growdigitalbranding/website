"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  // Smooth scroll is a narrative device for the marketing pages. On a working
  // list it fights the user: hitting End or dragging the scrollbar to find a
  // lead should land immediately, not glide.
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    if (reduced || isAdmin) return;
    let lenis: import("lenis").default | undefined;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.0, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced, isAdmin]);

  // reducedMotion="user" drops transform animations but keeps opacity, so
  // reveals stay legible instead of vanishing. CSS alone can't do this for
  // Framer Motion. It writes inline styles the media query never sees.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
