"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/motion/useMediaQuery";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Magnetic hover, on springs.
 *
 * This used to drive `transform` through a CSS transition, which is the wrong
 * tool for anything the pointer is steering: a transition animates from wherever
 * it was declared to a fixed target over a fixed duration, so every new pointer
 * position restarts it and a reversal hard-cuts the velocity. A spring has no
 * duration and no scripted path. It always continues from the current value and
 * the current velocity, so retargeting it sixty times a second is exactly the
 * case it was built for, and letting go just means the target became zero.
 *
 * X and Y are independent springs. One spring over the 2D distance desyncs the
 * moment the two axes carry different velocities.
 *
 * Off entirely on coarse pointers and under reduced motion.
 */

// Apple's two parameters rather than mass/stiffness/damping.
// damping 1.0 = critically damped, no overshoot. Response = time to target.
const RESPONSE = 0.4;
const DAMPING = 1;

const OMEGA = (2 * Math.PI) / RESPONSE;
const ZETA = DAMPING;

export function Magnet({
  children,
  padding = 150,
  strength = 3,
  className,
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    // Current on-screen value and its velocity. The spring reads these every
    // frame, which is what makes it interruptible: a new target never causes a
    // jump, because the motion always resumes from where it actually is.
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    let last = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      const advance = (p: number, v: number, target: number) => {
        const d = p - target;
        const a = -OMEGA * OMEGA * d - 2 * ZETA * OMEGA * v;
        const nv = v + a * dt;
        return [p + nv * dt, nv] as const;
      };

      [x, vx] = advance(x, vx, tx);
      [y, vy] = advance(y, vy, ty);

      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      // Settled: stop the loop and drop the compositor hint. Leaving
      // will-change on permanently is what costs mid-range devices frames.
      const settled =
        Math.abs(x - tx) < 0.05 &&
        Math.abs(y - ty) < 0.05 &&
        Math.abs(vx) < 0.05 &&
        Math.abs(vy) < 0.05;

      if (settled && tx === 0 && ty === 0) {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.willChange = "auto";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (raf) return;
      el.style.willChange = "transform";
      last = performance.now();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // Measure from the settled centre, not the displaced one, or the element
      // chases its own offset and drifts away from the cursor.
      const cx = r.left + r.width / 2 - x;
      const cy = r.top + r.height / 2 - y;
      const within =
        e.clientX > r.left - padding &&
        e.clientX < r.right + padding &&
        e.clientY > r.top - padding &&
        e.clientY < r.bottom + padding;

      tx = within ? (e.clientX - cx) / strength : 0;
      ty = within ? (e.clientY - cy) / strength : 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, padding, strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
