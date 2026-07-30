"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  directionLabels,
  getScheduleForDay,
  hallLabels,
  scheduleDisclaimer,
  weekdays,
  weekdayLabels,
  type ScheduleDirection,
  type Weekday,
} from "@/content/schedule";
import { getTashkentWeekday } from "@/lib/time";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

const directions = Object.keys(directionLabels) as ScheduleDirection[];

export function ScheduleBoard() {
  const t = useTranslations("pages.schedule");
  const locale = useLocale() as AppLocale;
  const [day, setDay] = useState<Weekday>(() => getTashkentWeekday() as Weekday);
  const [direction, setDirection] = useState<ScheduleDirection | "all">("all");

  const items = useMemo(() => {
    const dayItems = getScheduleForDay(day);
    if (direction === "all") return dayItems;
    return dayItems.filter((item) => item.direction === direction);
  }, [day, direction]);

  return (
    <div className="space-y-6">
      <div
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
        role="tablist"
        aria-label={t("daysAria")}
      >
        {weekdays.map((weekday) => {
          const active = weekday === day;
          return (
            <button
              key={weekday}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setDay(weekday)}
              className={cn(
                "min-h-11 shrink-0 rounded-sm border px-3 text-sm font-semibold",
                active
                  ? "border-brass bg-brass/15 text-brass"
                  : "border-line text-smoke-muted hover:border-brass/50 hover:text-smoke",
              )}
            >
              {weekdayLabels[weekday][locale]}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2" aria-label={t("filtersAria")}>
        <FilterChip
          active={direction === "all"}
          label={t("allDirections")}
          onClick={() => setDirection("all")}
        />
        {directions.map((id) => (
          <FilterChip
            key={id}
            active={direction === id}
            label={directionLabels[id][locale]}
            onClick={() => setDirection(id)}
          />
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-smoke-muted">{t("empty")}</p>
      ) : (
        <ul className="divide-y divide-line border border-line bg-graphite-elevated">
          {items.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 px-4 py-3 text-sm md:grid-cols-[5.5rem_1fr_10rem] md:px-5"
            >
              <span className="font-display text-brass">{item.time}</span>
              <span className="text-smoke">{item.title[locale]}</span>
              <span className="text-right text-smoke-muted">
                {hallLabels[item.hall][locale]}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-smoke-muted">{scheduleDisclaimer[locale]}</p>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm border px-2.5 py-1 text-xs font-medium",
        active
          ? "border-brass bg-brass/15 text-brass"
          : "border-line text-smoke-muted hover:border-brass/60 hover:text-smoke",
      )}
    >
      {label}
    </button>
  );
}
