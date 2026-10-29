# Portfolio — Avinash Kalamati

Personal portfolio for **Avinash Kalamati**, Software Development Engineer (Backend & AI Infrastructure).

**Race-weekend edition:** a neutral F1 broadcast theme (carbon black, asphalt grey, one accent colour) built as a
horizontal **slide carousel**. Each section is a "lap". You move between them with the arrow keys, mouse wheel,
trackpad, or swipe. A timing-tower nav sits on the left and a circuit map shows where you are.

- **Stack:** [Astro](https://astro.build) + TypeScript. The build outputs static HTML. Content is prerendered, CSS is inlined, and the carousel script is about 8 KB.
- **Content:** all copy lives in one file, [`src/data/content.ts`](src/data/content.ts).
- **No team logos or trademarks.** The circuit is fictional and the colours are generic.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321  (hot reload)
```

## Build & preview

```bash
npm run build      # outputs static site to dist/
npm run preview    # serves dist/ at http://localhost:4322
```

`dist/` is plain static files, so any static server works:

```bash
python3 -m http.server 8000 -d dist   # then open http://localhost:8000
```

> Opening `dist/index.html` straight from the file system (`file://`) isn't supported, because browsers block module
> scripts there. Use any local server, like the one above.

## Quality checks

```bash
npm run check      # astro check (TypeScript, strictest)
npm run lint       # ESLint (TS + Astro)
npm run verify     # check + lint + build
```

## Editing content

Everything a visitor reads is in [`src/data/content.ts`](src/data/content.ts):

| Export          | Slide                         |
| --------------- | ----------------------------- |
| `driver`        | Name, role, links, status     |
| `heroStats`     | Hero timing boxes             |
| `about`         | Driver Profile (About)        |
| `experience`    | Race Calendar (Experience)    |
| `skills`        | Car Setup (Skills)            |
| `openSource`    | Podium (Open Source)          |
| `paddock`       | Paddock (Off Track)           |
| `contact`       | Team Radio (Contact)          |
| `slides`        | Slide order, kickers, titles  |
| `liveries`      | Accent colours in the switcher|

- Wrap text in `**double asterisks**` to make it bold and white (works in bullets and paragraphs).
- Stat `tone` uses F1 timing-screen colours: `purple` = best, `green` = personal best, `yellow` = standard.
- If you change your name or role, run `npm run og` to regenerate the social preview image (`public/og.png`) and the PNG favicons.

## How it behaves

- **Carousel mode** applies to viewports at least **1200 × 680** when the visitor hasn't asked for reduced motion.
  - Input: keyboard (← → PageUp/PageDown Home/End), mouse wheel or trackpad (one slide per gesture), and touch swipe.
  - Each slide has a URL hash (`#experience`, `#open-source`, …), so you can deep-link to it. Back and forward work.
  - Off-screen slides are `inert`, so Tab never lands on hidden content. Slide changes are announced through `aria-live`.
  - If a slide is taller than the screen, it scrolls on its own first. Only then does the wheel move to the next slide.
- **Vertical mode** is a normal scrolling page. It applies to phones, tablets, small windows, `prefers-reduced-motion`, and visitors without JavaScript. Nothing traps the scroll.
- **Start lights** play once per browser session (about 1.2 s). Any key, click, scroll, or tap skips them. They never play with reduced motion.
- **Livery switcher** (bottom of the tower, or top right on mobile) swaps the accent between red, orange, teal, and silver. The choice is saved in `localStorage`.

## Project structure

```
src/
  data/content.ts          ← all site copy
  pages/index.astro        ← page shell: tower, deck, HUD
  layouts/Base.astro       ← <head>: meta/OG/JSON-LD, pre-paint mode + livery script
  components/
    TimingTower.astro      ← left timing-tower nav + livery switcher (top bar on mobile)
    Hud.astro              ← LAP x / 7 counter, prev/next, circuit progress map
    StartLights.astro      ← five-light start sequence overlay
    SlideHead.astro        ← kicker ("RACE CALENDAR") + plain title ("Experience")
    slides/                ← Hero, Driver, Experience, Skills, Podium, Paddock, Radio
  scripts/
    deck.ts                ← carousel: keys, wheel, swipe, hash, inert, circuit car
    rounds.ts              ← nested Experience carousel (tabs)
    lights.ts, livery.ts, config.ts
  styles/global.css        ← design tokens, liveries, layout modes
  assets/                  ← source images (optimised to responsive WebP at build)
public/                    ← favicon, og.png, robots.txt
scripts/generate-og.mjs    ← regenerates og.png + PNG favicons
legacy/index.html          ← previous single-file McLaren-themed site (backup)
```

## Deploy (GitHub Pages)

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) type-checks, lints, builds, and publishes `dist/` on every push to `main`.

One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
The site is then served at `https://avinashkalamati.github.io/portfolio/`.

To serve from a custom domain or a different path, change `SITE` and `BASE_PATH` in the workflow. Locally they default to `/`.

Any other static host (Netlify, Vercel, Cloudflare Pages) works too. Use build command `npm run build` and output folder `dist`.

Links: [GitHub](https://github.com/AvinashKalamati) · [LinkedIn](https://www.linkedin.com/in/avinashkalamati)
