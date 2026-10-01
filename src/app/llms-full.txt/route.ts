import { llmsFullTxt } from "@/lib/llms";

/**
 * /llms-full.txt — the same index followed by every article in full as
 * Markdown: answer, argument, tables, formulas, FAQ and primary sources. An
 * assistant that fetches one file gets the whole body of work rather than a
 * list of links it then has to crawl. Optional in the spec; cheap here
 * because the articles are already structured data.
 */
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
