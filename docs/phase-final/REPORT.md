# Финальная приёмка — фазы 8+9

Дата: 2026-07-30. Артефакты: `ACCEPTANCE.json`, скрины `*.png`, скрипт `scripts/phase-final-acceptance.mjs`.

## Прогон 1 — чек-лист §10

| # | Пункт | Статус | Доказательство |
|---|--------|--------|----------------|
| 1 | `npm run build` / lint / typecheck; TS strict; без `any` | ✅ | `typecheck` exit 0; `lint` clean; `build` exit 0 (Next 15.5.22, 62 pages); `strict: true`; grep `: any` — пусто |
| 2 | 360px + sticky + safe-area | ✅ | Playwright 360: sticky + shell `padBottom`; бар `paddingBottom: env(safe-area-inset-bottom)`; overflowX=false на 50 page×width |
| 3 | ≤3 действия до заявки; цены без клика | ✅ | 5 цен в `#pricing` без клика; воронка sticky → форма → submit |
| 4 | Заявка → Telegram; ошибки достойно | ✅ | `POST /api/lead` → 200 `ok=true` (mock Bot API на `:4099`); UI success «15 минут»; validation 400; при сбое — error UI с tel/Telegram |
| 5 | Все страницы §3, ссылки, 404 | ✅ | 20 маршрутов 200; стилизованный 404; `/trainers` 200 (empty-state) |
| 6 | RU/UZ + hreflang | ✅ | pricing RU≠UZ; hreflang ru/uz/en |
| 7 | Lighthouse + reduced-motion + клавиатура | ✅ | CSS+Framer `prefers-reduced-motion`; Tab focus; LH lab из phase8-final (mobile perf 90 / desktop 99) — стек не менялся по perf-критичным путям |
| 8 | JSON-LD + noindex | ✅ | `SportsActivityLocation` + geo + 24/7; robots `Disallow: /`; meta `noindex,nofollow` |
| 9 | Аналитика в точках | ✅ | console `[analytics] open_lead_form` (dev / debug) |
| 10 | CONTENT_TODO / media README / .env.example / README | ✅ | Файлы на месте (см. `ACCEPTANCE.json`) |
| 11 | Дизайн-план + «Открыто сейчас» | ✅ | `docs/design-plan.md`; HeroClock `ТАШКЕНТ · … · ОТКРЫТО` |

Повторный прогон скрипта: **22/22**, open issues **0**.

### Исправлено в этом прогоне

1. **«Показать карту» без Maps API key** — раньше всегда монтировался Yandex iframe. По приёмке: без `NEXT_PUBLIC_MAPS_API_KEY` / `NEXT_PUBLIC_MAPS_EMBED=yandex` клик открывает **Google Maps** во внешней вкладке; iframe не создаётся. На `/contacts` дополнительно ссылки Google Maps и 2ГИС. Opt-in embed — через `.env.example`.
2. **Скрины внутренних страниц** — page `template.tsx` стартует с `opacity:0`; скрипт ждал мало → пустые одинаковые PNG. Ждём opaque `main > *` перед screenshot.
3. **menu@768 / lead@1024** — клик по скрытой CTA внутри закрытого `#mobile-nav`; исправлено на visible header CTA + `force` на hamburger.

## Прогон 2 — визуальный проход

Папка: `docs/phase-final/`

Схема: `<страница>-<ширина>.png`  
Ширины: `360`, `390`, `768`, `1024`, `1440`  
**60 PNG**.

| Префикс | Что |
|---------|-----|
| `home-*` | Главная fullPage |
| `pricing-*` | /pricing |
| `services-gym-*` | /services/gym |
| `schedule-*` | /schedule |
| `about-*` | /about |
| `contacts-*` | /contacts |
| `faq-*` | /faq |
| `legal-privacy-*` | /legal/privacy |
| `legal-offer-*` | /legal/offer |
| `404-*` | стилизованная 404 |
| `menu-*` | fullscreen-меню (≤768) / хедер (desktop) |
| `lead-*` | модалка лида |

На каждой ширине: нет document overflow-x, нет обрезанного текста вне intentional scrollers, sticky с safe-area (код + mobile sim).

## Карта без API-ключа — подтверждение

**Фактическое поведение (проверено Playwright):**

- В `.env` / `.env.local` **нет** `NEXT_PUBLIC_MAPS_API_KEY` и нет `NEXT_PUBLIC_MAPS_EMBED`.
- Клик «Показать карту» → `window.open(https://www.google.com/maps/search/?api=1&query=41.2995,69.2797)` — внешняя вкладка.
- Число iframe на странице **не меняется** (0→0). Пустой iframe не монтируется.
- На `/contacts` также есть текстовые ссылки на Google Maps и 2ГИС.
- In-page Yandex embed включается только при `NEXT_PUBLIC_MAPS_EMBED=yandex` (или при заданном `NEXT_PUBLIC_MAPS_API_KEY`).

## CONTENT_TODO — без изменений по статусу

От клуба по-прежнему нужны реальные фото, точные цены, реквизиты оферты, живой `TELEGRAM_CHAT_ID` менеджера, снятие noindex после договора.
