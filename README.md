# Maya Traders

Your one app for Maya Traders sales in Delhi NCR:

- **Today:** today's Google Calendar, due follow-ups, site visits, payments to collect, and the week's activity against your targets.
- **Products:** 13 lines Maya Traders sells, in selling order, each with study notes, sizing, pitch lines, objections and your own prices and photos.
- **Chemotech:** the full Chemotech International catalogue (56 products, 328 variants, all makes, company details), searchable and locked with a passcode.
- **Learning:** 14 short EEE lessons with quizzes, inside each product's Learn tab.
- **Tools:** 10 site calculators.
- **Sell:** leads, quotes (letterhead PDF and WhatsApp), orders and payments, referral partners and fees, site surveys and meeting prep.
- **Also:** an activity log, expenses, notes, phone calendar sync, and backups to Google Drive.

- **Web app:** `https://<your-github-username>.github.io/<repo-name>/`
- **Android app:** the latest `MayaTraders.apk` on this repo's **Releases** page.

## How updates work

```
Edit content or code ──push to main──▶ "Publish web app" workflow ──▶ GitHub Pages (about 1 min)
                                                                        │
                    Android app and installed web app load the live site ◀┘  (next time you open it)
```

- **Content and features** (products, prices, lessons, calculators, screens) live in `www/`. Any push to `main` that touches `www/` republishes the site, and the phone picks it up on the next open. No reinstall needed.
- **The Android shell** (app name, icon, permissions) only changes when `package.json`, `assets/` or the Android workflow change. That rebuilds the APK and creates a new Release; install it over the old one.
- To check by hand: **Notes → Backup & app → Check for updates.** The version shown there is the commit the app is running.

## One-time setup

1. Open the web app address above. If it shows a 404 page, go to **Settings → Pages** in this repo, set *Source* to **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**, and **Save**.
2. Open the **Releases** page on your phone, download `MayaTraders.apk` and install it. Android will ask you to allow installs from your browser or Files app.
3. In the app, open **Today → Settings → Connect calendar**.

The APK is signed with the key in `signing/`, so builds need no secrets.

## Calendar and Drive

- **Calendar:** the Android app writes follow-ups, site visits and payment due dates into your phone's calendar, with reminders. Today's meetings show on the Today screen. If your phone's calendar is your Google account, everything appears in Google Calendar too. No Google setup or payment is needed.
- **Drive:** *Settings → Make backup file → Drive* in the share menu saves a full backup to your Google Drive. Quote PDFs share the same way.

## Your data

Leads, quotes, orders, partners, expenses, surveys, prices, notes and photos are saved **on the phone**, inside the app. Nothing personal goes to GitHub.

- **Settings → Make backup file** creates a backup file. Save it to Google Drive or send it to yourself on WhatsApp. Do this every week or two; the app reminds you after 14 days.
- **Settings → Restore from file** loads a backup on a new phone, or after reinstalling.
- The Android app and the web app in Chrome keep **separate** data. Pick one to use day to day, and move data between them with a backup.

## Project layout

| Path | What it is |
| --- | --- |
| `www/index.html` | App page |
| `www/js/products1.js` | Products: cables, earthing, stabilizer, UPS, solar, EV |
| `www/js/products2.js` | Products: VFD, PLC, SCADA, BMS, dam gate, LED wall, water, steam, PUF panels |
| `www/js/learn.js` | Lessons, meeting playbooks, survey checklists, market drivers |
| `www/js/app.js` | Screens, calculators, storage, backup, Google sync, quote PDFs |
| `www/js/config.js` | Written at build time from `app.config.json` |
| `app.config.json` | App name, Android package id, Google Web client ID |
| `www/css/style.css` | Design |
| `www/sw.js` | Offline support and update caching |
| `assets/` | App icon and splash screen (for the APK) |
| `scripts/` | Build helpers used by the workflows |
| `.github/workflows/` | `pages.yml` publishes the site; `android.yml` builds the APK |

Product order is set by `ORDER` near the top of `www/js/app.js`.

## Working on it locally

```bash
npx http-server www -p 8080 -c-1   # then open http://localhost:8080
```
