# MyShop Manager — Legal Pages

Public privacy policy and terms of service for the **MyShop Manager** app
(sales & inventory management for retail shops in Iraq), served via GitHub Pages.

## Live URLs

- Landing: https://aliwaseem27.github.io/myshop-legal/
- Privacy Policy: https://aliwaseem27.github.io/myshop-legal/privacy.html
- Terms of Service: https://aliwaseem27.github.io/myshop-legal/terms.html

Append `?lang=ar` or `?lang=en` to open a page in a specific language
(Arabic is the default; the choice persists via localStorage).

## How it works

- Plain static HTML/CSS/JS — no build step, no framework.
- Each page contains both languages in parallel `<main data-lang="…">` blocks;
  `lang.js` toggles visibility and flips `lang`/`dir` (RTL ↔ LTR) on `<html>`.
- Deployed by GitHub Pages from the `main` branch, root folder.
  Pushing to `main` republishes automatically (allow a minute or two).
- `.nojekyll` disables Jekyll processing.

## Updating the documents

1. Edit `privacy.html` / `terms.html` — keep the Arabic and English sections in sync.
2. Bump the "Last updated / آخر تحديث" date in **both** languages.
3. Commit and push to `main`.

## Store-submission notes

- Paste the privacy URL into Google Play Console (Store presence → Privacy policy)
  and App Store Connect (App Privacy → Privacy Policy URL).
- The support contact published here is `myshop.manager.app@gmail.com` — keep that
  inbox monitored.
- These pages intentionally contain **no pricing, payment, or purchase language**:
  the app links to them, so they follow the same store-policy posture as in-app
  screens (Apple 3.1.3 / Google Payments).
