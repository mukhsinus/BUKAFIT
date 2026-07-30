import { club } from "@/content/club";
import type { AppLocale } from "@/lib/i18n/routing";

type FactsStripProps = {
  locale: AppLocale;
};

export function FactsStrip({ locale }: FactsStripProps) {
  return (
    <section
      aria-label="Facts"
      className="border-y border-line bg-graphite-elevated"
    >
      <div className="container-content">
        <ul className="flex snap-x gap-6 overflow-x-auto py-5 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:py-6">
          {club.facts.map((fact) => (
            <li
              key={fact.id}
              className="snap-start whitespace-nowrap font-display text-sm uppercase tracking-[0.08em] text-smoke md:text-center md:text-base"
            >
              {fact.label[locale]}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
