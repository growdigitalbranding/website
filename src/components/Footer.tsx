import Link from "next/link";
import { Logo } from "@/components/Logo";
import { PHONE } from "@/lib/contact";

const COLUMNS = [
  {
    title: "What we do",
    links: [
      { href: "/what-we-do/performance-marketing", label: "Performance marketing" },
      { href: "/what-we-do/creative-engine", label: "Creative engine" },
      { href: "/what-we-do/tracking-attribution", label: "Tracking & attribution" },
      { href: "/what-we-do/follow-up-systems", label: "Follow-up systems" },
      { href: "/what-we-do/ai-search-visibility", label: "AI search visibility" },
    ],
  },
  {
    title: "Who we help",
    links: [
      { href: "/who-we-help/real-estate", label: "Real estate" },
      { href: "/who-we-help/senior-living", label: "Senior living" },
      { href: "/who-we-help/interiors", label: "Interiors" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/the-loop", label: "The loop" },
      { href: "/work", label: "Work" },
      { href: "/pricing", label: "Pricing" },
      { href: "/about", label: "About" },
      { href: "/insights", label: "Insights" },
    ],
  },
  {
    title: "Tools",
    links: [
      { href: "/tools/cpl-calculator", label: "CPL calculator" },
      { href: "/tools/tracking-health-check", label: "Tracking health check" },
      { href: "/tools/creative-fatigue-estimator", label: "Creative fatigue estimator" },
      { href: "/tracking-setup", label: "Our tracking setup" },
    ],
  },
];

export function Footer() {
  const lastUpdate = new Date().toISOString().slice(0, 10);

  return (
    <footer className="border-t border-mist bg-paper-2">
      <div className="mx-auto max-w-[1440px] px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mono-label text-graphite mb-4">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-signal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-mist">
        <div className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-sm text-graphite">
          <div>
            <Logo variant="full" className="h-14 w-auto mb-2" />
            <p>Coimbatore, Tamil Nadu, India</p>
            <p>
              <a href={`tel:${PHONE}`} className="hover:text-signal">
                +91 00000 00000
              </a>{" "}
              <span className="text-xs">(placeholder, update)</span>
            </p>
          </div>
          <nav className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-signal">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-signal">
              Terms
            </Link>
          </nav>
          <p className="font-mono text-xs">LAST SITE UPDATE: {lastUpdate}</p>
        </div>
      </div>
    </footer>
  );
}
