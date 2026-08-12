// One-time image optimizer: resizes oversized photos to web dimensions and
// recompresses them, overwriting in place (same filenames, so no code/paths
// change). The team uploaded straight-from-phone photos (4-7MB each); this
// brings them to web-appropriate sizes. Originals remain in git history.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const DIR = 'public/images';
const MAX_DIM = 1920;              // cap longest edge — plenty for full-bleed heroes on retina
const THRESHOLD = 700 * 1024;     // only touch files larger than this

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIR);
let before = 0, after = 0, n = 0;
for (const f of files) {
  const ext = extname(f).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const sizeBefore = (await stat(f)).size;
  if (sizeBefore < THRESHOLD) continue;

  const input = await readFile(f);                 // read fully before overwriting
  const pipe = sharp(input, { failOn: 'none' })
    .rotate()                                       // honor EXIF orientation (phone photos)
    .resize(MAX_DIM, MAX_DIM, { fit: 'inside', withoutEnlargement: true });
  const out = ext === '.png'
    ? await pipe.png({ compressionLevel: 9, effort: 8 }).toBuffer()
    : await pipe.jpeg({ quality: 80, mozjpeg: true }).toBuffer();

  // Only rewrite if we actually saved space.
  if (out.length < sizeBefore) {
    await writeFile(f, out);
    before += sizeBefore; after += out.length; n++;
    console.log(`${(sizeBefore / 1048576).toFixed(1)}MB -> ${(out.length / 1024).toFixed(0)}KB   ${f}`);
  }
}
console.log(`\nOptimized ${n} images: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(2)}MB ` +
  `(saved ${((1 - after / before) * 100).toFixed(0)}%)`);
