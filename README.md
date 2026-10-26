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
│   │   ├── components.css     # Notice bar, header, buttons, tabs, form…
│   │   └── sections.css       # Hero, news, about, services, team, photo band, gallery, reviews, contact, footer
│   ├── data/
│   │   ├── news.js            # Novidades banners
│   │   └── gallery.js         # Galeria photos and captions
│   ├── js/
│   │   ├── config.js          # WhatsApp number, Booksy & Instagram links
│   │   └── main.js            # Nav, news card stack, tabs, contact form, plant wind
│   └── images/
│       ├── brand/             # logo-light/dark, frog-standing, frog-lounging, frog-cigar, frog-cv,
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

Edit `assets/data/news.js`. Each item becomes one banner card in the fanned card stack: tag, date, title, text, a frog image, a theme (`green` or `light`) and an optional button.
To use a banner designed elsewhere (e.g. Canva, about 2400×1000), put the image in `assets/images/` and set `banner: "assets/images/…"` on the item.

## Updating the gallery

Edit `assets/data/gallery.js`: one entry per photo (image, alt, title, subtitle, text). Use photos of people, ideally portrait, and add them in groups of 4 so the rows stay full.

## Images

All images are WebP, resized for the web (the whole folder is about 1.4 MB).
To add a photo, export it as WebP around 1000–1600px wide and put it in the matching folder.
To add more cuts to the gallery, add files to `assets/images/gallery/` and a `<figure>` in the Galeria section of `index.html`.

## Page order

Follows what people look for first on a barbershop site: the hero (name, Marcar button, rating, and a line with "Aberto agora", address and phone), then Serviços e preços, Barbeiros, Avaliações, Galeria, Novidades, A casa and Contacto. On phones a "Marcar no Booksy / Ligar" bar stays fixed at the bottom.

Opening hours for the "Aberto agora" line live in `assets/js/config.js` (`hours`).

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

## Cache

CSS and JS links in `index.html` end in `?v=26`. After changing a CSS or JS file, bump that number so visitors' browsers load the new version instead of a cached one.

## Deploy

Any static host works. Easiest: **GitHub Pages** → Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
