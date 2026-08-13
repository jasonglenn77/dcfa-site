// Rasterize the square DC monogram favicon into the PNG sizes browsers/OSes need.
import sharp from 'sharp';
const svg = 'public/favicon.svg';
await sharp(svg, { density: 384 }).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(svg, { density: 384 }).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(svg, { density: 384 }).resize(16, 16).png().toFile('public/favicon-16.png');
console.log('favicon PNGs written');
