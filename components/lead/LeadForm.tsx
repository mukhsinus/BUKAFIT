"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useLead } from "@/components/lead/LeadProvider";
import { dayPass, getPlanById, plans } from "@/content/plans";
import { club } from "@/content/club";
import { trackEvent } from "@/lib/analytics";
import { formatUzPhoneInput, toE164Uz } from "@/lib/phone";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/routing";
import type { LeadPlanId } from "@/lib/validations/lead";

const formSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .refine((value) => /^\+998\d{9}$/.test(toE164Uz(value)), {
      message: "phone",
    }),
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type FormStatus = "idle" | "loading" | "success" | "error";

function planLabel(planId: LeadPlanId | null, locale: AppLocale): string | null {
  if (!planId) return null;
  if (planId === "day_pass") return dayPass.name[locale];
  const plan = getPlanById(planId);
  return plan?.name[locale] ?? null;
}

export function LeadForm() {
  const t = useTranslations("lead");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const { planId, setPlanId, utm, closeLead } = useLead();
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "+998 ",
      website: "",
    },
  });

  const phoneValue = watch("phone");

  const selectedLabel = useMemo(
    () => planLabel(planId, locale),
    [planId, locale],
  );

  const telegramHref = useMemo(() => {
    const text =
      selectedLabel != null
        ? encodeURIComponent(
            locale === "en"
              ? `Hi! I want the «${selectedLabel}» plan at Buka FIT.`
              : locale === "uz"
                ? `Salom! Buka FIT «${selectedLabel}» tarifiga yozilmoqchiman.`
                : `Здравствуйте! Хочу абонемент «${selectedLabel}» в Buka FIT.`,
          )
        : encodeURIComponent(
            locale === "en"
              ? "Hi! I want a membership at Buka FIT."
              : locale === "uz"
                ? "Salom! Buka FIT abonementiga yozilmoqchiman."
                : "Здравствуйте! Хочу абонемент в Buka FIT.",
          );
    return `${club.social.salesManagerUrl}?text=${text}`;
  }, [locale, selectedLabel]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: toE164Uz(values.phone),
          planId,
          sourcePath: pathname || "/",
          locale,
          website: values.website ?? "",
          utm,
        }),
      });

      const data = (await response.json()) as { ok?: boolean };

      if (!response.ok || !data.ok) {
        setStatus("error");
        return;
      }

      trackEvent("submit_lead", {
        planId: planId ?? undefined,
        path: pathname,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="space-y-5">
        <p className="font-medium text-pool">{t("successTitle")}</p>
        <p className="text-sm text-ink/70">{t("successBody")}</p>
        <a
          href={telegramHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pool inline-flex min-h-11 w-full items-center justify-center rounded-none px-5 text-sm font-medium"
          onClick={() => trackEvent("click_tg", { source: "lead_success" })}
        >
          {t("writeTelegramNow")}
        </a>
        <Button variant="ghost" className="w-full" onClick={closeLead}>
          {t("close")}
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit} noValidate>
      <div className="rounded-none border border-mineral bg-chalk p-3">
        <p className="font-mono-label text-ink/55">{t("selectedPlan")}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {plans.map((plan) => (
            <PlanChip
              key={plan.id}
              active={planId === plan.id}
              label={plan.name[locale]}
              onClick={() => {
                setPlanId(plan.id);
                trackEvent("select_plan", { planId: plan.id, source: "lead_form" });
              }}
            />
          ))}
          <PlanChip
            active={planId === "day_pass"}
            label={dayPass.name[locale]}
            onClick={() => {
              setPlanId("day_pass");
              trackEvent("select_plan", {
                planId: "day_pass",
                source: "lead_form",
              });
            }}
          />
          <PlanChip
            active={planId === null}
            label={t("noPlan")}
            onClick={() => setPlanId(null)}
          />
        </div>
        {selectedLabel ? (
          <p className="mt-2 text-sm font-medium text-pool">{selectedLabel}</p>
        ) : null}
      </div>

      <Input
        label={t("name")}
        autoComplete="name"
        error={errors.name ? t("errors.name") : undefined}
        {...register("name")}
      />

      <Input
        label={t("phone")}
        inputMode="tel"
        autoComplete="tel"
        placeholder="+998 __ ___ __ __"
        error={errors.phone ? t("errors.phone") : undefined}
        {...register("phone")}
        value={phoneValue}
        onChange={(event) => {
          setValue("phone", formatUzPhoneInput(event.target.value), {
            shouldValidate: true,
          });
        }}
      />

      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {status === "error" ? (
        <div className="space-y-2 rounded-none border border-ink bg-mineral p-3 text-sm">
          <p className="font-medium text-ink">{t("errorTitle")}</p>
          <p className="text-ink/70">{t("errorBody")}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={club.phone.telHref}
              className="font-medium text-pool hover:text-pool-deep"
              onClick={() => trackEvent("click_call", { source: "lead_error" })}
            >
              {tCta("call")}
            </a>
            <a
              href={telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-pool hover:text-pool-deep"
              onClick={() => trackEvent("click_tg", { source: "lead_error" })}
            >
              {tCta("writeTelegram")}
            </a>
          </div>
        </div>
      ) : null}

      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? t("submitting") : tCta("leaveRequest")}
      </Button>
    </form>
  );
}

function PlanChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "font-mono-label px-3 py-1.5 transition-colors duration-200",
        "rounded-[var(--radius-pill)]",
        active
          ? "bg-ink text-chalk"
          : "bg-mineral text-ink/70 hover:text-ink",
      )}
    >
      {label}
    </button>
  );
}
