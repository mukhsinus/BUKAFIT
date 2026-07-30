"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { club } from "@/content/club";
import { FEATURES } from "@/content/features";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useLead } from "@/components/lead/LeadProvider";
import { getRecommendedPlan } from "@/content/plans";
import { bindFocusTrap, getFocusableElements } from "@/lib/focus";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pricing" as const, key: "pricing" as const },
  { href: "/schedule" as const, key: "schedule" as const },
  { href: "/services" as const, key: "services" as const },
  ...(FEATURES.trainers
    ? [{ href: "/trainers" as const, key: "trainers" as const }]
    : []),
  { href: "/contacts" as const, key: "contacts" as const },
];

export function Header() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const { openLead } = useLead();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const recommended = getRecommendedPlan();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = menuButtonRef.current;

    // Trap across bar + fullscreen panel (hamburger stays in the bar).
    const root = headerRef.current;
    requestAnimationFrame(() => {
      const list = getFocusableElements(root);
      const firstInMenu = list.find((el) => el.closest("#mobile-nav"));
      (firstInMenu ?? list[0] ?? root)?.focus();
    });

    const unbind = root
      ? bindFocusTrap(root, () => setOpen(false))
      : () => undefined;

    return () => {
      document.body.style.overflow = prev;
      unbind();
      trigger?.focus();
    };
  }, [open]);

  const openForm = () => {
    openLead({ planId: recommended.id, source: "header" });
    setOpen(false);
  };

  const tone = solid && !open ? "on-light" : "on-dark";
  const iconTone = open || !solid ? "text-chalk" : "text-ink";

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        open
          ? "border-b border-transparent bg-transparent"
          : solid
            ? "border-b border-mineral bg-chalk/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
      )}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      <div className="container-content relative z-[60] flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link
          href="/"
          className={cn(
            "shrink-0 font-display text-lg tracking-[-0.035em] md:text-xl",
            open || !solid ? "text-chalk" : "text-ink",
          )}
          onClick={() => setOpen(false)}
        >
          {club.name}
        </Link>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] transition-colors duration-200",
                solid
                  ? "text-ink/70 hover:text-ink"
                  : "text-chalk/75 hover:text-chalk",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LocaleSwitcher
            tone={tone}
            className="hidden md:inline-flex"
          />
          <button
            type="button"
            className="btn-pool hidden min-h-10 items-center rounded-none px-4 text-sm font-medium md:inline-flex"
            onClick={openForm}
          >
            {tCta("choosePlan")}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-none bg-transparent lg:hidden",
              iconTone,
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span aria-hidden className="flex w-6 flex-col gap-[5px]">
              <span
                className={cn(
                  "block h-px w-full bg-current transition-transform duration-200",
                  open && "translate-y-[6px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-current transition-transform duration-200",
                  open && "-translate-y-[6px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Fullscreen ink panel — mobile */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={t("openMenu")}
        className={cn(
          "fixed inset-0 z-[55] bg-ink lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="flex h-full flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20">
          <nav className="flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[clamp(2rem,9vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-chalk"
                onClick={() => setOpen(false)}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-5 border-t border-[rgba(244,245,243,0.14)] pt-6">
            <LocaleSwitcher tone="on-dark" />
            <button
              type="button"
              className="btn-pool inline-flex min-h-12 items-center justify-center rounded-none px-4 text-sm font-medium"
              onClick={openForm}
            >
              {tCta("choosePlan")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
