# Connect Maya Traders to Google Calendar and Drive

This takes about 10 minutes, once. Do it on a laptop at **console.cloud.google.com**, signed in with the Gmail you use for work.

When you're done, send the **Web client ID** (it ends in `.apps.googleusercontent.com`) to Claude. Claude adds it to the app and rebuilds the APK.

## 1. Create a project
1. Top bar → project picker → **New project**.
2. Name: `Maya Traders` → **Create**, then select it.

## 2. Turn on the two APIs
**APIs & Services → Library**, then search for and **Enable** each one:
- Google Calendar API
- Google Drive API

## 3. Set up the sign-in screen
Open **Google Auth Platform** (or *APIs & Services → OAuth consent screen*) → **Get started**.
1. **App name:** `Maya Traders`. **User support email:** your Gmail.
2. **Audience:** **External**.
3. **Contact email:** your Gmail → finish.
4. **Data access → Add or remove scopes.** Tick these three, or paste them under *Manually add scopes*:
   - `https://www.googleapis.com/auth/calendar.events`
   - `https://www.googleapis.com/auth/drive.file`
   - `email` and `profile`

   Then **Save**.
5. **Audience → Publish app → Confirm.** This keeps your sign-in from expiring every 7 days. Google may say the app is unverified. That's fine for an app only you use.

## 4. Create the Web client (send this one to Claude)
**Clients → Create client:**
- **Type:** Web application
- **Name:** `Maya Traders web`
- **Authorised JavaScript origins → Add URI:** `https://<your-github-username>.github.io`

  This is the address only, with no repo name and no trailing slash.
- **Create** → copy the **Client ID**.

## 5. Create the Android client (no need to send it)
**Clients → Create client:**
- **Type:** Android
- **Name:** `Maya Traders app`
- **Package name:** `in.mayatraders.app`
- **SHA-1 certificate fingerprint:**
  ```
  00:84:94:33:60:84:3E:A2:CE:5E:D5:D8:A4:1D:8D:D3:DE:DD:F1:FB
  ```
- **Create**

## 6. Connect in the app
After Claude confirms the new APK is ready, install it and open **Today → Settings → Connect Google**. Pick your account and allow access. If Google shows *"Google hasn't verified this app"*, tap **Advanced → Go to Maya Traders (unsafe)**. It's your own app.

## What the app does with Google
| Where | What |
| --- | --- |
| Calendar | Adds an event for each lead's follow-up date (and time, if set), each site visit, and each order's "collect balance by" date, with reminders. Edits and deletions update the event. |
| Today screen | Shows today's events from your calendar. |
| Drive › Maya Traders › Backups | `maya-backup-latest.json`, updated a few seconds after you change something, plus one dated copy per week. *Settings → Restore from Drive* brings data back on a new phone. |
| Drive › Maya Traders › Quotes | Quote PDFs. "Save PDF to Drive" adds a view link to the WhatsApp message. |

The app can only see files it created in Drive (`drive.file`), never the rest of your Drive.
