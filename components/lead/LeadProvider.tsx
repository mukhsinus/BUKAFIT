"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LeadPlanId } from "@/lib/validations/lead";
import { captureUtmFromWindow, type UtmParams } from "@/lib/utm";
import { trackEvent } from "@/lib/analytics";

type LeadOpenOptions = {
  planId?: LeadPlanId | null;
  source?: string;
};

type LeadContextValue = {
  open: boolean;
  planId: LeadPlanId | null;
  utm: UtmParams;
  openLead: (options?: LeadOpenOptions) => void;
  closeLead: () => void;
  setPlanId: (planId: LeadPlanId | null) => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState<LeadPlanId | null>(null);
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    setUtm(captureUtmFromWindow());
  }, []);

  const openLead = useCallback((options?: LeadOpenOptions) => {
    if (options?.planId !== undefined) {
      setPlanId(options.planId);
    }
    setOpen(true);
    trackEvent("open_lead_form", {
      planId: options?.planId ?? undefined,
      source: options?.source,
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  }, []);

  const closeLead = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      open,
      planId,
      utm,
      openLead,
      closeLead,
      setPlanId,
    }),
    [open, planId, utm, openLead, closeLead],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead(): LeadContextValue {
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error("useLead must be used within LeadProvider");
  }
  return ctx;
}
