"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  hallLabels,
  type ScheduleItem,
} from "@/content/schedule";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type ScheduleRowProps = {
  item: ScheduleItem;
  locale: AppLocale;
  isNow?: boolean;
  nowLabel?: string;
};

/** Строка расписания §4.5 — время mono / занятие / зал, волосяные разделители снаружи. */
export function ScheduleRow({
  item,
  locale,
  isNow = false,
  nowLabel,
}: ScheduleRowProps) {
  const reduce = useReducedMotion();

  return (
    <li
      className={cn(
        "relative border-b border-mineral last:border-b-0 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "[@media(hover:hover)]:hover:bg-mineral",
        isNow && "bg-mineral/40",
      )}
    >
      {isNow ? (
        <motion.span
          className="absolute inset-y-0 left-0 w-[3px] origin-top bg-pool"
          initial={reduce ? false : { scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
          aria-hidden
        />
      ) : null}
      <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-3 py-3.5 pl-4 pr-0 sm:grid-cols-[5.5rem_1fr_auto] sm:gap-4 sm:py-4 sm:pl-5 md:pl-6">
        <div className="flex flex-col gap-1">
          {isNow && nowLabel ? (
            <span className="font-mono-label text-pool">{nowLabel}</span>
          ) : null}
          <span className="font-mono text-lg font-medium tabular-nums text-ink md:text-xl">
            {item.time}
          </span>
        </div>
        <p className="text-[0.9375rem] font-medium text-ink md:text-base">
          {item.title[locale]}
        </p>
        <p className="col-span-2 font-mono-label text-ink/55 sm:col-span-1 sm:text-right">
          {hallLabels[item.hall][locale]}
        </p>
      </div>
    </li>
  );
}
