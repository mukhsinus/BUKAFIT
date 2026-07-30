export type UtmParams = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UtmQueryKey = (typeof UTM_KEYS)[number];

const mapKey: Record<UtmQueryKey, keyof UtmParams> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
  utm_term: "term",
};

const STORAGE_KEY = "bukafit_utm";

export function readUtmFromSearch(search: string): UtmParams {
  const params = new URLSearchParams(
    search.startsWith("?") ? search : `?${search}`,
  );
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      utm[mapKey[key]] = value.slice(0, 100);
    }
  }

  return utm;
}

export function persistUtm(utm: UtmParams): void {
  if (typeof window === "undefined") return;
  if (Object.keys(utm).length === 0) return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    /* ignore quota / private mode */
  }
}

export function loadPersistedUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/** Capture UTM from current URL once and keep for the session */
export function captureUtmFromWindow(): UtmParams {
  if (typeof window === "undefined") return {};
  const fromUrl = readUtmFromSearch(window.location.search);
  if (Object.keys(fromUrl).length > 0) {
    persistUtm(fromUrl);
    return fromUrl;
  }
  return loadPersistedUtm();
}

export function formatUtmForMessage(utm: UtmParams): string {
  const parts: string[] = [];
  if (utm.source) parts.push(`source=${utm.source}`);
  if (utm.medium) parts.push(`medium=${utm.medium}`);
  if (utm.campaign) parts.push(`campaign=${utm.campaign}`);
  if (utm.content) parts.push(`content=${utm.content}`);
  if (utm.term) parts.push(`term=${utm.term}`);
  return parts.length > 0 ? parts.join(", ") : "—";
}
