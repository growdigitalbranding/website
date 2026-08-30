"use client";

import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { useScrolledPast } from "@/lib/motion/useScrolledPast";

export function StickyMobileCTA() {
  const visible = useScrolledPast({ progress: 0.6 });
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 h-14 bg-signal-bright text-ink flex items-center justify-between px-4">
      <Link href="/contact" className="font-medium flex-1">
        Book a 30-min call →
      </Link>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="w-11 h-11 flex items-center justify-center shrink-0"
      >
        <X size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
