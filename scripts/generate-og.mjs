import sharp from "sharp";
import { resolve } from "node:path";

// Render a fresh share card from the same words used in the public hero.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fff"/>
  <rect x="70" y="64" width="48" height="48" rx="12" fill="#234bff"/>
  <path d="M84 96v-8 M94 96V80 M104 96V72" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <text x="134" y="101" fill="#171d2d" font-family="Arial, sans-serif" font-size="32" font-weight="700" letter-spacing="-1.3">ChannelScale<tspan fill="#234bff">.</tspan></text>
  <text x="70" y="272" fill="#171d2d" font-family="Arial, sans-serif" font-size="66" font-weight="600" letter-spacing="-3">Grow your channels.</text>
  <rect x="65" y="303" width="852" height="105" rx="22" fill="#234bff"/>
  <text x="89" y="376" fill="#fff" font-family="Arial, sans-serif" font-size="66" font-weight="700" letter-spacing="-3">Reach beyond them.</text>
  <text x="70" y="511" fill="#171d2d" font-family="Arial, sans-serif" font-size="27" font-weight="600">Managed content  ·  Clipping campaigns</text>
  <text x="70" y="558" fill="#606b80" font-family="Arial, sans-serif" font-size="23">channelscale.yt</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(resolve("site/public/og.png"));
