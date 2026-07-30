type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec?: number;
};

export type RateLimiter = {
  check: (key: string) => RateLimitResult;
};

type Bucket = {
  count: number;
  resetAt: number;
};

/**
 * In-memory rate limiter for a single Node process.
 * Replace with Redis / Upstash via the RateLimiter interface for multi-instance deploys.
 */
export function createMemoryRateLimiter(options: {
  limit: number;
  windowMs: number;
}): RateLimiter {
  const buckets = new Map<string, Bucket>();

  return {
    check(key: string): RateLimitResult {
      const now = Date.now();
      const existing = buckets.get(key);

      if (!existing || existing.resetAt <= now) {
        buckets.set(key, { count: 1, resetAt: now + options.windowMs });
        return { ok: true, remaining: options.limit - 1 };
      }

      if (existing.count >= options.limit) {
        return {
          ok: false,
          remaining: 0,
          retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
        };
      }

      existing.count += 1;
      return { ok: true, remaining: options.limit - existing.count };
    },
  };
}

/** Default: 5 leads per IP per 10 minutes */
export const leadRateLimiter = createMemoryRateLimiter({
  limit: 5,
  windowMs: 10 * 60 * 1000,
});
