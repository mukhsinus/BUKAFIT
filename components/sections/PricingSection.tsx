"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { useLead } from "@/components/lead/LeadProvider";
import { dayPass, plans } from "@/content/plans";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";

type PricingSectionProps = {
  showAllPlansLink?: boolean;
};

export function PricingSection({ showAllPlansLink = true }: PricingSectionProps) {
  const t = useTranslations("home.pricing");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const sectionRef = useRef<HTMLElement>(null);
  const viewed = useRef(false);
  const reduce = useReducedMotion();

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
          <div className="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
                {t("eyebrow")}
              </p>
              <h2 className="font-display text-display-section uppercase text-smoke">
                {t("title")}
              </h2>
              <p className="mt-2 text-sm text-smoke-muted md:text-base">
                {t("description")}
              </p>
            </div>
            {showAllPlansLink ? (
              <Link
                href="/pricing"
                className="shrink-0 text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("allPlans")}
              </Link>
            ) : null}
          </div>
        </Reveal>

        <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          {plans.map((plan) => {
            const recommended = plan.recommended;

            return (
              <motion.article
                key={plan.id}
                className={cn(
                  "relative flex min-w-0 flex-col p-4 md:p-5",
                  recommended
                    ? "z-[1] border-2 border-brass bg-graphite-raised shadow-[0_18px_40px_-18px_rgba(0,0,0,0.65)] xl:-translate-y-3 xl:scale-[1.03]"
                    : "border border-line bg-graphite-elevated",
                )}
                whileHover={reduce ? undefined : { y: recommended ? -6 : -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              >
                {recommended ? (
                  <p className="mb-3 inline-flex w-fit bg-brass px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-graphite">
                    {t("badge")}
                  </p>
                ) : (
                  <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-transparent">
                    —
                  </p>
                )}
                <h3 className="font-display text-lg uppercase text-smoke md:text-xl">
                  {plan.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-smoke-muted">
                  {plan.durationLabel[locale]}
                </p>
                <div className="mt-4 min-w-0 overflow-hidden">
                  <PriceDisplay amount={plan.price} locale={locale} size="md" />
                </div>
                <p className="mt-3 text-sm text-smoke-muted">
                  {plan.forWhom[locale]}
                </p>
                <ul className="mt-4 flex-1 space-y-1.5 text-sm text-smoke">
                  {plan.includes.map((item) => (
                    <li key={item.ru} className="flex gap-2">
                      <span className="text-brass" aria-hidden>
                        ·
                      </span>
                      <span>{item[locale]}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={
                    recommended
                      ? "btn-brass mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-sm text-sm font-semibold"
                      : "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-line text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
                  }
                  onClick={() => select(plan.id)}
                >
                  {tCta("choosePlan")}
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-3 flex flex-col gap-3 border border-line bg-graphite-mid px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between md:px-5">
          <div>
            <p className="font-display text-base uppercase text-smoke">
              {dayPass.name[locale]}
            </p>
            <p className="mt-1 text-sm text-smoke-muted">{dayPass.note[locale]}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <PriceDisplay amount={dayPass.price} locale={locale} size="sm" />
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line px-4 text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
              onClick={() => select("day_pass")}
            >
              {tCta("leaveRequest")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
