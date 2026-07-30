import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col justify-center bg-ink px-5 text-chalk md:px-10">
      <div className="mx-auto w-full max-w-[42rem]">
        <p className="font-mono-label text-chalk/50">404</p>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.92] tracking-[-0.035em] text-chalk">
          Страница не найдена
        </h1>
        <p className="mt-2 font-display text-[clamp(1.5rem,4vw,2.5rem)] leading-[1] tracking-[-0.03em] text-chalk/55">
          Sahifa topilmadi
        </p>
        <p className="mt-6 max-w-[40ch] text-chalk/70">
          Ссылка устарела или адрес набран с ошибкой.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/ru"
            className="btn-pool inline-flex min-h-12 items-center justify-center rounded-none px-6 text-sm font-medium text-chalk"
          >
            На главную
          </Link>
          <Link
            href="/ru/pricing"
            className="inline-flex min-h-12 items-center justify-center rounded-none border border-chalk/40 px-6 text-sm font-medium text-chalk transition-colors duration-200 hover:bg-chalk hover:text-ink"
          >
            Абонементы
          </Link>
        </div>
      </div>
    </div>
  );
}
