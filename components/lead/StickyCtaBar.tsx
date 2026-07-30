"use client";

import { useTranslations } from "next-intl";
import { useLead } from "@/components/lead/LeadProvider";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

/** Sticky-бар §4.10 — ink, pool + прозрачная с рамкой. */
export function StickyCtaBar() {
  const t = useTranslations("cta");
  const { openLead } = useLead();
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 bg-ink md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-content grid grid-cols-2 gap-2 py-2.5">
        {onHome ? (
          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-none border border-chalk/40 text-sm font-medium text-chalk"
          >
            {t("memberships")}
          </a>
        ) : (
          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-none border border-chalk/40 text-sm font-medium text-chalk"
          >
            {t("memberships")}
          </Link>
        )}
        <button
          type="button"
          className="btn-pool inline-flex min-h-11 items-center justify-center rounded-none text-sm font-medium text-chalk"
          onClick={() => {
            trackEvent("open_lead_form", { source: "sticky_bar" });
            openLead({ source: "sticky_bar" });
          }}
        >
          {t("signUp")}
        </button>
      </div>
    </div>
  );
}
