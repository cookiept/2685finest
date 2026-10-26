# 2685 Finest — Website

Landing page for **2685 Finest Barbearia** (Sacavém, Loures). Static HTML/CSS/JS, no build step.

## Structure

```
.
├── index.html                 # The landing page
├── assets/
│   ├── css/
│   │   ├── tokens.css         # Design tokens (colours, type, spacing)
│   │   ├── base.css           # Reset, typography, layout helpers
│   │   ├── components.css     # Buttons, nav, photo slots, form…
│   │   └── sections.css       # Hero, services, team, gallery, reviews, contact
│   ├── js/
│   │   ├── config.js          # WhatsApp number, Booksy & Instagram links
│   │   └── main.js            # Nav, tabs, scroll reveal, contact form
│   └── images/
│       ├── brand/             # frog.svg (mascot), favicon.svg, logo
│       ├── team/              # andre-simoes.jpg, ricardo.jpg
│       └── gallery/           # interior.jpg, corte-01.jpg … corte-05.jpg
└── docs/
    └── design-system.md       # Colours, type, components, mascot rules
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Adding the real photos

Photo slots show a branded placeholder until the file exists. Drop images with these exact names:

| File | Where it shows |
| --- | --- |
| `assets/images/gallery/interior.jpg` | "A casa" section |
| `assets/images/team/andre-simoes.jpg` | André's card |
| `assets/images/team/ricardo.jpg` | Ricardo's card |
| `assets/images/gallery/corte-01.jpg` … `corte-05.jpg` | Gallery (01 is the large tile) |

Use JPGs around 1200px on the long side, compressed (≈200 KB each).

To use the official frog, replace `assets/images/brand/frog.svg`.

## Contact via WhatsApp

The contact form composes a WhatsApp message (name, subject, barber, message) and opens a chat with the shop. No server or database needed.

Set the number in `assets/js/config.js`:

```js
whatsapp: "351912345678"
```

Until it is set, the form points people to Booksy and the floating button scrolls to the contact section.

## Content to confirm with the shop

- Weekly opening hours (Booksy only showed 09:00–20:00 for one day).
- Barber roles and bios in the Team section are drafts.
- Which Instagram account is current.

## Deploy

Any static host works. Easiest: **GitHub Pages** → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
