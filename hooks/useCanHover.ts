"use client";

import { useEffect, useState } from "react";

/**
 * True only when the primary input can hover — via matchMedia('(hover: hover)'),
 * not CSS :hover alone (touch devices often still match :hover after tap).
 */
export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return canHover;
}
