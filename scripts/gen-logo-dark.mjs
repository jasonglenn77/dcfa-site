// Dark-mode logo: keep the two-tone brand look but lighten it so it reads
// brightly on the dark header/footer. Navy text -> bright blue, steel swoosh ->
// light silver. Uses the colour logo's own alpha so edges stay crisp.
import sharp from 'sharp';
const SRC = 'public/images/logo/dcfa-logo.png';
const OUT = 'public/images/brand/dcfa-logo-dark.png';
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const BLUE = [100, 165, 235];   // bright brand blue
const SILVER = [201, 206, 215]; // light steel
for (let p = 0; p < data.length; p += channels) {
  if (data[p + 3] === 0) continue;
  const r = data[p], b = data[p + 2];
  const c = (b - r) > 25 ? BLUE : SILVER; // blue-dominant = navy text; else steel
  data[p] = c[0]; data[p + 1] = c[1]; data[p + 2] = c[2];
}
await sharp(data, { raw: { width, height, channels } }).png().toFile(OUT);
// Composite on the footer bg to verify brightness + crispness.
const logo = await sharp(OUT).resize({ height: 64 }).toBuffer();
const { width: lw } = await sharp(logo).metadata();
await sharp({ create: { width: lw + 80, height: 120, channels: 4, background: { r:15,g:23,b:42,alpha:1 } } })
  .composite([{ input: logo, gravity: 'center' }]).png().toFile('scripts/_dark.png');
console.log('wrote', OUT);
