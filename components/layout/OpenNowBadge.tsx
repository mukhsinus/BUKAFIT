"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { formatTashkentTime } from "@/lib/time";
import { cn } from "@/lib/utils";

type OpenNowBadgeProps = {
  className?: string;
  size?: "sm" | "md";
};

export function OpenNowBadge({ className, size = "sm" }: OpenNowBadgeProps) {
  const t = useTranslations("openNow");
  const [time, setTime] = useState(() => formatTashkentTime());

  useEffect(() => {
    const tick = () => setTime(formatTashkentTime());
    tick();

    const intervalId = window.setInterval(tick, 30_000);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        tick();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-chalk",
        size === "sm" ? "text-xs md:text-sm" : "text-sm md:text-base",
        className,
      )}
      aria-label={t("aria", { time })}
    >
      <span
        className="relative flex h-2 w-2 shrink-0"
        aria-hidden
      >
        <span className="absolute inset-0 rounded-full bg-pool motion-safe:animate-open-pulse" />
        <span className="relative h-2 w-2 rounded-full bg-pool" />
      </span>
      <span className="min-w-0">
        <span className="whitespace-nowrap">{t("label")}</span>
        <span className="hidden text-chalk/70 sm:inline"> · {time}</span>
      </span>
    </p>
  );
}
