import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getScheduleForDay,
  hallLabels,
  scheduleDisclaimer,
  type Weekday,
} from "@/content/schedule";
import { getTashkentWeekday } from "@/lib/time";
import type { AppLocale } from "@/lib/i18n/routing";

export async function SchedulePreview() {
  const t = await getTranslations("home.schedule");
  const locale = (await getLocale()) as AppLocale;
  const day = getTashkentWeekday() as Weekday;
  const items = getScheduleForDay(day).slice(0, 5);

  return (
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={
            <Link
              href="/schedule"
              className="text-sm font-semibold text-brass hover:text-brass-hover"
            >
              {t("full")}
            </Link>
          }
        />

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

        <p className="mt-4 text-xs text-smoke-muted">
          {scheduleDisclaimer[locale]}
        </p>
      </div>
    </section>
  );
}
