# Buka FIT — План файлов проекта (Фаза 1)

> Ориентир структуры из раздела 7 ТЗ, расширенный до production-скелета.  
> Код не пишется до утверждения Фазы 1.

```
BUKAFIT/
├── app/
│   ├── layout.tsx                          # корневой html/lang shell (минимум)
│   ├── globals.css                         # Tailwind v4 + CSS-переменные токенов
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx                       # стилизованная 404 + CTA на тарифы
│   ├── api/
│   │   └── lead/
│   │       └── route.ts                    # POST /api/lead
│   └── [locale]/
│       ├── layout.tsx                      # next-intl, fonts, analytics shell
│       ├── template.tsx                    # page transition ~300ms
│       ├── not-found.tsx
│       └── (site)/
│           ├── layout.tsx                  # Header + Footer + StickyBar + LeadModal provider
│           ├── page.tsx                    # /
│           ├── pricing/page.tsx
│           ├── schedule/page.tsx
│           ├── trainers/page.tsx
│           ├── about/page.tsx
│           ├── contacts/page.tsx
│           ├── faq/page.tsx
│           ├── services/
│           │   ├── page.tsx                # опциональный индекс услуг (или редирект)
│           │   └── [slug]/page.tsx         # gym|pool|group|spa|massage|kids|personal
│           └── legal/
│               ├── privacy/page.tsx
│               └── offer/page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Accordion.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   ├── Chip.tsx
│   │   ├── Skeleton.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LocaleSwitcher.tsx
│   │   ├── MobileNav.tsx
│   │   └── OpenNowBadge.tsx              # сигнатура «● Открыто сейчас · HH:MM»
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FactsStrip.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── SchedulePreview.tsx
│   │   ├── TrainersPreview.tsx
│   │   ├── Gallery.tsx
│   │   ├── FaqSection.tsx
│   │   ├── ContactsMap.tsx               # lazy embed по клику
│   │   ├── FinalCta.tsx
│   │   ├── HowToBuy.tsx
│   │   ├── PlanComparison.tsx
│   │   └── ServiceTemplate.tsx           # шаблон /services/[slug]
│   ├── lead/
│   │   ├── LeadProvider.tsx
│   │   ├── LeadModal.tsx
│   │   ├── LeadForm.tsx
│   │   └── StickyCtaBar.tsx
│   ├── schedule/
│   │   ├── ScheduleTable.tsx
│   │   ├── DayTabs.tsx
│   │   └── DirectionFilters.tsx
│   ├── media/
│   │   └── MediaPlaceholder.tsx          # SVG-заглушки зон
│   └── analytics/
│       └── AnalyticsScripts.tsx
│
├── content/
│   ├── club.ts
│   ├── plans.ts
│   ├── services.ts
│   ├── schedule.ts
│   ├── trainers.ts
│   └── faq.ts
│
├── messages/
│   ├── ru.json
│   └── uz.json
│
├── lib/
│   ├── utils.ts
│   ├── i18n/
│   │   ├── routing.ts
│   │   ├── request.ts
│   │   └── navigation.ts
│   ├── validations/
│   │   └── lead.ts                       # zod-схема заявки
│   ├── telegram.ts
│   ├── analytics.ts
│   ├── rate-limit.ts
│   ├── utm.ts
│   ├── time.ts                           # Asia/Tashkent helpers для OpenNow
│   ├── lead-store.ts                     # интерфейс LeadStore + заглушка
│   └── payments/
│       ├── provider.ts                   # PaymentProvider
│       ├── click.ts                      # заглушка + TODO
│       └── payme.ts                      # заглушка + TODO
│
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── og/
│   │   └── default.jpg                   # OG fallback (или генерация позже)
│   └── media/
│       ├── README.md                     # манифест слотов фото
│       ├── brand/                        # логотип/брендбук (пока пусто)
│       └── placeholders/                 # SVG-заглушки зон
│           ├── gym.svg
│           ├── pool.svg
│           ├── group.svg
│           ├── spa.svg
│           ├── massage.svg
│           ├── kids.svg
│           ├── personal.svg
│           ├── cafe.svg
│           ├── hero.svg
│           └── trainers/
│               └── placeholder.svg
│
├── docs/
│   ├── design-plan.md                    # ✅ Фаза 1
│   └── file-plan.md                      # этот файл
│
├── middleware.ts                         # next-intl: / → /ru
├── next.config.ts
├── tailwind.config.ts                    # если нужен рядом с v4 CSS-first
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── CONTENT_TODO.md
└── master_prompt_bukafit_site.md
```

## Примечания к плану

1. **Локали:** маршруты `/ru/...` и `/uz/...`; дефолт — редирект на `/ru`.
2. **Лид-флоу** централизован в `LeadProvider` — модалка открывается с любой страницы/карточки тарифа с предвыбранным `planId`.
3. **Контент** только в `/content` + словари `messages/*`; UI-строки не хардкодятся.
4. **Платежи:** только интерфейс и заглушки; страницы не зависят от реального провайдера.
5. **Фазы:** Фаза 2 создаёт скелет (конфиги, токены, layout, i18n, content); Фаза 3 — главная + лид; Фаза 4 — остальные страницы; далее SEO/motion/приёмка.
