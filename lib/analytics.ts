export type AnalyticsEvent =
  | "view_pricing"
  | "select_plan"
  | "open_lead_form"
  | "submit_lead"
  | "click_tg"
  | "click_call";

export type AnalyticsPayload = {
  planId?: string;
  source?: string;
  path?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

/**
 * Fire a conversion event. No-ops gracefully when analytics IDs are unset.
 * In development without IDs, logs to console for verification.
 */
export function trackEvent(
  event: AnalyticsEvent,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") return;

  const metricaId = process.env.NEXT_PUBLIC_METRICA_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (metricaId && typeof window.ym === "function") {
    const id = Number(metricaId);
    if (!Number.isNaN(id)) {
      window.ym(id, "reachGoal", event, payload);
    }
  }

  if (gaId && typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (
    (!metricaId && !gaId && process.env.NODE_ENV === "development") ||
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true"
  ) {
    console.info("[analytics]", event, payload);
  }
}
