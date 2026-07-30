import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#1A1816] px-6 text-center text-[#E8E4DF]">
      <p
        className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold uppercase tracking-tight"
        style={{ fontFamily: "var(--font-unbounded), sans-serif" }}
      >
        404
      </p>
      <p className="mt-4 text-[#A39E97]">Страница не найдена · Sahifa topilmadi</p>
      <Link
        href="/ru"
        className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-[#C4A46A] px-5 text-sm font-semibold text-[#1A1816]"
      >
        Buka FIT
      </Link>
      <Link
        href="/ru/pricing"
        className="mt-3 text-sm font-semibold text-[#C4A46A] hover:underline"
      >
        Абонементы
      </Link>
    </div>
  );
}
