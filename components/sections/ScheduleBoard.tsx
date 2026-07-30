"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ScheduleRow } from "@/components/ui/ScheduleRow";
import {
  directionLabels,
  getCurrentClass,
  getScheduleForDay,
  scheduleDisclaimer,
  weekdays,
  weekdayLabels,
  type ScheduleDirection,
  type Weekday,
} from "@/content/schedule";
import { club } from "@/content/club";
import { getTashkentWeekday } from "@/lib/time";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

const directions = Object.keys(directionLabels) as ScheduleDirection[];

export function ScheduleBoard() {
  const t = useTranslations("pages.schedule");
  const tHome = useTranslations("home.schedule");
  const locale = useLocale() as AppLocale;
  const reduce = useReducedMotion();
  const [day, setDay] = useState<Weekday>(() => getTashkentWeekday() as Weekday);
  const [direction, setDirection] = useState<ScheduleDirection | "all">("all");

  const today = getTashkentWeekday() as Weekday;
  const current = useMemo(() => getCurrentClass(), []);

  const items = useMemo(() => {
    const dayItems = getScheduleForDay(day);
    if (direction === "all") return dayItems;
    return dayItems.filter((item) => item.direction === direction);
  }, [day, direction]);

  return (
    <div className="space-y-6">
      <LayoutGroup id="schedule-days">
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
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
                aria-expanded={active}
                id={`day-tab-${weekday}`}
                aria-controls="schedule-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setDay(weekday)}
                className={cn(
                  "relative shrink-0 radius-pill px-4 py-2 font-mono-label transition-colors duration-200",
                  active ? "text-chalk" : "text-ink/60 hover:text-ink",
                )}
              >
                {active ? (
                  reduce ? (
                    <span className="absolute inset-0 -z-10 radius-pill bg-ink" />
                  ) : (
                    <motion.span
                      layoutId="schedule-day-pill"
                      className="absolute inset-0 -z-10 radius-pill bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )
                ) : null}
                <span className="relative z-[1]">
                  {weekdayLabels[weekday][locale]}
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <LayoutGroup id="schedule-filters">
        <div
          className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x"
          aria-label={t("filtersAria")}
        >
          <FilterChip
            active={direction === "all"}
            label={t("allDirections")}
            onClick={() => setDirection("all")}
            reduce={!!reduce}
          />
          {directions.map((id) => (
            <FilterChip
              key={id}
              active={direction === id}
              label={directionLabels[id][locale]}
              onClick={() => setDirection(id)}
              reduce={!!reduce}
            />
          ))}
        </div>
      </LayoutGroup>

      <div
        id="schedule-panel"
        role="tabpanel"
        aria-labelledby={`day-tab-${day}`}
      >
        {items.length === 0 ? (
          <p className="text-ink/70">{t("empty")}</p>
        ) : (
          <ul className="border-y border-mineral">
            {items.map((item) => (
              <ScheduleRow
                key={item.id}
                item={item}
                locale={locale}
                nowLabel={tHome("now")}
                isNow={day === today && current?.id === item.id}
              />
            ))}
          </ul>
        )}
      </div>

      <p className="text-sm text-ink/60">
        {scheduleDisclaimer[locale]}{" "}
        <a
          href={club.social.telegramChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
        >
          Telegram @{club.social.telegramChannel}
        </a>
      </p>
    </div>
  );
}

function FilterChip({
  active,
  label,
  onClick,
  reduce,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  reduce: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative shrink-0 radius-pill px-3.5 py-1.5 font-mono-label transition-colors duration-200",
        active ? "text-chalk" : "text-ink/55 hover:text-ink",
      )}
    >
      {active ? (
        reduce ? (
          <span className="absolute inset-0 -z-10 radius-pill bg-ink" />
        ) : (
          <motion.span
            layoutId="schedule-filter-pill"
            className="absolute inset-0 -z-10 radius-pill bg-ink"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )
      ) : null}
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}
