import { getTranslations, setRequestLocale } from "next-intl/server";

type NavTitleKey =
  | "pricing"
  | "schedule"
  | "services"
  | "trainers"
  | "contacts"
  | "about"
  | "faq";

type PhaseStubProps = {
  locale: string;
  titleKey?: NavTitleKey;
};

/** Минимальная заглушка страницы до Фазы 3/4. */
export async function PhaseStub({ locale, titleKey }: PhaseStubProps) {
  setRequestLocale(locale);
  const t = await getTranslations("phase");
  const tNav = titleKey ? await getTranslations("nav") : null;

  return (
    <section className="container-content py-16 md:py-24">
      {titleKey && tNav ? (
        <h1 className="font-display text-display-section uppercase text-smoke">
          {tNav(titleKey)}
        </h1>
      ) : null}
      <h2 className="mt-4 text-lg font-semibold text-brass">{t("stubTitle")}</h2>
      <p className="mt-3 max-w-xl text-smoke-muted">{t("stubBody")}</p>
    </section>
  );
}
