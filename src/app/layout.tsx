import type { Metadata, Viewport } from "next";
import "./globals.css";
import { bricolage, interTight, jetbrainsMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { Grain } from "@/components/Grain";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { organizationJsonLd } from "@/lib/schema/jsonld";
import { Analytics, AnalyticsNoScript } from "@/components/Analytics";
import { getGtmContainerId } from "@/lib/settings";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://growdigitalbranding.com"),
  title: {
    default: `${BRAND} | Performance marketing for builders`,
    template: `%s | ${BRAND}`,
  },
  description:
    "Most agencies stop at the lead. Grow runs the whole loop. Creative volume, clean signal, and follow-up that actually closes. Real estate first.",
  alternates: { canonical: "/" },
  // favicon.ico, icon.svg and apple-icon.png are picked up from src/app by
  // file convention; the manifest is the one that has to be declared.
  manifest: "/site.webmanifest",
  // Without these every shared link renders as a blank card, which is most of
  // how this site actually gets seen: pasted into WhatsApp and email.
  // metadataBase above resolves the relative path, so this stays correct on
  // any host. 2400x1260 is the 1.91:1 card at 2x, for retina previews.
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: "en_IN",
    url: "/",
    title: "Most agencies stop at the lead. We run the loop.",
    description:
      "Performance marketing for real estate developers across Tamil Nadu and Karnataka. Creative volume, clean signal, and follow-up that closes.",
    images: [
      {
        url: "/og.png",
        width: 2400,
        height: 1260,
        alt: `${BRAND}. Most agencies stop at the lead. We run the loop.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Most agencies stop at the lead. We run the loop.",
    description:
      "Performance marketing for real estate developers across Tamil Nadu and Karnataka.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  // Colours the browser chrome around the page: the address bar on Android
  // and the status bar area of an installed shortcut.
  themeColor: "#14171a",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Cached and tagged, so this does not make every page dynamic. Null until a
  // container is set in the dashboard, in which case nothing is rendered and
  // no third-party script loads at all.
  const gtm = await getGtmContainerId();

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <AnalyticsNoScript containerId={gtm} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Analytics containerId={gtm} />
        <LenisProvider>
          <Grain />
          <SiteChrome slot="top" />
          <main className="flex-1 relative z-[2]">{children}</main>
          <SiteChrome slot="bottom" />
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
