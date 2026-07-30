"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { formatTashkentTime } from "@/lib/time";
import { cn } from "@/lib/utils";

type HeroClockProps = {
  className?: string;
};

/** Живое время Asia/Tashkent — только в hero (§4.1). */
export function HeroClock({ className }: HeroClockProps) {
  const t = useTranslations("home.hero");
  const [time, setTime] = useState(() => formatTashkentTime());

  useEffect(() => {
    const tick = () => setTime(formatTashkentTime());
    tick();
    const id = window.setInterval(tick, 30_000);
    const onVisibility = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono-label text-chalk",
        className,
      )}
      aria-label={t("clockAria", { time })}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
        <span className="absolute inset-0 rounded-full bg-pool motion-safe:animate-open-pulse" />
        <span className="relative h-2 w-2 rounded-full bg-pool" />
      </span>
      <span className="tabular-nums">
        {t("city")} · {time} · {t("open")}
      </span>
    </p>
  );
}
