import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/content/services";
import { routing } from "@/lib/i18n/routing";
import { isNoIndex, siteOrigin } from "@/lib/seo";

const staticPaths = [
  "",
  "/pricing",
  "/schedule",
  "/services",
  "/trainers",
  "/about",
  "/contacts",
  "/faq",
  "/legal/privacy",
  "/legal/offer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  if (isNoIndex()) {
    return [];
  }

  const origin = siteOrigin();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${origin}/${locale}${path}`,
        lastModified: now,
      });
    }
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${origin}/${locale}/services/${slug}`,
        lastModified: now,
      });
    }
  }

  return entries;
}
