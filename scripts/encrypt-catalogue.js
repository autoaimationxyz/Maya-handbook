// Encrypts the private Chemotech catalogue for the public repo.
// Usage: MT_PASSCODE="..." node scripts/encrypt-catalogue.js <catalogue.json>
// Writes www/data/chemotech.enc.json. Never commit the plain catalogue.json.
const fs = require("fs"), path = require("path");
const { webcrypto: crypto } = require("crypto");
(async () => {
  const src = process.argv[2], pass = process.env.MT_PASSCODE;
  if (!src || !pass) { console.error("Usage: MT_PASSCODE=... node scripts/encrypt-catalogue.js <catalogue.json>"); process.exit(1); }
  const plain = new TextEncoder().encode(fs.readFileSync(src, "utf8"));
  const dest = path.join(__dirname, "..", "www", "data", "chemotech.enc.json");
  // Keep the same salt and iterations as the existing file, so phones that already
  // unlocked the catalogue can open the updated version without the passcode again.
  let prev = null; try { prev = JSON.parse(fs.readFileSync(dest, "utf8")); } catch (e) {}
  const salt = prev && !process.env.MT_NEW_SALT ? Uint8Array.from(Buffer.from(prev.salt, "base64")) : crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iter = prev && !process.env.MT_NEW_SALT ? prev.iter : Number(process.env.MT_ITER || 2000000);
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass.normalize("NFKC")), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: iter, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plain));
  const b64 = u => Buffer.from(u).toString("base64");
  const out = { v: 1, kdf: "PBKDF2-SHA256", iter, salt: b64(salt), iv: b64(iv), data: b64(ct) };
  fs.writeFileSync(dest, JSON.stringify(out));
  console.log("Wrote", dest, ct.length, "bytes encrypted");
})();
