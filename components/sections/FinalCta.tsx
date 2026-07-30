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
    <section className="border-t border-line bg-graphite-raised section-y">
      <Reveal>
        <div className="container-content max-w-3xl text-center">
          <h2 className="font-display text-display-section uppercase text-smoke">
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-smoke-muted">
            {t("description")}
          </p>
          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="btn-brass inline-flex min-h-12 items-center justify-center rounded-sm px-6 text-sm font-semibold"
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
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-line px-6 text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
              onClick={() => trackEvent("click_tg", { source: "final_cta" })}
            >
              {tCta("writeTelegram")}
            </a>
            <a
              href={club.phone.telHref}
              className="inline-flex min-h-12 items-center justify-center rounded-sm px-4 text-sm font-semibold text-water hover:underline"
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
