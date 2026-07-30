"use client";

import { CountUp } from "@/components/motion/CountUp";
import { club } from "@/content/club";
import type { AppLocale } from "@/lib/i18n/routing";

type FactsStripProps = {
  locale: AppLocale;
};

export function FactsStrip({ locale }: FactsStripProps) {
  const areaSuffix = locale === "ru" ? " м²" : " m²";

  const labels = club.facts.map((fact) => {
    if (fact.id === "area") {
      return (
        <span key={fact.id} className="inline-flex items-baseline">
          <CountUp value={club.areaSqm} />
          {areaSuffix}
        </span>
      );
    }
    return <span key={fact.id}>{fact.label[locale]}</span>;
  });

  const renderRow = (prefix: string, ariaHidden?: boolean) =>
    labels.map((node, index) => (
      <li
        key={`${prefix}-${index}`}
        className="inline-flex shrink-0 items-center gap-8 font-display text-sm uppercase tracking-[0.1em] text-smoke md:text-base"
        aria-hidden={ariaHidden || undefined}
      >
        {node}
        <span className="text-brass" aria-hidden>
          ·
        </span>
      </li>
    ));

  return (
    <section
      aria-label="Facts"
      className="overflow-hidden border-y border-line bg-graphite-elevated"
    >
      <div className="relative flex py-3.5 md:py-4">
        <ul className="flex min-w-max items-center gap-8 pr-8 motion-safe:animate-marquee">
          {renderRow("a")}
          {renderRow("b", true)}
        </ul>
      </div>
    </section>
  );
}
