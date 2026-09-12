"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useScrolledPast } from "@/lib/motion/useScrolledPast";
import { BRAND } from "@/lib/brand";

const NAV = [
  { href: "/the-loop", label: "The Loop" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/who-we-help/real-estate", label: "Who we help" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
];

export function Header() {
  const scrolled = useScrolledPast({ pixels: 40 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-30 transition-colors duration-200 ${
        scrolled ? "bg-paper/88 backdrop-blur-md border-b border-mist" : ""
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label={`${BRAND}, home`} className="flex items-center">
          <Logo className="h-11 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label press text-graphite hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="primary-cta hidden sm:inline-flex items-center h-11 px-5 rounded-full bg-signal-bright text-ink text-sm font-medium"
          >
            Book a 30-min call
          </Link>
          <button
            type="button"
            className="lg:hidden w-11 h-11 flex items-center justify-center"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-paper flex flex-col">
          <nav className="flex flex-col p-6 gap-1">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 py-4 border-b border-mist"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="font-mono text-xs text-graphite">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-h3 font-display">{item.label}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="primary-cta mt-6 inline-flex items-center justify-center h-12 rounded-full bg-signal-bright text-ink font-medium"
            >
              Book a 30-min call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
