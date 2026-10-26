# 2685 Finest — Design System

The shop feels clean, calm, artistic and natural: white light, sage-green walls, hanging ivy, black paisley capes.
The site mirrors that. It is about 90% white paper, with one deep green taken from the walls doing all the work,
generous whitespace and hairline borders instead of shadows. The frog shows up a few times, with restraint.

All values live in [`assets/css/tokens.css`](../assets/css/tokens.css).

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#ffffff` | Page canvas, cards. |
| `--fog` | `#f5f5f2` | Alternate sections (Novidades, Serviços, Avaliações, footer), tab hover. |
| `--moss-wash` | `#e9efe6` | Brand-tinted cards: featured services, rating card, news image backgrounds. |
| `--cream` | `#f6efdc` | Warm highlight card. Used once ("Há lugar na lagoa?"). |
| `--ink` | `#151e1b` | Text. A green-tinted near-black, never pure black. |
| `--graphite` | `#4d4f4c` | Secondary text. |
| `--border` | `#e4e5e3` | Hairlines for cards, inputs, dividers. |
| `--forest` | `#2f4530` | Primary action, hero title, active tab, stars, links. |
| `--wall` | `#4d6747` | The shop's wall green, sampled from the interior photo. Icons and eyebrows. |
| `--leaf` | `#3f7d22` | Success messages. |

Rules:
- `--forest` is for actions and the hero title, never for large background blocks.
- The only dark section is the photo band ("Onde os sapos viram príncipes"). Don't add more.
- Stars are green, not yellow.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display | **Antonio** 700 | Hero title only ("2685 Finest"), uppercase, wide tracking. Echoes the condensed letters in the logo. |
| Everything else | **Manrope** 400–700 | Section titles 700 with tight tracking; body 400; buttons and nav 500. |

Eyebrows (`.eyebrow`) are 12px, 600, tracked `.14em`, uppercase, in `--wall`.

## Shape & space

- Radii: **4px** buttons, **8px** cards, photos and inputs, **12px** larger panels.
- Max width 1200px. Sections are 72–120px apart.
- Shadows only on the hero photo (`--shadow-photo`). Everything else uses hairline borders.

## Components

- **Notice bar**: thin green bar above the header with the latest news.
- **Buttons**: `.btn--primary` (forest fill), `.btn--outline` (hairline), `.btn--light` (on the dark band). `.link` for text links.
- **Novidades**: one headline (large image, tag + date, title, text, link) with the other items listed beside it as rows with a small thumbnail and hairline dividers. Rendered from `assets/data/news.js`.
- **Cromo** (barber card): football-sticker card. Header strip "2685 Finest · Época 2026", photo with number badge and frog-head crest, forest name plate in Antonio uppercase, two small stats. On hover it lifts and tilts by 1° with a faint sheen. The empty slot ("Cromo em falta") invites barbers to join.
- **Plants**: hand-drawn ivy and eucalyptus SVGs in the page margins (hero, A casa, Equipa, Contacto), wall-green outline with pale leaves. Still by default; on mouse hover they sway about 2° and the leaves rustle once. No motion on touch or with reduced motion. Hidden below 1280px except one short vine in the mobile hero.
- **Feature**: 28px outline icon (1.5px stroke) in `--wall`, title, short text. No card around it.
- **Featured service card** and **rating card** on `--moss-wash`.
- **Tabs**: 8px radius, hairline; active is forest with white text.
- **Inputs**: hairline border that turns forest on focus. No glow.

## The frog

The shop's mascot (crown, gold chain with "85"):

1. Hero: `frog-lounging`, resting on the corner of the interior photo.
2. Novidades: whatever image each news item uses.
3. Barber cromos: `frog-head` as the club crest. "Cromo em falta" slot: `frog-cigar`, greyed.
4. Contact form: `frog-head`. Footer: `frog-standing`. Favicon: frog head from the sticker.
5. Gallery: the "Sapos a virar príncipes" Sacavém sticker.

## Imagery

Real photos only: the interior, the façade, the barbers, the cuts. No stock photos. The only decorative graphics are the mascot and the margin plants.

## Voice

Portuguese (pt-PT), informal "tu", calm and warm. Short sentences.
