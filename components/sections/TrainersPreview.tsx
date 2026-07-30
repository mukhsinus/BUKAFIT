import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { MediaImage } from "@/components/media/MediaImage";
import { Reveal } from "@/components/motion/Reveal";
import { FEATURES } from "@/content/features";
import { trainers } from "@/content/trainers";
import type { AppLocale } from "@/lib/i18n/routing";

type TrainersPreviewProps = {
  showAllLink?: boolean;
};

export async function TrainersPreview({
  showAllLink = true,
}: TrainersPreviewProps) {
  if (!FEATURES.trainers || trainers.length === 0) {
    return null;
  }

  const t = await getTranslations("home.trainers");
  const locale = (await getLocale()) as AppLocale;

  return (
    <section className="border-t border-line section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                {t("eyebrow")}
              </p>
              <h2 className="font-display text-display-section uppercase text-smoke">
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-smoke-muted">{t("description")}</p>
            </div>
            {showAllLink ? (
              <Link
                href="/trainers"
                className="shrink-0 text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("all")}
              </Link>
            ) : null}
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <li
              key={trainer.id}
              className="border border-line bg-graphite-elevated p-3.5"
            >
              <div className="relative mb-3 aspect-[3/4] overflow-hidden bg-graphite-mid">
                <MediaImage
                  slot="trainers"
                  alt=""
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="absolute inset-0"
                />
              </div>
              <h3 className="font-display text-lg uppercase text-smoke">
                {trainer.name[locale]}
              </h3>
              <p className="mt-1.5 text-sm text-smoke-muted">
                {trainer.specialization[locale]}
              </p>
              {trainer.yearsExperience != null ? (
                <p className="mt-2 text-xs text-brass">
                  {t("experience", { years: trainer.yearsExperience })}
                </p>
              ) : (
                <p className="mt-2 text-xs text-smoke-muted">{t("experienceTodo")}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
