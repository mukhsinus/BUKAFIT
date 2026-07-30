# Фаза 8 · п.4a — Hero + факты + прайс

Дата: 2026-07-30. Скриншоты Playwright Chromium.

## Скриншоты

| | 360 | 1440 |
|--|-----|------|
| Hero | `hero-360.png` | `hero-1440.png` |
| Прайс | `pricing-360.png` (VIP / 15M в кадре) | `pricing-1440.png` |
| Прайс целиком | `pricing-360-full.png` | — |

Метрики: `metrics.json`.

## Проверки

- Заголовок: 2 строки, sentence case; «не закрывается» без клипа (hero `clamp(2.5rem, 7.5vw, 7.5rem)`).
- Живое время Asia/Tashkent только в hero; полоса «сейчас в клубе» из `getCurrentClass()` + `content/schedule.ts`.
- Плейсхолдер hero без текста поверх заголовка.
- Факты: 4 ячейки, волосяные, count-up 900ms once; без marquee.
- Прайс: строки, не карточки; «Год» = ink/chalk + mono-пилюля; разовое — сноска.
- **15 000 000** на 360: JetBrains Mono 24px, width 172 / row 320, `overflows: false`, nowrap.
- build / lint / tsc — чисто.
