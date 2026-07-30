import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
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
  const items = getScheduleForDay(day).slice(0, 6);

  return (
    <section className="border-t border-line section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2 className="font-display text-display-section uppercase text-smoke">
                {t("title")}
              </h2>
              <p className="mt-1 text-sm text-smoke-muted">{t("description")}</p>
            </div>
            <Link
              href="/schedule"
              className="shrink-0 text-sm font-semibold text-brass hover:text-brass-hover"
            >
              {t("full")}
            </Link>
          </div>
        </Reveal>

        {items.length === 0 ? (
          <p className="text-smoke-muted">{t("empty")}</p>
        ) : (
          <div className="overflow-hidden border border-line bg-graphite-elevated">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="w-[4.25rem] whitespace-nowrap px-3 py-2.5 font-display text-brass md:w-[5rem] md:px-4">
                      {item.time}
                    </td>
                    <td className="px-1 py-2.5 text-smoke md:px-2">
                      {item.title[locale]}
                    </td>
                    <td className="hidden whitespace-nowrap px-3 py-2.5 text-right text-smoke-muted sm:table-cell md:px-4">
                      {hallLabels[item.hall][locale]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 text-xs text-smoke-muted">
          {scheduleDisclaimer[locale]}
        </p>
      </div>
    </section>
  );
}
