# AIyachts — website

Static, multipage site. No framework, no build step required to *serve* it — the
`.html` files in this folder are the site. A small Node script regenerates them
from shared templates so the header, footer, SEO tags and structured data stay
identical across every page.

```
.
├── index.html               Home
├── about.html               About AIyachts
├── destinations.html        Ionian vs Aegean hub
│   └── destinations/
│       ├── ionian-sailing.html
│       └── aegean-sailing.html
├── fleet.html               Our Fleet + Partners' Yachts
│   └── fleet/<yacht>.html   One page per yacht (gallery · specs · equipment)
├── experiences.html         Four charter formats + gallery (26 photos & films)
├── services.html            Chartering · management · maintenance
├── brokerage.html           Yachts for sale · management · investment plan
├── special-offers.html      Reduced weeks
├── contact.html             Enquiry form
├── privacy.html · 404.html
├── sitemap.xml · robots.txt · site.webmanifest
├── assets/                  css · js · fonts · img · gallery · fleet · team
└── build/                   the generator (not served)
```

## Regenerating the pages

```bash
node build/build.mjs
```

Rewrites all 27 pages plus `sitemap.xml`, `robots.txt` and `site.webmanifest`.

| Edit this | To change |
|---|---|
| `build/site.mjs` | domain, phone numbers, email, addresses, the fleet list, the gallery list and its filters, the team CVs, the charter formats, the yachts for sale and the special offers |
| `build/pages.mjs` | the copy of every page |
| `build/components.mjs` | header, footer, breadcrumbs, page hero, cards, structured data |
| `assets/css/site.css` | all styling (single stylesheet) |
| `assets/js/site.js` | all behaviour (single script, no dependencies) |

**Domain.** `SITE.origin` in `build/site.mjs` is `https://ai-yachting.com`. It
drives every canonical URL, `og:url` and sitemap entry. Change it there and
re-run the build — never hand-edit the HTML. Point `www.ai-yachting.com` at the
apex with a 301 so only one host is indexed.

## Checking your work

```bash
node build/build.mjs && python3 build/check.py
```

`build/check.py` verifies that every local `href`/`src`/`srcset` resolves, that
titles and descriptions are unique and the right length, that each page has
exactly one `<h1>`, that every `<img>` has an `alt`, and that all JSON-LD parses.

## Media

`build/media.py` regenerates the gallery derivatives (800px and 1600px, WebP +
JPEG) and the inline blur placeholders in `build/lqip.mjs` from the originals.
Videos were encoded with ffmpeg (H.264, faststart, no audio).

`build/media-2026-09.py` does the same for the photographs supplied with the
September 2026 content update — the About hero, the fleet hero, the three
service frames and the two portraits in `assets/team/`. Its sources sit in
`build/_incoming/`.

**Adding a yacht's own photographs.** Put the originals somewhere, resize them
to 800px and 1600px (JPEG + WebP) into `assets/fleet/gallery/` with the naming
`<slug>-<width>.<ext>`, then list them in that yacht's `photos[]` in
`build/site.mjs`. The gallery, the "More photographs" button and the full-screen
viewer appear automatically. The same applies to `assets/brokerage/` for the
yachts-for-sale listings.

## Deploying

Upload the whole folder except `build/` and `AIyachts-Photos/`. Any static host
works. If your host supports it, map unknown paths to `404.html`.

## Things worth filling in later

- **Yacht specifications.** Only the figures AIyachts supplied are published
  (year, cabins, guests, berths, heads). Length, beam, draft, engine, tankage and
  sail wardrobe are deliberately absent rather than guessed — add `loa`, `beam`,
  `draft`, `engine`, `fuel`, `water`, `mainsail` or `headsail` to a fleet entry
  and the spec table grows a row for each. Anything left out is simply not shown.
- **Yacht photographs and equipment.** `photos: []` and `equipment: {}` on every
  fleet entry are waiting for content. Until they are filled the yacht page shows
  its main photograph and invites the reader to ask for the rest.
- **Our Fleet vs Partners' Yachts.** Every yacht currently carries
  `owner: 'partner'`. Change one to `owner: 'own'` and it moves into the "Our
  Fleet" block on `fleet.html` without any other edit.
- **Yachts for sale and special offers.** `FOR_SALE` and `SPECIAL_OFFERS` in
  `build/site.mjs` are empty arrays, so `brokerage.html` and `special-offers.html`
  show an honest "being prepared" panel. The comment above each array documents
  the exact shape of an entry; add one and the listing grid, prices and spec
  lines render.
- **Forms.** The enquiry and newsletter forms open a pre-filled email to
  `aiyachtsea@gmail.com`; there is no backend. Swap in a form endpoint when one
  exists.
- **Social links.** `SITE.social` is empty; add the Instagram and Facebook URLs
  and they will appear in the organisation structured data.
