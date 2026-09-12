import type { MetadataRoute } from "next";

/**
 * Crawlers that build search indexes or ground AI answers. Every one of these
 * is already allowed by the wildcard rule below, so naming them changes
 * nothing about today's behaviour. They are listed for two reasons: the
 * policy becomes a deliberate decision rather than a default, and a future
 * restrictive wildcard rule cannot silently lock out the answer engines this
 * business needs to appear in.
 *
 * Note what being listed here does and does not buy. It is permission to
 * crawl, which is necessary and nowhere near sufficient: an engine still only
 * cites a page that has something specific and attributable to quote.
 */
const ANSWER_AND_SEARCH_AGENTS = [
  // OpenAI: training/index, ChatGPT search, and user-initiated fetches
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google. Google-Extended is a separate token governing Gemini grounding
  // and AI Overviews; disallowing it does not affect classic Search ranking,
  // and allowing it is the only way into those surfaces.
  "Googlebot",
  "Google-Extended",
  // Microsoft Copilot answers from the Bing index
  "Bingbot",
  // Apple Intelligence, same split as Google's
  "Applebot",
  "Applebot-Extended",
  // Meta AI
  "meta-externalagent",
  // Common Crawl, which feeds a long tail of open models
  "CCBot",
  // Others that ground assistant answers
  "DuckAssistBot",
  "Amazonbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ANSWER_AND_SEARCH_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        // /admin lists real people's names and phone numbers. Never any bot.
        disallow: ["/admin", "/admin/"],
      })),
      // The default for everything unnamed stays the same as before.
      {
        userAgent: "*",
        allow: "/",
        // The route is behind auth and the pages send noindex headers, which
        // is the half that binds crawlers ignoring this file. The disallow
        // keeps the URL out of indexes and out of the scraped crawl logs.
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: "https://growdigitalbranding.com/sitemap.xml",
    host: "https://growdigitalbranding.com",
  };
}
