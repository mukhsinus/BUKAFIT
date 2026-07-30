# Фаза 9 — отчёт

## Артефакты

| Пункт | Файл |
|-------|------|
| Hero + курсор-эффект | [`01-hero-cursor.png`](./01-hero-cursor.png), [`01-hero-cursor.webm`](./01-hero-cursor.webm) |
| Строка «Год» + градиент | [`02-year-gradient.png`](./02-year-gradient.png), [`02-pricing-section.png`](./02-pricing-section.png) |
| Карта (новый вид) | [`03-map-pin.png`](./03-map-pin.png) |

## 1. Живой градиент

- Токен `--gradient-pool` + класс `.gradient-pool` + `animate-gradient-drift` (24s).
- Применено только в 4 местах: hero (под медиа), строка «Год», футер, Final CTA «Готов начать?».
- `prefers-reduced-motion` — анимация отключена.

## 2. Строка «Год»

- Фон — `--gradient-pool` поверх `ink`, не плоская заливка.
- Градиент fade-in 600ms с delay 150ms при входе во вьюпорт; текст идёт общим Reveal секции.
- Hover: дрейф ускоряется до 8s (`.gradient-pool-year:hover .gradient-pool-layer`).
- Пилюля «Выгодный выбор» — `badge-pulse` opacity 0.85↔1, 2s.

## 3. Карта

- Заливка `mineral`, сетка убрана.
- SVG-булавка `pool` + мягкое радиальное пятно под ней (не box-shadow).
- Hover: pin-bounce 2 итерации + подпись адреса.
- Клик «Показать карту» → Яндекс embed.

## 4. Motion — что сделано

| Эффект | Статус | Как ощущается |
|--------|--------|---------------|
| Hero-заголовок clip-path L→R, 700ms, stagger 150ms | ✅ | Строки маской открываются слева направо |
| Курсор-пятно pool на hero (desktop, lerp) | ✅ | Мягкое пятно с инерцией; webm |
| Count-up: scale 1.05→1 + blur 2px→0 | ✅ | Цифры «наезжают» и проясняются |
| Page enter: fade + scale 0.99→1 | ✅ | Вход страницы чуть «подъезжает» |
| Price rows: hover translateX(4px) + заливка | ✅ | Вся строка сдвигается со стрелкой |
| Mosaic PhotoTile: параллакс 5px за курсором | ✅ | Только реальное фото, не SVG/плейсхолдер |
| Scroll progress 2px pool | ✅ | Полоса сверху на всех site-страницах |
| FAQ plus: scale 0.9→1 + rotate(45°) | ✅ | Крест «щёлкает» при открытии |

Ничего из списка motion не откладывалось.

## Build

- `tsc --noEmit` — чисто
- `next lint` — чисто
- `npm run build` — успешно
