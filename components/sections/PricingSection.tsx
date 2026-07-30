"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { PriceCard } from "@/components/ui/PriceCard";
import { useLead } from "@/components/lead/LeadProvider";
import { dayPass, plans } from "@/content/plans";
import { trackEvent } from "@/lib/analytics";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";

type PricingSectionProps = {
  showAllPlansLink?: boolean;
  /** Заголовок секции; по умолчанию с главной */
  title?: string;
  headingLevel?: "h1" | "h2";
};

export function PricingSection({
  showAllPlansLink = true,
  title,
  headingLevel = "h2",
}: PricingSectionProps) {
  const t = useTranslations("home.pricing");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const sectionRef = useRef<HTMLElement>(null);
  const viewed = useRef(false);
  const Heading = headingLevel;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !viewed.current) {
          viewed.current = true;
          trackEvent("view_pricing", { path: window.location.pathname });
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const select = (planId: LeadPlanId) => {
    trackEvent("select_plan", { planId, source: "pricing_section" });
    openLead({ planId, source: "pricing_section" });
  };

  return (
    <section id="pricing" ref={sectionRef} className="scroll-mt-24 section-y">
      <div className="container-content">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6 lg:mb-12">
            <Heading className="font-display text-display-section text-ink">
              {title ?? t("title")}
            </Heading>
            {showAllPlansLink ? (
              <Link
                href="/pricing"
                className="group shrink-0 pb-1 text-sm font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
              >
                {t("allPlans")}
                <span
                  className="ms-1 inline-block transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ) : null}
          </div>
        </Reveal>

        {/*
          Равные колонки minmax(0,1fr): «Год» не уже соседей.
          Внутренние пояса — одинаковый grid-template-rows в PriceCard.
        */}
        <div
          className={[
            "grid grid-cols-1 items-stretch gap-4 pt-5",
            "md:grid-cols-2 md:gap-5",
            "xl:grid-cols-4 xl:gap-6 xl:pt-6",
          ].join(" ")}
        >
          {plans.map((plan, index) => (
            <PriceCard
              key={plan.id}
              plan={plan}
              onSelect={select}
              delay={index * 0.08}
            />
          ))}
        </div>

        <Reveal delay={0.35}>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <span className="font-mono-label text-ink/60">
              {dayPass.name[locale]}
            </span>
            <PriceDisplay
              amount={dayPass.price}
              locale={locale}
              tone="ink"
              size="sm"
              layout="inline"
              className="!text-[1.125rem]"
            />
            <button
              type="button"
              className="text-sm font-medium text-pool transition-colors duration-200 hover:text-pool-deep"
              onClick={() => select("day_pass")}
            >
              {t("dayPassCta")}
              <span className="ms-1" aria-hidden>
                →
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
