import type { MetadataRoute } from "next";
import { publicPages, siteOrigin } from "@/lib/marketing-metadata";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(publicPages).filter(path => path !== "services").map(path => ({ url: `${siteOrigin}/${path}` }));
}
