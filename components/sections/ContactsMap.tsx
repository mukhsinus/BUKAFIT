"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLead } from "@/components/lead/LeadProvider";
import { club } from "@/content/club";
import { trackEvent } from "@/lib/analytics";
import type { AppLocale } from "@/lib/i18n/routing";

export function ContactsMap() {
  const t = useTranslations("home.contacts");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const [mapOpen, setMapOpen] = useState(false);

  const embedSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(club.maps.yandexEmbedQuery)}&z=16`;

  return (
    <section
      id="contacts"
      className="scroll-mt-24 border-t border-line py-[clamp(4rem,10vw,7.5rem)]"
    >
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-6 md:mb-8"
          />

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-smoke-muted">{t("address")}</dt>
              <dd className="mt-1 text-smoke">{club.address.full[locale]}</dd>
            </div>
            <div>
              <dt className="text-smoke-muted">{t("hours")}</dt>
              <dd className="mt-1 font-medium text-brass">{t("open247")}</dd>
            </div>
            <div>
              <dt className="text-smoke-muted">{t("phone")}</dt>
              <dd className="mt-1">
                <a
                  href={club.phone.telHref}
                  className="text-smoke hover:text-brass"
                  onClick={() => trackEvent("click_call", { source: "home_contacts" })}
                >
                  {club.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-smoke-muted">{t("social")}</dt>
              <dd className="mt-1 flex flex-col gap-1">
                <a
                  href={club.social.telegramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke hover:text-brass"
                >
                  Telegram @{club.social.telegramChannel}
                </a>
                <a
                  href={club.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke hover:text-brass"
                >
                  Instagram @{club.social.instagram}
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={club.maps.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-water hover:underline"
            >
              {t("openGoogle")}
            </a>
            <a
              href={club.maps.dualGisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-water hover:underline"
            >
              {t("open2gis")}
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="btn-brass inline-flex min-h-11 items-center justify-center rounded-sm px-5 text-sm font-semibold"
              onClick={() => openLead({ source: "home_contacts" })}
            >
              {tCta("leaveRequest")}
            </button>
            <a
              href={club.social.salesManagerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-line px-5 text-sm font-semibold text-smoke hover:border-brass hover:text-brass"
              onClick={() => trackEvent("click_tg", { source: "home_contacts" })}
            >
              {tCta("writeTelegram")}
            </a>
          </div>
        </div>

        <div className="relative min-h-[280px] overflow-hidden border border-line bg-graphite-elevated md:min-h-[360px]">
          {mapOpen ? (
            <iframe
              title={t("mapTitle")}
              src={embedSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,_#2a2622_0%,_#1a1816_70%)] p-6 text-center"
              onClick={() => setMapOpen(true)}
            >
              <span className="font-display text-lg uppercase text-smoke">
                {t("mapPlaceholder")}
              </span>
              <span className="text-sm text-brass">{t("loadMap")}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
