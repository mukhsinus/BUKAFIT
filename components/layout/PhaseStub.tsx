import { getTranslations } from "next-intl/server";

type PhaseStubProps = {
  phase: string;
};

/** Временная заглушка фазы — без карточек, типографика фазы 8. */
export async function PhaseStub({ phase }: PhaseStubProps) {
  const t = await getTranslations("phase");

  return (
    <section className="section-y">
      <div className="container-content max-w-[42rem]">
        <p className="font-mono-label text-ink/50">{phase}</p>
        <h1 className="mt-3 font-display text-display-section text-ink">
          {t("stubTitle")}
        </h1>
        <p className="mt-4 text-ink/70">{t("stubBody")}</p>
      </div>
    </section>
  );
}
