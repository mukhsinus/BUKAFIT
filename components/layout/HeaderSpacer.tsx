"use client";

import { usePathname } from "@/lib/i18n/navigation";

/** Fixed-хедер не занимает поток; на внутренних страницах нужен отступ. На главной — нет (поверх hero). */
export function HeaderSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-16 shrink-0 lg:h-[4.25rem]" aria-hidden />;
}
