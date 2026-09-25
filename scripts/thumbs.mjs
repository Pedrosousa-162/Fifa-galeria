// Prepares the images before dev/build:
//  • light WebP copies of public/images/* in public/thumbs/ for the gallery grid
//  • finds the extra images in public/images/extras/<photo>/ and lists them in src/extras.json,
//    with small WebP copies in public/thumbs/extras/<photo>/ for the lightbox strip
// The originals are untouched and still open full size in the lightbox.
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "public/images";
const OUT = "public/thumbs";
const IMAGE = /\.(png|jpe?g|webp|avif)$/i;
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true });

async function thumb(from, to, width) {
  const thumbTime = await stat(to).then((s) => s.mtimeMs, () => 0);
  if (thumbTime >= (await stat(from)).mtimeMs) return; // already up to date
  await mkdir(path.dirname(to), { recursive: true });
  await sharp(from).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(to);
  console.log(`thumb: ${from} → ${to}`);
}

const webpName = (file) => `${path.parse(file).name}.webp`;

// Main photos
for (const file of await readdir(SRC)) {
  if (!IMAGE.test(file)) continue;
  await thumb(path.join(SRC, file), path.join(OUT, webpName(file)), 1200);
}

// Extra images per photo
const extras = {};
const extraDirs = await readdir(path.join(SRC, "extras"), { withFileTypes: true }).catch(() => []);
for (const dir of extraDirs.filter((d) => d.isDirectory()).sort((a, b) => byName(a.name, b.name))) {
  const files = (await readdir(path.join(SRC, "extras", dir.name))).filter((f) => IMAGE.test(f)).sort(byName);
  if (!files.length) continue;
  extras[dir.name] = files.map((f) => `extras/${dir.name}/${f}`);
  for (const f of files) {
    await thumb(path.join(SRC, "extras", dir.name, f), path.join(OUT, "extras", dir.name, webpName(f)), 480);
  }
}

await writeFile("src/extras.json", JSON.stringify(extras, null, 2) + "\n");
const count = Object.values(extras).flat().length;
console.log(`extras: ${count} image(s) across ${Object.keys(extras).length} photo(s)`);
