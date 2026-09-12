// Converts whatever is in public/creatives (and public/proof) to WebP at the
// widths those tiles actually render, then deletes the originals. The Meta CDN
// hands back full-resolution JPEGs; the marquee shows them at 240px wide.
//
//   npm i --no-save sharp && node scripts/to-webp.mjs
import { readdir, unlink, stat } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const JOBS = [
  { dir: "public/creatives", width: 640 },  // 240px tile at 2x, plus headroom
  { dir: "public/proof", width: 1400 },
];

for (const { dir, width } of JOBS) {
  let files;
  try {
    files = await readdir(dir);
  } catch {
    continue;
  }
  const sources = files.filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (!sources.length) continue;

  let before = 0;
  let after = 0;
  for (const f of sources) {
    const src = join(dir, f);
    const out = join(dir, `${parse(f).name}.webp`);
    before += (await stat(src)).size;
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    after += (await stat(out)).size;
    await unlink(src);
  }
  const pct = (100 * (1 - after / before)).toFixed(1);
  console.log(
    `${dir}: ${sources.length} files, ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB (${pct}% smaller)`,
  );
}
