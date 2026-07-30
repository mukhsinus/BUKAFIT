import { NextResponse } from "next/server";
import { leadBodySchema } from "@/lib/validations/lead";
import { leadRateLimiter } from "@/lib/rate-limit";
import { sendLeadToTelegram } from "@/lib/telegram";
import { leadStore } from "@/lib/lead-store";

export const runtime = "nodejs";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = leadBodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot filled → pretend success (do not tip bots)
  if (lead.website && lead.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const limit = leadRateLimiter.check(clientKey(request));
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limit",
        retryAfterSec: limit.retryAfterSec,
      },
      {
        status: 429,
        headers: limit.retryAfterSec
          ? { "Retry-After": String(limit.retryAfterSec) }
          : undefined,
      },
    );
  }

  const telegram = await sendLeadToTelegram(lead);

  const stored = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    telegramOk: telegram.ok,
  };

  await leadStore.save(stored);

  if (!telegram.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "telegram",
        detail: telegram.error,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, id: stored.id });
}
