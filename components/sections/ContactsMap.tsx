"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { useLead } from "@/components/lead/LeadProvider";
import { useCanHover } from "@/hooks/useCanHover";
import { club } from "@/content/club";
import { trackEvent } from "@/lib/analytics";
import type { AppLocale } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Google Maps Embed / JS API needs a key. Without it an iframe would be blank.
 * Only enable in-page embed when a key (or explicit yandex flag) is set in env.
 * Default: open Google Maps / 2GIS in a new tab — never mount an empty iframe.
 */
function mapsEmbedEnabled(): boolean {
  const key = process.env.NEXT_PUBLIC_MAPS_API_KEY?.trim();
  const mode = process.env.NEXT_PUBLIC_MAPS_EMBED?.trim()?.toLowerCase();
  return Boolean(key) || mode === "yandex";
}

type ContactsMapProps = {
  /** Полная страница: режим подробно, все контакты, все ссылки на карты */
  detailed?: boolean;
};

function MapPin({ bouncing }: { bouncing: boolean }) {
  return (
    <span className="relative flex h-24 w-24 items-center justify-center">
      {/* Мягкое радиальное пятно pool — не box-shadow */}
      <span
        className="absolute left-1/2 top-[62%] h-10 w-14 -translate-x-1/2 rounded-full bg-pool/25 blur-md"
        aria-hidden
      />
      <svg
        viewBox="0 0 40 52"
        className={cn(
          "relative h-14 w-11 text-pool drop-shadow-none",
          bouncing && "motion-safe:animate-pin-bounce",
        )}
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M20 0C9.5 0 1 8.5 1 19c0 13.2 16.2 31.4 17 32.3a1.3 1.3 0 0 0 2 0C20.8 50.4 37 32.2 37 19 37 8.5 28.5 0 20 0zm0 27.5a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17z"
        />
        <circle cx="20" cy="19" r="5.5" fill="var(--color-chalk)" />
      </svg>
    </span>
  );
}

export function ContactsMap({ detailed = false }: ContactsMapProps) {
  const t = useTranslations("home.contacts");
  const tPage = useTranslations("pages.contacts");
  const tCta = useTranslations("cta");
  const locale = useLocale() as AppLocale;
  const { openLead } = useLead();
  const canHover = useCanHover();
  const [mapOpen, setMapOpen] = useState(false);
  const [pinBounce, setPinBounce] = useState(false);

  const canEmbed = mapsEmbedEnabled();
  const embedSrc = canEmbed
    ? `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(club.maps.yandexEmbedQuery)}&z=16`
    : "";
  const source = detailed ? "contacts_page" : "home_contacts";

  function openExternalMap() {
    window.open(club.maps.googleMapsUrl, "_blank", "noopener,noreferrer");
  }

  function handleShowMap() {
    if (canEmbed && embedSrc) {
      setMapOpen(true);
      return;
    }
    openExternalMap();
  }

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
          {mapOpen && canEmbed && embedSrc ? (
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
              className="group/map absolute inset-0 flex flex-col items-center justify-center gap-3 bg-mineral p-6 text-center"
              onClick={handleShowMap}
              onMouseEnter={() => {
                if (canHover) setPinBounce(true);
              }}
              onMouseLeave={() => setPinBounce(false)}
              onAnimationEnd={() => {
                /* keep class only while hovering — reset for re-trigger */
                if (!canHover) setPinBounce(false);
              }}
            >
              <MapPin bouncing={pinBounce} />
              <span
                className={cn(
                  "max-w-[18rem] text-[0.9375rem] leading-snug text-ink/80 transition-opacity duration-300",
                  canHover
                    ? "opacity-0 group-hover/map:opacity-100"
                    : "opacity-100",
                )}
              >
                {club.address.full[locale]}
              </span>
              <span className="mt-1 font-mono-label text-pool">
                {t("loadMap")}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
