# Фаза 8 · п.4b + фиксы 4a

Дата: 2026-07-30. Playwright Chromium.

## Фиксы 4a

| | |
|--|--|
| Тариф «Год» | CTA — flush end-cap `pool` на всю высоту строки (desktop) / на всю ширину ink-блока (mobile), без inset-рамки |
| Гамбургер | Три волосяные линии, без border/фона; открытое меню — fullscreen `ink` + display-навигация |

Скриншоты: `header-360.png`, `menu-360.png`, `pricing-360.png`, `pricing-1440.png`.

## Секции 4b

| Секция | 360 | 1440 |
|--------|-----|------|
| Услуги §4.4 | `services-360.png` | `services-1440.png` |
| Расписание §4.5 | `schedule-360.png` | `schedule-1440.png` |
| Галерея §4.6 | `gallery-360.png` | `gallery-1440.png` |
| FAQ §4.7 | `faq-360.png` | `faq-1440.png` |
| Контакты §4.8 | `contacts-360.png` | `contacts-1440.png` |

## Проверки

- Мозаика: 12-col areas (gym 7×2, pool/spa 5, group/massage/kids 4, personal 12), gap 8px, full-bleed; mobile 4:5 stack.
- Галерея: `clamp(320px,42vh,560px)`, mineral + mono `ФОТО · …` пока нет jpg.
- FAQ: 5+7 колонки, sticky intro, `+`/`×`, волосяные, без боксов.
- Контакты: ink/chalk сплит + mineral grid map placeholder.
- build / lint / tsc — чисто.
