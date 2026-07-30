"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { club } from "@/content/club";
import { FEATURES } from "@/content/features";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { useLead } from "@/components/lead/LeadProvider";
import { getRecommendedPlan } from "@/content/plans";
import { bindFocusTrap, getFocusableElements } from "@/lib/focus";
import type { AppLocale } from "@/lib/i18n/routing";
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
  const locale = useLocale() as AppLocale;
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

        <div className="flex items-center gap-1.5 md:gap-3">
          <LocaleSwitcher tone={tone} />
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
                  "block h-px w-full bg-current transition-transform duration-300",
                  open && "translate-y-[6px] rotate-45",
                )}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
              <span
                className={cn(
                  "block h-px w-full bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-full bg-current transition-transform duration-300",
                  open && "-translate-y-[6px] -rotate-45",
                )}
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Fullscreen mobile menu — pool atmosphere, numbered nav, single footer */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label={t("openMenu")}
        aria-hidden={open ? undefined : true}
        data-open={open ? "true" : "false"}
        inert={open ? undefined : true}
        className={cn(
          "mobile-nav fixed inset-0 z-[55] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
          aria-hidden
        >
          <div className="gradient-pool motion-safe:animate-gradient-drift absolute inset-0" />
          <div
            className="pointer-events-none absolute -left-[20%] top-[12%] h-[55vmin] w-[55vmin] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-pool) 45%, transparent) 0%, transparent 70%)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-[15%] bottom-[18%] h-[48vmin] w-[48vmin] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--color-pool-deep) 40%, transparent) 0%, transparent 72%)",
            }}
          />
        </div>

        <div className="relative flex h-full flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[4.75rem]">
          <nav
            className="flex flex-1 flex-col justify-center"
            aria-label="Mobile"
          >
            <ul className="border-t border-chalk/12">
              {navItems.map((item, index) => (
                <li key={item.href} className="border-b border-chalk/12">
                  <Link
                    href={item.href}
                    className="mobile-nav-link group flex min-h-[3.75rem] items-baseline gap-4 py-4"
                    style={{ transitionDelay: open ? `${60 + index * 45}ms` : "0ms" }}
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-mono-label w-6 shrink-0 text-chalk/40 transition-colors duration-200 group-hover:text-pool">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.85rem,8.5vw,2.75rem)] leading-[1.05] tracking-[-0.03em] text-chalk transition-colors duration-200 group-hover:text-steam">
                      {t(item.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mobile-nav-footer mt-auto flex flex-col gap-5 pt-6"
            style={{ transitionDelay: open ? `${80 + navItems.length * 45}ms` : "0ms" }}
          >
            <div className="flex flex-col gap-1.5">
              <p className="font-mono-label text-chalk/45">
                {club.address.full[locale]}
              </p>
              <a
                href={club.phone.telHref}
                className="font-mono-label text-chalk/70 transition-colors duration-200 hover:text-chalk"
              >
                {club.phone.display}
              </a>
            </div>
            <button
              type="button"
              className="btn-pool inline-flex min-h-12 w-full items-center justify-center rounded-none px-4 text-sm font-medium"
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
