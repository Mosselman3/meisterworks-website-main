# Meisterworks website

Marketing site and door configurator for Meisterworks. The production app is Next.js; the original Design Component HTML files live in `design/` as the visual reference.

## Preview locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

- `/` — Next.js site with shared header and footer
- [`/_design`](http://localhost:3000/_design) — original `.dc.html` mockups (development only)

Marketing routes exist as stubs so navigation works while pages are converted.

The design preview needs a local server so `support.js` can load React and the pages can fetch their own HTML. Opening the files directly from disk will not work reliably.

## Routes

| Page | Next.js route | Design file |
| --- | --- | --- |
| Homepage | `/` | `Meisterworks Homepage.dc.html` |
| Inspiratie | `/inspiratie` | `Inspiratie.dc.html` |
| Reviews | `/reviews` | `Reviews.dc.html` |
| Snelle offerte | `/offerte` | `Snelle Offerte.dc.html` |
| Adviesgesprek | `/afspraak` | `Adviesgesprek Plannen.dc.html` |
| Configurator | `/configurator` | `Configurator.dc.html` |
| Enkele deur | `/deuren/enkele-deur` | `Deur - Enkele deur.dc.html` |
| Enkele deur met vast paneel | `/deuren/enkele-deur-met-vast-paneel` | `Deur - Enkele deur met vast paneel.dc.html` |
| Dubbele deur | `/deuren/dubbele-deur` | `Deur - Dubbele deur.dc.html` |
| Dubbele deur met vast paneel | `/deuren/dubbele-deur-met-vast-paneel` | `Deur - Dubbele deur met vast paneel.dc.html` |
| Vast paneel | `/deuren/vast-paneel` | `Deur - Vast paneel.dc.html` |
| Complete scheidingswand | `/deuren/complete-scheidingswand` | `Deur - Complete scheidingswand.dc.html` |

## Images

Drop finished photography into `public/assets/` using the existing filenames. The Next.js app and the `/_design` preview both read from there.

Current files:

- `logo.jpg`
- `hero-open-door.jpg`
- `pivot-door-slats.jpg`
- `double-doors-black.jpg`
- `arched-bronze-door.jpg`
- `sliding-wall-herringbone.jpg`
- `detail-green.jpg`
- `detail-maroon.jpg`
- `welding-detail.jpg`
- `mw-mark-black.png`
- `mw-mark-white.png`
- `ig-post-1.jpg` … `ig-post-8.jpg`

Original design sources (including unprocessed uploads) stay in `design/assets` and `design/uploads`. Do not edit the `.dc.html` files for production work; convert them into React pages instead.
