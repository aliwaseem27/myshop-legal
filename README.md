# MyShop Manager — Public Site

Public site for the **MyShop Manager** app (sales & inventory management for
retail shops in Iraq), served via GitHub Pages: a features landing page plus the
privacy policy and terms of service the app and both stores link to.

## Live URLs

- Features / landing: https://aliwaseem27.github.io/myshop-legal/
- Privacy Policy: https://aliwaseem27.github.io/myshop-legal/privacy.html
- Terms of Service: https://aliwaseem27.github.io/myshop-legal/terms.html

Append `?lang=ar` or `?lang=en` to open a page in a specific language
(Arabic is the default; the choice persists via localStorage).

## How it works

- Plain static HTML/CSS/JS — no build step, no framework.
- Each page contains both languages in parallel `<main data-lang="…">` blocks;
  `lang.js` toggles visibility and flips `lang`/`dir` (RTL ↔ LTR) on `<html>`.
- `index.html` is the features landing page: hero + phone, a 10-tile feature
  grid, a screenshot gallery, a "coming soon" band, then contact and the two
  legal cards. Its styles live in the `.landing` block at the end of `styles.css`
  (the legal pages keep the plain document styling above it) and are written
  with logical properties only, so one stylesheet serves RTL and LTR.
- `site.js` (landing page only) does the scroll reveal. The hidden start state
  is scoped to a `js` class set by an inline `<head>` script, so a visitor
  without JS gets the full page rather than a blank one; the whole effect is
  skipped under `prefers-reduced-motion`.
- Deployed by GitHub Pages from the `main` branch, root folder.
  Pushing to `main` republishes automatically (allow a minute or two).
- `.nojekyll` disables Jekyll processing.

## Updating the documents

1. Edit `privacy.html` / `terms.html` — keep the Arabic and English sections in sync.
2. Bump the "Last updated / آخر تحديث" date in **both** languages.
3. Commit and push to `main`.

## Landing-page screenshots

`screens/*.webp` are **real captures of the app**, not mock-ups — never
substitute a drawn or CSS approximation. Source: the app repo's
`store_screenshots/public/screenshots/apple/iphone/ar/NN.png` (1320×2868,
Arabic, guest-demo data, iPhone 17 Pro Max simulator). The numbering here
matches that folder, so `screens/06.webp` is the same capture as its `06.png`.

Regenerate after a UI change — recapture into the app repo first, then:

```bash
SRC=../myshop_manager/store_screenshots/public/screenshots/apple/iphone/ar
for n in 01 02 03 04 06 08; do
  sips -Z 1120 "$SRC/$n.png" --out "screens/$n.png"   # ~2x the display size
  cwebp -q 82 -m 6 "screens/$n.png" -o "screens/$n.webp" && rm "screens/$n.png"
done
```

That takes ~15 MB of PNG down to ~124 KB of WebP with the Arabic UI text still
crisp. The `width`/`height` attributes in the HTML (515×1120) must match the
output, or the page shifts while the images load. Both language blocks show the
**same Arabic screenshots** — the app is Arabic-first and no English captures
exist; making an English set means capturing into `…/iphone/en/` first.

## Updating the landing page

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
4. A feature moving out of "coming soon" means deleting its `.soon-card` and
   adding a `.feature` tile in **both** blocks.
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
