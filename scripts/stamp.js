// Writes the build id, the app's web address and app.config.json values into the web files.
// Usage: node scripts/stamp.js <build-id> <app-url>
const fs = require("fs"), path = require("path");
const [build = "dev", url = "./"] = process.argv.slice(2);
const root = path.join(__dirname, "..");
const cfg = JSON.parse(fs.readFileSync(path.join(root, "app.config.json"), "utf8"));
fs.writeFileSync(path.join(root, "www/js/config.js"),
  "// Written by scripts/stamp.js from app.config.json at build time.\nwindow.MT_CONFIG = " + JSON.stringify({googleWebClientId: cfg.googleWebClientId || ""}) + ";\n");
for (const f of ["index.html", "sw.js", "js/app.js", "offline.html"]) {
  const p = path.join(root, "www", f);
  fs.writeFileSync(p, fs.readFileSync(p, "utf8").replace(/__BUILD__/g, build).replace(/__APP_URL__/g, url));
}
console.log("Stamped build", build, "for", url);
