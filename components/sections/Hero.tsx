"use client";

import { useTranslations } from "next-intl";
import { HeroMedia } from "@/components/media/HeroMedia";
import { HeroCursorGlow } from "@/components/motion/HeroCursorGlow";
import {
  HeroHeadlineReveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/Reveal";
import { HeroClock } from "@/components/sections/HeroClock";
import { NowInClub } from "@/components/sections/NowInClub";
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
    <section className="relative flex h-[100svh] min-h-[100svh] flex-col overflow-hidden bg-ink">
      <HeroMedia mode="image" alt={club.name} src="/media/placeholders/hero.svg" />
      <HeroCursorGlow />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <div className="container-content flex flex-1 flex-col pt-[max(5.5rem,env(safe-area-inset-top))] pb-4 md:pb-5">
          <Stagger className="flex flex-1 flex-col" stagger={0.08}>
            <StaggerItem>
              <HeroClock />
            </StaggerItem>

            <div className="mt-auto w-full">
              <HeroHeadlineReveal
                className="font-display text-display-hero text-chalk"
                lines={[t("headlineLine1"), t("headlineLine2")]}
              />

              <StaggerItem>
                <p className="mt-5 max-w-[60ch] text-body-lg text-chalk/85">
                  {t("subtitle")}
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <button
                    type="button"
                    className="btn-pool inline-flex min-h-12 items-center justify-center rounded-none px-7 text-sm font-medium text-chalk"
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
                    className="group inline-flex min-h-12 items-center text-sm font-medium text-chalk transition-colors duration-200 hover:text-steam"
                    onClick={() => trackEvent("click_tg", { source: "hero" })}
                  >
                    {t("writeTelegram")}
                    <span
                      className="ms-1 inline-block transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </a>
                </div>
              </StaggerItem>
            </div>

            {/* Тонкая mono-строка — последний элемент внутри hero, без отдельного блока */}
            <StaggerItem className="mt-6 md:mt-7">
              <NowInClub />
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
