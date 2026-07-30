import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { HeaderSpacer } from "@/components/layout/HeaderSpacer";
import { Footer } from "@/components/layout/Footer";
import { LeadProvider } from "@/components/lead/LeadProvider";
import { LeadModal } from "@/components/lead/LeadModal";
import { StickyCtaBar } from "@/components/lead/StickyCtaBar";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <LeadProvider>
      <div className="flex min-h-dvh flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <Header />
        <HeaderSpacer />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCtaBar />
        <LeadModal />
      </div>
    </LeadProvider>
  );
}
