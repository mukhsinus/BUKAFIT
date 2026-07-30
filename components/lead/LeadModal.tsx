"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "@/components/lead/LeadForm";
import { useLead } from "@/components/lead/LeadProvider";

export function LeadModal() {
  const t = useTranslations("lead");
  const { open, closeLead } = useLead();

  return (
    <Modal open={open} onClose={closeLead} title={t("title")}>
      <LeadForm />
    </Modal>
  );
}
