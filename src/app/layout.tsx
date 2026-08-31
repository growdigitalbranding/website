import type { Metadata } from "next";
import "./globals.css";
import { bricolage, interTight, jetbrainsMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteChrome } from "@/components/SiteChrome";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { organizationJsonLd } from "@/lib/schema/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL("https://growdigitalbranding.com"),
  title: {
    default: "Grow Digital Branding | Performance marketing for builders",
    template: "%s | Grow",
  },
  description:
    "Most agencies stop at the lead. Grow runs the whole loop. Creative volume, clean signal, and follow-up that actually closes. Real estate first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <div className="grain" aria-hidden="true" />
          <SiteChrome slot="top" />
          <main className="flex-1 relative z-[2]">{children}</main>
          <SiteChrome slot="bottom" />
          <StickyMobileCTA />
        </LenisProvider>
      </body>
    </html>
  );
}
