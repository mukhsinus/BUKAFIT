"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { formatTashkentTime } from "@/lib/time";

/** Живое время Ташкента — только в футере (и hero §4.1), не в хедере. */
export function FooterClock() {
  const t = useTranslations("footer");
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
    <p className="font-mono-label text-chalk/70" aria-label={t("timeAria", { time })}>
      {t("timeLabel")} · {time}
    </p>
  );
}
