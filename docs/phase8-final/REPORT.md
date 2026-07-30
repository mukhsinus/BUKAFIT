# Финальная приёмка — раздел 10 + визуальный проход

Дата: 2026-07-30. Артефакты: `ACCEPTANCE.json`, скрины `*.png`, Lighthouse JSON.

## Прогон 1 — чек-лист §10

| # | Пункт | Статус | Доказательство |
|---|--------|--------|----------------|
| 1 | build / lint / typecheck, TS strict, без `any` | ✅ | `npm run build` exit 0; `npm run lint` clean; `npm run typecheck` clean; `strict: true` в `tsconfig.json`; grep `: any` — пусто |
| 2 | 360px + sticky + safe-area | ✅ | Playwright 360: stickyH=64, shell `padBottom` ≥ sticky; iOS sim `padding-bottom: 34px` на баре; overflowX=false на всех страницах |
| 3 | ≤3 действия до заявки; цены без клика | ✅ | 5 цен в `#pricing` без клика; воронка sticky → форма → submit |
| 4 | Заявка → Telegram; ошибки достойно | ✅ | `POST /api/lead` → 200; mock Bot API принял payload (имя/телефон/тариф/UTM); UI success «15 минут»; при сбое — error UI с tel/Telegram |
| 5 | Все страницы §3, ссылки, 404 | ✅ | 20 маршрутов 200; стилизованный 404; `/trainers` 200 (честный empty-state) |
| 6 | RU/UZ + hreflang | ✅ | h1 pricing RU≠UZ; hreflang ru/uz/en в HTML |
| 7 | Lighthouse + reduced-motion + клавиатура | ✅ | Mobile perf **90** / a11y 97; Desktop perf **99** / a11y 97; CLS 0; CSS+Framer reduced-motion; Tab focus |
| 8 | JSON-LD + noindex | ✅ | `SportsActivityLocation` + geo + 24/7; robots `Disallow: /`; meta `noindex,nofollow` |
| 9 | Аналитика в точках | ✅ | `NEXT_PUBLIC_ANALYTICS_DEBUG=true` → console `[analytics] open_lead_form` |
| 10 | CONTENT_TODO / media README / .env.example / README | ✅ | Файлы на месте, размеры в `ACCEPTANCE.json` |
| 11 | Дизайн-план + «Открыто сейчас» | ✅ | `docs/design-plan.md`; HeroClock `ТАШКЕНТ · … · ОТКРЫТО` |

Повторный прогон скрипта: **18/18**, open issues **0**.

### Что исправлено в этом прогоне

1. **`/trainers` 404** → честный empty-state без выдуманных имён (`FEATURES.trainers=false`).
2. **Горизонтальный скролл на legal** → `word-break: keep-all` ломал «конфиденциальности»; заменено на `overflow-wrap: anywhere`.
3. **LCP / mobile perf 86→90** → hero-заголовок без `opacity:0` entrance; SVG-hero через CSS; облегчены шрифты.
4. **Сигнатура OpenNow** → устаревшие `brass`/`smoke` токены → `pool`/`chalk`.
5. **Telegram wiring** → `TELEGRAM_API_BASE` + mock для приёмки; payload проверен; для живого чата менеджера нужен `/start` → `capture-telegram-chat-id.mjs`.
6. **Analytics QA** → `NEXT_PUBLIC_ANALYTICS_DEBUG` в `.env.example`.

## Прогон 2 — скрины

Папка: `docs/phase8-final/`

Схема имён: `<страница>-<ширина>.png`  
Ширины: `360`, `390`, `768`, `1024`, `1440`  
**60 PNG**.

| Префикс | Что |
|---------|-----|
| `home-*` | Главная fullPage (все секции) |
| `pricing-*` | /pricing |
| `services-gym-*` | /services/gym |
| `schedule-*` | /schedule |
| `about-*` | /about |
| `contacts-*` | /contacts |
| `faq-*` | /faq |
| `legal-privacy-*` | /legal/privacy |
| `legal-offer-*` | /legal/offer |
| `404-*` | стилизованная 404 |
| `menu-*` | открытое fullscreen-меню (mobile) / хедер (desktop) |
| `lead-*` | открытая модалка лида |

На каждой ширине: нет document overflow-x, нет обрезанного текста вне intentional scrollers, sticky с safe-area sim.

## Lighthouse (throttled lab)

| | Perf | A11y | LCP | CLS | TBT |
|--|------|------|-----|-----|-----|
| Mobile | 90 | 97 | 3.2s | 0 | 100ms |
| Desktop | 99 | 97 | 0.8s | 0 | 0ms |

SEO-категория LH намеренно низкая при `NEXT_PUBLIC_NOINDEX=true` (`is-crawlable` fail) — это требование §5/§10, не баг.

## CONTENT_TODO.md — статус

Список **актуален**. От клуба по-прежнему нужно:

| Блок | Статус |
|------|--------|
| Реальные фото зон | ❌ SVG-заглушки |
| Тренеры (имена/фото/стаж) | ❌ секция скрыта флагом |
| Точные цены | ❌ ориентиры в `plans.ts` |
| Реквизиты оферты / privacy | ❌ TODO в legal |
| Координаты / «как добраться» | ❌ ориентир |
| Актуальное расписание | ❌ черновик |
| Брендбук / логотип | ❌ |
| Живой `TELEGRAM_CHAT_ID` менеджера | ❌ (токен бота есть; chat_id после `/start`) |
| Метрика/GA / снять noindex | ❌ после договора |

Контакты менеджера (телефон, TG sales) — уже приняты ранее.
