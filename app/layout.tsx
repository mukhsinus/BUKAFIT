import type { ReactNode } from "react";

/** Root pass-through: html/body живут в app/[locale]/layout.tsx (lang по локали). */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
