"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn("inline-flex items-center gap-1", className)}
      role="group"
      aria-label={t("label")}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            className={cn(
              "min-h-9 min-w-9 rounded-sm px-2 text-xs font-medium uppercase tracking-wide transition-colors",
              active
                ? "bg-brass text-graphite"
                : "text-smoke-muted hover:text-smoke",
            )}
            aria-pressed={active}
            onClick={() => {
              if (!active) {
                router.replace(pathname, { locale: code });
              }
            }}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
