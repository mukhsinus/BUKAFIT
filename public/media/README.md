# Media slots — Buka FIT

Replace placeholders with real photos. Keep filenames or update references in `content/*` and components.

## Brand

| Path | Purpose |
|------|---------|
| `public/media/brand/` | Logo, brandbook assets. Empty → design uses fallback palette from `docs/design-plan.md`. |

When brand files appear: extract palette and propose a sync with current tokens.

## Placeholders (current)

| Slot | File | Suggested size | Aspect |
|------|------|----------------|--------|
| Hero | `placeholders/hero.svg` | 1920×1080 | 16:9 |
| Gym | `placeholders/gym.svg` | 1600×1200 | 4:3 |
| Pool | `placeholders/pool.svg` | 1600×1200 | 4:3 |
| Group | `placeholders/group.svg` | 1600×1200 | 4:3 |
| Spa | `placeholders/spa.svg` | 1600×1200 | 4:3 |
| Massage | `placeholders/massage.svg` | 1600×1200 | 4:3 |
| Kids | `placeholders/kids.svg` | 1600×1200 | 4:3 |
| Personal | `placeholders/personal.svg` | 1600×1200 | 4:3 |
| Cafe | `placeholders/cafe.svg` | 1600×1200 | 4:3 |
| Trainer | `placeholders/trainers/placeholder.svg` | 800×1000 | 4:5 |

## Processing (from design plan)

- Warm graphite base, light brass lift on highlights (~8–12% overlay).
- Text overlay: bottom/left gradient to `graphite`.
- Prefer AVIF/WebP via `next/image` when replacing SVGs.
