"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
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
      className="scroll-mt-24 border-t border-line"
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[min(32rem,70svh)]">
        <div className="container-content flex flex-col justify-center py-10 lg:max-w-none lg:px-10 xl:px-16 lg:py-12">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brass">
              {t("eyebrow")}
            </p>
            <h2 className="font-display text-display-section uppercase text-smoke">
              {t("title")}
            </h2>
            <p className="mt-2 max-w-md text-smoke-muted">{t("description")}</p>

            <dl className="mt-6 space-y-3.5 text-sm">
              <div>
                <dt className="text-smoke-muted">{t("address")}</dt>
                <dd className="mt-0.5 text-smoke">{club.address.full[locale]}</dd>
              </div>
              <div>
                <dt className="text-smoke-muted">{t("hours")}</dt>
                <dd className="mt-0.5 font-medium text-brass">{t("open247")}</dd>
              </div>
              <div>
                <dt className="text-smoke-muted">{t("phone")}</dt>
                <dd className="mt-0.5">
                  <a
                    href={club.phone.telHref}
                    className="text-smoke hover:text-brass"
                    onClick={() =>
                      trackEvent("click_call", { source: "home_contacts" })
                    }
                  >
                    {club.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-smoke-muted">{t("social")}</dt>
                <dd className="mt-0.5 flex flex-col gap-1">
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

            <div className="mt-5 flex flex-wrap gap-3">
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

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
                onClick={() =>
                  trackEvent("click_tg", { source: "home_contacts" })
                }
              >
                {tCta("writeTelegram")}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative min-h-[280px] border-t border-line bg-graphite-elevated lg:min-h-full lg:border-t-0 lg:border-l">
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
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,_#2e2a26_0%,_#1a1816_70%)] p-6 text-center"
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
