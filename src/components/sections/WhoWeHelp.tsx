import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const TILES = [
  {
    href: "/who-we-help/real-estate",
    label: "Real Estate",
    desc: "Project launches, sustenance campaigns, and site-visit economics for ₹40L-₹5Cr inventory.",
    wide: true,
  },
  {
    href: "/who-we-help/senior-living",
    label: "Senior Living",
    desc: "Long sales cycles, trust-first creative, and a follow-up loop that doesn't feel like a call centre.",
    wide: false,
  },
  {
    href: "/who-we-help/interiors",
    label: "Interiors",
    desc: "Premium local service brands with a considered, high-ticket buying journey.",
    wide: false,
  },
];

export function WhoWeHelp() {
  return (
    <section className="py-20 md:py-28 bg-paper-2">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 className="text-h2 font-display font-bold mb-12 max-w-xl">
          Built for high-consideration purchases.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TILES.map((tile, i) => (
            <RevealOnScroll
              key={tile.href}
              delay={i * 0.08}
              className={tile.wide ? "md:col-span-2" : ""}
            >
              <Link
                href={tile.href}
                className="group relative block h-64 md:h-80 rounded-2xl bg-ink text-paper p-8 flex flex-col justify-end overflow-hidden"
              >
                <h3 className="text-h3 font-display font-bold">{tile.label}</h3>
                <p className="text-sm text-paper/70 mt-2 max-w-sm">{tile.desc}</p>
                <span className="mono-label text-signal-bright mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-[opacity,transform] duration-200 ease-out">
                  VIEW →
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
