import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Which image assets actually exist in /public, read at build time.
 *
 * This replaces the HAS_ASSETS flags. Those were all-or-nothing: the section
 * showed placeholders until every one of 21 files existed, so uploading six
 * real creatives changed nothing. Reading the directory means any subset
 * works — upload what you have, and the site uses it on the next build.
 *
 * Server-only. Called from page components, never from a client component.
 */
export function listAssets(folder: string): string[] {
  const dir = join(process.cwd(), "public", folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f))
    .sort();
}
