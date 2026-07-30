"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname } from "@/lib/i18n/navigation";

/** Сохраняется между remount template — чтобы смена языка не мигала fade */
let lastNav: { path: string; locale: string } | null = null;

/** Page enter: fade + едва заметный scale 0.99→1 (не при смене только locale) */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const locale = useLocale();

  const localeOnly =
    lastNav !== null &&
    lastNav.path === pathname &&
    lastNav.locale !== locale;

  useEffect(() => {
    lastNav = { path: pathname, locale };
  }, [pathname, locale]);

  if (reduce || localeOnly) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "center top" }}
    >
      {children}
    </motion.div>
  );
}
