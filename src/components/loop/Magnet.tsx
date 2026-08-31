"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Magnetic hover. Tracks the cursor relative to the element centre and applies
 * translate3d divided by `strength`, activating within `padding` of the edge.
 *
 * Off entirely on coarse pointers and under reduced motion. will-change is set
 * on activate and removed on deactivate, since leaving it on is what costs
 * mid-range devices frames.
 */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const within =
          e.clientX > r.left - padding &&
          e.clientX < r.right + padding &&
          e.clientY > r.top - padding &&
          e.clientY < r.bottom + padding;

        if (within) {
          el.style.willChange = "transform";
          el.style.transition = activeTransition;
          el.style.transform = `translate3d(${(e.clientX - cx) / strength}px, ${
            (e.clientY - cy) / strength
          }px, 0)`;
          setActive(true);
        } else if (active || el.style.transform) {
          el.style.transition = inactiveTransition;
          el.style.transform = "translate3d(0, 0, 0)";
          setActive(false);
          // Drop the hint once the settle transition has finished.
          window.setTimeout(() => {
            if (el) el.style.willChange = "auto";
          }, 600);
        }
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, padding, strength, activeTransition, inactiveTransition, active]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
