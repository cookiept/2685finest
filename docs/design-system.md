# 2685 Finest — Design System

The brand is a neighbourhood barbershop with top-tier standards. The visual language mixes **street poster boldness** (condensed caps, outlined type, rotated ticker) with a **playful frog mascot** and a clean, readable price menu.

All values live in [`assets/css/tokens.css`](../assets/css/tokens.css).

## Colour

Taken from the shop itself: black barber capes, sage-green walls, the frog and its gold crown.

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0f120e` | Main background (the black capes). |
| `--ink-2` / `--ink-3` | `#171b15` / `#21271e` | Raised surfaces, cards, inputs. |
| `--bone` | `#f3efe6` | Primary text on dark; background of the Services section. |
| `--bone-dim` | `#aeab9f` | Secondary text on dark. |
| `--frog` | `#7cc04b` | Signature accent: CTAs, highlights. Matches the frog's skin. |
| `--frog-deep` | `#4e8a2a` | Frog green on light (`--bone`) backgrounds. |
| `--sage` | `#5f8458` | The shop's walls; hero glow. |
| `--moss` | `#22341f` | Deep green panels (Reviews, news images, join card). |
| `--gold` | `#f0a63a` | The crown and chain: ratings, news tags, the "Simões" signature. |

Rules: one frog-green element dominates each viewport; gold is for small highlights only. Never put `--frog` text on `--bone`; use `--frog-deep`.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display | **Anton** | Always uppercase. Headlines, prices, numbers. |
| Body | **Archivo** 400–800 | Paragraphs, UI, labels. |
| Accent | **Instrument Serif** italic | The "&" in headings (`.script`). |
| Signature | **Mr Dafoe** | Only the gold "Simões" in the hero, echoing the script in the logo. |

Labels (`.label`) are 12px, bold, tracked `.18em`, uppercase, numbered (`01 · A casa`).

## Shape & space

- Radii: `6px` small, `14px` inputs, `28px` cards and photos, pills for buttons and tags.
- Sections breathe: `--section-y` is 5–9rem.
- Layout max width 1280px, fluid gutter.

## Components

- **Buttons**: `.btn--frog` (primary, Booksy), `.btn--ghost` (secondary). Sizes `--sm`, `--lg`.
- **Photo slot** (`.photo`): striped branded placeholder with a label; an `<img>` inside covers it once the file exists.
- **Feature card**, **price list**, **tabs**, **barber card**, **score card**, **contact form**, **floating WhatsApp button**.

## The frog

The shop's mascot (crown, gold chain with "85") appears where it adds personality without hurting clarity:

1. Hero: `frog-standing`, arms crossed, floating gently.
2. News cards and the About photo: `frog-lounging`.
3. "Há lugar na lagoa?" card and the hot towel news: `frog-cigar`.
4. Gallery: the "Sapos a virar príncipes" Sacavém sticker, and `frog-head` on the Instagram tile and contact form.
5. Favicon: the frog head cropped from the sticker.

## Motion

- Elements fade up on scroll (`.reveal`).
- Ticker marquee in the brand green.
- Rating bars fill when visible.
- All motion is disabled under `prefers-reduced-motion`.

## Voice

Portuguese (pt-PT), informal "tu", short and confident. Examples: "Vens pelo fade, voltas pela vibe." · "Saído da cadeira." · "Fala com o sapo."
