# Notes for Claude

This repo is Maya Traders' personal sales handbook app. The owner is a BTech EEE graduate who is new to industrial products and sells in Delhi NCR. He asks for changes in plain words ("add a product", "change the UPS prices", "fix the quote screen").

## How to make a change

1. Edit files under `www/` only, unless the change is to the Android shell (name, icon, plugins).
2. Content is plain JS data:
   - Products: `www/js/products1.js` and `products2.js`. Each product has `what`, `why`, `how`, `types`, `sizing`, `specs`, `brands`, `buyers`, `where`, `wayIn`, `ask`, `pitch`, `objections`, `mistakes`, `upsell`, `prices` (INR, before GST, `low`/`high`), `priceNote` and `calc`.
   - A new product also needs its id in `ORDER` in `www/js/app.js`, and an icon key that exists in `IC`.
   - Lessons, playbooks, surveys and market drivers: `www/js/learn.js`. `LESSON_FOR` decides which lessons show inside each product's Learn tab (there is no separate Learn tab).
   - Maya Traders' own list is everything in `ORDER` minus `GUIDES` (wtp, steam, scada, damgate, puf). Those are Chemotech-only guides, opened from the Chemotech tab.
   - **Chemotech catalogue** (Chemotech tab): `www/data/chemotech.enc.json`, AES-GCM encrypted. To update it, edit the private plain `catalogue.json` (kept in the owner's Claude project as `claude/chemotech-catalogue.json`, NEVER in this repo), then run `MT_PASSCODE='<passcode from the project doc>' node scripts/encrypt-catalogue.js catalogue.json`. The script keeps the salt, so phones stay unlocked. Never commit plaintext Chemotech data, phone numbers, PAN/GST or bank details.
   - Each catalogue item carries `learn` {what, how[], pick[], tech[[term, meaning]], mistakes[], ask[]}, `dia` {flow[], fan[], hi (index, list, or -1 for the fan), note}, and each variant carries `brief`, `use`, `tech` and `tip`. Diagrams are drawn by `diagramSVG()`.
   - Bottom tabs: Today · Maya · Chemotech · Tools · Sell. Tools has `CALCS` with `grp` m (Maya) / c (Chemotech) and the product finder (`#finder`, `FIND_MAP`).
3. Run `node --check` on every JS file you changed.
4. Commit with a clear message and push to `main`. `pages.yml` republishes the site in about a minute, and the phone app picks it up on its next open.
5. Only bump the APK (push to `package.json` or `assets/`, or run *Build Android app*) when the native shell changes.

## Config

- `app.config.json` holds the app name, the Android package (`in.mayatraders.app`) and the Google Web client ID. Changing it rebuilds both the site and the APK.
- Calendar sync in the APK uses `@ebarooni/capacitor-calendar` (the `Cal` object in `app.js`) and writes to the phone's calendar. The owner does NOT want a Google Cloud setup. The `G` object (Google REST through a Web client ID) stays dormant unless a client ID is configured, and it is hidden in the APK.
- The signing key is committed in `signing/` on purpose (the owner can't add GitHub secrets). Never change it, or the app can't update.
- Stored data keys: `products, progress, notes, settings, leads, quotes, surveys, orders, partners, expenses, activities`. Photos live in IndexedDB (`maya-photos`).

## Rules

- The owner's own prices, leads and notes live on his phone, not in the repo. Default `prices` in product files are market estimates. Say so in `priceNote` and give the source month.
- Keep the stored data shape backward compatible (`Store.data` keys and the `maya-traders-v1` localStorage key). A breaking change would lose his data.
- Simple English, short sentences, India/NCR context, ₹ with Indian digit grouping.
- Product order follows the decided shortlist; there are no stage labels in the UI.
