"use client";

import { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLead } from "@/components/lead/LeadProvider";
import { dayPass, plans } from "@/content/plans";
import { trackEvent } from "@/lib/analytics";
import { formatPriceUzs } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";

type PricingSectionProps = {
  /** Hide the “all plans” link on the dedicated pricing page */
  showAllPlansLink?: boolean;
};

export function PricingSection({ showAllPlansLink = true }: PricingSectionProps) {
  const t = useTranslations("home.pricing");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const sectionRef = useRef<HTMLElement>(null);
  const viewed = useRef(false);

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
    <section
      id="pricing"
      ref={sectionRef}
      className="scroll-mt-24 py-[clamp(4rem,10vw,7.5rem)]"
    >
      <div className="container-content">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          action={
            showAllPlansLink ? (
              <Link
                href="/pricing"
                className="text-sm font-semibold text-brass hover:text-brass-hover"
              >
                {t("allPlans")}
              </Link>
            ) : undefined
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => {
            const recommended = plan.recommended;
            return (
              <article
                key={plan.id}
                className={
                  recommended
                    ? "relative flex flex-col border border-brass bg-graphite-elevated p-5 transition-transform hover:-translate-y-0.5 md:p-6"
                    : "relative flex flex-col border border-line bg-graphite-elevated p-5 transition-transform hover:-translate-y-0.5 hover:border-brass/50 md:p-6"
                }
              >
                {recommended ? (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-brass">
                    {t("badge")}
                  </p>
                ) : (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-transparent">
                    —
                  </p>
                )}
                <h3 className="font-display text-xl uppercase text-smoke">
                  {plan.name[locale]}
                </h3>
                <p className="mt-1 text-sm text-smoke-muted">
                  {plan.durationLabel[locale]}
                </p>
                <p className="mt-4 font-display text-display-price text-brass">
                  {formatPriceUzs(plan.price, locale)}
                </p>
                <p className="mt-3 text-sm text-smoke-muted">
                  {plan.forWhom[locale]}
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-smoke">
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
                      ? "btn-brass mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm text-sm font-semibold"
                      : "mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-line text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
                  }
                  onClick={() => select(plan.id)}
                >
                  {tCta("choosePlan")}
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-3 border border-line bg-graphite-elevated px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div>
            <p className="font-display text-lg uppercase text-smoke">
              {dayPass.name[locale]}
            </p>
            <p className="mt-1 text-sm text-smoke-muted">{dayPass.note[locale]}</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <p className="font-display text-2xl text-brass">
              {formatPriceUzs(dayPass.price, locale)}
            </p>
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
