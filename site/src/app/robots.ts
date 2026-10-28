import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/marketing-metadata";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_SITE_MODE !== "production") return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/app/", "/portal/", "/login"] }, sitemap: `${siteOrigin}/sitemap.xml` };
}
