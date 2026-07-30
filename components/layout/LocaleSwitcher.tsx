"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { locales, type AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  className?: string;
  tone?: "on-dark" | "on-light";
};

export function LocaleSwitcher({
  className,
  tone = "on-light",
}: LocaleSwitcherProps) {
  const t = useTranslations("locale");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onDark = tone === "on-dark";

  const switchLocale = (code: AppLocale) => {
    if (code === locale || pending) return;
    startTransition(() => {
      router.replace(pathname, { locale: code, scroll: false });
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1",
        pending && "pointer-events-none opacity-70",
        className,
      )}
      role="group"
      aria-label={t("label")}
      aria-busy={pending || undefined}
    >
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            className={cn(
              "font-mono-label min-h-9 min-w-9 rounded-none px-2 transition-colors duration-200",
              active && "underline decoration-2 underline-offset-4",
              onDark
                ? active
                  ? "text-chalk"
                  : "text-chalk/55 hover:text-chalk"
                : active
                  ? "text-ink"
                  : "text-ink/45 hover:text-ink",
            )}
            aria-pressed={active}
            disabled={pending}
            onClick={() => switchLocale(code)}
          >
            {t(code)}
          </button>
        );
      })}
    </div>
  );
}
