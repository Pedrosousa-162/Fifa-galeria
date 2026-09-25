// Makes light WebP copies of public/images/* in public/thumbs/ for the gallery grid.
// The originals are untouched and still open full size in the lightbox.
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/thumbs";
const WIDTH = 1200;

await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (!/\.(png|jpe?g|webp|avif)$/i.test(file)) continue;
  const from = path.join(SRC, file);
  const to = path.join(OUT, `${path.parse(file).name}.webp`);
  const thumbTime = await stat(to).then((s) => s.mtimeMs, () => 0);
  if (thumbTime >= (await stat(from)).mtimeMs) continue; // already up to date
  await sharp(from).resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(to);
  console.log(`thumb: ${file} → ${to}`);
}
