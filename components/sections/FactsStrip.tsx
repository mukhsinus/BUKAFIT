"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import { useReducedMotion } from "framer-motion";
import { club } from "@/content/club";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";

/** Спокойная премиальная скорость — не «вокзальная» бегущая строка. */
const SPEED_PX_PER_SEC = 40;

type FactsStripProps = {
  locale: AppLocale;
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
  measureRef,
}: {
  locale: AppLocale;
  ariaHidden?: boolean;
  measureRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={measureRef}
      className="flex shrink-0 items-center gap-7 pr-7"
      aria-hidden={ariaHidden || undefined}
    >
      {club.tickerItems.map((item) => (
        <Fragment key={item.id}>
          <span className="font-mono-label whitespace-nowrap text-chalk/85">
            {item.label[locale]}
          </span>
          <FactDot />
        </Fragment>
      ))}
    </div>
  );
}

export function FactsStrip({ locale }: FactsStripProps) {
  const reduce = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState(30);

  const measure = useCallback(() => {
    const width = groupRef.current?.offsetWidth ?? 0;
    if (width <= 0) return;
    setDurationSec(width / SPEED_PX_PER_SEC);
  }, []);

  useEffect(() => {
    if (reduce) return;
    measure();
    const el = groupRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, reduce, locale]);

  if (reduce) {
    return (
      <section
        aria-label="Facts"
        className="flex min-h-14 w-full items-center justify-center bg-ink px-5 py-4 md:min-h-16"
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
      aria-label="Facts"
      className="facts-marquee group/marquee relative flex h-14 w-full items-center overflow-hidden bg-ink md:h-16"
    >
      <div
        className="facts-marquee-track flex w-max will-change-transform"
        style={
          {
            "--facts-marquee-duration": `${durationSec}s`,
          } as CSSProperties
        }
      >
        <FactRun locale={locale} measureRef={groupRef} />
        <FactRun locale={locale} ariaHidden />
      </div>
    </section>
  );
}
