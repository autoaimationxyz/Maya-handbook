// Writes the build id and the app's web address into the files that need them.
// Usage: node scripts/stamp.js <build-id> <app-url>
const fs = require("fs"), path = require("path");
const [build = "dev", url = "./"] = process.argv.slice(2);
const files = ["index.html", "sw.js", "js/app.js", "offline.html"];
for (const f of files) {
  const p = path.join(__dirname, "..", "www", f);
  const s = fs.readFileSync(p, "utf8").replace(/__BUILD__/g, build).replace(/__APP_URL__/g, url);
  fs.writeFileSync(p, s);
}
console.log("Stamped build", build, "for", url);
