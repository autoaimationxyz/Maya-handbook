// Writes capacitor.config.json. The Android app opens the live web app, so updates
// pushed to GitHub reach the phone without reinstalling.
// Usage: node scripts/cap-config.js <app-url>
const fs = require("fs");
const url = process.argv[2];
if (!url) { console.error("Pass the app URL"); process.exit(1); }
const config = {
  appId: "in.mayatraders.handbook",
  appName: "Maya Traders",
  webDir: "www",
  server: { url, errorPath: "offline.html", androidScheme: "https", cleartext: false },
  android: { backgroundColor: "#15201C" }
};
fs.writeFileSync("capacitor.config.json", JSON.stringify(config, null, 2));
console.log("capacitor.config.json ->", url);
