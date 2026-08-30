"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
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
  }, [reduced]);

  // reducedMotion="user" drops transform animations but keeps opacity, so
  // reveals stay legible instead of vanishing. CSS alone can't do this for
  // Framer Motion — it writes inline styles the media query never sees.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
