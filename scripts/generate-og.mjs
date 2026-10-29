// Regenerates the social preview image and PNG favicons in /public.
// Run with `npm run og` after changing the name/role. Output is committed, so CI never runs this.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const lights = Array.from({ length: 5 }, (_, i) => {
  const x = 700 + i * 84;
  return `<rect x="${x - 34}" y="78" width="68" height="150" rx="12" fill="#111114"/>
    <circle cx="${x}" cy="120" r="24" fill="#ff1e10"/><circle cx="${x}" cy="186" r="24" fill="#ff1e10"/>`;
}).join('');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="carbon" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="#0d0d10"/>
      <rect width="10" height="10" fill="#15161a"/><rect x="10" y="10" width="10" height="10" fill="#15161a"/>
    </pattern>
    <filter id="glow"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <rect width="1200" height="630" fill="url(#carbon)"/>
  <rect width="1200" height="630" fill="#0b0b0d" opacity="0.55"/>
  <path d="M0 560 L1200 470 L1200 630 L0 630 Z" fill="#131418"/>
  <path d="M520 0 h44 L404 630 h-44 Z" fill="#e10600" opacity="0.9"/>
  <g filter="url(#glow)" opacity="0.6">${lights}</g>
  ${lights}
  <text x="72" y="96" font-family="Menlo, monospace" font-size="22" font-weight="700" letter-spacing="6" fill="#c9cad0">LIGHTS OUT · P1</text>
  <rect x="72" y="112" width="70" height="4" fill="#e10600"/>
  <text x="72" y="330" font-family="Helvetica Neue, Arial, sans-serif" font-size="78" font-weight="300" fill="#ffffff">AVINASH</text>
  <text x="72" y="420" font-family="Helvetica Neue, Arial, sans-serif" font-size="104" font-weight="900" fill="#ffffff" letter-spacing="-2">KALAMATI</text>
  <text x="72" y="480" font-family="Menlo, monospace" font-size="24" font-weight="700" letter-spacing="2" fill="#ffffff">SOFTWARE DEVELOPMENT ENGINEER</text>
  <text x="72" y="516" font-family="Menlo, monospace" font-size="22" letter-spacing="2" fill="#9a9ca6">BACKEND &amp; AI INFRASTRUCTURE · REDMOND, WA</text>
  <text x="1128" y="590" text-anchor="end" font-family="Helvetica Neue, Arial, sans-serif" font-size="150" font-weight="900" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.9">01</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(`${publicDir}og.png`);

const favicon = await readFile(`${publicDir}favicon.svg`);
await sharp(favicon, { density: 384 }).resize(32, 32).png().toFile(`${publicDir}favicon-32.png`);
await sharp(favicon, { density: 384 }).resize(180, 180).flatten({ background: '#0b0b0d' }).png().toFile(`${publicDir}apple-touch-icon.png`);

console.log('Generated og.png, favicon-32.png, apple-touch-icon.png');
