import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Set by `scripts/run-next.mjs` for `npm run dev` only — keeps production
  // output in `.next` for Netlify while isolating the live dev cache.
  distDir: process.env.BUKAFIT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    // PackFileCacheStrategy rename races as EPERM on Windows when AV / another
    // Next process locks `.pack.gz` files — memory cache avoids that corruption.
    if (dev && process.platform === "win32") {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
