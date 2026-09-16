repo: your-username/meisterworks
branch: main

## Project Overview
Meisterworks marketing website and door configurator. Built as Design Components (`.dc.html` files) — single-file HTML pages that open directly in a browser and stream live.

## Design Files (10 total)

### Main Pages
- **Meisterworks Homepage.dc.html** — Landing page with hero, product showcase, reviews carousel, testimonial, gallery, footer
- **Adviesgesprek Plannen.dc.html** — Booking page with Calendly embed (placeholder, needs real link)
- **Snelle Offerte.dc.html** — Quick quote form with file upload

### Product Pages (6)
Each follows the same template: headline storytelling → step-by-step configurator teaser → CTA buttons
- Deur - Enkele deur.dc.html
- Deur - Enkele deur met vast paneel.dc.html
- Deur - Dubbele deur.dc.html
- Deur - Dubbele deur met vast paneel.dc.html
- Deur - Vast paneel.dc.html
- Deur - Complete scheidingswand.dc.html

### Interactive Tools
- **Configurator.dc.html** — Full product customizer (7 accordion steps: product, mechanism, side panels, glass divisions, dimensions, options, summary)
- **Reviews.dc.html** — Parallax review cards with CTA buttons
- **Inspiratie.dc.html** — Inspiration gallery (Instagram-wall style)

## Assets
- `/assets/logo.jpg` — Logo (56×56px, used site-wide)
- Product images (referenced in configurator visual canvas)
- Brand shape assets (decorative elements)

## Technical Notes

### Design System
- **Colors:** oklch(L C H) palette; accent: #a67c52 (brass), dark: oklch(0.16...), light: oklch(0.97...)
- **Type:** Helvetica Neue (body), Newsreader serif (headlines)
- **Spacing:** 28px padding mobile, flex/grid layout, 1320px max-width desktop
- **Border radius:** 10px inputs, 18px cards, 999px buttons

### DC Architecture
Each file is a complete, self-contained HTML page:
- Template (markup between `<x-dc>` tags)
- Logic class (React-like state management)
- Props metadata (for design tweaks)
- Runs live in browser; no build step needed

### Navigation & Routing
All pages link to each other via `<a href="Filename.dc.html">`. Header nav shows:
- Desktop: Full links + two CTA buttons (Snelle offerte, Adviesgesprek plannen, Deur samenstellen)
- Mobile: Hamburger menu with same links + animated panel

## Next Steps (Development)

### Immediate
1. **Calendly integration** — Replace placeholder URL in Adviesgesprek Plannen.dc.html with real booking link
2. **Form submission** — Snelle Offerte form sends data to backend (email/API)
3. **Image uploads** — File uploads need server-side handling

### Configurator Features
- Save/load configurations
- Quote generation (PDF export)
- Shopping cart or checkout flow
- Email quote to customer

### Backend Services Needed
- Form submission handler (POST endpoint)
- File upload service
- Email delivery (quote forms, confirmations)
- Configurator session storage / quote generation
- Optional: Calendly API integration

### Future
- Product images / 3D viewer in configurator
- Live dimension calculations with real materials
- Postcode API for address lookup (Snelle Offerte)
- Analytics & tracking
- Multi-language support (Dutch/English)

## Running Locally
1. Clone repo
2. Open any `.dc.html` file in a browser
3. Pages render immediately with live editing in the design tool

## File Structure
```
/
├── Meisterworks Homepage.dc.html
├── Adviesgesprek Plannen.dc.html
├── Snelle Offerte.dc.html
├── Deur - *.dc.html (6 files)
├── Configurator.dc.html
├── Reviews.dc.html
├── Inspiratie.dc.html
├── assets/
│   └── logo.jpg
├── image-slot.js (drag-drop image component)
├── support.js (DC runtime)
└── github.md (this file)
```
