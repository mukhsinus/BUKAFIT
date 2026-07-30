"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { useLead } from "@/components/lead/LeadProvider";
import { club } from "@/content/club";
import { getRecommendedPlan } from "@/content/plans";
import { trackEvent } from "@/lib/analytics";

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  const tCta = useTranslations("cta");
  const { openLead } = useLead();
  const recommended = getRecommendedPlan();

  return (
    <section className="gradient-pool motion-safe:animate-gradient-drift section-y text-chalk">
      <Reveal>
        <div className="container-content max-w-[40rem]">
          <h2 className="font-display text-display-section text-chalk">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-[50ch] text-chalk/70">{t("description")}</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="inline-flex min-h-12 items-center justify-center rounded-none bg-chalk px-6 text-sm font-medium text-ink transition-colors duration-200 hover:bg-steam"
              onClick={() =>
                openLead({
                  planId: recommended.id,
                  source: "final_cta",
                })
              }
            >
              {tCta("leaveRequest")}
            </button>
            <a
              href={club.social.salesManagerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-none border border-chalk px-6 text-sm font-medium text-chalk transition-colors duration-200 hover:bg-chalk hover:text-ink"
              onClick={() => trackEvent("click_tg", { source: "final_cta" })}
            >
              {tCta("writeTelegram")}
            </a>
            <a
              href={club.phone.telHref}
              className="inline-flex min-h-12 items-center justify-center rounded-none px-4 text-sm font-medium text-chalk/85 transition-colors duration-200 hover:text-chalk"
              onClick={() => trackEvent("click_call", { source: "final_cta" })}
            >
              {tCta("call")}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
