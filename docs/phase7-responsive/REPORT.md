# Phase 7 — responsive check

Date: 2026-07-30. Tool: Playwright Chromium. URL: `/ru`.

| Width | overflow-x | clipped headings | sticky bar | pad-bottom (safe) | longest price in card |
|------:|:----------:|:----------------:|-----------:|------------------:|-----------------------|
| 360 | no | no | 65px | 68px | 15 000 000 fits (card 328px) |
| 390 | no | no | 65px | 68px | fits (card 358px) |
| 768 | no | no | hidden (md+) | 0 | fits |
| 1024 | no | no | hidden | 0 | fits |
| 1440 | no | no | hidden | 0 | fits (narrowest card ~260px) |

Screenshots: `home-{w}-top.png`, `home-{w}-pricing.png` in this folder.
Raw: `metrics.json`.
