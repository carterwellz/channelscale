import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const files = [
  "src/app/layout.tsx", "src/app/page.tsx", "src/app/globals.css", "src/app/robots.ts", "src/app/sitemap.ts",
  "src/app/[page]/page.tsx", "src/app/work/[slug]/page.tsx",
  ...["marketing", "public-shell", "ui", "case-studies", "digital-type", "inquiry-form", "marketing-events", "marketing-link"].map(n => `src/components/${n}.tsx`),
  ...["case-studies", "social-proof", "marketing-metadata", "intake"].map(n => `src/lib/${n}.ts`),
];
// Deliberate allowlist: never copy app/portal routes, database, env, uploads or draft agreements.
for (const name of ["bible-alive-logo.jpg", "bowmar-logo.png", "carter.jpeg", "counterpoint.jpg", "counterpoint-logo.png", "youtube.svg", "instagram.svg", "tiktok.svg", "facebook.svg"]) files.push(`public/work/${name}`);
for (const file of files) {
  const target = resolve(root, "site", file);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(resolve(root, "redesign", file), target);
}
console.log(`Synced ${files.length} approved marketing files. No private workspace data copied.`);
