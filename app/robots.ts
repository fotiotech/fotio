import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSettings();
  const baseUrl = (site.siteUrl ?? "https://example.com").replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/admin",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
