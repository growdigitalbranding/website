#!/usr/bin/env node
/**
 * Pre-generate responsive variants of the ad creatives.
 *
 * The homepage was transferring 2.2MB over 49 requests against 400-500KB for
 * every interior page. The whole difference is this folder: 19 WebPs at
 * 640x857, ~90KB each, displayed in a 260x325 tile. A phone at 390px CSS
 * width was downloading the desktop asset.
 *
 * Done at build time rather than through next/image on purpose. Runtime
 * optimization needs sharp resolvable in production and spends CPU per
 * request on a shared host; these are 19 fixed files that never change
 * between deploys, so the work belongs here. The output is plain static
 * files any CDN or origin serves without help.
 *
 * Widths cover the two rows (260 and 300 CSS px) at 1x and 2x. AVIF first,
 * WebP as the fallback for anything that does not take it; the original
 * 640px WebP stays as the final src so an ancient browser still renders.
 *
 * Idempotent: skips a variant whose file is newer than its source.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "public/creatives";
const OUT = join(SRC, "opt");
const WIDTHS = [300, 600];

async function newer(a, b) {
  try {
    const [x, y] = await Promise.all([stat(a), stat(b)]);
    return x.mtimeMs > y.mtimeMs;
  } catch {
    return false;
  }
}

const files = (await readdir(SRC)).filter((f) => /\.webp$/i.test(f));
await mkdir(OUT, { recursive: true });

let made = 0;
let bytesBefore = 0;
let bytesAfter = 0;

for (const file of files) {
  const src = join(SRC, file);
  bytesBefore += (await stat(src)).size;
  const base = file.replace(/\.webp$/i, "");

  for (const w of WIDTHS) {
    for (const [ext, encode] of [
      ["avif", (p) => p.avif({ quality: 52, effort: 6 })],
      ["webp", (p) => p.webp({ quality: 72, effort: 5 })],
    ]) {
      const out = join(OUT, `${base}-${w}.${ext}`);
      if (await newer(out, src)) continue;
      await encode(sharp(src).resize({ width: w, withoutEnlargement: true })).toFile(out);
      made++;
    }
    bytesAfter += (await stat(join(OUT, `${base}-${w}.avif`))).size;
  }
}

const kb = (n) => `${Math.round(n / 1024)}KB`;
console.log(`${files.length} sources, ${made} variants written`);
console.log(`originals ${kb(bytesBefore)} -> AVIF set ${kb(bytesAfter)} across ${WIDTHS.join("w, ")}w`);
