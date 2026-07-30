"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Page enter: fade + едва заметный scale 0.99→1 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
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
