import { llmsFullTxt } from "../llms.txt/route";

/**
 * /llms-full.txt — the same index with each article's direct answer inlined,
 * so an assistant that fetches one file gets the answers rather than a list of
 * links it then has to crawl. Optional in the spec; cheap here because the
 * answers are already structured data.
 */
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
