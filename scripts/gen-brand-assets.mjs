// One-off generator for the brand resources page.
// Produces monochrome logo variants (white / black knockouts) from the existing
// PNG using its alpha channel as a mask, plus print-ready QR codes.
//   run: node scripts/gen-brand-assets.mjs
import sharp from 'sharp';
import QRCode from 'qrcode';
import { mkdir } from 'node:fs/promises';

const outDir = 'public/images/brand';
await mkdir(outDir, { recursive: true });

const logo = 'public/images/logo/dcfa-logo.png';
const { width, height } = await sharp(logo).metadata();

// Knockout variants: recolor every opaque pixel, keeping the logo's exact shape
// and anti-aliased edges (alpha used as the mask).
const alpha = await sharp(logo).ensureAlpha().extractChannel('alpha').raw().toBuffer();
async function knockout(rgb, out) {
  await sharp({ create: { width, height, channels: 3, background: rgb } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(out);
}
await knockout({ r: 255, g: 255, b: 255 }, `${outDir}/dcfa-logo-white.png`);
await knockout({ r: 0, g: 0, b: 0 }, `${outDir}/dcfa-logo-black.png`);

// QR codes — brand navy on white, sized for print.
// All point at flydcfa.com, never the workers.dev preview: printed material outlives
// the domain cutover, and these URLs resolve both before and after it.
const qrOpts = { width: 600, margin: 1, color: { dark: '#1e3a8a', light: '#ffffff' }, errorCorrectionLevel: 'M' };
const targets = [
  ['qr-website.png', 'https://flydcfa.com'],
  ['qr-contact.png', 'https://flydcfa.com/contact'],
  ['qr-instagram.png', 'https://www.instagram.com/flydcfa/'],
  ['qr-facebook.png', 'https://www.facebook.com/p/Direct-Connect-Flight-Academy-100063680315409/'],
  // Event flier: lands on the contact form with Discovery Flight preselected.
  // Higher error correction because a printed flier picks up creases and smudges.
  ['qr-flier.png', 'https://flydcfa.com/contact?program=Discovery%20Flight'],
];
for (const [file, url] of targets) {
  const opts = file === 'qr-flier.png' ? { ...qrOpts, width: 900, errorCorrectionLevel: 'H' } : qrOpts;
  await QRCode.toFile(`${outDir}/${file}`, url, opts);
}

console.log('Brand assets generated in', outDir);
