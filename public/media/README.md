# Media slots — Buka FIT

Replace placeholders with real photos under `public/media/`. Keep slot names or update `components/media/MediaImage.tsx`.

## Drop real photos here

| Slot | Suggested path | Aspect | Used on |
|------|----------------|--------|---------|
| Hero | `media/hero.jpg` (then point MediaImage/HeroMedia) | 16:9 · ≥1920×1080 | Home hero |
| Gym | `media/gym.jpg` | 4:3 · ≥1600×1200 | Services, gallery |
| Pool | `media/pool.jpg` | 4:3 | Services, gallery |
| Group | `media/group.jpg` | 4:3 | Services, gallery |
| Spa | `media/spa.jpg` | 4:3 | Services, gallery |
| Massage | `media/massage.jpg` | 4:3 | Services, gallery |
| Kids | `media/kids.jpg` | 4:3 | Services |
| Personal | `media/personal.jpg` | 4:3 | Services |
| Cafe | `media/cafe.jpg` | 4:3 | Gallery |
| Trainer | `media/trainers/*.jpg` | 4:5 · ≥800×1000 | Trainers |

Until replaced, light dashed **PLACEHOLDER** SVGs live in `placeholders/` — they must not read as finished photos.

## Processing

- `object-fit: cover` via `next/image` + `sizes`
- Text under copy: gradient overlay (`overlay="bottom" | "full"`)
- Warm graphite / brass treatment when real assets land
