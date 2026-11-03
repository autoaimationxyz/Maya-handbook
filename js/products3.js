// Maya Traders app — product content, part 3 (added Nov 2026 from the Chemotech master list)
window.PRODUCTS = window.PRODUCTS.concat([
{
  id: "switchgear", name: "MCB, RCCB, DBs & Switches", cat: "Switchgear & Wiring", stage: "now", icon: "switch",
  tagline: "Sold with every wire order. Same buyers, same site visit, better margin than cables.",
  what: "Switchgear protects every circuit in a building. An MCB trips on overload or short circuit. An RCCB trips when current leaks to earth, which is what saves a person from a shock. The DB (distribution board) is the box that holds them. Isolators and changeovers switch between grid and DG or inverter. Modular switches and sockets are the face plates people touch every day.",
  why: "Every flat, floor, shop and office needs a DB with MCBs and at least one RCCB, plus dozens of switches and sockets. Builders buy them at the same stage as wires, often from the same dealer. Interior designers choose the switch range and finish, so they decide the brand.",
  how: [
    "MCB: a bimetal strip bends on overload (slow trip); a magnetic coil trips instantly on short circuit.",
    "RCCB: compares current going out on the phase with current coming back on the neutral. If more than 30 mA is missing, it has leaked to earth (maybe through a person), and it trips in about 30 ms.",
    "RCBO = MCB + RCCB in one device, for one circuit.",
    "DB: busbar inside feeds each MCB; SPN = single phase + neutral, TPN = three phase + neutral.",
    "Changeover / ATS: switches the building between grid and DG; ATS does it automatically."
  ],
  types: [
    {name: "MCB (SP / DP / TP / TPN)", desc: "SP = single pole for one phase circuit. DP = phase + neutral. TP/TPN for 3-phase. Ratings 6, 10, 16, 20, 25, 32, 40, 63 A."},
    {name: "MCB curves B / C / D", desc: "B for lights and sockets, C for ACs, motors and general use (most common), D for heavy motor starting and transformers."},
    {name: "RCCB / ELCB 30 / 100 / 300 mA", desc: "30 mA for people's safety (homes, bathrooms, EV chargers). 100/300 mA for fire protection on bigger feeders. Type AC, A or B by leakage type; EV chargers need Type B (or Type A + DC detection)."},
    {name: "RCBO", desc: "One device per circuit with both overload and leakage protection. Good for kitchens, geysers, EV points."},
    {name: "MCCB", desc: "63-1600 A breakers for main incomers and feeders in buildings and factories."},
    {name: "Distribution boards", desc: "SPN DB (4-16 way) for flats; TPN DB (4-12 way) for 3-phase floors; double-door and IP-rated for outdoors and dusty areas."},
    {name: "Isolators, changeover, ATS", desc: "Isolator for safe maintenance; manual changeover for grid/DG; ATS for automatic DG start sites."},
    {name: "Modular switches & sockets", desc: "6 A / 16 A switches and sockets, USB sockets, dimmers, plates in many finishes. Premium ranges sell to interior designers."},
    {name: "Industrial sockets", desc: "IP-rated 16-125 A plugs and sockets for factories, workshops and EV/outdoor points."}
  ],
  sizing: [
    "MCB rating must be at or below the wire's safe current: 1.5 sq mm → 6-10 A, 2.5 sq mm → 16 A, 4 sq mm → 20-25 A, 6 sq mm → 32 A.",
    "Typical 3 BHK flat: 1 main DP MCB or isolator (40-63 A), 1-2 RCCBs (30 mA, 40-63 A), 10-16 MCBs, in a 12-16 way SPN DB.",
    "3-phase builder floor: TPN DB per floor (8-12 way), a 4-pole RCCB or one RCCB per phase group, plus phase-wise MCBs.",
    "Split circuits so a fault in one room doesn't trip the whole house: lights, sockets, AC, geyser, kitchen each on their own MCB.",
    "Count switch points from the electrical drawing: each room usually 6-15 points. Builders buy by floor."
  ],
  specs: [
    {k: "In (A)", v: "Rated current of the MCB/RCCB, e.g. 32 A."},
    {k: "Breaking capacity (kA)", v: "Fault current it can safely break: 6 kA for homes, 10 kA for bigger buildings."},
    {k: "IΔn (mA)", v: "RCCB trip sensitivity: 30, 100 or 300 mA."},
    {k: "Poles", v: "SP, DP, TP, TPN, 4P."},
    {k: "Curve", v: "B, C or D trip characteristic."},
    {k: "IS/IEC 60898 / 61008 / 61009", v: "Standards for MCB, RCCB and RCBO. Ask for ISI marking."},
    {k: "Way (DB)", v: "Number of single-pole module slots in a DB."}
  ],
  brands: ["Havells", "Legrand", "Schneider", "L&T", "Siemens", "ABB", "SPC Electrotech", "C&S Electric", "Anchor (Panasonic)", "Century (laminates)"],
  buyers: "Builders, electrical contractors, interior designers, homeowners, shop and office fit-outs",
  where: "Same builder-floor belts as cables: DLF Phases, Sushant Lok, South City, Delhi floors (GK, Saket, Punjabi Bagh). Office fit-outs in Udyog Vihar and Cyber City.",
  wayIn: "Bundle with the wire order. Interior designers pick the switch range: show them finishes.",
  ask: [
    "Which brand and switch range does your electrician or designer want?",
    "How many flats or floors, and single or three phase?",
    "Do you want RCCB protection per floor, per flat, or per circuit (RCBO)?",
    "Is there a DG or inverter? Do you need a changeover?",
    "What stage is the site at: conduiting, wiring or finishing?"
  ],
  pitch: [
    "Wires, DBs, MCBs and switches from one person, delivered together, so the electrician never waits.",
    "A 30 mA RCCB is the one device that stops a shock from killing someone. Every flat should have one.",
    "I'll match each MCB to its wire size, so nothing overheats and nothing trips without reason."
  ],
  objections: [
    ["The electrician buys these himself.", "That's fine. I'll give him the same brands at a better rate and deliver with the wires. You get one bill and he saves a trip to the market."],
    ["RCCB keeps tripping, so we removed it.", "Nuisance tripping means there's a real leak somewhere, or one RCCB covers too much. Split it into two RCCBs or use RCBOs on wet areas. Don't remove the protection."],
    ["Local MCBs are half the price.", "Cheap MCBs often don't trip at their rating, which defeats the purpose. Branded ones are tested to IS 60898. It's a small cost per flat."]
  ],
  mistakes: [
    "Don't fit a 32 A MCB on 1.5 sq mm wire; the wire burns before the MCB trips.",
    "EV chargers need Type B RCD protection, not a plain Type AC RCCB.",
    "Check breaking capacity: 6 kA is fine for flats, but use 10 kA near big transformers."
  ],
  upsell: ["Cables & wires", "Earthing and SPDs", "Stabilizer", "Modular switch upgrade (premium range)", "EV charger point"],
  prices: [
    {item: "MCB 6-32 A SP, C curve (branded)", unit: "each", low: 180, high: 400},
    {item: "MCB 32-63 A DP", unit: "each", low: 700, high: 1600},
    {item: "RCCB 40-63 A DP, 30 mA", unit: "each", low: 2200, high: 4500},
    {item: "RCCB 40-63 A 4P, 30/100 mA", unit: "each", low: 4000, high: 8000},
    {item: "SPN DB 8-12 way (double door)", unit: "each", low: 1200, high: 3500},
    {item: "TPN DB 8 way (double door)", unit: "each", low: 5000, high: 12000},
    {item: "Modular switch / socket (6-16 A)", unit: "each", low: 60, high: 350},
    {item: "Changeover switch 63 A 4P", unit: "each", low: 2500, high: 6000}
  ],
  priceNote: "Rough estimates (Nov 2026), not from a price list. Switchgear is sold at a discount off the brand's list price; get the current Havells / Legrand / Schneider list before quoting.",
  calc: "cable"
},
{
  id: "lighting", name: "LED Lighting & Fans", cat: "Lighting & Fans", stage: "now", icon: "bulb",
  tagline: "Every home, office, shed and farmhouse buys it. Easy to explain, easy to upsell.",
  what: "LED lighting covers indoor fixtures (panels, downlights, battens, strip lights), industrial high-bay lights for factories and warehouses, flood and façade lights, street lights with poles, and solar street lights. Fans include ceiling, exhaust and wall fans, with energy-saving BLDC ceiling fans now popular.",
  why: "LEDs use 50-70% less power than old tube lights and last 5-10 times longer. Factories and warehouses change old metal-halide lights to LED high-bays and get payback in 1-2 years. New homes and offices need complete lighting at the finishing stage, and farmhouses need flood and street lighting.",
  how: [
    "An LED chip makes light when current passes through it; the driver converts AC mains to the steady DC the LEDs need.",
    "Lumens (lm) = how much light. Watts = power used. Efficacy (lm/W) = how efficient. Good LEDs give 100-150 lm/W.",
    "Colour temperature: 3000 K warm white (homes, hotels), 4000 K neutral (offices), 5700-6500 K cool white (factories, streets).",
    "Lux = light falling on a surface. Office desks need about 300-500 lux, warehouses 150-200, factory work areas 300-500.",
    "BLDC fan: an electronically controlled motor that uses about 28-35 W instead of 70-80 W for a normal fan."
  ],
  types: [
    {name: "Indoor fixtures & lamps", desc: "Panels (15-40 W), downlights, battens, COB spots, strip lights, bulbs."},
    {name: "Industrial high-bay", desc: "100-240 W for sheds and warehouses with 6-15 m ceilings. IP65 for dust."},
    {name: "Flood & façade lights", desc: "50-400 W for boundaries, building fronts, sports areas, farmhouses."},
    {name: "Street lights & poles", desc: "30-150 W luminaires on octagonal or conical poles; high-mast for large areas."},
    {name: "Solar street lights", desc: "Panel, battery and LED in one; no wiring needed. Farmhouses, villages, campuses."},
    {name: "Lighting control", desc: "Timers, sensors and smart control (DALI / Delta / Loytec) for offices and campuses."},
    {name: "Fans", desc: "Ceiling (normal and BLDC), exhaust and wall fans."}
  ],
  sizing: [
    "Quick indoor rule: about 1 W of good LED per sq ft for offices and homes; 0.5-0.8 W/sq ft for warehouses.",
    "Lumens needed = area (m²) × lux target ÷ 0.6 (losses). 1 m² = 10.76 sq ft.",
    "Example: 2,000 sq ft office (186 m²) at 400 lux → 186 × 400 ÷ 0.6 ≈ 124,000 lm → about 31 panels of 4,000 lm (36-40 W).",
    "High-bay spacing roughly equals mounting height: a 9 m shed needs a 150 W high-bay about every 8-9 m.",
    "Fans: one ceiling fan per 100-150 sq ft of room; 1200 mm sweep for normal rooms, 1400 mm for large halls."
  ],
  specs: [
    {k: "Watts (W)", v: "Power used."},
    {k: "Lumens (lm) & lm/W", v: "Light output and efficiency."},
    {k: "CCT (K)", v: "Colour of the light: 3000 K warm to 6500 K cool."},
    {k: "CRI", v: "How true colours look; above 80 is good, above 90 for showrooms."},
    {k: "IP rating", v: "IP20 indoor, IP65/66 outdoor and dusty sheds."},
    {k: "Surge protection (kV)", v: "4-10 kV driver surge protection for street and flood lights."},
    {k: "BEE star rating (fans)", v: "5-star BLDC fans use the least power."}
  ],
  brands: ["Philips (Signify)", "Havells", "Crompton Greaves", "Bajaj", "Orient", "L&T", "Delta (lighting control)", "Transrail / Valmont (poles)"],
  buyers: "Builders at finishing stage, interior designers, factories and warehouses, farmhouses, offices and showrooms",
  where: "Manesar, Udyog Vihar, Okhla and Faridabad sheds (high-bay retrofits); farmhouse belts (flood and street lights); new builder floors (indoor).",
  wayIn: "For factories, offer a free lighting audit with payback. For builders and designers, bundle with switches and fans at finishing.",
  ask: [
    "Is this a new site or replacing old lights? What lights are there now (tube, CFL, metal halide)?",
    "Area and ceiling height of each space?",
    "How many hours a day do the lights run? What is the tariff?",
    "What colour of light do you prefer: warm, neutral or cool white?",
    "Any outdoor area: boundary, parking, lawn, driveway?"
  ],
  pitch: [
    "Replacing old 400 W metal-halide lights with 150 W LED high-bays cuts the lighting bill by more than half, with payback in about a year.",
    "Branded LEDs give the lumens printed on the box and come with 2-5 year warranties.",
    "BLDC fans use less than half the power of normal fans: on inverter backup, the fans run twice as long."
  ],
  objections: [
    ["Chinese LEDs are cheaper.", "They often give half the light and fail in a year because of weak drivers. Branded high-bays have surge protection and warranty. Compare lumens, not just watts."],
    ["Our lights are working fine.", "They work, but they waste power. Let me count your fittings and show the monthly saving and payback in writing."],
    ["BLDC fans are expensive.", "Each one saves about 40-50 W. Running 12 hours a day, that's roughly ₹1,500-2,000 a year per fan, so it pays back in 1-2 years."]
  ],
  mistakes: [
    "Don't sell by watts alone; check lumens and lm/W.",
    "Outdoor lights need IP65+ and surge protection, or they fail in the first monsoon.",
    "Match colour temperature across a space; mixing warm and cool looks bad."
  ],
  upsell: ["Lighting control and sensors", "Solar street lights", "Switches and DBs", "Stabilizer (protects LED drivers)", "Annual maintenance for campuses"],
  prices: [
    {item: "LED panel 15-20 W (branded)", unit: "each", low: 350, high: 900},
    {item: "LED batten 20 W", unit: "each", low: 250, high: 600},
    {item: "LED high-bay 150 W, IP65 (branded)", unit: "each", low: 4500, high: 10000},
    {item: "LED flood light 100 W", unit: "each", low: 2000, high: 5000},
    {item: "LED street light 60 W", unit: "each", low: 2500, high: 6000},
    {item: "Solar street light (all-in-one)", unit: "each", low: 6000, high: 18000},
    {item: "BLDC ceiling fan 1200 mm", unit: "each", low: 3000, high: 5500},
    {item: "Exhaust fan 300 mm", unit: "each", low: 1200, high: 2500}
  ],
  priceNote: "Rough estimates (Nov 2026), not from a price list. LED prices vary a lot by brand and lumen output; confirm with the brand's dealer price list.",
  calc: "light"
},
{
  id: "cctv", name: "CCTV & Networking", cat: "Security & ICT", stage: "now", icon: "camera",
  tagline: "Every builder floor, farmhouse, shop and office wants cameras. Quick to quote, quick to close.",
  what: "CCTV systems record video of a property. IP cameras send video over network cable to an NVR (network video recorder); analogue/HD cameras send it over coaxial cable to a DVR. Networking covers the cables (Cat6/Cat6A, fibre), switches (including PoE switches that power cameras through the network cable), routers and racks that connect cameras, computers and Wi-Fi.",
  why: "Security is a top concern for farmhouses, builder floors, shops and offices. Insurance, RWAs and builders' buyers ask for it. Systems are easy to quote per camera, install in a day or two, and lead to repeat work: more cameras, storage upgrades and annual maintenance.",
  how: [
    "Camera captures video and compresses it (H.265 is the efficient standard).",
    "IP camera: one Cat6 cable carries both video and power (PoE) back to a PoE switch or NVR.",
    "NVR records on hard disks (1-12 TB) and lets you watch live or playback on a phone app.",
    "Storage needed grows with cameras, resolution and days of recording.",
    "The router connects the NVR to the internet for mobile viewing."
  ],
  types: [
    {name: "IP cameras (2-8 MP)", desc: "Best quality and flexibility. Dome for indoors, bullet for outdoors. Colour night vision and two-way audio models are popular."},
    {name: "Analogue / HD cameras + DVR", desc: "Cheaper for small sites with existing coaxial wiring."},
    {name: "NVR (4 / 8 / 16 / 32 channel)", desc: "Records IP cameras. Choose channels for future expansion."},
    {name: "PoE switches", desc: "Power and data for cameras over one cable. Industrial PoE for outdoor and harsh sites."},
    {name: "Cat6 / Cat6A cable & fibre", desc: "Cat6 up to 100 m per run. Fibre for long distances (large campuses, farmhouse gates)."},
    {name: "Routers, switches & racks", desc: "Office networks, Wi-Fi, wall-mount and floor racks."}
  ],
  sizing: [
    "Cover every entry point, driveway, parking, lift lobby and staircase. Typical builder floor: 4-8 cameras; farmhouse: 8-16.",
    "Storage (TB) ≈ cameras × Mbps × hours/day × days × 0.0108 ÷ 24. A 2 MP H.265 camera uses about 2 Mbps.",
    "Example: 8 cameras × 2 Mbps, 24 h, 30 days ≈ 8 × 2 × 30 × 0.0108 ≈ 5.2 TB → a 6 TB disk.",
    "Keep each Cat6 run under 90-100 m; use fibre or a PoE extender beyond that.",
    "PoE budget: each camera 5-8 W (up to 15-25 W with heaters or IR); choose a switch with spare budget."
  ],
  specs: [
    {k: "MP (megapixels)", v: "Resolution: 2 MP = 1080p, 4 MP, 5 MP, 8 MP (4K)."},
    {k: "Lens (mm)", v: "2.8 mm wide angle, 3.6 mm standard, 6 mm+ for long views."},
    {k: "IR / colour night vision", v: "Night range in metres; colour models use a white light."},
    {k: "IP66 / IK10", v: "Weatherproof / vandal-proof rating for outdoor cameras."},
    {k: "H.265 / H.265+", v: "Video compression; saves storage."},
    {k: "PoE (802.3af/at)", v: "Power over Ethernet standard and power per port."},
    {k: "NVR channels & HDD bays", v: "Cameras supported and number of hard disks."}
  ],
  brands: ["CP Plus", "Prama", "Sparsh", "Bonex", "D-Link", "TP-Link", "Netgear", "Cisco", "Digisol", "Dynamic Rack"],
  buyers: "Builders, farmhouse owners, homeowners, shops and showrooms, offices, clinics, schools, warehouses",
  where: "Every builder-floor belt at handover, farmhouse belts (Chhattarpur, Sultanpur, Westend Greens, Gwal Pahari), shop strips and offices.",
  wayIn: "Offer cameras with every builder handover and every farmhouse earthing or solar job. RWAs for gate and common-area cameras.",
  ask: [
    "Which areas must be covered? Any blind spots or past incidents?",
    "Do you want to watch on your phone? Is there internet on site?",
    "How many days of recording do you need?",
    "Indoor, outdoor, or both? Is night colour or audio needed?",
    "Is there existing wiring (coaxial or network) we can reuse?"
  ],
  pitch: [
    "See your home or site live on your phone from anywhere, with 30 days of recording.",
    "IP cameras with one cable for power and video: neater wiring and easy to add more later.",
    "I'll plan camera positions on a site walk, so there are no blind spots at gates or parking."
  ],
  objections: [
    ["We'll buy a kit online.", "Online kits don't include proper cabling, mounting, earthing or setup on your phone. I'll install, test every camera at night, and support it."],
    ["Wi-Fi cameras are simpler.", "Wi-Fi cameras drop out and need power points anyway. Wired PoE cameras are more reliable for a full property."],
    ["Cameras are too expensive.", "Start with entry, parking and gate (4 cameras) and add more later on the same NVR."]
  ],
  mistakes: [
    "Don't skip the night test; many cameras look good by day and poor at night.",
    "Size the hard disk for the recording days the customer expects.",
    "Use surge protection and earthing on outdoor camera lines, especially at farmhouses."
  ],
  upsell: ["Earthing and data-line SPDs", "UPS for NVR and router", "Office networking and Wi-Fi", "Video door phones", "Annual maintenance contract"],
  prices: [
    {item: "2 MP IP camera (dome/bullet)", unit: "each", low: 2200, high: 4500},
    {item: "4-5 MP IP camera, colour night", unit: "each", low: 3500, high: 7000},
    {item: "8-channel NVR", unit: "each", low: 4500, high: 9000},
    {item: "Surveillance hard disk 2 TB", unit: "each", low: 5000, high: 7500},
    {item: "8-port PoE switch", unit: "each", low: 3500, high: 8000},
    {item: "Cat6 cable, 305 m box", unit: "per box", low: 6000, high: 12000},
    {item: "4-camera HD kit with DVR, installed", unit: "per set", low: 14000, high: 24000},
    {item: "Installation per camera (cabling, mounting)", unit: "per camera", low: 500, high: 1500}
  ],
  priceNote: "Rough estimates (Nov 2026), not from a price list. Check current CP Plus / Prama dealer prices before quoting.",
  calc: "cctv"
}
]);
