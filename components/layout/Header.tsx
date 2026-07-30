"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { club } from "@/content/club";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { OpenNowBadge } from "@/components/layout/OpenNowBadge";
import { useLead } from "@/components/lead/LeadProvider";
import { getRecommendedPlan } from "@/content/plans";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/schedule" as const, key: "schedule" as const },
  { href: "/services" as const, key: "services" as const },
  { href: "/trainers" as const, key: "trainers" as const },
  { href: "/contacts" as const, key: "contacts" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const { openLead } = useLead();
  const [open, setOpen] = useState(false);
  const recommended = getRecommendedPlan();

  const openForm = () => {
    openLead({ planId: recommended.id, source: "header" });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-graphite/90 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="font-display text-lg uppercase tracking-[0.04em] text-smoke md:text-xl"
          >
            {club.name}
          </Link>
          <OpenNowBadge className="hidden sm:inline-flex" />
        </div>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-smoke-muted transition-colors hover:text-smoke"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />
          <button
            type="button"
            className="btn-brass hidden min-h-10 items-center rounded-sm px-4 text-sm font-semibold md:inline-flex"
            onClick={openForm}
          >
            {tCta("choosePlan")}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-line text-smoke lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-line bg-graphite-elevated lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-content flex flex-col gap-4 py-4">
          <OpenNowBadge />
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-2 py-3 text-base text-smoke hover:bg-graphite"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <LocaleSwitcher />
          <button
            type="button"
            className="btn-brass inline-flex min-h-11 items-center justify-center rounded-sm px-4 text-sm font-semibold"
            onClick={openForm}
          >
            {tCta("choosePlan")}
          </button>
        </div>
      </div>
    </header>
  );
}
