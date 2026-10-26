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
| `--moss-wash` | `#e4eae1` | Brand-tinted cards: rating card, news image backgrounds. |
| `--cream` | `#f6efdc` | Warm highlight card. Used once ("Há lugar na lagoa?"). |
| `--ink` | `#151e1b` | Text. A green-tinted near-black, never pure black. |
| `--graphite` | `#4d4f4c` | Secondary text. |
| `--border` | `#e0e4dd` | Hairlines for cards, inputs, dividers. |
| `--forest` | `#3b5236` | The wall green, darker (same hue). Buttons, links, hero title, text on tints. |
| `--wall` | `#4d6747` | The shop's wall green, sampled from the interior photo. Novidades section, footer, barber cromos, the "Combo da casa" card, the rating card, icons and eyebrows. |
| `--leaf` | `#4d6747` | Success messages. Same as the wall. |

Rules:
- `--forest` is for actions and the hero title, never for large background blocks.
- The wall green is the brand's surface colour: the footer and the rating card sit on it with white text. The darkest place is the photo band.
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
- **Barbeiros (cartões de visita)**: one white card per barber, two side by side (one per row below 900px): photo on the left (stacked on top on phones), then "2685 Finest · Sacavém", the name, "Barbeiro · na casa há 3 anos", a hairline, the bio and a "Marcar com o …" button to their Booksy page. Small `frog-head` crest in the top corner. Under them, a slim dashed strip "Procura-se barbeiro" with the `frog-cv` frog and "Fala connosco".
- **Plants**: hand-drawn SVG plants in the wall-green family. Each one grows from something real on the page, never from empty space: ivy draped over the top of the hero photo; a pothos in a pot hanging on cords from the header line; a Boston fern in a pot hanging from the edge of the Serviços section; eucalyptus sprigs coming in from the screen edge (A casa, Contacto). Still by default. Moving the mouse through a plant pushes nearby leaves in the direction of travel like a breeze; they settle slowly on a damped spring (in `main.js`), and a resting pointer adds nothing. Below 1280px only the ivy on the hero photo stays.
- **Feature**: 28px outline icon (1.5px stroke) in `--wall`, title, short text. No card around it.
- **Serviços (talão)**: the price list is a till receipt (Space Mono only on the small print, prices in Manrope at 1–1.125rem so they read easily; off-white paper, dashed rules, logo and address on top, "Preços atualizados a <data>" (edit the date in index.html when prices change), a crumpled-paper crease texture (assets/images/textures/paper-crumple.webp, multiply at 10%) with soft uneven light, a few small rips cut into the edges (inline SVG masks), a torn zigzag bottom via CSS mask and a CSS barcode; no total and no button), as wide as the page under the usual heading, barely tilted with a soft shadow. Six main services show first (Skinfade with a square "★ Mais popular" tag); Combos, Kids and Extras unroll from a clear moss-wash bar with a green "+" circle, "Ver todos os preços" (becomes "Esconder preços" when open).
- **Inputs**: hairline border that turns forest on focus. No glow.

- **Galeria (grelha simples)**: plain photos on white, 4 per row on desktop and 2 on mobile, 4:5 with rounded corners and a short caption underneath (title in bold, subtitle in grey). Hover zooms the photo slightly; a click opens it bigger in a `<dialog>` with its line of text. Kept deliberately quiet because the news fan, plants and cromos already carry the playful parts. Only photos of people, from `assets/data/gallery.js`.

## The frog

The shop's mascot (crown, gold chain with "85"):

1. Hero: `frog-lounging`, resting on the corner of the interior photo.
2. Novidades: every banner carries a frog (lounging, standing, cigar, the Sacavém sticker).
3. Barber cards: `frog-head` as a small crest. "Procura-se barbeiro" strip: `frog-cv` (holding a CV, pointing at the reader).
4. Contact form: `frog-head`. Footer: `frog-standing`. Favicon: frog head from the sticker.
5. Banners: the "Sapos a virar príncipes" Sacavém sticker. The gallery itself only shows people.

## Imagery

Real photos only: the interior, the façade, the barbers, the cuts. No stock photos. The only decorative graphics are the mascot and the margin plants.

## Voice

Portuguese (pt-PT), informal "tu", calm and warm. Short sentences.
