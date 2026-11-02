# Maya Traders

A personal sales app for Maya Traders (Delhi NCR). It covers 15 product lines in selling order, short EEE lessons, site calculators, a leads tracker, a quote maker with WhatsApp sharing, site-survey checklists and notes.

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

1. **Turn on GitHub Pages.** After the first push, open the **Actions** tab and wait for *Publish web app* to finish. Then go to **Settings → Pages** and check that *Source* is **Deploy from a branch**, branch **gh-pages**, folder **/ (root)**. Save it if it isn't.
2. **Open the web app** on your phone at the address above. Chrome's menu → **Install app** gives you a home-screen app straight away.
3. **Add the signing key** so GitHub can build the APK. In **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `ANDROID_KEYSTORE_B64`: the long text from `maya-signing-key.txt`
   - `ANDROID_KEYSTORE_PASSWORD`: the password from the same file

   Keep `maya-release.jks` and the password safe and private. Every future APK must be signed with the same key, or Android will refuse to update the app.
4. **Build the APK.** Go to **Actions → Build Android app → Run workflow**. When it finishes, open **Releases** on your phone, download `MayaTraders.apk` and install it. Android will ask you to allow installs from your browser or Files app.

## Your data

Leads, quotes, surveys, prices, notes and photos are saved **on the phone**, inside the app. Nothing personal goes to GitHub.

- **Notes → Make backup** creates a backup file. Save it to Google Drive or send it to yourself on WhatsApp. Do this every week or two; the app reminds you after 14 days.
- **Notes → Restore from backup** loads a backup on a new phone, or after reinstalling.
- The Android app and the web app in Chrome keep **separate** data. Pick one to use day to day, and move data between them with a backup.

## Project layout

| Path | What it is |
| --- | --- |
| `www/index.html` | App page |
| `www/js/products1.js` | Products: cables, earthing, stabilizer, UPS, solar, EV |
| `www/js/products2.js` | Products: VFD, PLC, SCADA, BMS, dam gate, LED wall, water, steam, PUF panels |
| `www/js/learn.js` | Lessons, meeting playbooks, survey checklists, market drivers |
| `www/js/app.js` | Screens, calculators, storage, backup |
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
