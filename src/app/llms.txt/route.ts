import { llmsTxt } from "@/lib/llms";

/**
 * /llms.txt. The content is generated in src/lib/llms.ts: a route file may
 * only export HTTP handlers and route config, and the Webpack build's type
 * check rejects anything else.
 */
export function GET() {
  return new Response(llmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
