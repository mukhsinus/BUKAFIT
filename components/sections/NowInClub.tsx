"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getCurrentClass,
  hallLabels,
  type ScheduleItem,
} from "@/content/schedule";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type NowInClubProps = {
  className?: string;
};

function buildLabel(
  item: ScheduleItem | null,
  locale: AppLocale,
  nowInClub: string,
  nowGymOpen: string,
): string {
  if (!item) return nowGymOpen;
  const hall = hallLabels[item.hall][locale];
  return `${nowInClub} · ${item.time} ${item.title[locale]} · ${hall}`;
}

/** Нижняя mono-полоса hero: из schedule.ts + текущего времени Ташкента. */
export function NowInClub({ className }: NowInClubProps) {
  const t = useTranslations("home.hero");
  const locale = useLocale() as AppLocale;
  const nowInClub = t("nowInClub");
  const nowGymOpen = t("nowGymOpen");
  const [label, setLabel] = useState(() =>
    buildLabel(getCurrentClass(), locale, nowInClub, nowGymOpen),
  );

  useEffect(() => {
    const tick = () =>
      setLabel(buildLabel(getCurrentClass(), locale, nowInClub, nowGymOpen));
    tick();
    const id = window.setInterval(tick, 30_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [locale, nowInClub, nowGymOpen]);

  return (
    <p
      className={cn("font-mono-label truncate text-chalk/80", className)}
      aria-live="polite"
    >
      {label}
    </p>
  );
}
