"use client";

import { useTranslations } from "next-intl";
import { OpenNowBadge } from "@/components/layout/OpenNowBadge";
import { HeroMedia } from "@/components/media/HeroMedia";
import { useLead } from "@/components/lead/LeadProvider";
import { club } from "@/content/club";
import { getRecommendedPlan } from "@/content/plans";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const t = useTranslations("home.hero");
  const tCta = useTranslations("cta");
  const { openLead } = useLead();
  const recommended = getRecommendedPlan();

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroMedia mode="image" alt={club.name} src="/media/placeholders/hero.svg" />
      <div className="relative container-content flex min-h-[100svh] flex-col justify-end pb-28 pt-28 md:pb-20">
        <OpenNowBadge size="md" className="mb-6" />
        <p className="font-display text-sm uppercase tracking-[0.2em] text-brass md:text-base">
          {club.name}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-display-hero uppercase text-smoke">
          {t("headline")}
        </h1>
        <p className="mt-4 max-w-lg text-smoke-muted">{t("subtitle")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            className="btn-brass inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold"
            onClick={() =>
              openLead({ planId: recommended.id, source: "hero" })
            }
          >
            {tCta("choosePlan")}
          </button>
          <a
            href={club.social.salesManagerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-line px-6 text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
            onClick={() => trackEvent("click_tg", { source: "hero" })}
          >
            {tCta("writeTelegram")}
          </a>
        </div>
      </div>
    </section>
  );
}
