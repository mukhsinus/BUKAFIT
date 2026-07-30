import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
    <section className="border-t border-line py-[clamp(4rem,10vw,7.5rem)]">
      <div className="container-content">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={
            showAllLink ? (
              <Link
                href="/trainers"
                className="text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("all")}
              </Link>
            ) : undefined
          }
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <li
              key={trainer.id}
              className="border border-line bg-graphite-elevated p-4"
            >
              <div className="mb-4 aspect-[3/4] overflow-hidden bg-graphite">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/placeholders/trainers/placeholder.svg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display text-lg uppercase text-smoke">
                {trainer.name[locale]}
              </h3>
              <p className="mt-2 text-sm text-smoke-muted">
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
