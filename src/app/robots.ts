import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /admin lists real people's names and phone numbers. The route is behind
    // auth, but a disallow keeps the URL itself out of indexes and out of the
    // crawl logs that get scraped for interesting paths. The pages also send
    // noindex headers, which is the half that binds crawlers who ignore this.
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
    sitemap: "https://growdigitalbranding.com/sitemap.xml",
  };
}
