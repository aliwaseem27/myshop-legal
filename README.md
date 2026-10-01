# MyShop Manager — Public Site

Public site for the **MyShop Manager** app (sales & inventory management for
retail shops in Iraq), served via GitHub Pages: six marketing pages that explain
the app, plus the privacy policy and terms of service the app and both stores
link to.

## Live URLs

- Home: https://aliwaseem27.github.io/myshop-legal/
- Features, How it works, Screens, FAQ, Support: `features.html`, `how.html`,
  `screens.html`, `faq.html`, `support.html`
- Privacy Policy: https://aliwaseem27.github.io/myshop-legal/privacy.html
- Terms of Service: https://aliwaseem27.github.io/myshop-legal/terms.html

Append `?lang=ar` or `?lang=en` to open a page in a specific language
(Arabic is the default; the choice persists via localStorage).

## How it works

- Plain static HTML/CSS/JS — no build step, no framework.
- Each page contains both languages in parallel `<main data-lang="…">` blocks;
  `lang.js` toggles visibility and flips `lang`/`dir` (RTL ↔ LTR) on `<html>`.
- Pages: `index.html` (home), `features.html`, `how.html`, `screens.html`,
  `faq.html`, `support.html`, plus `privacy.html` and `terms.html`. Every page
  shares the same header (logo, nav, language button), footer and icon sprite;
  there is no templating, so a change to the nav or footer is made in all eight
  files. Shared chrome uses inline `<span class="ar">` / `<span class="en">`
  pairs; page bodies use the two `<main data-lang>` blocks. Element ids inside
  a body are prefixed `ar-` / `en-` so they stay unique.
- `styles.css` is one stylesheet for every page, written with logical
  properties only, so it serves RTL and LTR. Colours mirror the app's Hybrid
  Glass tokens; legal-page styles are scoped under `body.doc`.
- `site.js` does the scroll reveal, the Screens page's device tabs and the FAQ
  filter. Every hidden start state is scoped to a `js` class set by an inline
  `<head>` script, so a visitor without JS sees all content (all three device
  panels, every question). FAQ answers are native `<details>`. Motion is
  skipped under `prefers-reduced-motion`.
- The App Store / Google Play buttons are in the markup with `hidden` and a
  `TODO: store links` comment (home page hero and closing band). Fill in the
  URLs and remove `hidden` once the store listings are public.
- Deployed by GitHub Pages from the `main` branch, root folder.
  Pushing to `main` republishes automatically (allow a minute or two).
- `.nojekyll` disables Jekyll processing.

## Updating the documents

1. Edit `privacy.html` / `terms.html` — keep the Arabic and English sections in sync.
2. Bump the "Last updated / آخر تحديث" date in **both** languages.
3. Commit and push to `main`.

## Screenshots

`screens/*.webp` are **real captures of the app**, not mock-ups — never
substitute a drawn or CSS approximation. Source: the app repo's
`store_screenshots/public/screenshots/apple/iphone/ar/NN.png` (1320×2868,
Arabic, guest-demo data, iPhone 17 Pro Max simulator). The numbering here
matches that folder, so `screens/06.webp` is the same capture as its `06.png`.

Regenerate after a UI change — recapture into the app repo first, then:

```bash
SRC=../myshop_manager/store_screenshots/public/screenshots/apple/iphone/ar
for n in 01 02 03 04 05 06 07 08 09; do
  sips -Z 1120 "$SRC/$n.png" --out "screens/$n.png"   # ~2x the display size
  cwebp -q 82 -m 6 "screens/$n.png" -o "screens/$n.webp" && rm "screens/$n.png"
done
```

That takes ~15 MB of PNG down to ~124 KB of WebP with the Arabic UI text still
crisp. The `width`/`height` attributes in the HTML (515×1120) must match the
output, or the page shifts while the images load. Both language blocks show the
**same Arabic screenshots** — the app is Arabic-first and no English captures
exist; making an English set means capturing into `…/iphone/en/` first.

### Captures still to come

Until these exist, each spot shows a dashed `.ph` placeholder whose
`data-shot` attribute names the file that replaces it (`grep -n data-shot *.html`).
To swap one in, replace the `<div class="ph" …>…</div>` with an `<img>` of the
same file, keeping the frame (`.phone`, `.tablet` or `.desktop`) around it.
Capture in **Arabic** with guest-demo data, like the phone set.

| File | Device | Screen | Export size | Used on |
| --- | --- | --- | --- | --- |
| `screens/10.webp` | Phone | Scanner with the scanned-items list | 515×1120 | Home, Features, Screens |
| `screens/11.webp` | Phone | Print-label preview for a material (QR + barcode, 50×30) | 515×1120 | Screens |
| `screens/tablet-quick-sale.webp` | Tablet, landscape | Quick Sale: product grid + cart | 1194×834 | Home, Features, Screens |
| `screens/tablet-orders.webp` | Tablet, landscape | Orders: list + selected order | 1194×834 | Screens |
| `screens/tablet-inventory.webp` | Tablet, landscape | Inventory: list + selected material | 1194×834 | Screens |
| `screens/tablet-create-order.webp` | Tablet, landscape | Create Order: items + payment panel | 1194×834 | Screens |
| `screens/desktop-orders.webp` | Computer | Orders: sidebar, table + detail panel | 1440×900 | Home, Screens |
| `screens/desktop-reports.webp` | Computer | A report: filters column + results | 1440×900 | Features, Screens |
| `screens/desktop-invoice-settings.webp` | Computer | Invoice Settings with the live preview | 1440×900 | Screens |

The frames assume those aspect ratios (`aspect-ratio` in `styles.css`), so
crop the capture to the device's screen with no OS chrome, and give each
`<img>` matching `width`/`height` attributes.

## Updating the pages

1. Every edit is made **twice**, once in each `<main data-lang="…">` block —
   there is no templating. Icons are the exception: they live in a single
   `<svg>` sprite near the top of `<body>` and are referenced by `<use>`.
2. Arabic copy mirrors the app's own ARB terminology: **المواد** (not منتجات),
   **المشترين** (not عملاء), الموردين, بيع سريع, and Western digits — with one
   deliberate exception: the currency is written out in full as **دينار عراقي**
   ("Iraqi Dinar" in English), never abbreviated to د.ع the way the app's own
   UI does. The abbreviation is for cramped screens; a marketing page has room
   to say it properly.
3. Keep it short. Feature tiles are an icon, a title and **one** line — the
   page is meant to be looked at, not read. Screenshots carry the detail.
4. Barcode/QR and tablet/desktop shipped in October 2026 and are full sections
   now; there is no "coming soon" band any more.
5. **Never add pricing, plans, trials, "subscribe", "sign up", or any purchase
   path to this site.** The app links here, and `docs/store_review_notes.md`
   in the app repo declares an Apple 3.1.3(c) / Google consumption-only model
   that collapses if any user-visible surface tells a different story. Describe
   capability; route everything commercial to the support email.

## Store-submission notes

- Paste the privacy URL into Google Play Console (Store presence → Privacy policy)
  and App Store Connect (App Privacy → Privacy Policy URL).
- The support contact published here is `myshop.manager.app@gmail.com` — keep that
  inbox monitored.
- These pages intentionally contain **no pricing, payment, or purchase language**:
  the app links to them, so they follow the same store-policy posture as in-app
  screens (Apple 3.1.3 / Google Payments).
