# Buka FIT

Production site for Buka FIT — 24/7 fitness club in Tashkent (Mirabad 41/6).

## Stack

- Next.js 15 (App Router) + TypeScript strict
- Tailwind CSS v4
- next-intl (RU / UZ / EN)
- Framer Motion 11
- react-hook-form + zod (lead form)
- Telegram Bot API (lead delivery)

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ru`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Where to edit content

| Data | Path |
|------|------|
| Club facts, phone, socials | `content/club.ts` |
| Plans (4 cards + day pass) | `content/plans.ts` |
| Services | `content/services.ts` |
| Schedule | `content/schedule.ts` |
| Trainers | `content/trainers.ts` |
| FAQ | `content/faq.ts` |
| UI strings | `messages/ru.json`, `uz.json`, `en.json` |
| Club TODOs | `CONTENT_TODO.md` |
| Design tokens | `app/globals.css` + `docs/design-plan.md` |

## Telegram leads (dev vs handoff)

Leads go to `POST /api/lead` → Telegram Bot API. Recipients are **only** from env:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

**On development:** put the developer’s **test bot** token and your personal (or test group) `chat_id` in `.env.local`.  
**Before handing the project to the club:** replace both with the club bot and the manager chat id. Do not hardcode `chat_id` in the repo.

### How to get `TELEGRAM_CHAT_ID` for your test bot

1. Create a bot with [@BotFather](https://t.me/BotFather) (or use the existing test bot).
2. Open a chat with the bot and send any message (e.g. `/start`).
3. Open in a browser (replace `TOKEN`):

   `https://api.telegram.org/botTOKEN/getUpdates`

4. Find `"chat":{"id": … }` — that number is `TELEGRAM_CHAT_ID`.
5. Put token + chat id into `.env.local`, restart `npm run dev`.
6. Submit the form on the homepage — the message should appear in that chat.

## Env

See `.env.example`. Keep `NEXT_PUBLIC_NOINDEX=true` until the club contract is signed.

Online payment is **not** connected — only stub adapters in `lib/payments/` (Click / Payme). Default conversion path is the lead form.

## Design

See `docs/design-plan.md` (approved Phase 1 + amendments).

## Phases

1. Design + file plan — done  
2. Skeleton — done (configs, tokens, header/footer, i18n, content)  
3. Home + lead flow — done  
4. Remaining pages  
5. SEO / analytics  
6. Motion / a11y / perf  
7. Acceptance checklist  
