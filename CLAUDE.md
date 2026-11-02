# Notes for Claude

This repo is Maya Traders' personal sales handbook app. The owner is a BTech EEE graduate who is new to industrial products and sells in Delhi NCR. He asks for changes in plain words ("add a product", "change the UPS prices", "fix the quote screen").

## How to make a change

1. Edit files under `www/` only, unless the change is to the Android shell (name, icon, plugins).
2. Content is plain JS data:
   - Products: `www/js/products1.js` and `products2.js`. Each product has `what`, `why`, `how`, `types`, `sizing`, `specs`, `brands`, `buyers`, `where`, `wayIn`, `ask`, `pitch`, `objections`, `mistakes`, `upsell`, `prices` (INR, before GST, `low`/`high`), `priceNote` and `calc`.
   - A new product also needs its id in `ORDER` in `www/js/app.js`, and an icon key that exists in `IC`.
   - Lessons, playbooks, surveys and market drivers: `www/js/learn.js`.
3. Run `node --check` on every JS file you changed.
4. Commit with a clear message and push to `main`. `pages.yml` republishes the site in about a minute, and the phone app picks it up on its next open.
5. Only bump the APK (push to `package.json` or `assets/`, or run *Build Android app*) when the native shell changes.

## Rules

- The owner's own prices, leads and notes live on his phone, not in the repo. Default `prices` in product files are market estimates. Say so in `priceNote` and give the source month.
- Keep the stored data shape backward compatible (`Store.data` keys and the `maya-traders-v1` localStorage key). A breaking change would lose his data.
- Simple English, short sentences, India/NCR context, ₹ with Indian digit grouping.
- Product order follows the decided shortlist; there are no stage labels in the UI.
