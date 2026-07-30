"use client";

import { useTranslations } from "next-intl";
import { useLead } from "@/components/lead/LeadProvider";
import { Link, usePathname } from "@/lib/i18n/navigation";

export function StickyCtaBar() {
  const t = useTranslations("cta");
  const { openLead } = useLead();
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-graphite-elevated/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-content grid grid-cols-2 gap-2 py-2.5">
        {onHome ? (
          <a
            href="#pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line text-sm font-semibold text-smoke"
          >
            {t("memberships")}
          </a>
        ) : (
          <Link
            href="/pricing"
            className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line text-sm font-semibold text-smoke"
          >
            {t("memberships")}
          </Link>
        )}
        <button
          type="button"
          className="btn-brass inline-flex min-h-11 items-center justify-center rounded-sm text-sm font-semibold"
          onClick={() => openLead({ source: "sticky_bar" })}
        >
          {t("signUp")}
        </button>
      </div>
    </div>
  );
}
