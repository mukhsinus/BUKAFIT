"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Page fade 250ms — только opacity, без старого y-сдвига Unbounded-версии. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
