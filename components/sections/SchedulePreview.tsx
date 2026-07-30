"use client";

import { useMemo, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ScheduleRow } from "@/components/ui/ScheduleRow";
import {
  getCurrentClass,
  getScheduleForDay,
  scheduleDisclaimer,
  weekdays,
  weekdayLabels,
  type Weekday,
} from "@/content/schedule";
import { getTashkentWeekday } from "@/lib/time";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

export function SchedulePreview() {
  const t = useTranslations("home.schedule");
  const locale = useLocale() as AppLocale;
  const reduce = useReducedMotion();
  const [day, setDay] = useState<Weekday>(() => getTashkentWeekday() as Weekday);

  const today = getTashkentWeekday() as Weekday;
  const current = useMemo(() => getCurrentClass(), []);
  const items = useMemo(() => getScheduleForDay(day).slice(0, 8), [day]);

  return (
    <section id="schedule" className="section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-display-section text-ink">
              {t("title")}
            </h2>
            <Link
              href="/schedule"
              className="group shrink-0 text-sm font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
            >
              {t("full")}
              <span
                className="ms-1 inline-block transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          </div>

          <LayoutGroup id="schedule-preview-days">
            <div
              className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    aria-controls="schedule-preview-panel"
                    id={`preview-day-${weekday}`}
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
                          layoutId="schedule-preview-day-pill"
                          className="absolute inset-0 -z-10 radius-pill bg-ink"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 32,
                          }}
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

          <div
            id="schedule-preview-panel"
            role="tabpanel"
            aria-labelledby={`preview-day-${day}`}
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
                    nowLabel={t("now")}
                    isNow={day === today && current?.id === item.id}
                  />
                ))}
              </ul>
            )}
          </div>

          <p className="mt-4 text-sm text-ink/60">{scheduleDisclaimer[locale]}</p>
        </Reveal>
      </div>
    </section>
  );
}
