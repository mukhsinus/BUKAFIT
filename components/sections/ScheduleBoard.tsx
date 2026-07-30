"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
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
  const reduce = useReducedMotion();
  const [day, setDay] = useState<Weekday>(() => getTashkentWeekday() as Weekday);
  const [direction, setDirection] = useState<ScheduleDirection | "all">("all");

  const items = useMemo(() => {
    const dayItems = getScheduleForDay(day);
    if (direction === "all") return dayItems;
    return dayItems.filter((item) => item.direction === direction);
  }, [day, direction]);

  return (
    <div className="space-y-5">
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
              id={`day-tab-${weekday}`}
              aria-controls="schedule-panel"
              tabIndex={active ? 0 : -1}
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

      <LayoutGroup>
        <div className="flex flex-wrap gap-2" aria-label={t("filtersAria")}>
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
          <p className="text-smoke-muted">{t("empty")}</p>
        ) : (
          <ul className="divide-y divide-line border border-line bg-graphite-elevated">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 px-4 py-2.5 text-sm md:grid-cols-[5.5rem_1fr_10rem] md:px-5"
                >
                  <span className="font-display text-brass">{item.time}</span>
                  <span className="text-smoke">{item.title[locale]}</span>
                  <span className="text-right text-smoke-muted">
                    {hallLabels[item.hall][locale]}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <p className="text-xs text-smoke-muted">{scheduleDisclaimer[locale]}</p>
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
    <motion.button
      type="button"
      onClick={onClick}
      layout={!reduce}
      className={cn(
        "relative rounded-sm border px-2.5 py-1 text-xs font-medium",
        active
          ? "border-brass text-brass"
          : "border-line text-smoke-muted hover:border-brass/60 hover:text-smoke",
      )}
    >
      {active && !reduce ? (
        <motion.span
          layoutId="filter-chip-active"
          className="absolute inset-0 -z-10 rounded-sm bg-brass/15"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : active ? (
        <span className="absolute inset-0 -z-10 rounded-sm bg-brass/15" />
      ) : null}
      {label}
    </motion.button>
  );
}
