"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { useLead } from "@/components/lead/LeadProvider";
import { club } from "@/content/club";
import { trackEvent } from "@/lib/analytics";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

type ContactsMapProps = {
  /** Полная страница: режим подробно, все контакты, все ссылки на карты */
  detailed?: boolean;
};

export function ContactsMap({ detailed = false }: ContactsMapProps) {
  const t = useTranslations("home.contacts");
  const tPage = useTranslations("pages.contacts");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const [mapOpen, setMapOpen] = useState(false);

  const embedSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(club.maps.yandexEmbedQuery)}&z=16`;
  const source = detailed ? "contacts_page" : "home_contacts";

  return (
    <section id="contacts" className="scroll-mt-24">
      {detailed ? (
        <div className="container-content section-y !pb-8 lg:!pb-10">
          <Reveal>
            <h1 className="font-display text-display-section text-ink">
              {tPage("title")}
            </h1>
            <p className="mt-4 max-w-[50ch] text-ink/70">{tPage("lead")}</p>
          </Reveal>
        </div>
      ) : null}

      <div
        className={cn(
          "grid lg:grid-cols-2",
          detailed ? "lg:min-h-[min(40rem,80svh)]" : "lg:min-h-[min(36rem,75svh)]",
        )}
      >
        <div className="bg-ink text-chalk">
          <div className="flex h-full flex-col justify-center px-5 py-12 md:px-10 lg:px-12 xl:px-16 lg:py-16">
            <Reveal>
              {!detailed ? (
                <h2 className="font-display text-display-section text-chalk">
                  {t("title")}
                </h2>
              ) : null}

              <dl className={cn("space-y-6", !detailed && "mt-10")}>
                <div>
                  <dt className="font-mono-label text-chalk/55">{t("address")}</dt>
                  <dd className="mt-1.5 text-body-lg text-chalk">
                    {club.address.full[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-label text-chalk/55">{t("hours")}</dt>
                  <dd className="mt-1.5 text-body-lg text-chalk">
                    {detailed ? tPage("hoursDetail") : t("open247")}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-label text-chalk/55">{t("phone")}</dt>
                  <dd className="mt-1.5">
                    <a
                      href={club.phone.telHref}
                      className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-chalk transition-colors duration-200 hover:text-steam"
                      onClick={() => trackEvent("click_call", { source })}
                    >
                      {club.phone.display}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono-label text-chalk/55">{t("social")}</dt>
                  <dd className="mt-1.5 flex flex-col gap-2">
                    <a
                      href={club.social.telegramChannelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-chalk transition-colors duration-200 hover:text-steam"
                    >
                      Telegram @{club.social.telegramChannel}
                    </a>
                    <a
                      href={club.social.salesManagerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-chalk/80 transition-colors duration-200 hover:text-steam"
                      onClick={() => trackEvent("click_tg", { source })}
                    >
                      {detailed
                        ? tPage("salesManager")
                        : `Telegram @${club.social.salesManager}`}
                    </a>
                    <a
                      href={club.social.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-chalk/80 transition-colors duration-200 hover:text-steam"
                    >
                      Instagram @{club.social.instagram}
                    </a>
                  </dd>
                </div>

                {detailed ? (
                  <div>
                    <dt className="font-mono-label text-chalk/55">
                      {tPage("maps")}
                    </dt>
                    <dd className="mt-2 flex flex-col gap-2">
                      <a
                        href={club.maps.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-chalk/85 underline-offset-4 hover:underline"
                      >
                        {t("openGoogle")}
                      </a>
                      <a
                        href={club.maps.dualGisUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-chalk/85 underline-offset-4 hover:underline"
                      >
                        {t("open2gis")}
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="btn-pool inline-flex min-h-12 items-center justify-center rounded-none px-6 text-sm font-medium"
                  onClick={() => openLead({ source })}
                >
                  {tCta("leaveRequest")}
                </button>
                <a
                  href={club.social.salesManagerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-none border border-chalk px-6 text-sm font-medium text-chalk transition-colors duration-200 hover:bg-chalk hover:text-ink"
                  onClick={() => trackEvent("click_tg", { source })}
                >
                  {tCta("writeTelegram")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative min-h-[280px] bg-mineral lg:min-h-full">
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
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
              onClick={() => setMapOpen(true)}
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16,20,24,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,20,24,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            >
              <span className="font-mono-label text-ink/70">
                {club.address.full[locale]}
              </span>
              <span className="font-mono-label text-pool">{t("loadMap")}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
