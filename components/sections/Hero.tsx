"use client";

import { useTranslations } from "next-intl";
import { HeroMedia } from "@/components/media/HeroMedia";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
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
    <section className="relative min-h-[min(100svh,860px)] overflow-hidden">
      <HeroMedia mode="image" alt={club.name} src="/media/placeholders/hero.svg" />
      <div className="relative container-content flex min-h-[min(100svh,860px)] flex-col justify-end pb-24 pt-24 md:pb-16 md:pt-28">
        <Stagger className="max-w-2xl">
          <StaggerItem>
            <h1 className="font-display text-display-hero uppercase text-smoke">
              <span className="block">{t("headlineLine1")}</span>
              <span className="block text-brass">{t("headlineLine2")}</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-md text-base text-smoke-muted md:text-lg">
              {t("subtitle")}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                className="btn-brass inline-flex min-h-12 items-center justify-center rounded-sm px-7 text-sm font-semibold"
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
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
