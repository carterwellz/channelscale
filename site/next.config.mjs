import { resolve } from "node:path";
export default {
  turbopack: { root: resolve(import.meta.dirname, "..") },
  output: "export",
  poweredByHeader: false,
  env: { NEXT_PUBLIC_SITE_MODE: "production" },
  images: { unoptimized: true },
};
