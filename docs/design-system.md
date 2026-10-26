# 2685 Finest — Design System

The shop feels clean, calm, artistic and natural: white light, sage-green walls, hanging ivy, black paisley capes.
The site mirrors that. It is about 90% white paper, with one deep green taken from the walls doing all the work,
generous whitespace and hairline borders instead of shadows. The frog shows up a few times, with restraint.

All values live in [`assets/css/tokens.css`](../assets/css/tokens.css).

## Colour

One green family only: every green on the site, plants included, is a shade or tint of the wall green (hue ~109°). Don't introduce yellow-greens or blue-greens; the frog illustrations are the only exception.

| Token | Hex | Use |
| --- | --- | --- |
| `--paper` | `#ffffff` | Page canvas, cards. |
| `--fog` | `#f2f4f0` | Alternate sections (Serviços, Avaliações), tab hover. A pale wash of the wall green. |
| `--moss-wash` | `#e4eae1` | Brand-tinted cards: featured services, rating card, news image backgrounds. |
| `--cream` | `#f6efdc` | Warm highlight card. Used once ("Há lugar na lagoa?"). |
| `--ink` | `#151e1b` | Text. A green-tinted near-black, never pure black. |
| `--graphite` | `#4d4f4c` | Secondary text. |
| `--border` | `#e0e4dd` | Hairlines for cards, inputs, dividers. |
| `--forest` | `#3b5236` | The wall green, darker (same hue). Buttons, links, hero title, text on tints. |
| `--wall` | `#4d6747` | The shop's wall green, sampled from the interior photo. Novidades section, footer, barber cromos, the "Combo da casa" card, the rating card, icons and eyebrows. |
| `--leaf` | `#4d6747` | Success messages. Same as the wall. |

Rules:
- `--forest` is for actions and the hero title, never for large background blocks.
- The wall green is the brand's surface colour: the footer, cromos, one featured service and the rating card sit on it with white text. The darkest places are the photo band and the gallery, which never sit next to each other.
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

- **Buttons**: `.btn--primary` (forest fill), `.btn--outline` (hairline), `.btn--light` (on the dark band). `.link` for text links.
- **Novidades card stack**: the news banners fanned out like a hand of cards (adapted from a React CardStack to plain JS/CSS). The active card sits in front, lifted; the others step out to each side with a small angle, pushed back in depth and tilted. Arrows + counter top right, dots below; click a card behind, drag/swipe the front one, or use the keyboard arrows. Springy 0.7s transitions. Autoplay every 5s on all screens, paused on hover/keyboard focus; a manual change restarts the count; none with reduced motion. Banners are drawn from `assets/data/news.js` (`green` or `light` theme, always a frog), or a finished image via the `banner` field.
- **Cromo** (barber card): football-sticker card. Header strip "2685 Finest · Época 2026", photo with number badge and frog-head crest, forest name plate in Antonio uppercase, two small stats. On hover it lifts and tilts by 1° with a faint sheen. The empty slot ("Procura-se", Nº 03) has the same layout drawn as a dashed outline, with the frog holding a CV and pointing at you (`frog-cv`), and the text "Podes ser o cromo que nos falta". The three columns use CSS subgrid so cards, texts and links line up at the same height.
- **Plants**: hand-drawn SVG plants in the wall-green family. Each one grows from something real on the page, never from empty space: ivy draped over the top of the hero photo; a pothos in a pot hanging on cords from the header line; a Boston fern in a pot hanging from the edge of the Serviços section; eucalyptus sprigs coming in from the screen edge (A casa, Contacto). Still by default. Moving the mouse through a plant pushes nearby leaves in the direction of travel like a breeze; they settle slowly on a damped spring (in `main.js`), and a resting pointer adds nothing. Below 1280px only the ivy on the hero photo stays.
- **Feature**: 28px outline icon (1.5px stroke) in `--wall`, title, short text. No card around it.
- **Featured service cards**; the most popular one has a forest outline and a "★ Mais popular" pill, repeated next to it in the price list.
- **Tabs**: 8px radius, hairline; active is forest with white text.
- **Inputs**: hairline border that turns forest on focus. No glow.

- **Galeria (3D coverflow)**: the one deep-green room (`#1d2a1b`–`#24331f`, same hue as the wall) with a soft green glow. The front photo stands upright with tag, Antonio title + subtitle, a short line and a pale-green pill button; the photos on each side turn away 32° in 3D, further back and shaded. Arrows on the sides, keyboard, swipe, or click a side photo. Only photos of people, from `assets/data/gallery.js`.

## The frog

The shop's mascot (crown, gold chain with "85"):

1. Hero: `frog-lounging`, resting on the corner of the interior photo.
2. Novidades: every banner carries a frog (lounging, standing, cigar, the Sacavém sticker).
3. Barber cromos: `frog-head` as the club crest. "Procura-se" slot: `frog-cv` (holding a CV, pointing at the reader).
4. Contact form: `frog-head`. Footer: `frog-standing`. Favicon: frog head from the sticker.
5. Banners: the "Sapos a virar príncipes" Sacavém sticker. The gallery itself only shows people.

## Imagery

Real photos only: the interior, the façade, the barbers, the cuts. No stock photos. The only decorative graphics are the mascot and the margin plants.

## Voice

Portuguese (pt-PT), informal "tu", calm and warm. Short sentences.
