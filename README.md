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
│   │   ├── components.css     # Buttons, nav, photos, news pill, form…
│   │   └── sections.css       # Hero, news, about, services, team, gallery, reviews, contact
│   ├── data/
│   │   └── news.js            # "Novidades" cards shown at the top of the page
│   ├── js/
│   │   ├── config.js          # WhatsApp number, Booksy & Instagram links
│   │   └── main.js            # Nav, news carousel, tabs, scroll reveal, contact form
│   └── images/
│       ├── brand/             # logo-light/dark, frog-standing, frog-lounging, frog-cigar,
│       │                      # frog-head, sticker-sacavem, favicon-48, apple-touch-icon
│       ├── team/              # simoes.webp, ricardo.webp
│       └── gallery/           # interior, exterior, corte-01, corte-02
└── docs/
    └── design-system.md       # Colours, type, components, mascot rules
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Updating the news ("Novidades")

Edit `assets/data/news.js`. Each item has a tag, date, title, text, image and an optional button.
The first item also shows in the green "Novidade" pill at the top of the page.
Add, remove or reorder items freely; the carousel adapts.

## Images

All images are WebP, resized for the web (the whole folder is about 1.4 MB).
To add a photo, export it as WebP around 1000–1600px wide and put it in the matching folder.
To add more cuts to the gallery, add files to `assets/images/gallery/` and a `<figure>` in the Galeria section of `index.html`.

## Contact via WhatsApp

The contact form composes a WhatsApp message (name, subject, barber, message) and opens a chat with the shop. No server or database needed.

Set the number in `assets/js/config.js`:

```js
whatsapp: "351912345678"
```

If it is left empty, the form points people to Booksy and the floating button scrolls to the contact section.

## Content to confirm with the shop

- That 927 266 234 is on WhatsApp (it is set as the form's WhatsApp number).
- Prices follow Booksy, which differ slightly from the first Netlify site.
- Which Instagram account is current.

## Deploy

Any static host works. Easiest: **GitHub Pages** → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
