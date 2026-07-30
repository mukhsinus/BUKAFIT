/** Shared SEO helpers — keep robots.txt and meta robots in sync. */

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

/**
 * Pre-launch default: site is closed to indexing unless explicitly opened.
 * Set NEXT_PUBLIC_NOINDEX=false to allow indexing.
 */
export function isNoIndex(): boolean {
  return process.env.NEXT_PUBLIC_NOINDEX !== "false";
}
