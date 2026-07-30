import type { MetadataRoute } from "next";
import { isNoIndex, siteOrigin } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (isNoIndex()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteOrigin()}/sitemap.xml`,
  };
}
