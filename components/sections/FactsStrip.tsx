"use client";

import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { club } from "@/content/club";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";

type FactsStripProps = {
  locale: AppLocale;
};

export function FactsStrip({ locale }: FactsStripProps) {
  return (
    <Reveal>
      <section aria-label="Facts" className="border-y border-mineral bg-chalk">
        <div className="container-content">
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {club.facts.map((fact, index) => (
              <li
                key={fact.id}
                className={cn(
                  "py-8",
                  index % 2 === 1 && "border-l border-mineral pl-5 sm:pl-6",
                  index < 2 && "border-b border-mineral lg:border-b-0",
                  index > 0 && "lg:border-l lg:border-mineral lg:pl-8 xl:pl-10",
                  index % 2 === 0 && "lg:pr-8 xl:pr-10",
                  index === 0 && "lg:pl-0",
                )}
              >
                <p className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-none tracking-[-0.03em] text-ink">
                  <CountUp
                    value={fact.value}
                    durationMs={900}
                    suffix={"suffix" in fact ? fact.suffix : ""}
                  />
                </p>
                <p className="mt-3 font-mono-label text-ink/70">
                  {fact.caption[locale]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
