// Convert the high-res white-background JPEG logo into a transparent, tightly
// cropped PNG. Knocks out near-white pixels (the logo art is navy #0C4890 and
// steel #84848F, both far from white), then trims surrounding transparency.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'directconnectlogo.jpg');
const OUT = path.join(root, 'public/images/logo/dcfa-logo.png');

// Near-white cutoff. Any pixel whose darkest channel is >= this is background.
// Navy min-channel ~12, steel ~132 — both stay opaque with huge margin.
const WHITE = 230;

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Sanity: report the four corners so we can confirm the background really is white.
const corner = (x, y) => {
  const i = (y * width + x) * channels;
  return `${data[i]},${data[i + 1]},${data[i + 2]}`;
};
console.log('corners RGB:', corner(0, 0), corner(width - 1, 0), corner(0, height - 1), corner(width - 1, height - 1));

for (let p = 0; p < data.length; p += channels) {
  const min = Math.min(data[p], data[p + 1], data[p + 2]);
  if (min >= WHITE) data[p + 3] = 0; // background → transparent (hard edge; high-res downscale smooths it)
}

await sharp(data, { raw: { width, height, channels } })
  .trim() // crop the now-transparent margin
  .resize({ width: 800, withoutEnlargement: true }) // plenty for retina; keeps file small
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} — ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`);
