# 2685 Finest — Design System

The brand is a neighbourhood barbershop with top-tier standards. The visual language mixes **street poster boldness** (condensed caps, outlined type, rotated ticker) with a **playful frog mascot** and a clean, readable price menu.

All values live in [`assets/css/tokens.css`](../assets/css/tokens.css).

## Colour

| Token | Hex | Use |
| --- | --- | --- |
| `--ink` | `#0d0f0b` | Main background. Near-black with a green cast. |
| `--ink-2` / `--ink-3` | `#151912` / `#1f251b` | Raised surfaces, cards, inputs. |
| `--bone` | `#f1ece2` | Primary text on dark; background of the Services section. |
| `--bone-dim` | `#a9a597` | Secondary text on dark. |
| `--frog` | `#a8f04a` | Signature accent: CTAs, highlights, the frog. Use sparingly so it stays loud. |
| `--frog-deep` | `#6fae1f` | Accent text on light (`--bone`) backgrounds. |
| `--moss` | `#1e3a26` | Deep green panels (Reviews, join card). |
| `--brass` | `#f2b544` | Star ratings only. |

Rules: one frog-green element dominates each viewport. Never put `--frog` text on `--bone` (low contrast); use `--frog-deep`.

## Typography

| Role | Font | Notes |
| --- | --- | --- |
| Display | **Anton** | Always uppercase. Headlines, prices, numbers. |
| Body | **Archivo** 400–800 | Paragraphs, UI, labels. |
| Accent | **Instrument Serif** italic | One or two words per section (`em`, `.script`) for a human touch. |

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

The mascot appears where it adds personality without hurting clarity:

1. Logo mark in the header.
2. Hero, with a slow "hop" animation.
3. "Há lugar na lagoa?" recruiting card.
4. Contact form header ("Fala com o sapo").
5. Favicon.

`assets/images/brand/frog.svg` is a **placeholder drawing**. Replace it with the shop's official frog artwork (SVG preferred, PNG with transparency is fine) and every use updates automatically.

## Motion

- Elements fade up on scroll (`.reveal`).
- Ticker marquee in the brand green.
- Rating bars fill when visible.
- All motion is disabled under `prefers-reduced-motion`.

## Voice

Portuguese (pt-PT), informal "tu", short and confident. Examples: "Vens pelo fade, voltas pela vibe." · "Saído da cadeira." · "Fala com o sapo."
