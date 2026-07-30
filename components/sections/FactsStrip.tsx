"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { club } from "@/content/club";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";

/** Спокойная премиальная скорость — не «вокзальная» бегущая строка. */
const SPEED_PX_PER_SEC = 40;

type FactsStripProps = {
  className?: string;
};

function FactDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-1 w-1 shrink-0 rounded-full bg-pool",
        className,
      )}
      aria-hidden
    />
  );
}

function FactRun({
  locale,
  ariaHidden,
  copies = 1,
}: {
  locale: AppLocale;
  ariaHidden?: boolean;
  copies?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {Array.from({ length: copies }, (_, copyIndex) => (
        <div
          key={copyIndex}
          className="flex shrink-0 items-center gap-7 pr-7"
        >
          {club.tickerItems.map((item) => (
            <Fragment key={`${copyIndex}-${item.id}`}>
              <span className="font-mono-label whitespace-nowrap text-chalk/85">
                {item.label[locale]}
              </span>
              <FactDot />
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

export function FactsStrip({ className }: FactsStripProps) {
  const locale = useLocale() as AppLocale;
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);
  const [unitWidth, setUnitWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const measure = useCallback(() => {
    const nextUnit = unitRef.current?.offsetWidth ?? 0;
    const nextViewport = viewportRef.current?.offsetWidth ?? 0;
    if (nextUnit > 0) setUnitWidth(nextUnit);
    if (nextViewport > 0) setViewportWidth(nextViewport);
  }, []);

  useEffect(() => {
    if (reduce) return;
    measure();
    const viewport = viewportRef.current;
    const unit = unitRef.current;
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    if (viewport) ro.observe(viewport);
    if (unit) ro.observe(unit);
    return () => ro.disconnect();
  }, [measure, reduce, locale]);

  // Один «полуцикл» всегда шире экрана — иначе между повторами виден пустой зазор.
  const copiesPerHalf =
    unitWidth > 0 && viewportWidth > 0
      ? Math.max(1, Math.ceil(viewportWidth / unitWidth) + 1)
      : 2;
  const durationSec =
    unitWidth > 0
      ? (unitWidth * copiesPerHalf) / SPEED_PX_PER_SEC
      : 30;

  if (reduce) {
    return (
      <section
        aria-label="Facts"
        className={cn(
          "flex min-h-14 w-full shrink-0 items-center justify-center bg-ink px-5 py-4 md:min-h-16",
          className,
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
          {club.tickerItems.map((item, index) => (
            <Fragment key={item.id}>
              {index > 0 ? <FactDot /> : null}
              <span className="font-mono-label text-chalk/85">
                {item.label[locale]}
              </span>
            </Fragment>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={viewportRef}
      aria-label="Facts"
      className={cn(
        "facts-marquee group/marquee relative flex h-14 w-full shrink-0 items-center overflow-hidden bg-ink md:h-16",
        className,
      )}
    >
      {/* Скрытый эталон ширины одного прогона (для расчёта копий и длительности) */}
      <div
        className="pointer-events-none absolute -z-10 flex opacity-0"
        aria-hidden
      >
        <div ref={unitRef} className="flex shrink-0 items-center gap-7 pr-7">
          {club.tickerItems.map((item) => (
            <Fragment key={item.id}>
              <span className="font-mono-label whitespace-nowrap text-chalk/85">
                {item.label[locale]}
              </span>
              <FactDot />
            </Fragment>
          ))}
        </div>
      </div>

      <div
        className="facts-marquee-track flex w-max will-change-transform"
        style={
          {
            "--facts-marquee-duration": `${durationSec}s`,
          } as CSSProperties
        }
      >
        <FactRun locale={locale} copies={copiesPerHalf} />
        <FactRun locale={locale} copies={copiesPerHalf} ariaHidden />
      </div>
    </section>
  );
}
