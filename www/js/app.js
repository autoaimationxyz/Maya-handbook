/* ===== Maya Traders Sales Handbook — app logic ===== */
(function(){
"use strict";
const P = window.PRODUCTS, L = window.LESSONS, PB = window.PLAYBOOKS, SV = window.SURVEYS;
const byId = Object.fromEntries(P.map(p => [p.id, p]));
const STAGES = [
  {id:"now", label:"Start now", cls:"st-now"},
  {id:"m2", label:"Month 2", cls:"st-m2"},
  {id:"m3", label:"Month 3+", cls:"st-m3"},
  {id:"later", label:"Later", cls:"st-later"}
];
const stageOf = id => STAGES.find(s => s.id === id) || STAGES[3];
const ORDER = ["cables","earthing","stabilizer","ups","solar","ev","vfd","plc","ledwall","bms","wtp","steam","scada","damgate","puf"];
P.sort((a, b) => (ORDER.indexOf(a.id) + 1 || 99) - (ORDER.indexOf(b.id) + 1 || 99));

/* ---------- icons ---------- */
const IC = {
  cable:'<path d="M3 6h5a4 4 0 0 1 4 4v4a4 4 0 0 0 4 4h5"/><circle cx="3" cy="6" r="1.4"/><path d="M19 15v6M22 16v4"/>',
  earth:'<path d="M12 3v9"/><path d="M5 12h14M7.5 15.5h9M10 19h4"/>',
  stabilizer:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M6 13c1.2-3 2.4-3 3.6 0s2.4 3 3.6 0M15 12h3"/>',
  ups:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M10 6.5h4M12.5 10l-2.5 4h4l-2.5 4"/>',
  solar:'<path d="M3 20l3-10h12l3 10z"/><path d="M4.5 15h15M9.5 10l-1 10M14.5 10l1 10"/><path d="M12 3v2.5M7 4.5l1.2 1.6M17 4.5l-1.2 1.6"/>',
  ev:'<path d="M5 20V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13"/><path d="M3 20h14"/><path d="M15 10h1.5a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V9l-2.5-2.5"/><path d="M10.5 8l-2 3.5h3L9.5 15"/>',
  vfd:'<rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="6" width="10" height="5" rx="1"/><circle cx="9" cy="15.5" r="1.1"/><circle cx="15" cy="15.5" r="1.1"/>',
  plc:'<rect x="3" y="6.5" width="18" height="11" rx="1.5"/><path d="M6 6.5v-2M9 6.5v-2M12 6.5v-2M15 6.5v-2M18 6.5v-2M6 17.5v2M9 17.5v2M12 17.5v2M15 17.5v2M18 17.5v2"/><rect x="6.5" y="9.5" width="5" height="5"/>',
  scada:'<rect x="2" y="4" width="20" height="13" rx="1.5"/><path d="M8 21h8M12 17v4"/><path d="M5 13l3-3 3 2 4-5 4 3"/>',
  bms:'<path d="M4 21V5l8-3v19M12 9h8v12M2 21h20"/><path d="M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  dam:'<path d="M3 20h18M5 20V9h14v11"/><path d="M9.7 9v11M14.3 9v11"/><path d="M3 5.5c2 1 4 1 6 0s4-1 6 0 4 1 6 0"/>',
  led:'<rect x="2" y="4" width="20" height="13" rx="1"/><path d="M8 21h8M12 17v4"/><path d="M6 8.5h.01M10 8.5h.01M14 8.5h.01M18 8.5h.01M6 12.5h.01M10 12.5h.01M14 12.5h.01M18 12.5h.01" stroke-width="2.6"/>',
  water:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 14a3 3 0 0 0 3 3"/>',
  steam:'<path d="M4 20h16"/><path d="M8 16c-2-2 2-4 0-6s2-4 0-6M12 16c-2-2 2-4 0-6s2-4 0-6M16 16c-2-2 2-4 0-6s2-4 0-6"/>',
  panel:'<path d="M3 9l9-5 9 5v11H3z"/><path d="M3 13h18M3 17h18"/>',
  box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  book:'<path d="M2 5h7a3 3 0 0 1 3 3v12a2.5 2.5 0 0 0-2.5-2.5H2z"/><path d="M22 5h-7a3 3 0 0 0-3 3v12a2.5 2.5 0 0 1 2.5-2.5H22z"/>',
  calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><rect x="8" y="5" width="8" height="4"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" stroke-width="2.6"/>',
  bag:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  note:'<path d="M5 3h10l4 4v14H5z"/><path d="M14 3v5h5M8 12h8M8 16h6"/>',
  back:'<path d="M15 18l-6-6 6-6"/>', chev:'<path d="M9 6l6 6-6 6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  plus:'<path d="M12 5v14M5 12h14"/>', x:'<path d="M6 6l12 12M18 6L6 18"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  wa:'<path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2z"/>',
  check:'<path d="M5 12l5 5L20 7"/>', camera:'<path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="13" r="3.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6"/>',
  clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.5h6V4M8.5 10h7M8.5 14h7M8.5 18h4"/>',
  quote:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 11h6M9 15h6M9 7h3"/>',
  pct:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  swap:'<path d="M4 8h14l-3-3M20 16H6l3 3"/>'
};
const svg = (n, extra="") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${IC[n]||""}</svg>`;

/* ---------- helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num = v => { if (v === "" || v == null) return null; const n = Number(String(v).replace(/,/g,"")); return isFinite(n) ? n : null; };
const inr = n => (n == null || isNaN(n)) ? "—" : "₹" + Math.round(Number(n)).toLocaleString("en-IN");
const inrS = n => {
  if (n == null || isNaN(n)) return "—"; n = Number(n);
  const t = (x) => (Math.round(x*100)/100).toString();
  if (n >= 1e7) return "₹" + t(n/1e7) + " Cr";
  if (n >= 1e5) return "₹" + t(n/1e5) + " L";
  return inr(n);
};
const fmt = (n, d=1) => (n == null || !isFinite(n)) ? "—" : Number(n).toLocaleString("en-IN", {maximumFractionDigits:d, minimumFractionDigits:0});
const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
const localISO = d => new Date(d.getTime() - d.getTimezoneOffset()*60000).toISOString().slice(0,10);
const today = () => localISO(new Date());
const niceDate = d => { if (!d) return ""; const x = new Date(d + "T00:00:00"); return x.toLocaleDateString("en-IN", {day:"numeric", month:"short"}); };
const nextUp = (v, arr) => arr.find(s => s >= v - 1e-9) ?? arr[arr.length-1];

function toast(msg){ const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove("on"), 2200); }
function copyText(text){
  const done = () => toast("Copied");
  const fallback = () => { const ta = document.createElement("textarea"); ta.value = text; ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); done(); } catch(e){ toast("Select the text and copy it"); } ta.remove(); };
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch(e){ fallback(); }
}
const waLink = (phone, text) => {
  let p = String(phone||"").replace(/\D/g,"");
  if (p.length === 10) p = "91" + p;
  return "https://wa.me/" + (p || "") + "?text=" + encodeURIComponent(text);
};

/* ---------- storage (on this phone) ---------- */
const LS = "maya-traders-v1";
const BUILD = "__BUILD__";
const Store = {
  mode: "local",
  data: {products:{}, progress:{lessons:{}}, notes:{items:[]}, settings:{}, leads:{}, quotes:{}, surveys:{}, orders:{}, partners:{}, expenses:{}, activities:{}},
  loadLocal(){ try { const j = JSON.parse(localStorage.getItem(LS) || "null"); if (j) for (const k in this.data) if (j[k]) this.data[k] = j[k]; } catch(e){} },
  saveLocal(){
    try { localStorage.setItem(LS, JSON.stringify(this.data)); setSync("ok"); }
    catch(e){ setSync("err"); toast("Phone storage is full. Make a backup and delete old items."); }
  },
  async init(){
    this.loadLocal();
    await Photos.open();
    try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist(); } catch(e){}
    setSync("ok");
  },
  saveDoc(){ this.saveLocal(); },
  saveItem(){ this.saveLocal(); },
  deleteItem(coll, id){ delete this.data[coll][id]; this.saveLocal(); }
};
function setSync(s){
  const el = $("#sync"); if (!el) return;
  const last = (Store.data.settings || {}).lastBackup;
  const stale = !last || (Date.now() - new Date(last).getTime()) > 14*864e5;
  el.className = "sync " + (s === "err" ? "local" : stale ? "local" : "ok");
  el.querySelector("span").textContent = s === "err" ? "Storage full" : stale ? "Back up" : (typeof G !== "undefined" && G.on() ? "Synced" : "Saved");
  el.title = stale ? "Saved on this phone. Make a backup from Notes." : "Saved on this phone; backed up " + niceDate(last.slice(0,10));
}
/* photos live in IndexedDB on the phone */
const Photos = {
  db: null, urls: {},
  open(){ return new Promise(res => { try { const r = indexedDB.open("maya-photos", 1); r.onupgradeneeded = () => r.result.createObjectStore("p"); r.onsuccess = () => { this.db = r.result; res(); }; r.onerror = () => res(); } catch(e){ res(); } }); },
  tx(mode){ return this.db.transaction("p", mode).objectStore("p"); },
  put(id, blob){ return new Promise((res, rej) => { const q = this.tx("readwrite").put(blob, id); q.onsuccess = () => res(); q.onerror = () => rej(q.error); }); },
  get(id){ return new Promise(res => { if (!this.db) return res(null); const q = this.tx("readonly").get(id); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); }); },
  del(id){ return new Promise(res => { if (!this.db) return res(); const q = this.tx("readwrite").delete(id); q.onsuccess = q.onerror = () => res(); }); },
  async url(id){ if (this.urls[id]) return this.urls[id]; const b = await this.get(id); if (!b) return null; return this.urls[id] = URL.createObjectURL(b); }
};
async function hydratePhotos(){ for (const img of $$("img[data-ph]")) { const u = await Photos.url(img.dataset.ph); if (u) img.src = u; else img.style.opacity = .2; } }
const blobToData = b => new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(b); });
const dataToBlob = async d => (await fetch(d)).blob();
const isNative = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
async function backupJSON(){
  const photos = {};
  for (const p of Object.values(Store.data.products)) for (const id of (p.photos || [])) { const b = await Photos.get(id); if (b) photos[id] = await blobToData(b); }
  return JSON.stringify({app:"maya-traders", v:1, at:new Date().toISOString(), data:Store.data, photos});
}
async function makeBackup(){
  toast("Preparing backup…");
  const name = "maya-backup-" + today() + ".json";
  const json = await backupJSON();
  try {
    if (isNative() && window.Capacitor.Plugins.Filesystem && window.Capacitor.Plugins.Share){
      const {Filesystem, Share} = window.Capacitor.Plugins;
      const w = await Filesystem.writeFile({path:name, data:json, directory:"CACHE", encoding:"utf8"});
      await Share.share({title:"Maya Traders backup", text:"Maya Traders app backup " + today(), url:w.uri, dialogTitle:"Save backup to Drive or send to yourself"});
    } else {
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([json], {type:"application/json"})); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    }
    Store.data.settings.lastBackup = new Date().toISOString(); Store.saveLocal(); toast("Backup ready: keep it in Google Drive");
    if (cur === "settings") rerender();
  } catch(e){ if (!(e && /cancel/i.test(String(e.message||e)))) toast("Couldn't make the backup file"); }
}
async function restoreBackup(file){
  try {
    const j = file.json || JSON.parse(await file.text());
    if (j.app !== "maya-traders" || !j.data) { toast("That file isn't a Maya Traders backup"); return; }
    for (const [id, d] of Object.entries(j.photos || {})) await Photos.put(id, await dataToBlob(d));
    const keepG = (Store.data.settings || {}).google, keepCid = (Store.data.settings || {}).gClientId;
    for (const k in Store.data) if (j.data[k]) Store.data[k] = j.data[k];
    if (keepG) Store.data.settings.google = keepG; if (keepCid) Store.data.settings.gClientId = keepCid;
    Store.saveLocal(); toast("Backup restored from " + niceDate((j.at||"").slice(0,10))); location.hash = "#today"; route();
  } catch(e){ toast("Couldn't read that backup file"); }
}
/* ---------- product state ---------- */
function pState(p){
  let s = Store.data.products[p.id];
  if (!s) s = Store.data.products[p.id] = {};
  if (!s.rows) s.rows = p.prices.map(r => ({item:r.item, unit:r.unit, low:r.low, high:r.high, cost:null, sell:null}));
  if (!s.photos) s.photos = [];
  if (s.note == null) s.note = "";
  return s;
}
const peekRows = p => (Store.data.products[p.id] && Store.data.products[p.id].rows) || p.prices.map(r => ({...r, cost:null, sell:null}));
const margin = (c, s) => (c != null && s) ? (s - c) / s * 100 : null;

/* ---------- router ---------- */
let cur = "products";
const ui = {ptab:{}, pfilter:"all", q:"", leadFilter:"open", quote:null, survey:null, upsRows:null, del:null};
const TAB_OF = h => /^(p-|products|pricebook)/.test(h) ? "products" : /^(l-|learn)/.test(h) ? "learn" : /^(t-|tools)/.test(h) ? "tools" : /^(today|notes|settings|activity|expenses)$/.test(h) ? "today" : "sell";
const ROOT = {products:1, learn:1, tools:1, sell:1, notes:1};

function setHeader(eyebrow, title, back){
  $("#eyebrow").textContent = eyebrow; $("#ttl").textContent = title;
  $("#back").classList.toggle("on", !!back); $("#back").dataset.to = back || "";
  document.title = "Maya Traders";
}
function route(){
  const h = (location.hash || "#today").slice(1) || "today";
  cur = h;
  const tab = TAB_OF(h);
  $$(".tabs a").forEach(a => a.classList.toggle("on", a.dataset.tab === tab));
  const v = $("#view");
  let html = "";
  try {
    if (h === "today") html = vToday();
    else if (h === "settings") html = vSettings();
    else if (h === "activity") html = vActivity();
    else if (h === "expenses") html = vExpenses();
    else if (h === "orders") html = vOrders();
    else if (h.startsWith("order-")) html = vOrder(h.slice(6));
    else if (h === "partners") html = vPartners();
    else if (h.startsWith("partner-")) html = vPartner(h.slice(8));
    else if (h === "products") html = vProducts();
    else if (h.startsWith("p-")) html = vProduct(h.slice(2));
    else if (h === "pricebook") html = vPriceBook();
    else if (h === "learn") html = vLearn();
    else if (h.startsWith("l-")) html = vLesson(h.slice(2));
    else if (h === "tools") html = vTools();
    else if (h.startsWith("t-")) html = vCalc(h.slice(2));
    else if (h === "sell") html = vSell();
    else if (h === "leads") html = vLeads();
    else if (h.startsWith("lead-")) html = vLead(h.slice(5));
    else if (h === "quote" || h.startsWith("quote-")) html = vQuote(h.slice(6));
    else if (h === "quotes") html = vQuotes();
    else if (h === "survey" || h.startsWith("survey-")) html = vSurvey(h.slice(7));
    else if (h.startsWith("prep-")) html = vPrep(h.slice(5));
    else if (h === "notes") html = vNotes();
    else html = vToday();
  } catch(e){ console.error(e); html = `<div class="empty"><b>Something went wrong on this page.</b>Go back and try again.</div>`; }
  v.innerHTML = html;
  if (!route.keepScroll) window.scrollTo(0, 0);
  route.keepScroll = false;
  after(h);
}
function rerender(){ route.keepScroll = true; route(); }
window.addEventListener("hashchange", route);

/* ---------- PRODUCTS ---------- */
function prodMatch(p, q){
  q = q.toLowerCase();
  return [p.name, p.tagline, p.what, p.cat, ...(p.types||[]).map(t=>t.name), ...(p.brands||[])].join(" ").toLowerCase().includes(q);
}
function pItem(p){
  const rows = peekRows(p).filter(r => r.sell || r.low);
  const r0 = rows.slice().sort((x, y) => (x.sell || x.low) - (y.sell || y.low))[0];
  const from = r0 ? `from ${inrS(r0.sell || r0.low)}` : "";
  return `<a class="pitem" href="#p-${p.id}">
    <span class="ico">${svg(p.icon)}</span>
    <span style="min-width:0"><span class="nm">${esc(p.name)}</span><br><span class="tg">${esc(p.tagline)}</span></span>
    <span class="rng">${from}<br>${r0 ? esc(r0.unit) : ""}</span></a>`;
}
function vProducts(){
  setHeader("Maya Traders", "Products");
  const q = ui.q.trim();
  let html = `<div class="search" style="margin-bottom:6px">${svg("search")}<input id="q" type="search" placeholder="Search products, lessons, tools" value="${esc(ui.q)}" autocomplete="off" aria-label="Search"></div>`;

  if (q){
    const ps = P.filter(p => prodMatch(p, q));
    const ls = L.filter(l => (l.title + " " + l.intro + " " + l.body.map(b=>b.join(" ")).join(" ")).toLowerCase().includes(q.toLowerCase()));
    const cs = CALCS.filter(c => (c.name + " " + c.desc).toLowerCase().includes(q.toLowerCase()));
    html += `<div class="sec-h"><span class="eyebrow">${ps.length + ls.length + cs.length} results</span></div>`;
    if (ps.length) html += `<div class="plist">${ps.map(pItem).join("")}</div>`;
    if (ls.length) html += `<div class="sec-h"><h3>Lessons</h3></div><div class="list">${ls.map(l => `<a class="li" href="#l-${l.id}">${svg("book")}<span class="grow"><b>${esc(l.title)}</b><span>${esc(l.intro)}</span></span>${svg("chev")}</a>`).join("")}</div>`;
    if (cs.length) html += `<div class="sec-h"><h3>Calculators</h3></div><div class="list">${cs.map(c => `<a class="li" href="#t-${c.id}">${svg("calc")}<span class="grow"><b>${esc(c.name)}</b><span>${esc(c.desc)}</span></span>${svg("chev")}</a>`).join("")}</div>`;
    if (!ps.length && !ls.length && !cs.length) html += `<div class="empty"><b>Nothing found</b>Try a product name like "UPS", or a word like "earthing".</div>`;
    return html;
  }
  html += `<div class="sec-h"><span class="eyebrow">${P.length} products, in selling order</span></div><div class="plist">${P.map(pItem).join("")}</div>`;
  html += `<div class="btnbar" style="margin-top:18px"><a class="btn" href="#pricebook">${svg("pct")} My price book</a></div>`;
  return html;
}

function vProduct(id){
  const p = byId[id];
  if (!p) return `<div class="empty"><b>Product not found</b></div>`;
  setHeader(p.cat, p.name, "#products");
  const tab = ui.ptab[id] || "overview";
  const rows = peekRows(p);
  const lo = Math.min(...rows.map(r=>r.low).filter(Boolean)), hi = Math.max(...rows.map(r=>r.high).filter(Boolean));
  let html = `<div class="plate"><i class="s1"></i><i class="s2"></i>
    <div class="hd"><span class="ico">${svg(p.icon)}</span><div style="min-width:0"><h2>${esc(p.name)}</h2><p class="tag">${esc(p.tagline)}</p></div></div>
    <dl class="kv"><div><dt>Category</dt><dd>${esc(p.cat)}</dd></div>
    <div><dt>Buyers</dt><dd>${esc(p.buyers.split(",")[0])}${p.buyers.includes(",")?" +":""}</dd></div>
    <div><dt>Market</dt><dd class="mono" style="font-size:12.5px">${isFinite(lo)?inrS(lo)+"–"+inrS(hi):"Project"}</dd></div></dl></div>`;
  html += `<div class="seg" role="tablist">${[["overview","Learn"],["sizing","Size it"],["sell","Sell it"],["prices","Prices"]].map(([k,l]) => `<button class="${tab===k?"on":""}" data-act="ptab" data-id="${id}" data-v="${k}" role="tab" aria-selected="${tab===k}">${l}</button>`).join("")}</div>`;
  html += `<div id="ppanel">${pPanel(p, tab)}</div>`;
  return html;
}
function pPanel(p, tab){
  if (tab === "overview") return `
    <div class="block"><h3>What it is</h3><p class="lead-p">${esc(p.what)}</p></div>
    <div class="block"><h3>Why customers buy it</h3><p>${esc(p.why)}</p></div>
    <div class="block"><h3>How it works</h3><ol class="steps">${p.how.map(s=>`<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
    <div class="block"><h3>Types you'll hear about</h3><div class="types">${p.types.map(t=>`<div><b>${esc(t.name)}</b><span>${esc(t.desc)}</span></div>`).join("")}</div></div>
    <div class="block"><h3>Brands to know</h3><div class="brands">${p.brands.map(b=>`<span>${esc(b)}</span>`).join("")}</div></div>`;
  if (tab === "sizing") return `
    <div class="block"><h3>How to size it</h3><ul class="bul">${p.sizing.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>
    ${p.calc ? `<div class="btnbar"><a class="btn pri" href="#t-${p.calc}">${svg("calc")} Open the calculator</a></div>` : ""}</div>
    <div class="block"><h3>Datasheet words</h3><dl class="gloss">${p.specs.map(s=>`<dt>${esc(s.k)}</dt><dd>${esc(s.v)}</dd>`).join("")}</dl></div>
    <div class="block"><h3>Mistakes to avoid</h3><ul class="bul">${p.mistakes.map(s=>`<li>${esc(s)}</li>`).join("")}</ul></div>`;
  if (tab === "sell") return `
    <div class="block"><h3>Who, where, how in</h3><div class="where">
      <div><b>Buyers</b><span>${esc(p.buyers)}</span></div><div><b>Where</b><span>${esc(p.where)}</span></div><div><b>Way in</b><span>${esc(p.wayIn)}</span></div></div></div>
    <div class="block"><h3>Questions to ask</h3><ol class="steps">${p.ask.map(s=>`<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
    <div class="block"><h3>Pitch lines</h3>${p.pitch.map(s=>`<div class="say">${esc(s)}<button class="icon-btn cp" data-act="copy" data-text="${esc(s)}" aria-label="Copy">${svg("copy")}</button></div>`).join("")}</div>
    <div class="block"><h3>When they say…</h3>${p.objections.map(o=>`<details class="obj"><summary>${esc(o[0])}</summary><p>${esc(o[1])}</p></details>`).join("")}</div>
    <div class="block"><h3>Sell next</h3><ul class="bul">${p.upsell.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>
      <div class="btnbar"><a class="btn" href="#survey">${svg("clip")} Site survey</a><a class="btn" href="#lead-new" data-act="newlead" data-p="${p.id}">${svg("users")} Add a lead</a></div></div>`;
  // prices
  const s = Store.data.products[p.id];
  const rows = peekRows(p);
  const canPhoto = !!Photos.db;
  return `
    <div class="block"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Price list</h3><span class="small muted">per unit, before GST</span></div>
      <div id="prows">${rows.map((r,i)=>priceRow(p,r,i)).join("")}</div>
      <div class="btnbar"><button class="btn sm" data-act="addrow" data-id="${p.id}">${svg("plus")} Add item</button>
      ${s && s.rows ? `<button class="btn sm ghost" data-act="resetrows" data-id="${p.id}">Reset to market list</button>` : ""}</div>
      <p class="src"><b>Market estimate.</b> ${esc(p.priceNote || "")} Fill in your supplier cost and your selling price; margin updates as you type.</p></div>
    <div class="block"><h3>Photos</h3>
      <div class="photos" id="photos">${photoGrid(p)}</div>
      ${canPhoto ? "" : `<p class="small muted" style="margin-top:8px">This browser can't store photos.</p>`}</div>
    <div class="block"><h3>My notes on ${esc(p.name.split("(")[0].trim())}</h3>
      <textarea class="inp" id="pnote-${p.id}" data-in="pnote" data-id="${p.id}" placeholder="Supplier contacts, model numbers, landing price, delivery time…">${esc(s ? s.note : "")}</textarea></div>`;
}
function priceRow(p, r, i){
  const m = margin(r.cost, r.sell);
  const cls = m == null ? "" : m >= 15 ? "good" : m >= 7 ? "low" : "bad";
  return `<div class="prow" data-i="${i}">
    <div class="top-l"><div style="min-width:0">${r.custom ? `<input class="inp" style="min-height:34px;padding:5px 8px;font-weight:650" data-in="prow" data-id="${p.id}" data-i="${i}" data-f="item" value="${esc(r.item)}" placeholder="Item name">` : `<div class="item">${esc(r.item)}</div>`}
      <div class="small muted">${esc(r.unit||"")}</div></div>
      <div class="mkt">${r.low ? `${inrS(r.low)}–${inrS(r.high)}<br>market` : "your item"}</div></div>
    <div class="ed">
      <div class="field"><label for="c-${p.id}-${i}">My cost ₹</label><input class="inp" id="c-${p.id}-${i}" inputmode="decimal" data-in="prow" data-id="${p.id}" data-i="${i}" data-f="cost" value="${r.cost ?? ""}" placeholder="—"></div>
      <div class="field"><label for="s-${p.id}-${i}">I sell at ₹</label><input class="inp" id="s-${p.id}-${i}" inputmode="decimal" data-in="prow" data-id="${p.id}" data-i="${i}" data-f="sell" value="${r.sell ?? ""}" placeholder="—"></div>
      <div class="mg ${cls}" id="m-${p.id}-${i}">${m == null ? "margin" : fmt(m,1) + "%"}</div></div>
    <div class="row" style="margin-top:6px;gap:6px"><button class="btn sm ghost" data-act="toquote" data-id="${p.id}" data-i="${i}">${svg("quote")} Add to quote</button>
      <button class="btn sm ghost danger" data-act="delrow" data-id="${p.id}" data-i="${i}">${ui.del === p.id+"-"+i ? "Tap again to remove" : "Remove"}</button></div></div>`;
}
function photoGrid(p){
  const s = Store.data.products[p.id];
  const ph = (s && s.photos) || [];
  let h = ph.map(id => `<figure><img data-ph="${esc(id)}" alt="${esc(p.name)} photo"><button data-act="delphoto" data-id="${p.id}" data-ph="${esc(id)}" aria-label="Remove photo">${svg("x","width=14 height=14")}</button></figure>`).join("");
  if (Photos.db) h += `<label class="add" for="up-${p.id}">${svg("camera","width=22 height=22")}<span>Add photo</span><input type="file" id="up-${p.id}" accept="image/*" data-in="photo" data-id="${p.id}" hidden></label>`;
  if (!ph.length && !Photos.db) h = `<div class="small muted" style="grid-column:1/-1">No photos yet. Product photos you take at sites or from catalogues will show here.</div>`;
  return h;
}
function refreshPhotos(){ const id = cur.slice(2), p = byId[id], el = $("#photos"); if (p && el){ el.innerHTML = photoGrid(p); hydratePhotos(); } }
async function uploadPhoto(p, file){
  if (!file || !Photos.db) return;
  try {
    const blob = await shrink(file), id = uid();
    await Photos.put(id, blob);
    const s = pState(p); s.photos.push(id); Store.saveDoc("products");
    refreshPhotos(); toast("Photo added");
  } catch(e){ toast("Couldn't save the photo"); }
}
function shrink(file){
  return new Promise((res, rej) => {
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => { const m = 1600, k = Math.min(1, m / Math.max(img.width, img.height));
      const c = document.createElement("canvas"); c.width = Math.round(img.width*k); c.height = Math.round(img.height*k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      c.toBlob(b => b ? res(b) : rej(), "image/jpeg", 0.85); };
    img.onerror = () => rej(); img.src = url;
  });
}

function vPriceBook(){
  setHeader("Products", "My price book", "#products");
  let html = `<p class="muted small" style="margin-bottom:12px">Every item where you've entered a cost or selling price. Edit them inside each product's Prices tab.</p>`;
  let any = false, text = "MAYA TRADERS: PRICE BOOK (" + today() + ")\n";
  for (const p of P){
    const s = Store.data.products[p.id]; if (!s || !s.rows) continue;
    const rows = s.rows.filter(r => r.cost != null || r.sell != null); if (!rows.length) continue;
    any = true; text += "\n" + p.name + "\n";
    html += `<div class="block"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${esc(p.name)}</h3><a class="small" href="#p-${p.id}" data-act="gotoprices" data-id="${p.id}">Edit</a></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Item</th><th class="num">Cost</th><th class="num">Sell</th><th class="num">Margin</th></tr></thead><tbody>
      ${rows.map(r => { const m = margin(r.cost, r.sell); text += `- ${r.item} (${r.unit}): cost ${inr(r.cost)}, sell ${inr(r.sell)}\n`;
        return `<tr><td>${esc(r.item)}<div class="small muted">${esc(r.unit)}</div></td><td class="num">${inr(r.cost)}</td><td class="num">${inr(r.sell)}</td><td class="num">${m==null?"—":fmt(m,1)+"%"}</td></tr>`; }).join("")}
      </tbody></table></div></div>`;
  }
  if (!any) html += `<div class="empty"><b>No prices entered yet</b>Open a product, go to its Prices tab, and fill in your cost and selling price.</div>`;
  else html += `<div class="btnbar"><button class="btn" data-act="copy" data-text="${esc(text)}">${svg("copy")} Copy price book</button></div>`;
  return html;
}

/* ---------- LEARN ---------- */
function vLearn(){
  setHeader("EEE refresher", "Learn");
  const pr = Store.data.progress.lessons || {};
  const done = L.filter(l => pr[l.id] && pr[l.id].done).length;
  let html = `<div class="block"><div class="row" style="justify-content:space-between"><b>${done} of ${L.length} lessons done</b><span class="small muted mono">${Math.round(done/L.length*100)}%</span></div>
    <div class="progress" style="margin-top:8px"><i style="width:${done/L.length*100}%"></i></div>
    <p class="small muted" style="margin-top:8px">Short lessons in plain English, each with a 3-question check. Product-specific learning is inside every product page.</p></div>
    <div class="list" style="margin-top:12px">`;
  html += L.map((l, i) => { const d = pr[l.id] || {};
    return `<a class="lcard" href="#l-${l.id}"><span class="lnum ${d.done?"done":""}">${d.done ? svg("check","width=16 height=16") : String(i+1).padStart(2,"0")}</span>
      <span class="lbody" style="min-width:0"><h3>${esc(l.title)}</h3><p>${esc(l.intro)}</p></span>
      <span class="small muted mono">${d.score!=null ? d.score+"/3" : l.mins+" min"}</span></a>`; }).join("");
  html += `</div>`;
  html += `<div class="sec-h"><h3>Learn by product</h3></div><div class="plist">${P.map(p=>`<a class="pitem" href="#p-${p.id}"><span class="ico">${svg(p.icon)}</span><span class="nm">${esc(p.name)}</span>${svg("chev")}</a>`).join("")}</div>`;
  return html;
}
function vLesson(id){
  const l = L.find(x => x.id === id); if (!l) return `<div class="empty"><b>Lesson not found</b></div>`;
  const idx = L.indexOf(l);
  setHeader("Lesson " + (idx+1) + " of " + L.length, l.title, "#learn");
  const pr = (Store.data.progress.lessons || {})[id] || {};
  ui.quizAns = ui.quizAns && ui.quizAns.id === id ? ui.quizAns : {id, a:{}};
  let html = `<div class="block"><p class="lead-p" style="margin-bottom:10px">${esc(l.intro)}</p>${l.body.map(b=>`<div class="term"><b>${esc(b[0])}</b>${esc(b[1])}</div>`).join("")}</div>
    <div class="block quiz"><h3>Quick check</h3><div id="quiz">${quizHtml(l)}</div></div>
    <div class="btnbar">${pr.done ? `<span class="pill good">${svg("check","width=12 height=12")} Done${pr.score!=null?" · "+pr.score+"/3":""}</span>` : `<button class="btn" data-act="lessondone" data-id="${id}">${svg("check")} Mark as done</button>`}
    ${idx < L.length-1 ? `<a class="btn pri" href="#l-${L[idx+1].id}">Next: ${esc(L[idx+1].title)}</a>` : ""}</div>`;
  return html;
}
function quizHtml(l){
  const A = ui.quizAns.a;
  return l.quiz.map((q, qi) => { const ans = A[qi];
    return `<div class="q"><p>${qi+1}. ${esc(q.q)}</p><div class="opts">${q.o.map((o, oi) => {
      let c = ""; if (ans != null){ if (oi === q.a) c = "right"; else if (oi === ans) c = "wrong"; }
      return `<button class="opt ${c}" data-act="quiz" data-id="${l.id}" data-q="${qi}" data-o="${oi}" ${ans!=null?"disabled":""}>${esc(o)}</button>`; }).join("")}</div>
      ${ans != null ? `<p class="why">${ans===q.a?"Correct. ":"Not quite. "}${esc(q.why)}</p>` : ""}</div>`; }).join("");
}

/* ---------- CALCULATORS ---------- */
const CALCS = [
  {id:"ups", name:"UPS & battery sizing", desc:"Loads in watts → UPS kVA and battery bank", icon:"ups"},
  {id:"stabilizer", name:"Stabilizer size", desc:"Load kW → servo stabilizer kVA and type", icon:"stabilizer"},
  {id:"cable", name:"Cable size & voltage drop", desc:"Load, length → wire size and MCB", icon:"cable"},
  {id:"solar", name:"Solar from the bill", desc:"Monthly units → kW, cost, subsidy, payback", icon:"solar"},
  {id:"ev", name:"EV charging", desc:"Charge time, wiring and running cost vs petrol", icon:"ev"},
  {id:"vfd", name:"VFD energy savings", desc:"Motor, hours, speed → yearly savings and payback", icon:"vfd"},
  {id:"earth", name:"Earth pit planner", desc:"Property type → pits, lightning and SPDs", icon:"earth"},
  {id:"led", name:"LED wall planner", desc:"Wall size, distance → pitch, resolution, cost", icon:"led"},
  {id:"margin", name:"Price, margin & GST", desc:"Cost → selling price with GST", icon:"pct"},
  {id:"convert", name:"Quick converter", desc:"HP↔kW, kW↔kVA, kW→amps", icon:"swap"}
];
function vTools(){
  setHeader("Site & meeting calculators", "Tools");
  return `<div class="tgrid">${CALCS.map(c=>`<a class="tcard" href="#t-${c.id}"><span class="ico">${svg(c.icon)}</span><b>${esc(c.name)}</b><span>${esc(c.desc)}</span></a>`).join("")}</div>
  <p class="small muted" style="margin-top:14px">Calculators give good first estimates for a meeting. Final sizing for large or critical jobs should be checked by the supplier's engineer.</p>`;
}
const F = {
  n:(name, label, val, extra="") => `<div class="field"><label for="f-${name}">${label}</label><input class="inp mono" id="f-${name}" name="${name}" inputmode="decimal" value="${val}" ${extra}></div>`,
  sel:(name, label, opts, val) => `<div class="field"><label for="f-${name}">${label}</label><select class="inp" id="f-${name}" name="${name}">${opts.map(o => { const [v,l] = Array.isArray(o)?o:[o,o]; return `<option value="${v}" ${String(v)===String(val)?"selected":""}>${l}</option>`; }).join("")}</select></div>`,
  seg:(name, label, opts, val) => `<div class="field"><span class="lbl">${label}</span><div class="seg-in">${opts.map(([v,l]) => `<label><input type="radio" name="${name}" value="${v}" ${String(v)===String(val)?"checked":""}>${l}</label>`).join("")}</div></div>`,
  chk:(name, label, on) => `<label class="row small" style="gap:8px;font-weight:600"><input type="checkbox" name="${name}" ${on?"checked":""} style="width:18px;height:18px;accent-color:var(--copper)"> ${label}</label>`
};
function readForm(form){
  const o = {};
  $$("input,select,textarea", form).forEach(el => {
    if (!el.name) return;
    if (el.type === "radio"){ if (el.checked) o[el.name] = el.value; }
    else if (el.type === "checkbox") o[el.name] = el.checked;
    else { const n = num(el.value); o[el.name] = (el.inputMode === "decimal" && n != null) ? n : el.value; if (el.inputMode === "decimal" && el.value === "") o[el.name] = null; }
  });
  return o;
}
const res = (lab, big, unit, grid, note) => `<div class="result"><div class="lab">${lab}</div><div class="big">${big}${unit?`<small>${unit}</small>`:""}</div>
  ${grid && grid.length ? `<div class="rgrid">${grid.map(([l,v])=>`<div><div class="lab">${l}</div><div class="v">${v}</div></div>`).join("")}</div>` : ""}
  ${note ? `<p class="note">${note}</p>` : ""}</div>`;
const howBlock = t => `<details class="how"><summary>How this is worked out</summary><pre>${esc(t)}</pre></details>`;
const rowPrice = (pid, match) => { const p = byId[pid]; const rows = peekRows(p); return rows.find(r => r.item.includes(match)); };
const priceOf = r => r ? (r.sell || (r.low + r.high)/2) : null;

const CALC = {
ups: {
  form(){
    if (!ui.upsRows) ui.upsRows = [{n:"Desktop PC + monitor", w:200, q:6},{n:"Server", w:500, q:1},{n:"Network switch + router", w:60, q:1},{n:"CCTV NVR + cameras", w:120, q:1}];
    return `<div class="block"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Loads</h3><span class="pill warn">example loads: edit</span></div>
      <div id="upsrows">${ui.upsRows.map((r,i)=>`<div class="qline"><input class="inp" data-in="upsrow" data-i="${i}" data-f="n" value="${esc(r.n)}" aria-label="Load name">
        <div class="nums" style="grid-template-columns:1fr 1fr 32px"><div class="field"><label>Watts each</label><input class="inp" inputmode="decimal" data-in="upsrow" data-i="${i}" data-f="w" value="${r.w}"></div>
        <div class="field"><label>Qty</label><input class="inp" inputmode="decimal" data-in="upsrow" data-i="${i}" data-f="q" value="${r.q}"></div>
        <button class="icon-btn" data-act="upsdel" data-i="${i}" aria-label="Remove">${svg("x")}</button></div></div>`).join("")}</div>
      <div class="btnbar"><button class="btn sm" data-act="upsadd">${svg("plus")} Add load</button></div></div>
      <div class="block"><div class="grid2">${F.n("mins","Backup needed (minutes)",30)}${F.sel("pf","UPS output power factor",[["0.9","0.9 (modern)"],["0.8","0.8 (older)"],["1","1.0"]],"0.9")}
      ${F.sel("bank","Battery bank voltage",[["auto","Auto by size"],["24","24 V"],["48","48 V"],["96","96 V"],["192","192 V"],["240","240 V"],["360","360 V"]],"auto")}${F.sel("bt","Battery type",[["vrla","SMF / VRLA"],["li","Lithium"]],"vrla")}</div></div>`;
  },
  calc(v){
    const W = ui.upsRows.reduce((a,r) => a + (num(r.w)||0)*(num(r.q)||0), 0);
    if (!W) return res("Recommended UPS", "—", "", [], "Add your loads above.");
    const pf = Number(v.pf)||0.9, raw = W/1000/pf*1.25;
    const sizes = [1,2,3,5,6,10,15,20,30,40,60,80,100,120,160,200,300,400,500];
    const kva = nextUp(raw, sizes);
    const V = v.bank === "auto" ? (kva<=1?24:kva<=3?96:kva<=6?192:kva<=10?240:360) : Number(v.bank);
    const h = (v.mins||0)/60, usable = v.bt === "li" ? 0.9 : 0.8;
    const ah = W*h/(V*usable*0.92);
    const std = [7,9,12,18,26,42,65,100,150,200];
    let strings = Math.max(1, Math.ceil(ah/200)); const per = nextUp(ah/strings, std);
    const nb = Math.ceil(V/12)*strings;
    const load = W/(kva*pf*1000)*100;
    const pB = rowPrice("ups", per>=100?"100 Ah":"42 Ah");
    return res("Recommended UPS", kva, "kVA", [
      ["Total load", fmt(W,0)+" W"], ["Load on UPS", fmt(load,0)+"%"],
      ["Battery bank", V+" V"], ["Battery needed", fmt(ah,0)+" Ah"],
      ["Use", `${nb} × 12 V ${per} Ah`], ["Phase", kva>=10?"3-phase in, check site":"Single phase"]
    ], `Keep UPS load under ~80%. ${v.mins>0?"Battery maths assumes "+Math.round(usable*100)+"% usable capacity and 92% inverter efficiency; real backup falls as batteries age.":""} ${pB&&per>=42?"Battery cost (at your list): about "+inrS(priceOf(pB)*nb)+".":""}`)
    + howBlock(`Load W = sum of (watts × qty) = ${fmt(W,0)} W\nkVA = W ÷ 1000 ÷ PF ${pf} × 1.25 margin = ${fmt(raw,2)} → next size ${kva} kVA\nAh = W × hours ÷ (bank V × usable ${usable} × 0.92)\n   = ${fmt(W,0)} × ${fmt(h,2)} ÷ (${V} × ${usable} × 0.92) = ${fmt(ah,0)} Ah\nBatteries = ${V}/12 per string × ${strings} string(s) = ${nb}`);
  }
},
stabilizer: {
  form(){ return `<div class="block"><div class="grid2">${F.seg("ph","Supply",[["1","1-phase"],["3","3-phase"]],"3")}${F.n("kw","Total running load (kW)",15)}
    ${F.n("minv","Lowest voltage seen (V)",190,'placeholder="phase-neutral"')}${F.sel("pf","Power factor",[["0.8","0.8 (homes/offices)"],["0.85","0.85"],["0.9","0.9"]],"0.8")}</div>
    <div class="stack" style="margin-top:12px">${F.chk("motor","Big motor loads (lift, pumps, 2+ ton ACs starting together)",true)}</div>
    <p class="small muted" style="margin-top:10px">No load list? Use the sanctioned load on the electricity bill as an upper limit.</p></div>`; },
  calc(v){
    if (!v.kw) return res("Recommended stabilizer", "—", "", [], "Enter the load.");
    const ph = v.ph === "1" ? 1 : 3, pf = Number(v.pf)||0.8, m = v.motor ? 1.35 : 1.25;
    const raw = v.kw/pf*m;
    const s1 = [2,3,4,5,7.5,10,12,15,20,25], s3 = [10,15,20,25,30,40,45,50,60,75,100,125,150,200,250,300,400,500];
    const kva = nextUp(raw, ph===1 ? s1 : s3);
    const too = ph===1 && raw > 25;
    const minv = v.minv;
    const wide = minv != null && minv < 170;
    const range = ph===1 ? (wide ? "Wide range, e.g. 130-280 V" : "Standard 170-270 V") : (wide ? "Wide range, e.g. 260-460 V (line)" : "Standard 300-460 V (line)");
    const r = rowPrice("stabilizer", ph===1 ? (kva<=5?"5 kVA":"10 kVA") : (kva<=10?"10 kVA":kva<=20?"20 kVA":kva<=50?"50 kVA":"100 kVA"));
    return res("Recommended stabilizer", too ? "Use 3-phase" : kva, too ? "" : "kVA", [
      ["Type", ph===1 ? "Single phase servo" : "3-ph unbalanced (independent)"], ["Cooling", kva>100?"Oil-cooled":"Air-cooled"],
      ["Input range", range], ["Calculated", fmt(raw,1)+" kVA"],
      ["Ballpark price", r ? inrS(r.sell || r.low)+(r.sell?"":"–"+inrS(r.high)) : "—"], ["Nearest list item", r ? esc(r.item) : "—"]
    ], too ? "That load is too big for single phase; the site will usually have or need a 3-phase connection." : "Install near the main board, in a dry, ventilated spot, with a bypass switch.")
    + howBlock(`kVA = kW ÷ PF × margin\n   = ${v.kw} ÷ ${pf} × ${m} ${v.motor?"(25% + 10% for motor starting)":"(25%)"} = ${fmt(raw,2)} → ${too?"too big for 1-phase":kva+" kVA standard size"}\nLowest voltage ${minv??"—"} V → ${wide?"needs wide input range":"standard range OK"}`);
  }
},
cable: {
  form(){ return `<div class="block"><div class="grid2">${F.seg("ph","Supply",[["1","1-phase 230 V"],["3","3-phase 415 V"]],"1")}${F.seg("mat","Conductor",[["cu","Copper"],["al","Aluminium"]],"cu")}
    ${F.n("kw","Load (kW)",7.2)}${F.n("len","Cable length, one way (m)",25)}
    ${F.sel("pf","Power factor",[["1","1.0 (heaters, EV)"],["0.9","0.9"],["0.8","0.8 (motors, ACs)"]],"1")}${F.sel("vd","Max voltage drop",[["3","3% (lights, sensitive)"],["5","5% (power)"]],"3")}</div></div>`; },
  calc(v){
    if (!v.kw || !v.len) return res("Cable size", "—", "", [], "Enter load and length.");
    const ph = v.ph === "3" ? 3 : 1, pf = Number(v.pf)||1, V = ph===1?230:415;
    const I = ph===1 ? v.kw*1000/(230*pf) : v.kw*1000/(1.732*415*pf);
    const CU = [[1.5,13,14.5],[2.5,18,8.87],[4,24,5.52],[6,31,3.69],[10,42,2.19],[16,56,1.38],[25,73,0.87],[35,89,0.627],[50,108,0.463],[70,136,0.321],[95,164,0.231],[120,188,0.183],[150,216,0.149],[185,245,0.119],[240,286,0.0907]];
    const AL = [[16,43,2.26],[25,57,1.43],[35,70,1.03],[50,84,0.76],[70,107,0.526],[95,129,0.379],[120,149,0.3],[150,170,0.244],[185,194,0.195],[240,227,0.149]];
    const T = v.mat === "al" ? AL : CU;
    const MCB = [6,10,16,20,25,32,40,50,63,80,100,125,160,200,250,315,400];
    const drop = (r) => (ph===1 ? 2*v.len*I*r[2]/1000 : 1.732*v.len*I*r[2]/1000);
    let pick = null, brk = null;
    for (const r of T){ const d = drop(r)/V*100; const b = MCB.find(x => x >= I*1.1); if (r[1] >= I && d <= Number(v.vd) && b && b <= r[1]*1.05){ pick = r; brk = b; break; } }
    if (!pick) return res("Cable size", "Too big", "", [["Current", fmt(I,1)+" A"]], "Beyond this table: ask the cable maker for a multi-run or HT solution.");
    const d = drop(pick), dp = d/V*100;
    const cores = ph===1 ? "2-core (or 2 single wires) + earth" : "4-core (3P+N) + earth";
    const tbl = T.slice(0, Math.min(T.length, T.indexOf(pick)+2)).map(r => `${String(r[0]).padStart(5)} sq mm: rated ${String(r[1]).padStart(3)} A, drop ${fmt(drop(r)/V*100,2)}%`).join("\n");
    return res("Recommended "+(v.mat==="al"?"aluminium":"copper"), pick[0], "sq mm", [
      ["Current", fmt(I,1)+" A"], ["Cable rating", pick[1]+" A (approx.)"],
      ["Voltage drop", fmt(d,1)+" V ("+fmt(dp,2)+"%)"], ["MCB / breaker", brk+" A, "+(ph===1?"DP":"4P")],
      ["Cores", cores], ["Earth wire", pick[0] <= 16 ? "same size as phase" : "half size (min 16)"]
    ], "Ratings are typical for PVC cable in conduit at ~40°C. Bunched cables, heat or underground runs need derating: confirm with the maker's table.")
    + howBlock(`Current I = ${ph===1?"W ÷ (230 × PF)":"W ÷ (1.732 × 415 × PF)"} = ${fmt(I,2)} A\nDrop = ${ph===1?"2":"1.732"} × length × I × resistance(ohm/km) ÷ 1000\nPick the smallest size where rating ≥ current and drop ≤ ${v.vd}%:\n${tbl}`);
  }
},
solar: {
  form(){ return `<div class="block"><div class="grid2">${F.n("units","Average monthly units (kWh)",1200)}${F.n("tariff","Tariff ₹ per unit",8)}
    ${F.n("roof","Shadow-free roof (sq ft)",1200)}${F.sel("st","State",[["dl","Delhi"],["hr","Haryana"],["up","Uttar Pradesh"]],"hr")}
    ${F.seg("res","Property",[["1","Residential"],["0","Commercial"]],"1")}${F.seg("type","System",[["og","On-grid"],["hy","Hybrid"]],"og")}
    ${F.n("rate","Your price ₹ per kW (optional)","",'placeholder="auto by size"')}${F.n("batt","Battery add-on ₹ (hybrid)",65000)}</div></div>`; },
  calc(v){
    if (!v.units) return res("Solar size", "—", "", [], "Enter monthly units from the bill.");
    let kw = Math.round(v.units/120*2)/2; const need = kw*90; let capped = false;
    if (v.roof && v.roof < need){ kw = Math.max(1, Math.floor(v.roof/90*2)/2); capped = true; }
    const auto = kw<=5?63500:kw<=10?52500:kw<=20?47500:42500;
    const rate = v.rate || auto;
    let gross = kw*rate + (v.type==="hy" ? (v.batt||0) : 0);
    const resd = v.res === "1";
    const central = resd ? Math.min(kw,2)*30000 + (kw>2 ? Math.min(kw-2,1)*18000 : 0) : 0;
    const state = resd && v.st === "dl" ? Math.min(central, 78000) : 0;
    const net = gross - central - state;
    const gen = kw*120*12, save = gen*(v.tariff||0);
    const pay = save ? net/save : null;
    const panels = Math.ceil(kw*1000/550);
    return res("Recommended system", fmt(kw,1), "kW", [
      ["Panels (550 W)", panels], ["Roof needed", fmt(kw*90,0)+" sq ft"],
      ["Units / year", fmt(gen,0)], ["Savings / year", inrS(save)],
      ["System cost", inrS(gross)], ["Subsidy", resd ? inrS(central+state) : "Not for commercial"],
      ["Net cost", inrS(net)], ["Payback", pay ? fmt(pay,1)+" years" : "—"]
    ], (capped ? "<b>Roof-limited:</b> the bill supports "+fmt(Math.round(v.units/120*2)/2,1)+" kW but the roof fits about "+fmt(kw,1)+" kW. " : "") + (resd ? "Subsidy: central PM Surya Ghar (₹30k/kW for first 2 kW, ₹18k for 3rd kW, max ₹78k)" + (v.st==="dl"?" + Delhi state subsidy, modelled as matching the central amount (up to ₹78k; confirm on the Delhi portal).":". Haryana and UP: no state top-up assumed.") + " Subsidised home solar must be installed by a PM Surya Ghar empanelled vendor." : "") + " Net metering is capped at the sanctioned load.")
    + howBlock(`kW = monthly units ÷ 120 (NCR average per kW) = ${v.units} ÷ 120 → ${fmt(v.units/120,2)} → ${fmt(kw,1)} kW\nPrice ${inr(rate)}/kW ${v.rate?"(yours)":"(auto: Delhi NCR web rate for this size)"}${v.type==="hy"?" + battery "+inr(v.batt):""}\nYearly units = kW × 120 × 12 = ${fmt(gen,0)}\nPayback = net cost ÷ (units × tariff)`);
  }
},
ev: {
  form(){ return `<div class="block"><div class="grid2">${F.n("bat","Car battery (kWh)",40)}${F.n("ckw","Charger (kW)",7.2)}
    ${F.n("from","Charge from (%)",20)}${F.n("to","Charge to (%)",80)}
    ${F.n("acl","Car's AC limit (kW)",7.2)}${F.seg("ph","Supply",[["1","1-phase"],["3","3-phase"]],"1")}
    ${F.n("sanc","Sanctioned load (kW)",10)}${F.n("peak","House evening load (kW)",5)}</div></div>
    <div class="block"><h3>Running cost vs petrol</h3><div class="grid2">${F.n("km","Km per month",1500)}${F.n("tariff","Home tariff ₹/unit",8)}${F.n("petrol","Petrol ₹/litre",95)}${F.n("mil","Petrol car km/litre",14)}</div></div>`; },
  calc(v){
    if (!v.bat || !v.ckw) return res("Charge time", "—", "", [], "Enter battery and charger size.");
    const eff = Math.min(v.ckw, v.acl || v.ckw);
    const kwh = v.bat*Math.max(0,(v.to||100)-(v.from||0))/100;
    const hrs = kwh/(eff*0.9);
    const ph = v.ph==="3" ? 3 : 1;
    const I = ph===1 ? v.ckw*1000/230 : v.ckw*1000/(1.732*415);
    const wiring = I<=16?["2.5 sq mm Cu","20 A"]:I<=25?["4 sq mm Cu","32 A"]:I<=32?["6 sq mm Cu","40 A"]:["10 sq mm Cu","63 A"];
    const total = (v.peak||0) + v.ckw; const over = v.sanc && total > v.sanc;
    const evCost = (v.km||0)*0.15/0.9*(v.tariff||0), pCost = (v.km && v.mil) ? v.km/v.mil*(v.petrol||0) : 0;
    const h = Math.floor(hrs), mm = Math.round((hrs-h)*60);
    return res("Charge time "+(v.from||0)+"→"+(v.to||100)+"%", h+"h "+mm+"m", "", [
      ["Energy added", fmt(kwh,1)+" kWh"], ["Effective rate", fmt(eff,1)+" kW"+(eff<v.ckw?" (car limit)":"")],
      ["Current draw", fmt(I,1)+" A"+(ph===3?" per phase":"")], ["Wiring / MCB", wiring[0]+", "+wiring[1]+(ph===3?" 4P":" DP")],
      ["EV cost / month", inr(evCost)], ["Petrol cost / month", inr(pCost)]
    ], (over ? "<b>Load check:</b> evening load + charger ≈ "+fmt(total,1)+" kW is above the sanctioned "+v.sanc+" kW. Charge at night or apply for load enhancement. " : "Load check OK against sanctioned load. ") + "Use a dedicated circuit with Type B RCD (or Type A + 6 mA DC detection in the charger), Type 2 SPD, and a good earth (under ~5 Ω)." + (pCost ? " Saves about "+inr(pCost-evCost)+" a month vs petrol." : ""))
    + howBlock(`Energy = battery × (to − from)% = ${fmt(kwh,2)} kWh\nTime = energy ÷ (min(charger, car AC limit) × 0.9 efficiency) = ${fmt(hrs,2)} h\nCurrent = ${ph===1?"W ÷ 230":"W ÷ (1.732 × 415)"} = ${fmt(I,1)} A\nEV running cost ≈ km × 0.15 kWh/km ÷ 0.9 × tariff`);
  }
},
vfd: {
  form(){ return `<div class="block"><div class="grid2">${F.n("kw","Motor rating (kW)",22)}${F.n("load","Motor loading today (%)",85)}
    ${F.n("hrs","Hours per day",16)}${F.n("days","Days per year",330)}
    ${F.n("speed","Speed needed with VFD (%)",80)}${F.n("tariff","Tariff ₹ per unit",9)}
    ${F.n("cost","VFD cost incl. install ₹ (optional)","",'placeholder="auto estimate"')}${F.sel("app","Application",[["cf","Centrifugal pump / fan / blower"],["ct","Constant torque (conveyor, mixer)"]],"cf")}</div>
    <p class="small muted" style="margin-top:8px">HP to kW: multiply by 0.746 (a 30 HP motor ≈ 22 kW).</p></div>`; },
  calc(v){
    if (!v.kw) return res("Yearly savings", "—", "", [], "Enter motor details.");
    const base = v.kw*(v.load||85)/100, s = (v.speed||80)/100;
    const after = v.app==="cf" ? base*Math.pow(s,3)/0.97 : base*s/0.97;
    const hy = (v.hrs||0)*(v.days||0);
    const theo = (base-after)*hy, cons = theo*0.7;
    const rs = cons*(v.tariff||0);
    const est = v.cost || Math.round((v.kw<=7.5?5000:v.kw<=22?4200:3500)*v.kw + 15000);
    const pay = rs>0 ? est/rs : null;
    return res("Conservative savings / year", inrS(rs), "", [
      ["Power today", fmt(base,1)+" kW"], ["Power with VFD", fmt(after,1)+" kW"],
      ["Units saved / yr", fmt(cons,0)+" kWh"], ["Saving", fmt((1-after/base)*100,0)+"% (theory)"],
      ["VFD cost", inrS(est)+(v.cost?"":" (est.)")], ["Payback", pay ? (pay<1 ? fmt(pay*12,0)+" months" : fmt(pay,1)+" years") : "—"],
      ["CO₂ avoided / yr", fmt(cons*0.71/1000,1)+" t"], ["Theoretical ₹ / yr", inrS(theo*(v.tariff||0))]
    ], v.app==="cf" ? "Pumps and fans follow the cube law: small speed cuts give big savings. We show 70% of the theoretical figure to stay conservative; confirm on site with a power meter." : "Constant-torque loads save only in proportion to speed. Savings are smaller; the soft start and process control are the main benefits.")
    + howBlock(`Power today = ${v.kw} kW × ${v.load||85}% = ${fmt(base,2)} kW\nWith VFD at ${Math.round(s*100)}% speed: ${v.app==="cf"?"power ∝ speed³":"power ∝ speed"} ÷ 0.97 drive efficiency = ${fmt(after,2)} kW\nHours/yr = ${hy}\nTheoretical units saved = ${fmt(theo,0)}; conservative (×0.7) = ${fmt(cons,0)}\nCO₂ factor ≈ 0.71 kg/kWh (India grid)`);
  }
},
earth: {
  form(){ return `<div class="block">${F.sel("type","Property",[["flat","Builder floor / 2-3 BHK"],["villa","4 BHK / villa"],["farm","Farmhouse"],["office","Office / clinic / showroom"],["factory","Factory / shed"]],"farm")}
    <div class="stack" style="margin-top:12px">${F.chk("lp","Lightning protection needed (open land, tall building)",true)}${F.chk("solar","Solar system",true)}${F.chk("ups","UPS / inverter / server rack",true)}${F.chk("ev","EV charger",false)}${F.chk("dg","DG set",false)}</div>
    <div class="grid2" style="margin-top:12px">${F.n("dbs","Distribution boards (for SPDs)",2)}${F.seg("ph","Supply",[["1","1-phase"],["3","3-phase"]],"3")}</div></div>`; },
  calc(v){
    const base = {flat:2, villa:2, farm:2, office:2, factory:2}[v.type] || 2;
    const list = [["Main electrical earth", base]];
    if (v.lp) list.push(["Lightning arrester earth", v.type==="farm"||v.type==="factory"?2:1]);
    if (v.solar) list.push(["Solar structure + inverter", 1]);
    if (v.ups) list.push(["UPS / IT clean earth", 1]);
    if (v.ev) list.push(["EV charger", 1]);
    if (v.dg) list.push(["DG body + neutral", 2]);
    const pits = list.reduce((a,x) => a+x[1], 0);
    const rp = rowPrice("earthing", "Chemical"), rl = rowPrice("earthing", v.type==="farm"||v.type==="factory" ? "ESE" : "Lightning protection for a house");
    const rs = rowPrice("earthing", v.ph==="3" ? "three phase" : "single phase");
    const cost = pits*priceOf(rp) + (v.lp ? priceOf(rl) : 0) + (v.dbs||0)*priceOf(rs);
    return res("Earth pits needed", pits, "pits", [
      ...list.map(([l,n]) => [l, n+" pit"+(n>1?"s":"")]),
      ["SPDs (Type 2)", (v.dbs||0)+" × "+(v.ph==="3"?"3-ph":"1-ph")], ["Rough budget", inrS(cost)]
    ], "Chemical (maintenance-free) earthing assumed. Lightning earth is kept separate and bonded per IS/IEC 62305. Rocky Aravalli soil (Gwal Pahari, Sohna) may need deeper or extra electrodes. Test and give a resistance report after installation.")
    + howBlock(`Pits: ${list.map(x=>x[0]+" "+x[1]).join(", ")}\nBudget = pits × chemical pit price + lightning set + SPDs (your prices if entered, else market mid-point)`);
  }
},
led: {
  form(){ return `<div class="block"><div class="grid2">${F.n("w","Wall width (ft)",12)}${F.n("h","Wall height (ft)",7)}
    ${F.n("dist","Closest viewer distance (m)",4)}${F.sel("pitch","Pixel pitch",[["1.5","P1.5 indoor"],["2","P2.0 indoor"],["2.5","P2.5 indoor"],["4","P4 indoor"],["6","P6 outdoor"],["10","P10 outdoor"]],"2.5")}</div>
    <div class="btnbar"><button class="btn sm" data-act="ledratio">Make it 16:9</button></div></div>`; },
  calc(v){
    if (!v.w || !v.h) return res("LED wall", "—", "", [], "Enter wall size.");
    const pitch = Number(v.pitch), area = v.w*v.h, m2 = area*0.0929;
    const px = Math.round(v.w*304.8/pitch), py = Math.round(v.h*304.8/pitch);
    const recMax = v.dist ? v.dist*1.0 : null;
    const ok = recMax == null || pitch <= recMax + 0.01;
    const r = rowPrice("ledwall", "P"+v.pitch.toString()+(pitch===2?".0":""));
    const lo = r ? (r.sell || r.low)*area : null, hi = r ? (r.sell || r.high)*area : null;
    const fit = (px >= 3840 && py >= 2160) ? "4K" : (px >= 1920 && py >= 1080) ? "Full HD" : (px >= 1280 && py >= 720) ? "HD" : "below HD";
    return res("Wall area", fmt(area,0), "sq ft", [
      ["Resolution", px+" × "+py+" px"], ["Video quality", fit],
      ["Pitch check", ok ? "Good for "+(v.dist||"—")+" m" : "Too coarse for "+v.dist+" m"], ["Suggested pitch", recMax ? "P"+fmt(Math.max(1.2, Math.min(10, recMax*0.6)),1)+"–P"+fmt(Math.min(10,recMax),1) : "—"],
      ["Budget", lo ? (r.sell ? inrS(lo) : inrS(lo)+"–"+inrS(hi)) : "—"], ["Power (avg / max)", fmt(m2*120/1000,1)+" / "+fmt(m2*(pitch>=6?700:350)/1000,1)+" kW"]
    ], "Rule of thumb: closest viewing distance in metres ≈ 1-2 × pitch in mm. Budget uses the per-sq-ft price list (includes controller and installation; GST extra).")
    + howBlock(`Pixels across = width ft × 304.8 ÷ pitch mm = ${px}\nPixels down = height ft × 304.8 ÷ pitch = ${py}\nArea = ${fmt(area,0)} sq ft (${fmt(m2,1)} m²)\nPower: avg ≈ 120 W/m², max ≈ ${pitch>=6?700:350} W/m²`);
  }
},
margin: {
  form(){ return `<div class="block"><div class="grid2">${F.n("cost","Your cost ₹ (before GST)",40000)}${F.seg("mode","Set by",[["mk","Markup %"],["mg","Margin %"]],"mk")}
    ${F.n("pct","Percent",20)}${F.sel("gst","GST",[["18","18%"],["12","12%"],["5","5%"],["28","28%"],["0","0%"]],"18")}
    ${F.n("qty","Quantity",1)}${F.n("disc","Discount to client (%)",0)}</div></div>`; },
  calc(v){
    if (!v.cost) return res("Selling price", "—", "", [], "Enter your cost.");
    let sell = v.mode==="mg" ? v.cost/(1-Math.min(95,(v.pct||0))/100) : v.cost*(1+(v.pct||0)/100);
    sell = sell*(1-(v.disc||0)/100);
    const g = Number(v.gst)||0, q = v.qty||1;
    const prof = (sell - v.cost)*q;
    return res("Selling price per unit (before GST)", inr(sell), "", [
      ["GST "+g+"%", inr(sell*g/100)], ["Price incl. GST", inr(sell*(1+g/100))],
      ["Margin", fmt((sell-v.cost)/sell*100,1)+"%"], ["Markup", fmt((sell-v.cost)/v.cost*100,1)+"%"],
      ["Order value (×"+q+")", inrS(sell*q*(1+g/100))], ["Your profit", inrS(prof)]
    ], prof < 0 ? "<b>Below cost.</b> Reduce the discount." : "GST is collected from the client and paid to the government; your profit is the margin before GST.")
    + howBlock(`${v.mode==="mg"?"Sell = cost ÷ (1 − margin%)":"Sell = cost × (1 + markup%)"}, then less discount\nMargin = (sell − cost) ÷ sell; Markup = (sell − cost) ÷ cost`);
  }
},
convert: {
  form(){ return `<div class="block"><h3>Motor power</h3><div class="grid2">${F.n("hp","HP",10)}<div class="field"><span class="lbl">kW</span><div class="inp mono" id="o-hp" style="display:flex;align-items:center"></div></div></div></div>
    <div class="block"><h3>kW, kVA and amps</h3><div class="grid2">${F.n("kw","kW",10)}${F.sel("pf","Power factor",["1","0.95","0.9","0.85","0.8","0.7"],"0.8")}${F.seg("ph","Supply",[["1","1-ph 230 V"],["3","3-ph 415 V"]],"3")}</div></div>
    <div class="block"><h3>Amps to kW</h3><div class="grid2">${F.n("amp","Amps",32)}${F.seg("ph2","Supply",[["1","1-ph"],["3","3-ph"]],"1")}</div></div>`; },
  calc(v){
    const hpkw = (v.hp||0)*0.746; const o = $("#o-hp"); if (o) o.textContent = fmt(hpkw,2) + " kW";
    const pf = Number(v.pf)||0.8;
    const I = v.ph==="1" ? (v.kw||0)*1000/(230*pf) : (v.kw||0)*1000/(1.732*415*pf);
    const kwa = v.ph2==="1" ? (v.amp||0)*230*pf/1000 : (v.amp||0)*1.732*415*pf/1000;
    return res(fmt(v.hp,1)+" HP", fmt(hpkw,2), "kW", [
      [fmt(v.kw,1)+" kW at PF "+pf, fmt((v.kw||0)/pf,2)+" kVA"], ["Current", fmt(I,1)+" A"+(v.ph==="3"?" per phase":"")],
      [fmt(v.amp,0)+" A ("+(v.ph2==="1"?"1-ph":"3-ph")+")", fmt(kwa,2)+" kW at PF "+pf], ["1 kW", "1.34 HP"]
    ], "");
  }
}
};
function vCalc(id){
  const c = CALCS.find(x => x.id === id); if (!c) return `<div class="empty"><b>Calculator not found</b></div>`;
  setHeader("Calculator", c.name, "#tools");
  const prod = P.find(p => p.calc === id);
  return `<form id="calcform" data-calc="${id}" onsubmit="return false">${CALC[id].form()}</form><div id="calcout"></div>
    ${prod ? `<div class="btnbar"><a class="btn" href="#p-${prod.id}">${svg(prod.icon)} ${esc(prod.name)}</a><a class="btn" href="#quote">${svg("quote")} Make a quote</a></div>` : ""}`;
}
function runCalc(){ const f = $("#calcform"); if (!f) return; const id = f.dataset.calc; $("#calcout").innerHTML = CALC[id].calc(readForm(f)); }

/* ---------- SELL ---------- */
const LSTAGES = ["New","Contacted","Meeting","Quote sent","Won","Lost"];
const stCls = s => s==="Won"?"good":s==="Lost"?"bad":s==="Quote sent"?"warn":"";
function vSell(){
  setHeader("Pipeline, quotes, surveys", "Sell");
  const leads = Object.values(Store.data.leads);
  const open = leads.filter(l => !["Won","Lost"].includes(l.stage));
  const due = open.filter(l => l.next && l.next <= today()).sort((a,b)=>a.next.localeCompare(b.next));
  const quotes = Object.values(Store.data.quotes).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  let html = `<div class="stat"><div><b>${open.length}</b><span>Open leads</span></div><div><b style="color:${due.length?"var(--copper)":"inherit"}">${due.length}</b><span>Follow-ups due</span></div><div><b>${quotes.length}</b><span>Quotes</span></div></div>
    <div class="btnbar"><a class="btn pri" href="#lead-new">${svg("plus")} New lead</a><a class="btn" href="#quote" data-act="newquote">${svg("quote")} New quote</a><a class="btn" href="#survey" data-act="newsurvey">${svg("clip")} Site survey</a></div>
    <div class="list" style="margin-top:12px">${[["#leads","users","Leads",open.length+" open"],["#orders","bag","Orders & payments",inrS(Object.values(Store.data.orders).reduce((s,o)=>s+orderTotals(o).bal,0))+" to collect"],["#partners","users","Referral partners",Object.keys(Store.data.partners).length+" partners"],["#quotes","quote","Quotes",quotes.length+" saved"]].map(([h,i,l,s])=>`<a class="li" href="${h}">${svg(i)}<span class="grow"><b>${l}</b><span>${s}</span></span>${svg("chev")}</a>`).join("")}</div>`;
  html += `<div class="sec-h"><h3>Reasons to call this season</h3><span class="eyebrow">Nov 2026</span></div><div class="list">${(window.DRIVERS||[]).map(d => `<details class="li" style="display:block"><summary style="cursor:pointer;list-style:none"><b style="font-size:14.5px">${esc(d.t)}</b><br><span class="small muted">${esc(d.who)}</span></summary><p class="small" style="margin-top:6px">${esc(d.d)}</p></details>`).join("")}</div>`;
  html += `<div class="sec-h"><h3>Follow up today</h3><a class="small" href="#leads">All leads</a></div>`;
  html += due.length ? `<div class="list">${due.map(leadLi).join("")}</div>` : `<div class="empty"><b>Nothing due</b>Leads with a follow-up date of today or earlier show here.</div>`;
  html += `<div class="sec-h"><h3>Meeting prep</h3></div><div class="list">${PB.map(b => `<a class="li" href="#prep-${b.id}">${svg("users")}<span class="grow"><b>${esc(b.name)}</b><span>${esc(b.cares)}</span></span>${svg("chev")}</a>`).join("")}</div>`;
  html += `<div class="sec-h"><h3>Recent quotes</h3>${quotes.length?`<a class="small" href="#quotes">All quotes</a>`:""}</div>`;
  html += quotes.length ? `<div class="list">${quotes.slice(0,4).map(quoteLi).join("")}</div>` : `<div class="empty"><b>No quotes yet</b>Build one from your price list and send it on WhatsApp.</div>`;
  const svs = Object.values(Store.data.surveys).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  html += `<div class="sec-h"><h3>Site surveys</h3></div>` + (svs.length ? `<div class="list">${svs.slice(0,6).map(s => `<a class="li" href="#survey-${s.id}">${svg("clip")}<span class="grow"><b>${esc(s.client||"Untitled")}</b><span>${esc((SV[s.tpl]||{}).name||"")} · ${niceDate(s.date)}</span></span>${svg("chev")}</a>`).join("")}</div>` : `<div class="empty"><b>No surveys yet</b>Use a checklist at the client site so you never miss a reading.</div>`);
  return html;
}
function leadLi(l){
  const late = l.next && l.next < today() && !["Won","Lost"].includes(l.stage);
  return `<a class="li" href="#lead-${l.id}"><span class="ico" style="width:38px;height:38px">${svg("users")}</span><span class="grow"><b>${esc(l.name||"Unnamed")}${l.company?" · "+esc(l.company):""}</b>
    <span>${esc((PB.find(b=>b.id===l.type)||{}).name||"")}${l.area?" · "+esc(l.area):""}${l.next?" · follow up "+niceDate(l.next):""}</span></span>
    <span class="pill ${late?"bad":stCls(l.stage)}">${late?"Overdue":esc(l.stage||"New")}</span></a>`;
}
function quoteLi(q){
  const t = quoteTotals(q);
  return `<a class="li" href="#quote-${q.id}">${svg("quote")}<span class="grow"><b>${esc(q.no)} · ${esc(q.client||"Client")}</b><span>${niceDate(q.date)} · ${q.lines.length} item${q.lines.length===1?"":"s"}</span></span><span class="mono small">${inrS(t.grand)}</span></a>`;
}
function vLeads(){
  setHeader("Sell", "Leads", "#sell");
  const all = Object.values(Store.data.leads);
  const f = ui.leadFilter;
  const list = all.filter(l => f==="all" ? true : f==="open" ? !["Won","Lost"].includes(l.stage) : l.stage===f)
    .sort((a,b) => (a.next||"9999").localeCompare(b.next||"9999"));
  let html = `<div class="chips">${[["open","Open"],["all","All"],...LSTAGES.map(s=>[s,s])].map(([v,l]) => `<button class="chip ${f===v?"on":""}" data-act="lfilter" data-v="${v}">${l} <span class="mono">${v==="all"?all.length:v==="open"?all.filter(x=>!["Won","Lost"].includes(x.stage)).length:all.filter(x=>x.stage===v).length}</span></button>`).join("")}</div>
    <div class="btnbar" style="margin:10px 0 12px"><a class="btn pri" href="#lead-new">${svg("plus")} New lead</a></div>`;
  html += list.length ? `<div class="list">${list.map(leadLi).join("")}</div>` : `<div class="empty"><b>No leads here</b>Add the builders, designers and plant heads you meet. Set a follow-up date and they'll show on the Sell page when due.</div>`;
  return html;
}
function vLead(id){
  let l;
  if (id === "new"){ l = ui.newLead || {id:"", stage:"New", products:[], type:"builder"}; setHeader("Leads", "New lead", "#leads"); }
  else { l = Store.data.leads[id]; if (!l) return `<div class="empty"><b>Lead not found</b></div>`; setHeader("Lead", l.name || "Lead", "#leads"); }
  const prods = l.products || [];
  let html = `<form id="leadform" data-id="${esc(l.id||"")}" onsubmit="return false"><div class="block stack">
    <div class="grid2">${txt("name","Name",l.name)}${txt("company","Company / firm",l.company)}${txt("phone","Phone",l.phone,'inputmode="tel"')}${txt("area","Area / site",l.area)}</div>
    ${F.sel("type","Customer type",PB.map(b=>[b.id,b.name]).concat([["other","Other"]]),l.type||"builder")}
    <div class="field"><span class="lbl">Interested in</span><div class="chips" style="flex-wrap:wrap;overflow:visible;padding-top:2px">${P.map(p=>`<button type="button" class="chip ${prods.includes(p.id)?"sel":""}" data-act="leadprod" data-v="${p.id}">${esc(p.name.split("(")[0].trim())}</button>`).join("")}</div></div>
    <div class="grid2">${F.sel("stage","Stage",LSTAGES,l.stage||"New")}${txt("value","Likely value ₹",l.value,'inputmode="decimal"')}
    <div class="field"><label for="f-next">Next follow-up</label><input class="inp" type="date" id="f-next" name="next" value="${esc(l.next||"")}"></div>
    <div class="field"><label for="f-nextTime">Time (optional)</label><input class="inp" type="time" id="f-nextTime" name="nextTime" value="${esc(l.nextTime||"")}"></div>
    <div class="field"><label for="f-visit">Site visit date</label><input class="inp" type="date" id="f-visit" name="visit" value="${esc(l.visit||"")}"></div>
    <div class="field"><label for="f-visitTime">Visit time</label><input class="inp" type="time" id="f-visitTime" name="visitTime" value="${esc(l.visitTime||"")}"></div>
    <div class="field"><label for="f-partner">Referred by (partner)</label><select class="inp" id="f-partner" name="partner"><option value="">None</option>${Object.values(Store.data.partners).map(p=>`<option value="${p.id}" ${l.partner===p.id?"selected":""}>${esc(p.name)}</option>`).join("")}</select></div>
    ${txt("source","Or referred by (name)",l.source)}</div>
    <div class="field"><label for="f-notes">Notes</label><textarea class="inp" id="f-notes" name="notes" placeholder="What they need, who decides, budget, next step…">${esc(l.notes||"")}</textarea></div>
    </div></form>
    <div class="btnbar"><button class="btn pri" data-act="savelead">${svg("check")} Save lead</button>
    ${l.id ? `<button class="btn" data-act="logfor" data-id="${l.id}">${svg("check")} Log meeting</button><a class="btn" href="#quote" data-act="quotefor" data-id="${l.id}">${svg("quote")} Quote</a><a class="btn" href="#survey" data-act="surveyfor" data-id="${l.id}">${svg("clip")} Survey</a>` : ""}
    ${l.phone ? `<a class="btn" href="${waLink(l.phone,"Hello "+(l.name||"")+", this is from Maya Traders.")}" target="_blank" rel="noopener">${svg("wa")} WhatsApp</a>` : ""}</div>
    ${l.id && !G.on() && (l.next || l.visit) ? `<div class="btnbar">${l.next ? `<a class="btn sm" target="_blank" rel="noopener" href="${gcalLink("Follow up: " + l.name, l.next, l.nextTime, l.phone || "")}">Add follow-up to Calendar</a>` : ""}${l.visit ? `<a class="btn sm" target="_blank" rel="noopener" href="${gcalLink("Site visit: " + l.name + (l.area ? ", " + l.area : ""), l.visit, l.visitTime, l.phone || "")}">Add visit to Calendar</a>` : ""}</div>` : ""}
    ${l.id && G.on() && (l.next || l.visit) ? `<p class="small muted" style="margin-top:8px">${l.gDirty ? "Waiting to sync to Google Calendar." : "In your Google Calendar."}</p>` : ""}
    ${l.phone ? `<p class="small muted" style="margin-top:8px">Phone: <a class="mono" href="tel:${esc(l.phone.replace(/[^\d+]/g,""))}">${esc(l.phone)}</a> <button class="btn sm ghost" data-act="copy" data-text="${esc(l.phone)}">Copy</button></p>` : ""}
    ${l.id ? `<div class="btnbar"><button class="btn sm ghost danger" data-act="dellead" data-id="${l.id}">${ui.del==="lead-"+l.id?"Tap again to delete":"Delete lead"}</button></div>` : ""}
    ${l.type && PB.find(b=>b.id===l.type) ? `<div class="sec-h"><h3>Prep for this meeting</h3></div><a class="li list" href="#prep-${l.type}" style="border:1px solid var(--line);border-radius:12px">${svg("users")}<span class="grow"><b>${esc(PB.find(b=>b.id===l.type).name)} playbook</b><span>Opening line, questions, what to pitch</span></span>${svg("chev")}</a>` : ""}`;
  ui.leadDraftProducts = prods.slice();
  return html;
}
const txt = (n, label, val, extra="") => `<div class="field"><label for="f-${n}">${label}</label><input class="inp" id="f-${n}" name="${n}" value="${esc(val??"")}" ${extra}></div>`;
function saveLead(){
  const f = $("#leadform"); if (!f) return;
  const v = {}; $$("input,select,textarea", f).forEach(el => { if (el.name) v[el.name] = el.value; });
  if (!v.name.trim()){ toast("Add a name first"); $("#f-name").focus(); return; }
  const id = f.dataset.id || uid();
  const old = Store.data.leads[id] || {created: today()};
  Store.data.leads[id] = {...old, ...v, id, value: num(v.value), products: ui.leadDraftProducts || [], updated: today(), gDirty: true};
  ui.newLead = null;
  Store.saveItem("leads", id); G.soon(); toast("Lead saved");
  location.hash = "#lead-" + id; if (f.dataset.id) rerender();
}
function vPrep(id){
  const b = PB.find(x => x.id === id); if (!b) return `<div class="empty"><b>Playbook not found</b></div>`;
  setHeader("Meeting prep", b.name, "#sell");
  return `<div class="block"><h3>What they care about</h3><p>${esc(b.cares)}</p></div>
  <div class="block"><h3>Opening line</h3><div class="say">${esc(b.open)}<button class="icon-btn cp" data-act="copy" data-text="${esc(b.open)}" aria-label="Copy">${svg("copy")}</button></div></div>
  <div class="block"><h3>Ask</h3><ol class="steps">${b.ask.map(a=>`<li><span>${esc(a)}</span></li>`).join("")}</ol></div>
  <div class="block"><h3>What to pitch</h3><div class="plist" style="border:0">${b.sells.map(pid => { const p = byId[pid]; return `<a class="pitem" href="#p-${pid}" style="padding-inline:0"><span class="ico">${svg(p.icon)}</span><span style="min-width:0"><span class="nm">${esc(p.name)}</span><br><span class="tg">${esc(p.pitch[0])}</span></span>${svg("chev")}</a>`; }).join("")}</div></div>
  <div class="block"><h3>How to win them</h3><p>${esc(b.win)}</p></div>
  <div class="block"><h3>Carry to every meeting</h3><ul class="bul"><li>Visiting cards and the Chemotech company profile (PDF on your phone)</li><li>Multimeter and clamp meter (voltage, current, N-E check)</li><li>Measuring tape and phone camera for the site</li><li>This app: calculators and your price book</li><li>Brand catalogues or datasheets for what you'll pitch</li></ul></div>
  <div class="btnbar"><a class="btn pri" href="#lead-new" data-act="newleadtype" data-v="${b.id}">${svg("plus")} Add lead of this type</a></div>`;
}

/* ---------- QUOTES ---------- */
function fy(){ const d = new Date(), y = d.getFullYear() % 100, m = d.getMonth(); return m >= 3 ? `${y}-${y+1}` : `${y-1}-${y}`; }
function newQuote(lead){
  const n = Object.keys(Store.data.quotes).length + 1;
  return {id:"", no:`MT/${fy()}/${String(n).padStart(3,"0")}`, date: today(), client: lead ? (lead.company || lead.name || "") : "", contact: lead ? lead.name||"" : "", phone: lead ? lead.phone||"" : "", lead: lead ? lead.id : "",
    place:"intra", lines:[], terms:"Prices valid for 7 days (cable prices change with copper).\nPayment: 50% advance with order, balance before dispatch.\nDelivery: 3-7 working days from order.\nWarranty: as per manufacturer."};
}
function quoteTotals(q){
  let sub = 0, gst = 0;
  for (const l of q.lines){ const a = (num(l.qty)||0)*(num(l.rate)||0); sub += a; gst += a*(num(l.gst)||0)/100; }
  return {sub, gst, grand: sub+gst};
}
function vQuotes(){
  setHeader("Sell", "All quotes", "#sell");
  const qs = Object.values(Store.data.quotes).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  return `<div class="btnbar" style="margin-bottom:12px"><a class="btn pri" href="#quote" data-act="newquote">${svg("plus")} New quote</a></div>` + (qs.length ? `<div class="list">${qs.map(quoteLi).join("")}</div>` : `<div class="empty"><b>No quotes yet</b></div>`);
}
function vQuote(id){
  if (id){ const s = Store.data.quotes[id]; if (!s) return `<div class="empty"><b>Quote not found</b></div>`; if (!ui.quote || ui.quote.id !== id) ui.quote = JSON.parse(JSON.stringify(s)); }
  else if (!ui.quote || ui.quote.id) ui.quote = newQuote();
  const q = ui.quote;
  setHeader("Quotation", q.no, id ? "#quotes" : "#sell");
  const opts = P.map(p => `<optgroup label="${esc(p.name)}">${peekRows(p).map((r,i)=>`<option value="${p.id}|${i}">${esc(r.item)}${r.sell?" · "+inr(r.sell):""}</option>`).join("")}</optgroup>`).join("");
  return `<div class="block stack"><div class="grid2">${qtxt("client","Client / company",q.client)}${qtxt("contact","Contact person",q.contact)}${qtxt("phone","WhatsApp number",q.phone,'inputmode="tel"')}
    <div class="field"><label for="q-date">Date</label><input class="inp" type="date" id="q-date" data-in="q" data-f="date" value="${esc(q.date)}"></div></div>
    ${F.seg("qplace","Client is in",[["intra","Same state (CGST+SGST)"],["inter","Other state (IGST)"]],q.place).replace(/name="qplace"/g,'name="qplace" data-in="qplace"')}</div>
    <div class="block"><h3>Items</h3><div id="qlines">${qLines(q)}</div>
    <div class="field" style="margin-top:10px"><label for="q-add">Add from your price list</label><select class="inp" id="q-add" data-in="qadd"><option value="">Choose an item…</option>${opts}</select></div>
    <div class="btnbar"><button class="btn sm" data-act="qcustom">${svg("plus")} Custom line</button></div>
    <div id="qtot">${qTotals(q)}</div></div>
    <div class="block"><h3>Terms</h3><textarea class="inp" data-in="q" data-f="terms" rows="4">${esc(q.terms)}</textarea></div>
    <div class="block"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Message preview</h3><span class="small muted">sent as text</span></div><div class="preview" id="qprev" style="margin-top:8px">${esc(quoteText(q))}</div>
    <div class="btnbar"><button class="btn pri" data-act="savequote">${svg("check")} Save quote</button><button class="btn" data-act="qpdf">${svg("quote")} PDF</button>${G.on() ? `<button class="btn" data-act="qdrive">Save PDF to Drive</button>` : ""}<button class="btn" data-act="copyquote">${svg("copy")} Copy</button>
    <a class="btn" id="qwa" href="${waLink(q.phone, quoteText(q))}" target="_blank" rel="noopener">${svg("wa")} WhatsApp</a></div>
    <div id="qpdf">${pdfLinkHtml(q)}</div>
    <p class="small muted" style="margin-top:8px">WhatsApp opens with the message ready; check it before sending. PDF makes a quotation on your letterhead to send as a file${G.on() ? "; Save PDF to Drive also adds a view link to the message" : ""}.</p></div>
    ${q.id ? `<div class="btnbar">${q.won && Store.data.orders[q.won] ? `<a class="btn" href="#order-${q.won}">${svg("bag")} View order</a>` : `<button class="btn pri" data-act="quotewon">${svg("check")} Won: create order</button>`}</div>` : ""}
    ${q.id ? `<div class="btnbar"><button class="btn sm ghost" data-act="dupquote">Duplicate as new</button><button class="btn sm ghost danger" data-act="delquote" data-id="${q.id}">${ui.del==="q-"+q.id?"Tap again to delete":"Delete quote"}</button></div>` : ""}`;
}
const qtxt = (f, label, val, extra="") => `<div class="field"><label for="q-${f}">${label}</label><input class="inp" id="q-${f}" data-in="q" data-f="${f}" value="${esc(val??"")}" ${extra}></div>`;
function qLines(q){
  if (!q.lines.length) return `<div class="empty" style="padding:14px"><b>No items yet</b>Pick from your price list below, or add a custom line.</div>`;
  return q.lines.map((l,i) => `<div class="qline"><input class="inp" data-in="ql" data-i="${i}" data-f="desc" value="${esc(l.desc)}" aria-label="Description">
    <div class="nums"><div class="field"><label>Qty</label><input class="inp" inputmode="decimal" data-in="ql" data-i="${i}" data-f="qty" value="${l.qty??""}"></div>
    <div class="field"><label>Rate ₹ ${l.hint?`<span class="muted">(mkt ${esc(l.hint)})</span>`:""}</label><input class="inp" inputmode="decimal" data-in="ql" data-i="${i}" data-f="rate" value="${l.rate??""}" placeholder="enter rate"></div>
    <div class="field"><label>GST %</label><input class="inp" inputmode="decimal" data-in="ql" data-i="${i}" data-f="gst" value="${l.gst??18}"></div>
    <button class="icon-btn" data-act="qdel" data-i="${i}" aria-label="Remove line">${svg("x")}</button></div></div>`).join("");
}
function qTotals(q){
  const t = quoteTotals(q);
  const g = q.place === "inter" ? `<span>IGST</span><span class="num">${inr(t.gst)}</span>` : `<span>CGST</span><span class="num">${inr(t.gst/2)}</span><span>SGST</span><span class="num">${inr(t.gst/2)}</span>`;
  return `<div class="hr"></div><div class="totals"><span>Subtotal</span><span class="num">${inr(t.sub)}</span>${g}<span class="grand">Total</span><span class="num grand">${inr(t.grand)}</span></div>`;
}
function quoteText(q){
  const s = Store.data.settings || {}, t = quoteTotals(q);
  let x = `*QUOTATION ${q.no}*\n${s.firm || "Maya Traders"}${s.address?"\n"+s.address:""}${s.gstin?"\nGSTIN: "+s.gstin:""}\nDate: ${niceDate(q.date)} ${q.date ? q.date.slice(0,4) : ""}\n\nTo: ${q.client || "—"}${q.contact && q.contact!==q.client ? " (Attn: "+q.contact+")" : ""}\n\n`;
  q.lines.forEach((l,i) => { const a = (num(l.qty)||0)*(num(l.rate)||0); x += `${i+1}. ${l.desc}\n   ${fmt(num(l.qty)||0,2)} × ${inr(num(l.rate))} = ${inr(a)} + GST ${num(l.gst)??0}%\n`; });
  if (q.pdfLink) x += `\nPDF: ${q.pdfLink}\n`;
  x += `\nSubtotal: ${inr(t.sub)}\n` + (q.place==="inter" ? `IGST: ${inr(t.gst)}\n` : `CGST: ${inr(t.gst/2)}\nSGST: ${inr(t.gst/2)}\n`) + `*Total: ${inr(t.grand)}*\n\n${q.terms||""}\n\n${s.name ? s.name+"\n" : ""}${s.phone ? s.phone+"\n" : ""}${s.email||""}`;
  return x.trim();
}
function refreshQuote(full){
  const q = ui.quote; if (!q) return;
  if (full){ const el = $("#qlines"); if (el) el.innerHTML = qLines(q); }
  const t = $("#qtot"); if (t) t.innerHTML = qTotals(q);
  const pv = $("#qprev"); if (pv) pv.textContent = quoteText(q);
  const wa = $("#qwa"); if (wa) wa.href = waLink(q.phone, quoteText(q));
}
function addQuoteLine(pid, i){
  const p = byId[pid], r = peekRows(p)[i]; if (!r) return;
  if (!ui.quote || ui.quote.id === undefined) ui.quote = newQuote();
  ui.quote.lines.push({desc: p.name.split("(")[0].trim() + ": " + r.item, qty: 1, rate: r.sell ?? null, gst: 18, hint: r.low ? inrS(r.low)+"–"+inrS(r.high) : ""});
}

/* ---------- SURVEY ---------- */
function vSurvey(id){
  if (id){ const s = Store.data.surveys[id]; if (!s) return `<div class="empty"><b>Survey not found</b></div>`; if (!ui.survey || ui.survey.id !== id) ui.survey = JSON.parse(JSON.stringify(s)); }
  else if (!ui.survey || ui.survey.id) ui.survey = {id:"", tpl:"general", client:"", lead:"", date: today(), items:{}, notes:""};
  const s = ui.survey, T = SV[s.tpl];
  setHeader("Site survey", s.client || T.name, "#sell");
  const leads = Object.values(Store.data.leads);
  return `<div class="chips">${Object.entries(SV).map(([k,t]) => `<button class="chip ${s.tpl===k?"on":""}" data-act="svtpl" data-v="${k}">${esc(t.name.replace(" survey",""))}</button>`).join("")}</div>
  <div class="block stack" style="margin-top:10px"><div class="grid2"><div class="field"><label for="sv-client">Client / site</label><input class="inp" id="sv-client" data-in="sv" data-f="client" value="${esc(s.client)}"></div>
  <div class="field"><label for="sv-date">Date</label><input class="inp" type="date" id="sv-date" data-in="sv" data-f="date" value="${esc(s.date)}"></div></div>
  ${leads.length ? `<div class="field"><label for="sv-lead">Link to lead</label><select class="inp" id="sv-lead" data-in="sv" data-f="lead"><option value="">None</option>${leads.map(l=>`<option value="${l.id}" ${s.lead===l.id?"selected":""}>${esc(l.name)}${l.company?" · "+esc(l.company):""}</option>`).join("")}</select></div>` : ""}</div>
  <div class="block"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${esc(T.name)}</h3><span class="small muted mono" id="svcount">${T.items.filter((_, i) => (s.items[s.tpl+i]||{}).ok).length}/${T.items.length}</span></div>
  ${T.items.map((it, i) => { const k = s.tpl + i, v = s.items[k] || {}; return `<div class="check"><input type="checkbox" id="svc-${i}" data-in="svc" data-k="${k}" ${v.ok?"checked":""}><div><label for="svc-${i}">${esc(it)}</label><input class="inp" data-in="svn" data-k="${k}" value="${esc(v.n||"")}" placeholder="Reading / note"></div></div>`; }).join("")}</div>
  <div class="block"><h3>Other notes</h3><textarea class="inp" data-in="sv" data-f="notes" placeholder="Anything else you saw on site…">${esc(s.notes)}</textarea></div>
  <div class="btnbar"><button class="btn pri" data-act="savesurvey">${svg("check")} Save survey</button><button class="btn" data-act="copysurvey">${svg("copy")} Copy as text</button>
  ${s.id ? `<button class="btn ghost danger" data-act="delsurvey" data-id="${s.id}">${ui.del==="s-"+s.id?"Tap again to delete":"Delete"}</button>` : ""}</div>
  <p class="small muted" style="margin-top:8px">Take site photos with your camera, and add the best ones to the product's Photos.</p>`;
}
function surveyText(s){
  const T = SV[s.tpl];
  let x = `SITE SURVEY: ${T.name}\nClient: ${s.client||"—"}\nDate: ${s.date}\n\n`;
  T.items.forEach((it,i) => { const v = s.items[s.tpl+i] || {}; x += `${v.ok?"[x]":"[ ]"} ${it}${v.n?"\n    → "+v.n:""}\n`; });
  if (s.notes) x += `\nNotes: ${s.notes}`;
  return x;
}

const stx = (n, l, v) => `<div class="field"><label for="st-${n}">${l}</label><input class="inp" id="st-${n}" name="${n}" value="${esc(v??"")}"></div>`;

/* ===================== BUSINESS + GOOGLE (extension) ===================== */
const CFG = window.MT_CONFIG || {};
const TZ = "Asia/Kolkata";
for (const k of ["orders","partners","expenses","activities"]) if (!Store.data[k]) Store.data[k] = {};
const S = () => Store.data.settings || (Store.data.settings = {});
const targets = () => Object.assign({meet:5, prop:2, order:1}, S().targets || {});
const addDays = (iso, n) => { const d = new Date(iso + "T00:00:00"); d.setDate(d.getDate() + n); return localISO(d); };
const longDate = d => new Date(d + "T00:00:00").toLocaleDateString("en-IN", {weekday:"long", day:"numeric", month:"long"});
const fmtD = d => d ? new Date(d + "T00:00:00").toLocaleDateString("en-IN", {day:"numeric", month:"short", year:"numeric"}) : "";
function loadScript(src){ return new Promise((res, rej) => { if ($$(`script[src="${src}"]`).length && loadScript.done[src]) return res(); const s = document.createElement("script"); s.src = src; s.onload = () => { loadScript.done[src] = 1; res(); }; s.onerror = rej; document.head.appendChild(s); }); }
loadScript.done = {};

/* ---------- activity ---------- */
const ACT = [["meeting","Meeting"],["visit","Site visit"],["call","Call"],["proposal","Proposal sent"],["order","Order won"]];
const actName = t => (ACT.find(a => a[0] === t) || [t, t])[1];
function logActivity(type, lead, note, date){
  const id = uid();
  Store.data.activities[id] = {id, type, lead: lead || "", note: note || "", date: date || today(), at: new Date().toISOString()};
  Store.saveLocal(); G.soon();
  return id;
}
function weekRange(){ const d = new Date(today() + "T00:00:00"); const w = (d.getDay() + 6) % 7; const s = addDays(today(), -w); return [s, addDays(s, 6)]; }
function weekStats(){
  const [s, e] = weekRange(); const c = {meet:0, prop:0, order:0, call:0};
  for (const a of Object.values(Store.data.activities)) { if (a.date < s || a.date > e) continue;
    if (a.type === "meeting" || a.type === "visit") c.meet++; else if (a.type === "proposal") c.prop++; else if (a.type === "order") c.order++; else if (a.type === "call") c.call++; }
  return c;
}
function bar(label, n, t){ const pct = Math.min(100, t ? n / t * 100 : 0); return `<div><div class="row" style="justify-content:space-between"><span class="small" style="font-weight:600">${label}</span><span class="mono small">${n} / ${t}</span></div><div class="progress" style="margin-top:5px"><i style="width:${pct}%;${n >= t ? "" : "background:var(--copper)"}"></i></div></div>`; }
function vActivity(){
  setHeader("Today", "Activity log", "#today");
  const w = weekStats(), t = targets(), [s, e] = weekRange();
  const list = Object.values(Store.data.activities).sort((a, b) => (b.date + b.at).localeCompare(a.date + a.at)).slice(0, 60);
  const leads = Object.values(Store.data.leads);
  let html = `<div class="block stack"><div class="row" style="justify-content:space-between"><h3 style="margin:0">This week</h3><span class="small muted">${niceDate(s)} – ${niceDate(e)}</span></div>
    ${bar("Meetings & site visits", w.meet, t.meet)}${bar("Proposals sent", w.prop, t.prop)}${bar("Orders won", w.order, t.order)}
    <p class="small muted">Your plan: if meetings are high but orders are low, fix the offer or price; if meetings are low, fix the lead sources. Change targets in Settings.</p></div>
  <form class="block stack" id="actform" onsubmit="return false" style="margin-top:12px"><h3 style="margin:0">Log activity</h3>
    <div class="chips" style="flex-wrap:wrap;overflow:visible;padding:0">${ACT.map(([k, l], i) => `<label class="chip ${i === 0 ? "on" : ""}" style="cursor:pointer"><input type="radio" name="type" value="${k}" ${i === 0 ? "checked" : ""} hidden data-in="actradio">${l}</label>`).join("")}</div>
    <div class="grid2"><div class="field"><label for="a-date">Date</label><input class="inp" type="date" id="a-date" name="date" value="${today()}"></div>
    <div class="field"><label for="a-lead">Lead</label><select class="inp" id="a-lead" name="lead"><option value="">None</option>${leads.map(l => `<option value="${l.id}" ${ui.actLead === l.id ? "selected" : ""}>${esc(l.name)}${l.company ? " · " + esc(l.company) : ""}</option>`).join("")}</select></div></div>
    <div class="field"><label for="a-note">Note</label><input class="inp" id="a-note" name="note" placeholder="What happened, next step"></div>
    <button class="btn pri" data-act="logact">${svg("check")} Log it</button></form>
  <div class="sec-h"><h3>Recent</h3></div>`;
  html += list.length ? `<div class="list">${list.map(a => { const l = Store.data.leads[a.lead]; return `<div class="li"><span class="pill ${a.type === "order" ? "good" : a.type === "proposal" ? "warn" : ""}">${esc(actName(a.type))}</span><span class="grow"><b>${l ? esc(l.name) + (l.company ? " · " + esc(l.company) : "") : esc(a.note || actName(a.type))}</b><span>${niceDate(a.date)}${l && a.note ? " · " + esc(a.note) : ""}</span></span><button class="icon-btn" data-act="delact" data-id="${a.id}" aria-label="Delete">${ui.del === "a-" + a.id ? svg("check") : svg("x")}</button></div>`; }).join("")}</div>`
    : `<div class="empty"><b>Nothing logged yet</b>Log every meeting, call and site visit. Quotes and orders are logged for you.</div>`;
  ui.actLead = null;
  return html;
}

/* ---------- partners ---------- */
const PTYPES = ["Electrician","Interior designer","Tile dealer","Contractor","Builder","Real-estate agent","Other"];
function partnerOwed(pid){ return Object.values(Store.data.orders).filter(o => o.partner === pid && !o.feePaid).reduce((a, o) => a + (num(o.fee) || 0), 0); }
function vPartners(){
  setHeader("Sell", "Referral partners", "#sell");
  const ps = Object.values(Store.data.partners).sort((a, b) => partnerOwed(b.id) - partnerOwed(a.id) || a.name.localeCompare(b.name));
  const owed = ps.reduce((a, p) => a + partnerOwed(p.id), 0);
  let html = `<div class="stat" style="grid-template-columns:1fr 1fr"><div><b>${ps.length}</b><span>Partners</span></div><div><b>${inrS(owed)}</b><span>Fees owed</span></div></div>
    <div class="btnbar"><a class="btn pri" href="#partner-new">${svg("plus")} Add partner</a></div>
    <p class="small muted" style="margin:10px 0">Electricians, designers, tile dealers and agents who send you work. Agree the fee in writing up front.</p>`;
  html += ps.length ? `<div class="list">${ps.map(p => { const o = partnerOwed(p.id); const n = Object.values(Store.data.leads).filter(l => l.partner === p.id).length;
    return `<a class="li" href="#partner-${p.id}"><span class="ico" style="width:38px;height:38px">${svg("users")}</span><span class="grow"><b>${esc(p.name)}</b><span>${esc(p.type || "")}${p.area ? " · " + esc(p.area) : ""} · ${n} lead${n === 1 ? "" : "s"}${p.pct ? " · " + p.pct + "% fee" : ""}</span></span>${o ? `<span class="pill warn">${inrS(o)} due</span>` : svg("chev")}</a>`; }).join("")}</div>`
    : `<div class="empty"><b>No partners yet</b>Recruit 10-15 local electricians as Maya partners. Each one is on more sites than you can visit.</div>`;
  return html;
}
function vPartner(id){
  const p = id === "new" ? {id:"", type:"Electrician", pct:2} : Store.data.partners[id];
  if (!p) return `<div class="empty"><b>Partner not found</b></div>`;
  setHeader("Referral partner", p.name || "New partner", "#partners");
  const leads = Object.values(Store.data.leads).filter(l => p.id && l.partner === p.id);
  const orders = Object.values(Store.data.orders).filter(o => p.id && o.partner === p.id);
  return `<form class="block stack" id="partform" data-id="${esc(p.id)}" onsubmit="return false"><div class="grid2">
    ${txt("name", "Name", p.name)}${F.sel("type", "Type", PTYPES, p.type)}${txt("phone", "Phone", p.phone, 'inputmode="tel"')}${txt("area", "Area", p.area)}
    ${txt("pct", "Fee (% of order value before GST)", p.pct, 'inputmode="decimal"')}${txt("fixed", "Or fixed fee per order ₹", p.fixed, 'inputmode="decimal"')}</div>
    <div class="field"><label for="f-notes">Notes</label><textarea class="inp" id="f-notes" name="notes" placeholder="Agreement, how they like to be paid…">${esc(p.notes || "")}</textarea></div></form>
  <div class="btnbar"><button class="btn pri" data-act="savepartner">${svg("check")} Save partner</button>
    ${p.phone ? `<a class="btn" href="${waLink(p.phone, "Hello " + (p.name || "") + ", this is from Maya Traders.")}" target="_blank" rel="noopener">${svg("wa")} WhatsApp</a><a class="btn" href="tel:${esc(String(p.phone).replace(/[^\d+]/g, ""))}">Call</a>` : ""}
    ${p.id ? `<button class="btn ghost danger" data-act="delpartner" data-id="${p.id}">${ui.del === "p-" + p.id ? "Tap again to delete" : "Delete"}</button>` : ""}</div>
  ${p.id ? `<div class="sec-h"><h3>Fees</h3><span class="pill warn">${inrS(partnerOwed(p.id))} owed</span></div>
    ${orders.length ? `<div class="list">${orders.map(o => `<div class="li"><span class="grow"><b>${esc(o.no)} · ${esc(o.client || "")}</b><span>${fmtD(o.date)} · fee ${inr(o.fee)}</span></span><button class="btn sm ${o.feePaid ? "" : "pri"}" data-act="feepaid" data-id="${o.id}">${o.feePaid ? "Paid ✓" : "Mark paid"}</button></div>`).join("")}</div>` : `<div class="empty">No orders from this partner yet.</div>`}
    <div class="sec-h"><h3>Leads from ${esc(p.name)}</h3></div>${leads.length ? `<div class="list">${leads.map(leadLi).join("")}</div>` : `<div class="empty">Pick this partner in a lead's "Referred by" field.</div>`}` : ""}`;
}

/* ---------- orders ---------- */
const OSTAT = ["Confirmed","Ordered from supplier","Dispatched","Delivered","Installed","Closed"];
function orderTotals(o){
  const paid = (o.payments || []).reduce((a, p) => a + (num(p.amount) || 0), 0);
  const value = num(o.value) || 0, base = num(o.base) != null ? num(o.base) : value / 1.18;
  return {paid, bal: Math.max(0, value - paid), profit: base - (num(o.cost) || 0) - (num(o.fee) || 0), base, value};
}
function newOrder(q){
  const n = Object.keys(Store.data.orders).length + 1;
  const o = {id:"", no:`MO/${fy()}/${String(n).padStart(3, "0")}`, date: today(), client:"", phone:"", lead:"", quote:"", items:"", value:null, base:null, cost:null, partner:"", fee:null, feePaid:false, status:"Confirmed", due:"", payments:[], notes:""};
  if (q){ const t = quoteTotals(q), l = Store.data.leads[q.lead], p = l && l.partner ? Store.data.partners[l.partner] : null;
    Object.assign(o, {client:q.client, phone:q.phone, lead:q.lead || "", quote:q.id, items:q.lines.map(x => `${x.desc} × ${fmt(num(x.qty) || 0, 2)}`).join("\n"), value:Math.round(t.grand), base:Math.round(t.sub),
      partner: p ? p.id : "", fee: p ? Math.round(p.fixed ? num(p.fixed) : t.sub * (num(p.pct) || 0) / 100) : null}); }
  return o;
}
function vOrders(){
  setHeader("Sell", "Orders & payments", "#sell");
  const os = Object.values(Store.data.orders).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const open = os.filter(o => o.status !== "Closed");
  const due = os.reduce((a, o) => a + orderTotals(o).bal, 0);
  const mon = today().slice(0, 7), monthVal = os.filter(o => (o.date || "").startsWith(mon)).reduce((a, o) => a + (num(o.value) || 0), 0);
  let html = `<div class="stat"><div><b>${open.length}</b><span>Open orders</span></div><div><b>${inrS(due)}</b><span>To collect</span></div><div><b>${inrS(monthVal)}</b><span>Sales this month</span></div></div>
    <div class="btnbar"><a class="btn pri" href="#order-new">${svg("plus")} New order</a><a class="btn" href="#quotes">From a quote</a></div>`;
  html += os.length ? `<div class="list" style="margin-top:12px">${os.map(orderLi).join("")}</div>` : `<div class="empty" style="margin-top:12px"><b>No orders yet</b>Open a saved quote and tap "Won: create order", or add one here.</div>`;
  return html;
}
function orderLi(o){
  const t = orderTotals(o), late = o.due && o.due < today() && t.bal > 0;
  return `<a class="li" href="#order-${o.id}">${svg("bag")}<span class="grow"><b>${esc(o.no)} · ${esc(o.client || "Client")}</b><span>${esc(o.status)} · ${inrS(t.value)}${t.bal ? " · " + inrS(t.bal) + " due" + (o.due ? " " + niceDate(o.due) : "") : " · paid"}</span></span><span class="pill ${t.bal === 0 ? "good" : late ? "bad" : "warn"}">${t.bal === 0 ? "Paid" : late ? "Overdue" : "Balance"}</span></a>`;
}
function vOrder(id){
  if (id === "new"){ if (!ui.order || ui.order.id) ui.order = newOrder(); }
  else { const o = Store.data.orders[id]; if (!o) return `<div class="empty"><b>Order not found</b></div>`; if (!ui.order || ui.order.id !== id) ui.order = JSON.parse(JSON.stringify(o)); }
  const o = ui.order, t = orderTotals(o);
  setHeader("Order", o.no, "#orders");
  const leads = Object.values(Store.data.leads), parts = Object.values(Store.data.partners);
  const oin = (f, l, v, ex="") => `<div class="field"><label for="o-${f}">${l}</label><input class="inp" id="o-${f}" data-in="ord" data-f="${f}" value="${esc(v ?? "")}" ${ex}></div>`;
  return `<div class="stat"><div><b>${inrS(t.value)}</b><span>Order value</span></div><div><b style="color:${t.bal ? "var(--copper)" : "var(--earth)"}">${inrS(t.bal)}</b><span>Balance due</span></div><div><b>${inrS(t.profit)}</b><span>Gross profit</span></div></div>
  <div class="block stack" style="margin-top:12px"><div class="grid2">${oin("client", "Client", o.client)}${oin("phone", "Phone", o.phone, 'inputmode="tel"')}
    <div class="field"><label for="o-date">Order date</label><input class="inp" type="date" id="o-date" data-in="ord" data-f="date" value="${esc(o.date)}"></div>
    <div class="field"><label for="o-status">Status</label><select class="inp" id="o-status" data-in="ord" data-f="status">${OSTAT.map(s => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}</select></div>
    ${oin("value", "Order value incl. GST ₹", o.value, 'inputmode="decimal"')}${oin("base", "Value before GST ₹", o.base, 'inputmode="decimal"')}
    ${oin("cost", "My supplier cost ₹ (before GST)", o.cost, 'inputmode="decimal"')}
    <div class="field"><label for="o-due">Collect balance by</label><input class="inp" type="date" id="o-due" data-in="ord" data-f="due" value="${esc(o.due || "")}"></div></div>
    <div class="grid2"><div class="field"><label for="o-lead">Lead</label><select class="inp" id="o-lead" data-in="ord" data-f="lead"><option value="">None</option>${leads.map(l => `<option value="${l.id}" ${o.lead === l.id ? "selected" : ""}>${esc(l.name)}</option>`).join("")}</select></div>
    <div class="field"><label for="o-partner">Referral partner</label><select class="inp" id="o-partner" data-in="ord" data-f="partner"><option value="">None</option>${parts.map(p => `<option value="${p.id}" ${o.partner === p.id ? "selected" : ""}>${esc(p.name)}</option>`).join("")}</select></div>
    ${oin("fee", "Partner fee ₹", o.fee, 'inputmode="decimal"')}<label class="row small" style="gap:8px;font-weight:600;align-self:end;padding-bottom:10px"><input type="checkbox" data-in="ord" data-f="feePaid" ${o.feePaid ? "checked" : ""} style="width:18px;height:18px;accent-color:var(--copper)"> Fee paid</label></div>
    <div class="field"><label for="o-items">Items</label><textarea class="inp" id="o-items" data-in="ord" data-f="items" rows="3">${esc(o.items || "")}</textarea></div>
    <div class="field"><label for="o-notes">Notes (delivery, installer, warranty)</label><textarea class="inp" id="o-notes" data-in="ord" data-f="notes" rows="2">${esc(o.notes || "")}</textarea></div></div>
  <div class="block" style="margin-top:12px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Payments received</h3><span class="mono small">${inr(t.paid)}</span></div>
    ${(o.payments || []).map((p, i) => `<div class="li" style="padding-inline:0"><span class="grow"><b class="mono">${inr(p.amount)}</b><span>${fmtD(p.date)} · ${esc(p.mode || "")}${p.note ? " · " + esc(p.note) : ""}</span></span><button class="icon-btn" data-act="delpay" data-i="${i}" aria-label="Remove">${svg("x")}</button></div>`).join("") || `<p class="small muted" style="margin-top:6px">No payments yet.</p>`}
    <div class="grid3" style="margin-top:10px"><div class="field"><label for="pay-amt">Amount ₹</label><input class="inp mono" id="pay-amt" inputmode="decimal" value="${t.bal ? Math.round(t.bal) : ""}"></div>
    <div class="field"><label for="pay-date">Date</label><input class="inp" type="date" id="pay-date" value="${today()}"></div>
    <div class="field"><label for="pay-mode">Mode</label><select class="inp" id="pay-mode">${["UPI","Bank transfer","Cheque","Cash"].map(m => `<option>${m}</option>`).join("")}</select></div></div>
    <div class="btnbar"><button class="btn" data-act="addpay">${svg("plus")} Add payment</button></div></div>
  <div class="btnbar"><button class="btn pri" data-act="saveorder">${svg("check")} Save order</button>
    ${o.phone && t.bal ? `<a class="btn" href="${waLink(o.phone, `Hello, gentle reminder from ${S().firm || "Maya Traders"} for order ${o.no}: balance of ${inr(t.bal)} is due${o.due ? " by " + fmtD(o.due) : ""}. Thank you.`)}" target="_blank" rel="noopener">${svg("wa")} Payment reminder</a>` : ""}
    ${o.quote && Store.data.quotes[o.quote] ? `<a class="btn" href="#quote-${o.quote}">${svg("quote")} Quote</a>` : ""}
    ${o.id ? `<button class="btn ghost danger" data-act="delorder" data-id="${o.id}">${ui.del === "o-" + o.id ? "Tap again to delete" : "Delete"}</button>` : ""}</div>
  ${G.on() ? `<p class="small muted" style="margin-top:8px">A "Collect balance" reminder goes to your Google Calendar on the due date.</p>` : ""}`;
}

/* ---------- expenses ---------- */
const ECAT = ["Travel / fuel","Food","Samples & demo","Marketing / IndiaMART","Phone & internet","Tools & meters","Other"];
function vExpenses(){
  setHeader("Today", "Expenses", "#today");
  const all = Object.values(Store.data.expenses).sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  const mon = ui.expMonth || today().slice(0, 7);
  const list = all.filter(x => (x.date || "").startsWith(mon));
  const total = list.reduce((a, x) => a + (num(x.amount) || 0), 0);
  const byCat = {}; list.forEach(x => byCat[x.cat] = (byCat[x.cat] || 0) + (num(x.amount) || 0));
  const months = [...new Set(all.map(x => (x.date || "").slice(0, 7)).concat([today().slice(0, 7)]))].sort().reverse();
  const mname = m => new Date(m + "-01T00:00:00").toLocaleDateString("en-IN", {month:"long", year:"numeric"});
  return `<form class="block stack" id="expform" onsubmit="return false"><h3 style="margin:0">Add expense</h3><div class="grid2">
    <div class="field"><label for="e-amt">Amount ₹</label><input class="inp mono" id="e-amt" name="amount" inputmode="decimal" placeholder="0"></div>
    <div class="field"><label for="e-date">Date</label><input class="inp" type="date" id="e-date" name="date" value="${today()}"></div></div>
    ${F.sel("cat", "Category", ECAT, "Travel / fuel")}<div class="field"><label for="e-note">Note</label><input class="inp" id="e-note" name="note" placeholder="e.g. Manesar plant visit"></div>
    <button class="btn pri" data-act="addexp">${svg("plus")} Add</button></form>
  <div class="chips" style="margin-top:6px">${months.map(m => `<button class="chip ${m === mon ? "on" : ""}" data-act="expmonth" data-v="${m}">${mname(m)}</button>`).join("")}</div>
  <div class="block" style="margin-top:8px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${mname(mon)}</h3><b class="mono">${inr(total)}</b></div>
    ${Object.keys(byCat).length ? `<div class="stack" style="margin-top:10px">${Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([c, v]) => `<div><div class="row" style="justify-content:space-between"><span class="small">${esc(c)}</span><span class="mono small">${inr(v)}</span></div><div class="progress" style="margin-top:4px"><i style="width:${v / total * 100}%;background:var(--copper)"></i></div></div>`).join("")}</div>` : `<p class="small muted" style="margin-top:6px">No expenses this month.</p>`}</div>
  ${list.length ? `<div class="list" style="margin-top:12px">${list.map(x => `<div class="li"><span class="grow"><b class="mono">${inr(x.amount)}</b><span>${fmtD(x.date)} · ${esc(x.cat)}${x.note ? " · " + esc(x.note) : ""}</span></span><button class="icon-btn" data-act="delexp" data-id="${x.id}" aria-label="Delete">${ui.del === "e-" + x.id ? svg("check") : svg("x")}</button></div>`).join("")}</div>` : ""}`;
}

/* ---------- today ---------- */
function vToday(){
  setHeader(longDate(today()), "Today");
  const leads = Object.values(Store.data.leads);
  const due = leads.filter(l => l.next && l.next <= today() && !["Won","Lost"].includes(l.stage)).sort((a, b) => a.next.localeCompare(b.next));
  const visits = leads.filter(l => l.visit && l.visit >= today() && l.visit <= addDays(today(), 2)).sort((a, b) => (a.visit + (a.visitTime || "")).localeCompare(b.visit + (b.visitTime || "")));
  const pay = Object.values(Store.data.orders).filter(o => orderTotals(o).bal > 0 && o.due && o.due <= addDays(today(), 3)).sort((a, b) => a.due.localeCompare(b.due));
  const w = weekStats(), t = targets();
  const pend = G.pendingCount();
  let html = "";
  if (G.ready() && !G.on()) html += `<div class="banner"><b>Connect Google</b> to put follow-ups in your Calendar and back up to Drive automatically. <button class="btn sm" data-act="gconnect" style="margin-top:8px">Connect Google</button></div>`;
  else if (G.on() && pend) html += `<div class="banner"><b>${pend} change${pend > 1 ? "s" : ""} waiting for Google.</b> <button class="btn sm" data-act="gsync" style="margin-left:6px">Sync now</button></div>`;
  html += `<div class="tgrid" style="grid-template-columns:repeat(3,minmax(0,1fr))">
    ${[["#activity","check","Log activity"],["#lead-new","users","New lead"],["#quote","quote","New quote"],["#survey","clip","Site survey"],["#expenses","pct","Expense"],["#notes","note","Notes"]].map(([h, i, l]) => `<a class="tcard" href="${h}" data-act="${h === "#quote" ? "newquote" : h === "#survey" ? "newsurvey" : ""}" style="min-height:84px;align-items:flex-start"><span class="ico">${svg(i)}</span><b style="font-size:13.5px">${l}</b></a>`).join("")}</div>`;
  html += `<div class="sec-h"><h3>Calendar today</h3>${G.on() ? `<a class="small" href="https://calendar.google.com/calendar/u/0/r/day" target="_blank" rel="noopener">Open Calendar</a>` : ""}</div><div id="gtoday">${G.on() ? `<div class="empty" style="padding:14px">Loading your calendar…</div>` : `<div class="empty" style="padding:14px">${G.ready() ? "Connect Google to see today's meetings here." : "Set up Google in Settings to see today's meetings here."}</div>`}</div>`;
  if (visits.length) html += `<div class="sec-h"><h3>Site visits (next 3 days)</h3></div><div class="list">${visits.map(l => `<a class="li" href="#lead-${l.id}">${svg("clip")}<span class="grow"><b>${esc(l.name)}${l.company ? " · " + esc(l.company) : ""}</b><span>${niceDate(l.visit)}${l.visitTime ? " " + l.visitTime : ""}${l.area ? " · " + esc(l.area) : ""}</span></span>${svg("chev")}</a>`).join("")}</div>`;
  html += `<div class="sec-h"><h3>Follow up</h3><a class="small" href="#leads">All leads</a></div>` + (due.length ? `<div class="list">${due.map(leadLi).join("")}</div>` : `<div class="empty" style="padding:14px">No follow-ups due. Set a follow-up date on each lead.</div>`);
  if (pay.length) html += `<div class="sec-h"><h3>Collect payments</h3><a class="small" href="#orders">Orders</a></div><div class="list">${pay.map(orderLi).join("")}</div>`;
  html += `<div class="sec-h"><h3>This week</h3><a class="small" href="#activity">Log</a></div><div class="block stack">${bar("Meetings & site visits", w.meet, t.meet)}${bar("Proposals sent", w.prop, t.prop)}${bar("Orders won", w.order, t.order)}</div>`;
  html += `<div class="sec-h"><h3>More</h3></div><div class="list">${[["#orders","bag","Orders & payments"],["#partners","users","Referral partners"],["#expenses","pct","Expenses"],["#activity","check","Activity log"],["#notes","note","Notes"],["#settings","swap","Settings, Google & backup"]].map(([h, i, l]) => `<a class="li" href="${h}">${svg(i)}<span class="grow"><b>${l}</b></span>${svg("chev")}</a>`).join("")}</div>`;
  return html;
}
async function loadTodayEvents(){
  const el = $("#gtoday"); if (!el || !G.on()) return;
  try {
    const ev = await G.todayEvents();
    if (!$("#gtoday")) return;
    $("#gtoday").innerHTML = ev.length ? `<div class="list">${ev.map(e => { const tm = e.start.dateTime ? new Date(e.start.dateTime).toLocaleTimeString("en-IN", {hour:"numeric", minute:"2-digit"}) : "All day";
      return `<a class="li" href="${esc(e.htmlLink || "#today")}" target="_blank" rel="noopener"><span class="mono small" style="width:64px;flex:none">${tm}</span><span class="grow"><b>${esc(e.summary || "(no title)")}</b>${e.location ? `<span>${esc(e.location)}</span>` : ""}</span></a>`; }).join("")}</div>`
      : `<div class="empty" style="padding:14px">Nothing on your calendar today.</div>`;
  } catch(e){ if ($("#gtoday")) $("#gtoday").innerHTML = `<div class="empty" style="padding:14px">Couldn't reach Google Calendar. <button class="btn sm" data-act="gsync">Reconnect</button></div>`; }
}

/* ---------- notes & settings ---------- */
function vNotes(){
  setHeader("Today", "Notes", "#today");
  const items = (Store.data.notes.items || []).slice().sort((a, b) => (b.at || "").localeCompare(a.at || ""));
  let html = `<div class="block"><textarea class="inp" id="newnote" placeholder="Quick note: a supplier price, a contact, something to learn…"></textarea><div class="btnbar"><button class="btn pri" data-act="addnote">${svg("plus")} Add note</button></div></div>`;
  html += items.length ? `<div class="stack" style="margin-top:12px">${items.map(n => `<div class="block"><div class="row" style="justify-content:space-between"><span class="small muted mono">${niceDate((n.at || "").slice(0, 10))}</span><div class="row" style="gap:6px"><button class="icon-btn" data-act="copy" data-text="${esc(n.text)}" aria-label="Copy">${svg("copy")}</button><button class="icon-btn" data-act="delnote" data-id="${n.id}" aria-label="Delete">${ui.del === "n-" + n.id ? svg("check") : svg("trash")}</button></div></div><p style="white-space:pre-wrap;margin-top:6px">${esc(n.text)}</p></div>`).join("")}</div>`
    : `<div class="empty" style="margin-top:12px"><b>No notes yet</b>Jot down prices, contacts and things you learn at meetings.</div>`;
  return html;
}
function vSettings(){
  setHeader("Today", "Settings", "#today");
  const st = S(), t = targets(), g = st.google || {}, lb = st.lastBackup;
  const stale = !lb || (Date.now() - new Date(lb).getTime()) > 14 * 864e5;
  return `<div class="sec-h" style="margin-top:4px"><h3>Google Calendar & Drive</h3>${G.on() ? `<span class="pill good">Connected</span>` : ""}</div>
  <div class="block stack">
    ${!G.ready() ? `<p class="small">Google isn't set up yet. Follow "Connect Google" in the setup guide, then paste the Web client ID here.</p>` :
      G.on() ? `<p class="small">Signed in as <b>${esc(g.email || "your Google account")}</b>. Follow-ups, site visits and payment due dates go to your Google Calendar. Data backs up to Drive › Maya Traders › Backups${g.lastDrive ? ` (last: ${new Date(g.lastDrive).toLocaleString("en-IN", {day:"numeric", month:"short", hour:"numeric", minute:"2-digit"})})` : ""}. Quote PDFs go to Drive › Maya Traders › Quotes.</p>
      <div class="btnbar" style="margin-top:0"><button class="btn pri" data-act="gsync">Sync now</button><button class="btn" data-act="gbackup">Back up to Drive</button><button class="btn" data-act="grestorelist">Restore from Drive</button><button class="btn ghost danger" data-act="gdisconnect">Disconnect</button></div>
      <div id="gbackups"></div>`
      : `<p class="small">Connect to put follow-ups, site visits and payment reminders in your Google Calendar, see today's meetings on the Today screen, and back up to Google Drive automatically.</p><div class="btnbar" style="margin-top:0"><button class="btn pri" data-act="gconnect">Connect Google</button></div>`}
    <details class="how"><summary>Advanced: Google client ID</summary><div class="field" style="margin-top:8px"><label for="g-cid">Web client ID</label><input class="inp mono" id="g-cid" value="${esc(st.gClientId || "")}" placeholder="${esc(CFG.googleWebClientId || "xxxx.apps.googleusercontent.com")}"></div><button class="btn sm" data-act="savecid" style="margin-top:8px">Save client ID</button></details>
  </div>
  <div class="sec-h"><h3>Weekly targets</h3></div>
  <form class="block" id="tgtform" onsubmit="return false"><div class="grid3">${F.n("meet", "Meetings", t.meet)}${F.n("prop", "Proposals", t.prop)}${F.n("order", "Orders", t.order)}</div><button class="btn" data-act="savetargets" style="margin-top:10px">${svg("check")} Save targets</button></form>
  <div class="sec-h"><h3>My details on quotes</h3></div><form class="block stack" id="setform" onsubmit="return false"><div class="grid2">
    ${stx("firm", "Firm name", st.firm || "Maya Traders")}${stx("name", "Your name", st.name)}${stx("phone", "Phone", st.phone)}${stx("email", "Email", st.email)}${stx("gstin", "GSTIN", st.gstin)}${stx("address", "Address", st.address)}</div>
    <button class="btn" data-act="savesettings">${svg("check")} Save details</button></form>
  <div class="sec-h"><h3>Backup file</h3></div>
  <div class="block stack">${stale && !G.on() ? `<div class="banner" style="margin:0"><b>${lb ? "Last backup " + niceDate(lb.slice(0, 10)) + "." : "No backup yet."}</b> Everything is saved on this phone. Keep a backup in Google Drive.</div>` : ""}
    <p class="small">A backup file holds your leads, quotes, orders, partners, expenses, surveys, prices, notes and photos.</p>
    <div class="btnbar" style="margin-top:0"><button class="btn" data-act="backup">${svg("copy")} Make backup file</button>
    <label class="btn" for="restorefile">Restore from file<input type="file" id="restorefile" accept="application/json,.json" data-in="restore" hidden></label></div>
    ${ui.restoreFile ? `<div class="banner"><b>Replace the data on this phone</b> with "${esc(ui.restoreFile.name || "the Drive backup")}"? Anything added since that backup will be lost.<div class="btnbar"><button class="btn pri sm" data-act="restoreok">Yes, restore</button><button class="btn sm" data-act="restorecancel">Cancel</button></div></div>` : ""}</div>
  <div class="sec-h"><h3>App</h3></div>
  <div class="block stack">${ui.installEvt ? `<button class="btn" data-act="install">${svg("plus")} Install as app</button>` : ""}
    <div class="row small muted" style="justify-content:space-between"><span>Maya Traders · version <span class="mono">${esc(BUILD.slice(0, 7))}</span></span><button class="btn sm ghost" data-act="checkupdate">Check for updates</button></div></div>`;
}

/* ---------- Google ---------- */
const SCOPES = ["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/drive.file", "email", "profile"];
const CAL = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
const DRV = "https://www.googleapis.com/drive/v3/files";
const UPL = "https://www.googleapis.com/upload/drive/v3/files";
const G = {
  tok: null, exp: 0, inited: false, timer: null, bTimer: null, running: false,
  clientId(){ return (S().gClientId || "").trim() || CFG.googleWebClientId || ""; },
  ready(){ return !!this.clientId(); },
  on(){ return !!(S().google && S().google.on); },
  native(){ return isNative() && window.Capacitor.Plugins && window.Capacitor.Plugins.GoogleAuth ? window.Capacitor.Plugins.GoogleAuth : null; },
  keep(tok, secs){ this.tok = tok; this.exp = Date.now() + (secs || 3300) * 1000; try { sessionStorage.setItem("mt-gtok", JSON.stringify({tok, exp:this.exp})); } catch(e){} },
  restore(){ try { const t = JSON.parse(sessionStorage.getItem("mt-gtok") || "null"); if (t && t.exp > Date.now()) { this.tok = t.tok; this.exp = t.exp; } } catch(e){} },
  async token(interactive){
    if (this.tok && Date.now() < this.exp - 60000) return this.tok;
    if (!this.ready()) return null;
    const GA = this.native();
    if (GA){
      try {
        if (!this.inited){ await GA.initialize({clientId: this.clientId(), scopes: SCOPES, grantOfflineAccess: true}); this.inited = true; }
        let a = null;
        if (this.on()) { try { const r = await GA.refresh(); a = r && r.accessToken; } catch(e){ a = null; } }
        if (!a && interactive){ const u = await GA.signIn(); a = u && u.authentication && u.authentication.accessToken; if (u && u.email) this.email = u.email; }
        if (a){ this.keep(a); return a; }
      } catch(e){ if (interactive) throw e; }
      return null;
    }
    if (!interactive) return null;
    await loadScript("https://accounts.google.com/gsi/client");
    return new Promise((res, rej) => {
      const tc = google.accounts.oauth2.initTokenClient({client_id: this.clientId(), scope: SCOPES.join(" "),
        callback: r => { if (r.error) rej(r); else { this.keep(r.access_token, r.expires_in); res(r.access_token); } }, error_callback: e => rej(e)});
      tc.requestAccessToken({prompt: this.on() ? "" : "consent", login_hint: (S().google || {}).email || undefined});
    });
  },
  async api(url, opts = {}, interactive = false){
    const t = await this.token(interactive); if (!t) throw {code:"auth"};
    const r = await fetch(url, {...opts, headers: {...(opts.headers || {}), Authorization: "Bearer " + t}});
    if (r.status === 401) { this.tok = null; try { sessionStorage.removeItem("mt-gtok"); } catch(e){} throw {code:"auth", status:401}; }
    if (!r.ok) throw {code:"http", status: r.status};
    if (r.status === 204) return null;
    return opts.raw ? r : r.json();
  },
  async connect(){
    if (!this.ready()){ toast("Add the Google client ID in Settings first"); location.hash = "#settings"; return; }
    try {
      await this.token(true);
      let email = this.email || "";
      try { const u = await this.api("https://www.googleapis.com/oauth2/v3/userinfo"); email = u.email || email; } catch(e){}
      S().google = Object.assign({}, S().google, {on: true, email});
      Object.values(Store.data.leads).forEach(l => { if (l.next || l.visit) l.gDirty = true; });
      Object.values(Store.data.orders).forEach(o => { if (o.due) o.gDirty = true; });
      Store.saveLocal(); toast("Google connected"); rerender();
      this.flush(true);
    } catch(e){ toast("Google sign-in didn't finish. Try again."); }
  },
  async disconnect(){
    const GA = this.native();
    try { if (GA) await GA.signOut(); else if (window.google && this.tok) google.accounts.oauth2.revoke(this.tok); } catch(e){}
    this.tok = null; try { sessionStorage.removeItem("mt-gtok"); } catch(e){}
    S().google = Object.assign({}, S().google, {on: false}); Store.saveLocal(); toast("Google disconnected"); rerender();
  },
  pendingCount(){
    return Object.values(Store.data.leads).filter(l => l.gDirty).length + Object.values(Store.data.orders).filter(o => o.gDirty).length + (S().gDel || []).length + (S().gBackupDue ? 1 : 0);
  },
  soon(){ if (!this.on()) return; S().gBackupDue = true; clearTimeout(this.timer); this.timer = setTimeout(() => this.flush(false), 2500); },
  ev(kind, x){
    const firm = S().firm || "Maya Traders";
    let date, time, dur = 60, summary, desc = [];
    if (kind === "follow"){ date = x.next; time = x.nextTime; dur = 30; summary = `Follow up: ${x.name}${x.company ? " (" + x.company + ")" : ""}`; }
    else if (kind === "visit"){ date = x.visit; time = x.visitTime; dur = 90; summary = `Site visit: ${x.name}${x.area ? ", " + x.area : ""}`; }
    else { const t = orderTotals(x); date = x.due; summary = `Collect payment: ${x.client || x.no} (${inr(t.bal)})`; desc.push(`Order ${x.no}, value ${inr(t.value)}, received ${inr(t.paid)}.`); }
    if (kind !== "pay"){ if (x.phone) desc.push("Phone: " + x.phone); if (x.area) desc.push("Area: " + x.area); if (x.stage) desc.push("Stage: " + x.stage); if (x.products && x.products.length) desc.push("Interested in: " + x.products.map(p => byId[p] ? byId[p].name.split("(")[0].trim() : p).join(", ")); if (x.notes) desc.push("\n" + x.notes); }
    desc.push("\n— " + firm + " app");
    const b = {summary, description: desc.join("\n"), location: kind === "visit" ? (x.area || "") : undefined, colorId: kind === "pay" ? "6" : kind === "visit" ? "2" : "5"};
    if (time){ const [h, m] = time.split(":").map(Number); const e = new Date(2000, 0, 1, h, m + dur); const pad = n => String(n).padStart(2, "0");
      const endDate = e.getDate() > 1 ? addDays(date, 1) : date;
      b.start = {dateTime: `${date}T${time}:00`, timeZone: TZ}; b.end = {dateTime: `${endDate}T${pad(e.getHours())}:${pad(e.getMinutes())}:00`, timeZone: TZ};
      b.reminders = {useDefault: false, overrides: [{method: "popup", minutes: kind === "visit" ? 60 : 15}]}; }
    else { b.start = {date}; b.end = {date: addDays(date, 1)}; b.reminders = {useDefault: false, overrides: [{method: "popup", minutes: 15 * 60}]}; }
    return b;
  },
  async syncOne(x, kind, key, date){
    const id = x[key];
    if (!date){ if (id){ try { await this.api(CAL + "/" + encodeURIComponent(id), {method: "DELETE"}); } catch(e){ if (e.status !== 404 && e.status !== 410) throw e; } delete x[key]; } return; }
    const body = JSON.stringify(this.ev(kind, x)), h = {"Content-Type": "application/json"};
    if (id){ try { await this.api(CAL + "/" + encodeURIComponent(id), {method: "PATCH", headers: h, body}); return; } catch(e){ if (e.status !== 404 && e.status !== 410) throw e; } }
    const r = await this.api(CAL, {method: "POST", headers: h, body}); x[key] = r.id;
  },
  async flush(interactive){
    if (!this.on() || this.running) return;
    this.running = true;
    let errs = 0;
    try {
      if (!(await this.token(interactive))) { this.running = false; if (cur === "today") rerender(); return; }
      for (const id of (S().gDel || []).slice()){ try { await this.api(CAL + "/" + encodeURIComponent(id), {method: "DELETE"}); } catch(e){ if (e.status !== 404 && e.status !== 410) { errs++; continue; } } S().gDel = S().gDel.filter(x => x !== id); }
      for (const l of Object.values(Store.data.leads)){ if (!l.gDirty) continue; const closed = ["Won","Lost"].includes(l.stage);
        try { await this.syncOne(l, "follow", "gFollow", closed ? "" : l.next); await this.syncOne(l, "visit", "gVisit", l.visit); delete l.gDirty; } catch(e){ errs++; } }
      for (const o of Object.values(Store.data.orders)){ if (!o.gDirty) continue;
        try { await this.syncOne(o, "pay", "gDue", orderTotals(o).bal > 0 ? o.due : ""); delete o.gDirty; } catch(e){ errs++; } }
      Store.saveLocal();
      const last = (S().google || {}).lastDrive;
      if (S().gBackupDue || !last || Date.now() - new Date(last).getTime() > 12 * 36e5) { try { await this.backup(); } catch(e){ errs++; } }
      if (interactive) toast(errs ? "Some items didn't sync. Try again later." : "Synced with Google");
    } catch(e){ if (interactive) toast("Couldn't reach Google"); }
    this.running = false;
    if (cur === "today" || cur === "settings") rerender();
  },
  queueDelete(...ids){ const d = S().gDel || (S().gDel = []); ids.filter(Boolean).forEach(i => d.push(i)); },
  async todayEvents(){
    const s = new Date(today() + "T00:00:00"), e = new Date(addDays(today(), 1) + "T00:00:00");
    const r = await this.api(`${CAL}?singleEvents=true&orderBy=startTime&timeMin=${encodeURIComponent(s.toISOString())}&timeMax=${encodeURIComponent(e.toISOString())}&maxResults=20`);
    return r.items || [];
  },
  async folder(name, parent){
    const g = S().google; g.folders = g.folders || {};
    const key = (parent || "root") + "/" + name;
    if (g.folders[key]) return g.folders[key];
    const q = `name='${name.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and trashed=false` + (parent ? ` and '${parent}' in parents` : "");
    const r = await this.api(`${DRV}?q=${encodeURIComponent(q)}&fields=files(id)`);
    let id = r.files && r.files[0] && r.files[0].id;
    if (!id){ const c = await this.api(DRV, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name, mimeType: "application/vnd.google-apps.folder", parents: parent ? [parent] : undefined})}); id = c.id; }
    g.folders[key] = id; Store.saveLocal(); return id;
  },
  async upload(name, blob, parent, fileId){
    const b = "mtb" + uid(), meta = fileId ? {name} : {name, parents: [parent]};
    const body = new Blob([`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(meta)}\r\n--${b}\r\nContent-Type: ${blob.type || "application/octet-stream"}\r\n\r\n`, blob, `\r\n--${b}--`]);
    return this.api(`${UPL}${fileId ? "/" + fileId : ""}?uploadType=multipart&fields=id,webViewLink`, {method: fileId ? "PATCH" : "POST", headers: {"Content-Type": `multipart/related; boundary=${b}`}, body});
  },
  async backupFolder(){ const root = await this.folder("Maya Traders"); return this.folder("Backups", root); },
  async backup(){
    const g = S().google, json = await backupJSON(), blob = new Blob([json], {type: "application/json"});
    let bf = await this.backupFolder(), r;
    if (g.backupId){ try { r = await this.upload("maya-backup-latest.json", blob, bf, g.backupId); } catch(e){ if (e.status === 404) { g.backupId = null; g.folders = {}; bf = await this.backupFolder(); } else throw e; } }
    if (!r) r = await this.upload("maya-backup-latest.json", blob, bf);
    g.backupId = r.id;
    const wk = weekRange()[0];
    if (g.snapWeek !== wk){ await this.upload(`maya-backup-${today()}.json`, blob, bf); g.snapWeek = wk; }
    g.lastDrive = new Date().toISOString(); S().gBackupDue = false; S().lastBackup = g.lastDrive; Store.saveLocal();
  },
  async listBackups(){ const bf = await this.backupFolder(); const r = await this.api(`${DRV}?q=${encodeURIComponent(`'${bf}' in parents and trashed=false`)}&orderBy=modifiedTime desc&fields=files(id,name,modifiedTime,size)&pageSize=20`); return r.files || []; },
  async fetchBackup(id){ const r = await this.api(`${DRV}/${id}?alt=media`, {raw: true}); return r.json(); },
  async savePdf(name, blob){ const root = await this.folder("Maya Traders"), qf = await this.folder("Quotes", root); return this.upload(name, blob, qf); },
  async shareAnyone(id){ await this.api(`${DRV}/${id}/permissions`, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({role: "reader", type: "anyone"})}); const r = await this.api(`${DRV}/${id}?fields=webViewLink`); return r.webViewLink; }
};
G.restore();
function gcalLink(title, date, time, details){
  const d = date.replace(/-/g, "");
  let dates = `${d}/${addDays(date, 1).replace(/-/g, "")}`;
  if (time){ const [h, m] = time.split(":"); const s = `${d}T${h}${m}00`; const e = new Date(2000, 0, 1, +h, +m + 30); dates = `${s}/${d}T${String(e.getHours()).padStart(2, "0")}${String(e.getMinutes()).padStart(2, "0")}00`; }
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&ctz=${TZ}&details=${encodeURIComponent(details || "")}`;
}

/* ---------- quote PDF ---------- */
async function quotePdf(q){
  await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  const {jsPDF} = window.jspdf; const doc = new jsPDF({unit: "mm", format: "a4"});
  const st = S(), W = 210, M = 14, t = quoteTotals(q);
  const rs = n => "Rs. " + (Math.round((n || 0) * 100) / 100).toLocaleString("en-IN", {minimumFractionDigits: 2, maximumFractionDigits: 2});
  const clean = s => String(s || "").replace(/₹/g, "Rs. ").replace(/[^\x00-\xFF]/g, "");
  doc.setFillColor(21, 32, 28); doc.rect(0, 0, W, 32, "F");
  doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.text(clean(st.firm || "Maya Traders"), M, 15);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(200, 212, 206);
  doc.text(clean([st.address, st.gstin ? "GSTIN " + st.gstin : ""].filter(Boolean).join("   |   ")), M, 22);
  doc.text(clean([st.name, st.phone, st.email].filter(Boolean).join("   |   ")), M, 27);
  doc.setTextColor(225, 139, 86); doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text("QUOTATION", W - M, 15, {align: "right"});
  doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(255, 255, 255); doc.text(clean(q.no), W - M, 22, {align: "right"}); doc.text("Date: " + fmtD(q.date), W - M, 27, {align: "right"});
  let y = 42;
  doc.setTextColor(90, 104, 98); doc.setFontSize(8); doc.text("QUOTATION FOR", M, y); y += 5.5;
  doc.setTextColor(21, 32, 28); doc.setFont("helvetica", "bold"); doc.setFontSize(12); doc.text(clean(q.client || "-"), M, y); y += 5;
  doc.setFont("helvetica", "normal"); doc.setFontSize(9);
  const who = [q.contact && q.contact !== q.client ? "Attn: " + q.contact : "", q.phone].filter(Boolean).join("   |   "); if (who) { doc.text(clean(who), M, y); y += 5; }
  y += 4;
  const cols = {n: M + 2, d: M + 9, q: 127, r: 152, g: 166, a: W - M - 2};
  const head = () => { doc.setFillColor(226, 231, 228); doc.rect(M, y - 5, W - 2 * M, 8, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(8.5); doc.setTextColor(21, 32, 28);
    doc.text("#", cols.n, y); doc.text("Description", cols.d, y); doc.text("Qty", cols.q, y, {align: "right"}); doc.text("Rate", cols.r, y, {align: "right"}); doc.text("GST", cols.g, y, {align: "right"}); doc.text("Amount", cols.a, y, {align: "right"}); y += 7; doc.setFont("helvetica", "normal"); };
  head();
  q.lines.forEach((l, i) => {
    const lines = doc.splitTextToSize(clean(l.desc), 92), h = lines.length * 4.4 + 3;
    if (y + h > 268){ doc.addPage(); y = 20; head(); }
    const amt = (num(l.qty) || 0) * (num(l.rate) || 0);
    doc.setFontSize(9); doc.text(String(i + 1), cols.n, y); doc.text(lines, cols.d, y);
    doc.text(fmt(num(l.qty) || 0, 2), cols.q, y, {align: "right"}); doc.text(rs(num(l.rate)).replace("Rs. ", ""), cols.r, y, {align: "right"}); doc.text((num(l.gst) ?? 0) + "%", cols.g, y, {align: "right"}); doc.text(rs(amt).replace("Rs. ", ""), cols.a, y, {align: "right"});
    y += h; doc.setDrawColor(210, 216, 212); doc.line(M, y - 3, W - M, y - 3);
  });
  if (y > 240){ doc.addPage(); y = 20; }
  y += 3; const tx = W - M - 62;
  const trow = (l, v, bold) => { doc.setFont("helvetica", bold ? "bold" : "normal"); doc.setFontSize(bold ? 11 : 9.5); doc.text(l, tx, y); doc.text(v, W - M - 2, y, {align: "right"}); y += bold ? 7 : 5.5; };
  trow("Subtotal", rs(t.sub));
  if (q.place === "inter") trow("IGST", rs(t.gst)); else { trow("CGST", rs(t.gst / 2)); trow("SGST", rs(t.gst / 2)); }
  doc.setDrawColor(21, 32, 28); doc.line(tx, y - 3.5, W - M, y - 3.5); y += 1.5; trow("Total", rs(t.grand), true);
  y += 4; doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text("Terms & conditions", M, y); y += 5; doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
  const terms = doc.splitTextToSize(clean(q.terms), W - 2 * M); if (y + terms.length * 4 > 270){ doc.addPage(); y = 20; } doc.text(terms, M, y); y += terms.length * 4 + 14;
  if (y > 272){ doc.addPage(); y = 30; }
  doc.setFont("helvetica", "bold"); doc.text("For " + clean(st.firm || "Maya Traders"), W - M, y, {align: "right"}); y += 12;
  doc.setFont("helvetica", "normal"); doc.text(clean(st.name || "Authorised signatory"), W - M, y, {align: "right"});
  const pages = doc.getNumberOfPages(); for (let i = 1; i <= pages; i++){ doc.setPage(i); doc.setFontSize(7.5); doc.setTextColor(120, 130, 126); doc.text(`${clean(q.no)}  ·  page ${i} of ${pages}`, W / 2, 290, {align: "center"}); }
  return doc;
}
const pdfName = q => `Quotation ${q.no.replace(/\//g, "-")} ${(q.client || "").replace(/[^\w ]/g, "").trim()}.pdf`.replace(/\s+/g, " ");
async function sharePdf(q){
  toast("Making PDF…");
  try {
    const doc = await quotePdf(q), name = pdfName(q);
    if (isNative() && window.Capacitor.Plugins.Filesystem && window.Capacitor.Plugins.Share){
      const {Filesystem, Share} = window.Capacitor.Plugins;
      const w = await Filesystem.writeFile({path: name, data: doc.output("datauristring").split(",")[1], directory: "CACHE"});
      await Share.share({title: name, url: w.uri, dialogTitle: "Send quotation"});
    } else doc.save(name);
  } catch(e){ if (!(e && /cancel/i.test(String(e.message || e)))) toast("Couldn't make the PDF. Check your internet once."); }
}
async function drivePdf(q){
  if (!G.on()){ toast("Connect Google in Settings first"); return; }
  toast("Saving to Drive…");
  try {
    const doc = await quotePdf(q), r = await G.savePdf(pdfName(q), doc.output("blob"));
    const link = await G.shareAnyone(r.id);
    q.pdfId = r.id; q.pdfLink = link;
    if (q.id && Store.data.quotes[q.id]) { Store.data.quotes[q.id].pdfId = r.id; Store.data.quotes[q.id].pdfLink = link; Store.saveLocal(); }
    refreshQuote(false); const el = $("#qpdf"); if (el) el.innerHTML = pdfLinkHtml(q);
    toast("Saved to Drive; link added to the message");
  } catch(e){ toast(e && e.code === "auth" ? "Sign in to Google again in Settings" : "Couldn't save to Drive"); }
}
const pdfLinkHtml = q => q.pdfLink ? `<p class="small" style="margin-top:8px">PDF in Drive: <a href="${esc(q.pdfLink)}" target="_blank" rel="noopener">open</a> (anyone with the link can view)</p>` : "";

/* ---------- extension events ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const a = b.dataset.act, id = b.dataset.id;
  const guard = key => { if (ui.del === key){ ui.del = null; return true; } ui.del = key; setTimeout(() => { if (ui.del === key) ui.del = null; }, 3000); return false; };
  switch(a){
    case "logact": { const f = $("#actform"), v = {}; $$("input,select", f).forEach(el => { if (el.type === "radio") { if (el.checked) v.type = el.value; } else if (el.name) v[el.name] = el.value; });
      logActivity(v.type || "meeting", v.lead, v.note.trim(), v.date || today()); toast(actName(v.type) + " logged"); rerender(); break; }
    case "delact": if (!guard("a-" + id)){ b.innerHTML = svg("check"); toast("Tap again to delete"); return; } delete Store.data.activities[id]; Store.saveLocal(); rerender(); break;
    case "logfor": ui.actLead = id; location.hash = "#activity"; break;
    case "savepartner": { const f = $("#partform"), v = {}; $$("input,select,textarea", f).forEach(el => { if (el.name) v[el.name] = el.value; });
      if (!v.name.trim()){ toast("Add a name first"); return; } const pid = f.dataset.id || uid();
      Store.data.partners[pid] = {...(Store.data.partners[pid] || {}), ...v, id: pid, pct: num(v.pct), fixed: num(v.fixed)}; Store.saveLocal(); G.soon(); toast("Partner saved");
      if (location.hash !== "#partner-" + pid) location.hash = "#partner-" + pid; else rerender(); break; }
    case "delpartner": if (!guard("p-" + id)){ b.textContent = "Tap again to delete"; return; } delete Store.data.partners[id]; Store.saveLocal(); location.hash = "#partners"; break;
    case "feepaid": { const o = Store.data.orders[id]; o.feePaid = !o.feePaid; Store.saveLocal(); G.soon(); rerender(); break; }
    case "neworder": ui.order = newOrder(); break;
    case "quotewon": { const q = ui.quote; if (!q.id){ toast("Save the quote first"); return; } const o = newOrder(q); o.id = uid(); Store.data.orders[o.id] = o; logActivity("order", q.lead, q.no); q.won = o.id; Store.data.quotes[q.id].won = o.id;
      if (q.lead && Store.data.leads[q.lead]) { Store.data.leads[q.lead].stage = "Won"; Store.data.leads[q.lead].gDirty = true; }
      Store.saveLocal(); G.soon(); ui.order = null; toast("Order created"); location.hash = "#order-" + o.id; break; }
    case "addpay": { const amt = num($("#pay-amt").value); if (!amt){ toast("Enter the amount"); return; } ui.order.payments = ui.order.payments || []; ui.order.payments.push({amount: amt, date: $("#pay-date").value || today(), mode: $("#pay-mode").value});
      if (ui.order.id){ Store.data.orders[ui.order.id] = JSON.parse(JSON.stringify(ui.order)); Store.data.orders[ui.order.id].gDirty = true; Store.saveLocal(); G.soon(); } rerender(); toast("Payment added"); break; }
    case "delpay": ui.order.payments.splice(Number(b.dataset.i), 1); if (ui.order.id){ Store.data.orders[ui.order.id] = JSON.parse(JSON.stringify(ui.order)); Store.saveLocal(); } rerender(); break;
    case "saveorder": { const o = ui.order; if (!o.client && !o.lead){ toast("Add the client name"); return; } const isNew = !o.id; if (isNew) o.id = uid(); o.gDirty = true;
      Store.data.orders[o.id] = JSON.parse(JSON.stringify(o)); if (isNew) logActivity("order", o.lead, o.no); Store.saveLocal(); G.soon(); toast("Order saved");
      if (location.hash !== "#order-" + o.id) location.hash = "#order-" + o.id; else rerender(); break; }
    case "delorder": { if (!guard("o-" + id)){ b.textContent = "Tap again to delete"; return; } const o = Store.data.orders[id]; G.queueDelete(o && o.gDue); delete Store.data.orders[id]; ui.order = null; Store.saveLocal(); G.soon(); location.hash = "#orders"; break; }
    case "addexp": { const f = $("#expform"), v = {}; $$("input,select", f).forEach(el => { if (el.name) v[el.name] = el.value; }); const amt = num(v.amount); if (!amt){ toast("Enter the amount"); return; }
      const xid = uid(); Store.data.expenses[xid] = {id: xid, amount: amt, date: v.date || today(), cat: v.cat, note: v.note.trim()}; Store.saveLocal(); G.soon(); ui.expMonth = (v.date || today()).slice(0, 7); toast("Expense added"); rerender(); break; }
    case "delexp": if (!guard("e-" + id)){ b.innerHTML = svg("check"); toast("Tap again to delete"); return; } delete Store.data.expenses[id]; Store.saveLocal(); rerender(); break;
    case "expmonth": ui.expMonth = b.dataset.v; rerender(); break;
    case "savetargets": { const v = readForm($("#tgtform")); S().targets = {meet: v.meet || 0, prop: v.prop || 0, order: v.order || 0}; Store.saveLocal(); toast("Targets saved"); break; }
    case "savecid": S().gClientId = $("#g-cid").value.trim(); Store.saveLocal(); G.inited = false; toast("Client ID saved"); rerender(); break;
    case "gconnect": G.connect(); break;
    case "gdisconnect": G.disconnect(); break;
    case "gsync": G.flush(true); break;
    case "gbackup": toast("Backing up…"); G.token(true).then(() => G.backup()).then(() => { toast("Backed up to Drive"); rerender(); }).catch(() => toast("Couldn't back up to Drive")); break;
    case "grestorelist": { const el = $("#gbackups"); el.innerHTML = `<p class="small muted">Loading backups…</p>`;
      G.token(true).then(() => G.listBackups()).then(fs => { el.innerHTML = fs.length ? `<div class="list" style="margin-top:8px">${fs.map(f => `<button class="li" data-act="grestore" data-id="${f.id}"><span class="grow"><b>${esc(f.name)}</b><span>${new Date(f.modifiedTime).toLocaleString("en-IN", {day: "numeric", month: "short", hour: "numeric", minute: "2-digit"})}</span></span>${svg("chev")}</button>`).join("")}</div>` : `<p class="small muted">No backups in Drive yet.</p>`; })
        .catch(() => { el.innerHTML = `<p class="small muted">Couldn't load Drive backups.</p>`; }); break; }
    case "grestore": toast("Downloading backup…"); G.fetchBackup(id).then(j => { ui.restoreFile = {name: "Drive backup", json: j}; rerender(); }).catch(() => toast("Couldn't download that backup")); break;
    case "qpdf": sharePdf(ui.quote); break;
    case "qdrive": drivePdf(ui.quote); break;
  }
});
document.addEventListener("input", e => {
  const el = e.target;
  if (el.dataset.in === "ord" && ui.order){ const f = el.dataset.f; ui.order[f] = el.type === "checkbox" ? el.checked : ["value","base","cost","fee"].includes(f) ? num(el.value) : el.value; }
});
document.addEventListener("change", e => {
  const el = e.target;
  if (el.dataset.in === "ord" && ui.order){ const f = el.dataset.f; ui.order[f] = el.type === "checkbox" ? el.checked : el.value;
    if (f === "partner"){ const p = Store.data.partners[el.value]; if (p && ui.order.fee == null) { ui.order.fee = Math.round(p.fixed ? num(p.fixed) : (num(ui.order.base) || 0) * (num(p.pct) || 0) / 100); rerender(); } } }
  if (el.dataset.in === "actradio"){ $$("#actform .chip").forEach(c => c.classList.toggle("on", c.contains(el))); }
});
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && G.on() && G.pendingCount()) G.flush(false); });

/* ---------- after render hooks ---------- */
function after(h){
  if (h.startsWith("t-")) runCalc();
  if (h.startsWith("p-")) hydratePhotos();
  if (h === "today") loadTodayEvents();
  const q = $("#q"); if (q && ui.focusQ){ q.focus(); q.setSelectionRange(q.value.length, q.value.length); ui.focusQ = false; }
}

/* ---------- events ---------- */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const a = b.dataset.act, id = b.dataset.id;
  const delGuard = key => { if (ui.del === key){ ui.del = null; return true; } ui.del = key; setTimeout(() => { if (ui.del === key){ ui.del = null; } }, 3000); return false; };
  switch(a){
    case "pfilter": ui.pfilter = b.dataset.v; rerender(); break;
    case "ptab": ui.ptab[id] = b.dataset.v; $$(".seg button").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", x===b); }); $("#ppanel").innerHTML = pPanel(byId[id], b.dataset.v); hydratePhotos(); break;
    case "gotoprices": ui.ptab[id] = "prices"; break;
    case "copy": copyText(b.dataset.text); break;
    case "addrow": { const p = byId[id], s = pState(p); s.rows.push({item:"", unit:"each", low:null, high:null, cost:null, sell:null, custom:true}); Store.saveDoc("products"); $("#ppanel").innerHTML = pPanel(p, "prices"); const ins = $$(`[data-id="${id}"][data-f="item"]`); if (ins.length) ins[ins.length-1].focus(); break; }
    case "delrow": { const key = id + "-" + b.dataset.i; if (!delGuard(key)){ b.textContent = "Tap again to remove"; return; } const p = byId[id], s = pState(p); s.rows.splice(Number(b.dataset.i), 1); Store.saveDoc("products"); $("#ppanel").innerHTML = pPanel(p, "prices"); break; }
    case "resetrows": { const p = byId[id], s = pState(p); delete s.rows; pState(p); Store.saveDoc("products"); $("#ppanel").innerHTML = pPanel(p, "prices"); toast("Reset to market list"); break; }
    case "toquote": { if (!ui.quote || ui.quote.id) ui.quote = newQuote(); addQuoteLine(id, Number(b.dataset.i)); toast("Added to quote"); location.hash = "#quote"; break; }
    case "delphoto": { const key = "ph-" + b.dataset.ph; if (!delGuard(key)){ toast("Tap ✕ again to remove the photo"); return; } const p = byId[id], s = pState(p); s.photos = s.photos.filter(x => x !== b.dataset.ph); Store.saveDoc("products"); Photos.del(b.dataset.ph); refreshPhotos(); break; }
    case "quiz": { const l = L.find(x => x.id === id); ui.quizAns.a[b.dataset.q] = Number(b.dataset.o); $("#quiz").innerHTML = quizHtml(l);
      if (Object.keys(ui.quizAns.a).length === l.quiz.length){ const score = l.quiz.filter((q,i) => ui.quizAns.a[i] === q.a).length; const pr = Store.data.progress; pr.lessons = pr.lessons || {}; pr.lessons[id] = {done:true, score}; Store.saveDoc("progress", 0); toast(`Lesson done: ${score}/3`); } break; }
    case "lessondone": { const pr = Store.data.progress; pr.lessons = pr.lessons || {}; pr.lessons[id] = {...(pr.lessons[id]||{}), done:true}; Store.saveDoc("progress", 0); rerender(); break; }
    case "upsadd": ui.upsRows.push({n:"New load", w:100, q:1}); rerender(); break;
    case "upsdel": ui.upsRows.splice(Number(b.dataset.i), 1); rerender(); break;
    case "ledratio": { const w = $("#f-w"); const h = $("#f-h"); if (w && h && num(w.value)) { h.value = fmt(num(w.value)*9/16, 1).replace(/,/g,""); runCalc(); } break; }
    case "lfilter": ui.leadFilter = b.dataset.v; rerender(); break;
    case "leadprod": { const v = b.dataset.v, arr = ui.leadDraftProducts = ui.leadDraftProducts || []; const i = arr.indexOf(v); if (i >= 0) arr.splice(i,1); else arr.push(v); b.classList.toggle("sel"); break; }
    case "newlead": ui.newLead = {id:"", stage:"New", type:"builder", products:[b.dataset.p]}; break;
    case "newleadtype": ui.newLead = {id:"", stage:"New", type:b.dataset.v, products:[]}; break;
    case "savelead": saveLead(); break;
    case "dellead": if (!delGuard("lead-"+id)){ b.textContent = "Tap again to delete"; return; } { const l = Store.data.leads[id]; if (l) G.queueDelete(l.gFollow, l.gVisit); } Store.deleteItem("leads", id); G.soon(); toast("Lead deleted"); location.hash = "#leads"; break;
    case "newquote": ui.quote = newQuote(); break;
    case "quotefor": ui.quote = newQuote(Store.data.leads[id]); break;
    case "surveyfor": { const l = Store.data.leads[id]; ui.survey = {id:"", tpl:"general", client: l.company || l.name, lead: id, date: today(), items:{}, notes:""}; break; }
    case "newsurvey": ui.survey = null; break;
    case "qcustom": ui.quote.lines.push({desc:"", qty:1, rate:null, gst:18}); refreshQuote(true); { const d = $$('[data-in="ql"][data-f="desc"]'); if (d.length) d[d.length-1].focus(); } break;
    case "qdel": ui.quote.lines.splice(Number(b.dataset.i), 1); refreshQuote(true); break;
    case "savequote": { const q = ui.quote; if (!q.lines.length){ toast("Add at least one item"); return; } if (!q.id){ q.id = uid(); logActivity("proposal", q.lead, q.no); } Store.data.quotes[q.id] = JSON.parse(JSON.stringify(q)); Store.saveItem("quotes", q.id);
      if (q.lead && Store.data.leads[q.lead] && ["New","Contacted","Meeting"].includes(Store.data.leads[q.lead].stage)){ Store.data.leads[q.lead].stage = "Quote sent"; Store.saveItem("leads", q.lead); }
      G.soon();
      toast("Quote saved"); if (location.hash !== "#quote-" + q.id) location.hash = "#quote-" + q.id; else rerender(); break; }
    case "copyquote": copyText(quoteText(ui.quote)); break;
    case "dupquote": { const c = JSON.parse(JSON.stringify(ui.quote)); const n = newQuote(); c.id = ""; c.no = n.no; c.date = today(); ui.quote = c; location.hash = "#quote"; break; }
    case "delquote": if (!delGuard("q-"+id)){ b.textContent = "Tap again to delete"; return; } Store.deleteItem("quotes", id); ui.quote = null; toast("Quote deleted"); location.hash = "#quotes"; break;
    case "svtpl": ui.survey.tpl = b.dataset.v; rerender(); break;
    case "savesurvey": { const s = ui.survey; if (!s.id) s.id = uid(); Store.data.surveys[s.id] = JSON.parse(JSON.stringify(s)); Store.saveItem("surveys", s.id); toast("Survey saved"); if (location.hash !== "#survey-" + s.id) location.hash = "#survey-" + s.id; else rerender(); break; }
    case "copysurvey": copyText(surveyText(ui.survey)); break;
    case "delsurvey": if (!delGuard("s-"+id)){ b.textContent = "Tap again to delete"; return; } Store.deleteItem("surveys", id); ui.survey = null; toast("Survey deleted"); location.hash = "#sell"; break;
    case "addnote": { const t = $("#newnote").value.trim(); if (!t){ toast("Write something first"); return; } Store.data.notes.items = Store.data.notes.items || []; Store.data.notes.items.push({id: uid(), text: t, at: new Date().toISOString()}); Store.saveDoc("notes", 0); rerender(); toast("Note added"); break; }
    case "delnote": if (!delGuard("n-"+id)){ b.innerHTML = svg("check"); toast("Tap again to delete"); return; } Store.data.notes.items = Store.data.notes.items.filter(n => n.id !== id); Store.saveDoc("notes", 0); rerender(); break;
    case "backup": makeBackup(); break;
    case "restoreok": { const f = ui.restoreFile; ui.restoreFile = null; restoreBackup(f); break; }
    case "restorecancel": ui.restoreFile = null; rerender(); break;
    case "install": ui.installEvt.prompt(); ui.installEvt = null; break;
    case "checkupdate": toast("Checking…"); if (navigator.serviceWorker) navigator.serviceWorker.getRegistration().then(r => r ? r.update() : null).then(() => setTimeout(() => location.reload(), 900)); else location.reload(); break;
    case "savesettings": { const f = $("#setform"); const v = {}; $$("input", f).forEach(el => v[el.name] = el.value.trim()); Store.data.settings = v; Store.saveDoc("settings", 0); toast("Details saved"); break; }
  }
});
document.addEventListener("input", e => {
  const el = e.target;
  if (el.id === "q"){ ui.q = el.value; ui.focusQ = true; clearTimeout(ui.qT); ui.qT = setTimeout(rerender, 160); return; }
  if (el.closest && el.closest("#calcform") && !el.dataset.in){ runCalc(); return; }
  const k = el.dataset.in; if (!k) return;
  if (k === "prow"){ const p = byId[el.dataset.id], s = pState(p), i = Number(el.dataset.i), f = el.dataset.f;
    s.rows[i][f] = f === "item" ? el.value : num(el.value);
    const r = s.rows[i], m = margin(r.cost, r.sell), mg = $(`#m-${p.id}-${i}`);
    if (mg){ mg.textContent = m == null ? "margin" : fmt(m,1) + "%"; mg.className = "mg " + (m == null ? "" : m >= 15 ? "good" : m >= 7 ? "low" : "bad"); }
    Store.saveDoc("products"); return; }
  if (k === "pnote"){ pState(byId[el.dataset.id]).note = el.value; Store.saveDoc("products", 1200); return; }
  if (k === "upsrow"){ const r = ui.upsRows[Number(el.dataset.i)]; r[el.dataset.f] = el.dataset.f === "n" ? el.value : num(el.value); runCalc(); return; }
  if (k === "q"){ ui.quote[el.dataset.f] = el.value; refreshQuote(false); return; }
  if (k === "ql"){ const l = ui.quote.lines[Number(el.dataset.i)]; l[el.dataset.f] = el.dataset.f === "desc" ? el.value : num(el.value); refreshQuote(false); return; }
  if (k === "sv"){ ui.survey[el.dataset.f] = el.value; return; }
  if (k === "svn"){ const it = ui.survey.items[el.dataset.k] = ui.survey.items[el.dataset.k] || {}; it.n = el.value; return; }
});
document.addEventListener("change", e => {
  const el = e.target, k = el.dataset.in;
  if (el.closest && el.closest("#calcform") && !k){ runCalc(); return; }
  if (k === "restore"){ const f = el.files && el.files[0]; el.value = ""; if (!f) return; ui.restoreFile = f; rerender(); return; }
  if (k === "photo"){ uploadPhoto(byId[el.dataset.id], el.files && el.files[0]); el.value = ""; return; }
  if (k === "qadd" && el.value){ const [pid, i] = el.value.split("|"); addQuoteLine(pid, Number(i)); el.value = ""; refreshQuote(true); toast("Item added"); return; }
  if (k === "qplace"){ ui.quote.place = el.value; refreshQuote(false); return; }
  if (k === "sv"){ ui.survey[el.dataset.f] = el.value; return; }
  if (k === "svc"){ const it = ui.survey.items[el.dataset.k] = ui.survey.items[el.dataset.k] || {}; it.ok = el.checked; const T = SV[ui.survey.tpl]; const c = $("#svcount"); if (c) c.textContent = T.items.filter((_, i) => (ui.survey.items[ui.survey.tpl+i]||{}).ok).length + "/" + T.items.length; return; }
});
$("#sync").addEventListener("click", () => { location.hash = "#notes"; });
$("#back").addEventListener("click", () => { const to = $("#back").dataset.to; if (to) location.hash = to; });

/* ---------- boot ---------- */
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); ui.installEvt = e; if (cur === "notes") rerender(); });
route();
Store.init().then(() => { rerender(); setSync("ok"); if (G.on()) setTimeout(() => G.flush(false), 1500); });
if ("serviceWorker" in navigator && location.protocol === "https:"){
  navigator.serviceWorker.register("sw.js").catch(() => {});
  let had = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (had) toast("App updated to the latest version"); had = true; });
}
try { const seen = localStorage.getItem("maya-build"); if (seen && seen !== BUILD) setTimeout(() => toast("App updated"), 600); localStorage.setItem("maya-build", BUILD); } catch(e){}
})();
