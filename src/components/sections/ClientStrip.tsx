import { Marquee } from "@/components/motion/Marquee";

// Placeholder client marks. These are invented names, so each gets a real
// monogram rather than a plain text wordmark, which reads as unfinished.
// Swap the whole list for the actual client logos before launch.
const CLIENTS = [
  { name: "VSK Housing", initials: "VSK", shape: "square" },
  { name: "TerraVista", initials: "TV", shape: "circle" },
  { name: "Silver Oaks", initials: "SO", shape: "circle" },
  { name: "Meridian Group", initials: "MG", shape: "square" },
  { name: "Blue Ridge Homes", initials: "BR", shape: "circle" },
  { name: "Palm Court", initials: "PC", shape: "square" },
  { name: "Aster Living", initials: "AL", shape: "circle" },
] as const;

export function ClientStrip() {
  return (
    <section className="border-y border-mist bg-paper-2 py-8">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="mono-label text-graphite mb-6 text-center md:text-left">
          Trusted by builders running ₹40L-₹5Cr inventory
        </p>
        <Marquee
          items={CLIENTS.map((c) => (
            <Monogram key={c.name} {...c} />
          ))}
        />
      </div>
    </section>
  );
}

function Monogram({
  name,
  initials,
  shape,
}: {
  name: string;
  initials: string;
  shape: "square" | "circle";
}) {
  return (
    <div className="flex items-center gap-3 whitespace-nowrap" title={name}>
      <svg viewBox="0 0 40 40" className="h-8 w-8 shrink-0" role="img" aria-label={name}>
        {shape === "circle" ? (
          <circle cx="20" cy="20" r="18" className="fill-none stroke-graphite" strokeWidth="1.5" />
        ) : (
          <rect
            x="3"
            y="3"
            width="34"
            height="34"
            rx="3"
            className="fill-none stroke-graphite"
            strokeWidth="1.5"
          />
        )}
        <text
          x="20"
          y="20"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-graphite font-mono"
          fontSize={initials.length > 2 ? 11 : 13}
        >
          {initials}
        </text>
      </svg>
      <span className="font-display font-semibold text-graphite text-base">{name}</span>
    </div>
  );
}
