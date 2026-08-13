// Convert the high-res white-background JPEG logo into a transparent, tightly
// cropped PNG. Knocks out near-white pixels (the logo art is navy #0C4890 and
// steel #84848F, both far from white), then trims surrounding transparency.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'directconnectlogo.jpg');
const OUT = path.join(root, 'public/images/logo/dcfa-logo.png');

// Soft knockout ramp keyed on each pixel's darkest channel. Anything at/below LOW
// is real logo art (navy min ~12, steel ~132) and stays fully opaque; at/above
// HIGH is background and goes fully transparent; the band between is ramped so
// anti-aliased edges fade smoothly instead of leaving a hard near-white fringe
// (that fringe was what the footer's brightness filter amplified into a halo).
const LOW = 185;
const HIGH = 246;

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
  data[p + 3] = min <= LOW ? 255 : min >= HIGH ? 0 : Math.round((255 * (HIGH - min)) / (HIGH - LOW));
}

await sharp(data, { raw: { width, height, channels } })
  .trim() // crop the now-transparent margin
  .resize({ width: 800, withoutEnlargement: true }) // plenty for retina; keeps file small
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} — ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}`);
