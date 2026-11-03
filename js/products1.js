// Maya Traders app — product content, part 1 (power & energy)
// Prices: indicative market ranges in INR, before GST unless noted. Researched Nov 2026; verify with suppliers.
window.PRODUCTS = [
{
  id: "cables", name: "Cables & Wires", cat: "Power & Energy", stage: "now", icon: "cable",
  tagline: "Every building needs them. Your door-opener with builders and contractors.",
  what: "Wires carry electricity inside a building (lights, sockets, AC points). Cables are heavier: they bring power from the meter to the distribution board, feed motors and pumps, or run underground. Both are copper or aluminium conductors with plastic (PVC/XLPE) insulation. Size is written in sq mm: the cross-section area of the copper. Bigger sq mm = more current it can carry safely.",
  why: "A wrong or cheap wire overheats, melts insulation and causes fires. Builders want the right brand at the right price, delivered on time, so the electrician is never stuck waiting. It is a repeat-order product: every floor, every site, every month.",
  how: [
    "Current flowing through copper creates heat. Thicker copper = less resistance = less heat.",
    "Insulation keeps current inside and stops shocks. FR/FRLS/HFFR grades decide how it behaves in a fire.",
    "Voltage drop: over a long run, some voltage is lost in the wire. Long runs need a bigger size even if current is small."
  ],
  types: [
    {name: "House wire (single core, flexible)", desc: "0.75 to 6 sq mm, sold in 90 m coils. Used inside walls in conduit. 1.5 sq mm for lights and fans, 2.5 for 6A/16A sockets, 4 for geysers and ACs, 6 for EV charger or main feeders in homes."},
    {name: "FR / FRLS / HFFR / ZHFR", desc: "FR = flame retardant. FRLS = flame retardant, low smoke (common for homes and offices). HFFR/ZHFR = halogen-free, no toxic gas: hospitals, malls, data rooms. Builders in NCR mostly ask for FR or FRLS."},
    {name: "Multicore flexible cable", desc: "2, 3 or 4 cores in one sheath. For appliances, machines, temporary connections."},
    {name: "Armoured power cable (LT)", desc: "Steel wire or strip around the cores for underground or outdoor runs. Copper or aluminium, PVC or XLPE. E.g. 4C x 16 sq mm Al armoured from meter to building."},
    {name: "Control & instrumentation cable", desc: "Many thin cores (often 0.5 to 1.5 sq mm), shielded, for PLC, sensors and panels."},
    {name: "Solar DC cable", desc: "UV-resistant, double-insulated 4 and 6 sq mm cable between panels and inverter."},
    {name: "Data/CCTV/LAN cable", desc: "Cat6, coaxial. Small add-on for offices and homes."}
  ],
  sizing: [
    "Rule of thumb for copper house wire (in conduit): 1.5 sq mm ~ 10-13 A, 2.5 sq mm ~ 16-18 A, 4 sq mm ~ 22-24 A, 6 sq mm ~ 30-32 A, 10 sq mm ~ 40-45 A. Always follow the manufacturer's table.",
    "Current from load: single phase I = W / (230 x PF). Three phase I = W / (1.732 x 415 x PF).",
    "Keep voltage drop under 3-5%. For runs over ~25 m, check with the cable calculator and go one size up if needed.",
    "Aluminium carries about 60% of copper's current for the same size. Al is used for bigger feeders (16 sq mm and up) to save cost.",
    "Typical 3-4 BHK builder floor (one floor): about 8-15 coils of house wire in mixed sizes, plus one main feeder cable."
  ],
  specs: [
    {k: "sq mm", v: "Conductor cross-section area. The main size number."},
    {k: "Class 2 / Class 5", v: "Class 5 = fine strands = flexible (house wire). Class 2 = fewer, thicker strands (power cable)."},
    {k: "1.1 kV", v: "Voltage grade for LT (low tension) cables. Normal for buildings."},
    {k: "IS 694 / IS 1554 / IS 7098", v: "Indian standards. IS 694 = house wire. IS 1554 = PVC power cable. IS 7098 = XLPE power cable. Ask for ISI mark."},
    {k: "XLPE vs PVC", v: "XLPE handles more heat (90°C vs 70°C), so it carries more current per size. Preferred for power cables."},
    {k: "Core colours", v: "Red/yellow/blue = phases, black = neutral, green or green-yellow = earth."}
  ],
  brands: ["Polycab", "Havells", "Finolex", "KEI", "RR Kabel", "V-Guard", "Anchor (Panasonic)", "Lapp (control cables)"],
  buyers: "Builders, electrical contractors, interior fit-out contractors",
  where: "Gurugram builder floors: DLF Phases 1-5, Sushant Lok, South City, older HUDA sectors (stilt-plus-three projects). Delhi builder floors: Greater Kailash, Saket, Defence Colony, Punjabi Bagh, Rajouri Garden, Janakpuri, Paschim Vihar.",
  wayIn: "Builder contacts, then the electrical contractors they use. Order-backed only: buy after you have a confirmed order, don't stock.",
  ask: [
    "Which brand and grade does your electrician prefer (FR or FRLS)?",
    "How many floors / units, and at what stage is the site (slab, conduiting, wiring)?",
    "Do you buy per site or monthly? Who approves the purchase: you or the contractor?",
    "Do you also need the main incoming cable from the meter, and how long is that run?",
    "What credit period do you expect, and what is your current dealer's price?"
  ],
  pitch: [
    "Same brands you already use, delivered to site on the day your electrician needs them.",
    "I'll match your current price and also check the main feeder size for free, so you don't overpay for a bigger cable or under-size it.",
    "One person for wires, earthing and the stabilizer at handover: fewer vendors for you to chase."
  ],
  objections: [
    ["We already have a dealer.", "That's fine. Give me one site or one urgent order to compare price and delivery. If I'm not better, you lose nothing."],
    ["Your price is higher.", "Tell me the brand, size and price you're getting. Cable prices change with copper every week; I'll show you today's list price and my discount in writing."],
    ["Local brand is cheaper.", "It is, but cheap wire often has less copper than the size printed. A fire or insurance claim costs far more. I can show you the resistance and weight difference on the coil."]
  ],
  mistakes: [
    "Don't stock coils on speculation. Copper prices swing; buy against orders.",
    "Never quote without checking today's brand price list. Lists change often.",
    "Watch for fake branded wire in the market: check hologram, print and weight.",
    "Gurugram: the High Court stayed the stilt-plus-four policy (Apr 2026) and DTCP froze fresh approvals from 21 Jul 2026. Check a project's approvals before giving any credit; focus on stilt-plus-three, Delhi floors, farmhouses and renovations.",
    "Quote with a short validity and buy only against a confirmed PO and advance. Margins are thin against established dealers."
  ],
  upsell: ["Earthing pits at the wiring stage", "Distribution boards, MCB/RCCB", "Surge protection", "Servo stabilizer at handover", "EV charger point (6 sq mm run) in parking"],
  prices: [
    {item: "House wire 1.5 sq mm FR, 90 m", unit: "per coil", low: 1800, high: 2800},
    {item: "House wire 2.5 sq mm FR, 90 m", unit: "per coil", low: 2900, high: 4400},
    {item: "House wire 4 sq mm FR, 90 m", unit: "per coil", low: 4500, high: 6800},
    {item: "House wire 6 sq mm FR, 90 m", unit: "per coil", low: 6800, high: 10000},
    {item: "Armoured Al 4C x 16 sq mm", unit: "per metre", low: 180, high: 280},
    {item: "Armoured Cu 4C x 10 sq mm", unit: "per metre", low: 650, high: 1000}
  ],
  priceNote: "Dealer prices move with copper and aluminium every week. Brands publish list prices (MRP); dealers give a discount off list. Check current lists before quoting.",
  calc: "cable"
},
{
  id: "earthing", name: "Earthing, Lightning & Surge Protection", cat: "Power & Energy", stage: "now", icon: "earth",
  tagline: "The safety layer most homes and farmhouses get wrong. Easy to explain, easy to sell.",
  what: "Earthing gives fault current a safe path into the ground so people don't get shocks and breakers trip properly. Lightning protection catches a lightning strike on the roof and carries it safely down to earth. Surge protection (SPD) stops voltage spikes from damaging electronics (TV, AC, inverter, CCTV, servers).",
  why: "Shocks from appliances, burnt electronics after storms, inverters and ACs failing, and RCCBs tripping randomly are often earthing problems. Farmhouses in open land face real lightning risk. Offices with servers and CCTV lose equipment to surges.",
  how: [
    "An earth pit buries a conductor (pipe, rod or plate) deep into moist soil. Low resistance to ground = good earth.",
    "All metal bodies and the green earth wire of every socket connect to the earth pit through the earth bus.",
    "If a live wire touches a metal body, current flows to earth, the MCB/RCCB trips and the person is safe.",
    "Lightning arrester on the roof → thick down-conductor → dedicated lightning earth pit.",
    "An SPD in the distribution board diverts a spike to earth in microseconds."
  ],
  types: [
    {name: "GI pipe / plate earthing (conventional)", desc: "Pipe or plate with salt and charcoal. Cheap but needs regular watering and its resistance rises over time."},
    {name: "Chemical (maintenance-free) earthing", desc: "Copper-bonded or GI electrode with earth-enhancing compound (backfill). Stable low resistance, no watering. Now the standard in new homes and offices."},
    {name: "Copper plate earthing", desc: "Copper plate pit. Used for sensitive equipment and substations."},
    {name: "Conventional lightning arrester (Franklin rod)", desc: "Pointed rods on the roof edges joined by a conductor. Simple, covers a smaller area."},
    {name: "ESE lightning arrester", desc: "Early Streamer Emission head on a mast. One unit protects a large radius (often 40-100 m depending on model and height). Popular for farmhouses, factories and schools."},
    {name: "SPD Type 1 / Type 2 / Type 3", desc: "Type 1 at the main incoming (for direct lightning). Type 2 at distribution boards (most common). Type 3 near sensitive equipment."}
  ],
  sizing: [
    "Homes: at least 2 earth pits (electrical + backup or lightning). 4 BHK/villa: 2-3 pits. Farmhouse with lightning protection: 3 or more.",
    "Separate earth pits for: main electrical, UPS/inverter (often), lightning arrester, solar structure. Lightning pit must not be the same as electrical pit; they're bonded per standards.",
    "Target earth resistance: below 1 ohm for sensitive/IT, below 2-5 ohm for general building use. Test with an earth tester after installation and every 6-12 months.",
    "Rocky or sandy soil (Aravalli belt: Gwal Pahari, Sohna) needs deeper pits or more electrodes plus chemical backfill.",
    "SPD: one Type 2 SPD per distribution board feeding electronics; Type 1+2 at the main board for farmhouses and buildings with lightning protection."
  ],
  specs: [
    {k: "Earth resistance (ohm)", v: "Lower is better. Measured with an earth tester (3-point method)."},
    {k: "Electrode size", v: "e.g. 2 m or 3 m length, 50 mm or 80 mm dia. Longer = lower resistance."},
    {k: "Copper bonding (microns)", v: "Thickness of copper on a steel rod, e.g. 250 micron. More = longer life."},
    {k: "IS 3043 / IEC 62305", v: "IS 3043 = Indian earthing code. IEC 62305 / IS/IEC 62305 = lightning protection."},
    {k: "SPD Imax / Uc / Up", v: "Imax = largest surge it can handle (e.g. 40 kA). Uc = normal working voltage (275 V for 230 V systems). Up = voltage let through to equipment; lower is better."},
    {k: "ESE radius", v: "Protection radius at a given level (Level I-IV) and mast height."}
  ],
  brands: ["JMV", "Ashlok", "Indelec (ESE)", "Erico (nVent)", "OBO Bettermann (SPD)", "Phoenix Contact (SPD)", "Havells / Legrand / Schneider (SPD for DBs)"],
  buyers: "Builders, farmhouse owners, factories, offices with servers or CCTV",
  where: "Farmhouse belts: Chhattarpur, Sultanpur, Westend Greens, Bijwasan, Rajokri, Gwal Pahari, Sohna Road. New builder floors at the structure stage.",
  wayIn: "Farmhouse builders and owners; builders at the wiring stage.",
  ask: [
    "Do you get shocks from any appliance or tap? Does the RCCB trip without reason?",
    "Have you lost any electronics (inverter, TV, AC board, CCTV) after a storm?",
    "How many earth pits do you have now, when were they made, and are they tested?",
    "Any tall structure, water tank or open land around (lightning exposure)?",
    "Do you have solar, inverter/UPS, or a server/CCTV rack?"
  ],
  pitch: [
    "One storm can burn an AC's PCB or an inverter. A proper earth and an SPD cost less than one such repair.",
    "Chemical earthing is maintenance-free: no watering, stable for years, and I'll give you a tested resistance report.",
    "For a farmhouse, an ESE arrester on one mast covers the whole house, staff quarters and lawn."
  ],
  objections: [
    ["We already have earthing.", "Let me test it with an earth meter for free. If it reads fine, you've lost nothing. Many old pits read 10+ ohms."],
    ["Lightning never strikes here.", "Open farmhouse land and tall structures are exactly where it does. Even a nearby strike sends a surge through power and cable lines. That's what kills electronics."],
    ["Electrician will make a pit cheaper.", "A salt-and-charcoal pit is cheaper on day one but dries out and needs watering. Chemical earthing holds its value for 10+ years, and I'll test and certify it."]
  ],
  mistakes: [
    "Never connect the neutral and earth together at the house to 'fix' a problem; it's unsafe.",
    "Lightning down-conductors must not run through or along electrical conduits.",
    "Always give a test report after installation; it builds trust and future referrals."
  ],
  upsell: ["Servo stabilizer and UPS", "SPDs in every DB", "Solar (structure earthing)", "EV charger (needs dedicated earth)", "Annual earth testing contract"],
  prices: [
    {item: "Chemical earthing, per pit (installed)", unit: "per pit", low: 7000, high: 10000},
    {item: "GI pipe earthing, per pit", unit: "per pit", low: 3000, high: 4500},
    {item: "Copper plate earthing, per pit", unit: "per pit", low: 6000, high: 9000},
    {item: "Lightning protection for a house (arrester, conductor, pit)", unit: "per house", low: 15000, high: 25000},
    {item: "ESE lightning arrester with mast (farmhouse)", unit: "per set", low: 30000, high: 90000},
    {item: "SPD Type 2, single phase", unit: "each", low: 2500, high: 6000},
    {item: "SPD Type 2, three phase", unit: "each", low: 6000, high: 15000}
  ],
  priceNote: "Earthing and lightning prices from 2025 web estimates; ESE and SPD ranges are rough and vary a lot by brand and rating.",
  calc: "earth"
},
{
  id: "stabilizer", name: "Servo Voltage Stabilizer", cat: "Power & Energy", stage: "now", icon: "stabilizer",
  tagline: "Protects the whole home, clinic or office from high and low voltage.",
  what: "A servo stabilizer keeps output voltage steady (around 230 V single phase / 415 V three phase) even when the grid voltage goes up or down. A small motor (the servo) moves a carbon brush on a variable transformer (variac) to correct the voltage continuously.",
  why: "NCR grid voltage swings, especially in summer peaks, new sectors and farmhouse areas. Low voltage makes AC compressors and motors draw high current and burn. High voltage kills electronics. One whole-house or whole-office stabilizer protects everything at once.",
  how: [
    "A control card measures input voltage many times a second.",
    "If voltage is low or high, it drives the servo motor to move the brush on the variac.",
    "The buck-boost transformer adds or subtracts the needed voltage to the line.",
    "Output stays within about ±1% of the set value. Correction speed is typically 20-50 volts per second (higher on premium models)."
  ],
  types: [
    {name: "Single phase (1-phase)", desc: "For homes and shops on single phase supply. Typically 3-20 kVA."},
    {name: "Three phase balanced", desc: "Corrects all three phases together. Fine when phase voltages move together."},
    {name: "Three phase unbalanced (independent control)", desc: "Corrects each phase separately. Best for NCR where phase voltages differ. Recommend this for most 3-phase sites."},
    {name: "Air-cooled", desc: "Usually up to ~100-150 kVA. Indoor, low maintenance."},
    {name: "Oil-cooled", desc: "Larger ratings, factories, outdoor. Better heat handling."},
    {name: "Mainline vs appliance stabilizer", desc: "Appliance stabilizer = small box for one AC/fridge. Mainline = whole building. You sell mainline."}
  ],
  sizing: [
    "Add up running load in kW (or take sanctioned load from the electricity bill as a ceiling).",
    "kVA = kW / power factor (use 0.8). Add 25-30% margin. Round up to the next standard size.",
    "Motor and AC loads: add extra for starting current. Lifts and big pumps may need a separate check.",
    "Input range matters: standard 170-270 V (1ph) / 300-460 V (3ph). Wide range models (e.g. 140-280 V) for areas with very low voltage.",
    "Example: 3-phase home with 4 ACs and normal load ≈ 15 kW → 15/0.8 = 18.75 kVA × 1.25 ≈ 23 kVA → offer 25 kVA."
  ],
  specs: [
    {k: "kVA rating", v: "Output capacity."},
    {k: "Input voltage range", v: "Range over which it still gives correct output, e.g. 300-460 V 3-phase."},
    {k: "Output accuracy", v: "Usually ±1%."},
    {k: "Correction rate", v: "Volts per second, e.g. 32 V/s. Faster corrects dips quickly."},
    {k: "Efficiency", v: "Typically 96-98%."},
    {k: "Protections", v: "High/low cut-off, overload, single phasing, phase reversal, short circuit (MCB/MCCB)."},
    {k: "Bypass switch", v: "Lets power pass directly if the stabilizer is under service."}
  ],
  brands: ["Servokon", "V-Guard", "Krykard (shown in the Chemotech profile)", "Statcon", "Neeltron", "Purevolt", "Microtek", "Luminous"],
  buyers: "Premium homeowners, clinics, small offices, showrooms, IT and AI offices",
  where: "Builder floors at finishing stage, Udyog Vihar and Cyber City offices, Golf Course Road and Sohna Road clinics and showrooms.",
  wayIn: "Interior designers (fit-outs), tech contacts, builders at handover.",
  ask: [
    "Single phase or three phase supply? What is the sanctioned load on the bill?",
    "What are the big loads: how many ACs, geysers, lift, pumps, medical machines?",
    "Have you seen voltage problems: dimming lights, ACs tripping, burnt appliances?",
    "Do you have a DG set or inverter/UPS? (Stabilizer placement depends on it.)",
    "Where can it be installed? Need a dry, ventilated spot near the main board."
  ],
  pitch: [
    "One mainline stabilizer protects every AC, fridge and electronic item in the house; no separate boxes.",
    "Independent phase control: each phase is corrected separately, which is what NCR's unbalanced supply needs.",
    "I'll size it from your bill and load, not by guess. You won't overpay for a bigger unit."
  ],
  objections: [
    ["New ACs are 'stabilizer-free'.", "Inverter ACs handle a range like 150-260 V, but not surges and spikes, and not every appliance in the house is covered. The stabilizer protects everything at once."],
    ["It's expensive.", "Compare it to one AC compressor (₹15-25k) or a burnt TV board. The stabilizer pays for itself the first time it prevents one failure."],
    ["The electrician says we don't need it.", "Let me check the voltage at different times with a meter. If it's stable, I'll tell you honestly you don't need one."]
  ],
  mistakes: [
    "Don't undersize to win on price; an overloaded stabilizer fails and you lose the customer.",
    "For homes with DG sets, confirm the wiring arrangement with the electrician.",
    "Check the service network for the brand in NCR before committing."
  ],
  upsell: ["Online UPS for computers/medical equipment", "Earthing check + SPD", "Solar later"],
  prices: [
    {item: "1-phase 5 kVA servo", unit: "each", low: 14000, high: 22000},
    {item: "1-phase 10 kVA servo", unit: "each", low: 22000, high: 35000},
    {item: "3-phase 10 kVA air-cooled", unit: "each", low: 40000, high: 65000},
    {item: "3-phase 20 kVA air-cooled", unit: "each", low: 60000, high: 95000},
    {item: "3-phase 50 kVA air-cooled", unit: "each", low: 110000, high: 180000},
    {item: "3-phase 100 kVA oil-cooled", unit: "each", low: 200000, high: 320000}
  ],
  priceNote: "Rough market ranges; brand, unbalanced vs balanced control and input range change the price a lot. Get a supplier list.",
  calc: "stabilizer"
},
{
  id: "ups", name: "UPS (Uninterrupted Power Supply)", cat: "Power & Energy", stage: "now", icon: "ups",
  tagline: "Zero-break power for computers, servers, medical and office equipment.",
  what: "A UPS gives clean power with no break when the grid fails, using batteries. An online UPS converts AC to DC and back to AC all the time, so the output is always clean and there's zero switchover time. It's different from a home inverter, which has a small switchover gap and is meant for lights and fans.",
  why: "A power cut of even a few milliseconds can crash computers, reboot servers, corrupt data or interrupt medical equipment. Offices, clinics, labs, CCTV and IT/AI companies need guaranteed power until the DG starts or for a set backup time.",
  how: [
    "Rectifier converts incoming AC to DC and charges the batteries.",
    "Inverter converts DC back to clean AC for the load, continuously (double conversion).",
    "When mains fails, the batteries already connected keep the inverter running with no break.",
    "Static bypass sends mains straight to the load if the UPS has a fault or overload."
  ],
  types: [
    {name: "Offline / line-interactive UPS", desc: "Small (600 VA-3 kVA). Short switchover gap. Single PCs, home office."},
    {name: "Online UPS, single phase", desc: "1-20 kVA. Offices, clinics, small server rooms."},
    {name: "Online UPS, three phase", desc: "10 kVA to MW-scale. Data centres, hospitals, factories. Delta goes from 1 to 4000 kVA."},
    {name: "Modular UPS", desc: "Power modules in a rack. Add capacity later and replace a module without shutting down. For server rooms and data centres."},
    {name: "Home inverter (related)", desc: "Cheaper backup for homes: lights, fans, Wi-Fi, TV. Not zero-break, not for heavy loads."}
  ],
  sizing: [
    "List the loads in watts (PC ~150-250 W, server ~300-800 W, printer 50-600 W, CCTV NVR ~50 W).",
    "UPS kVA = total watts / output power factor (0.8 for older, 0.9-1.0 for modern units) + 20-25% margin.",
    "Battery Ah needed ≈ (Load W × backup hours) / (battery bank voltage × 0.8 efficiency).",
    "Never put laser printers, ACs, heaters or motors on a small online UPS (huge inrush current).",
    "Example: 10 PCs × 200 W + 1 server 500 W = 2.5 kW → 2.5/0.9 × 1.2 ≈ 3.3 kVA → offer 5 kVA if growth expected."
  ],
  specs: [
    {k: "kVA / kW", v: "kVA is apparent power; kW is real power it can supply. Output PF 0.9 means 10 kVA = 9 kW."},
    {k: "Topology", v: "Online double conversion is the gold standard."},
    {k: "DC bus voltage", v: "e.g. 192 V or 360 V; decides how many 12 V batteries in series (360 V = 30 × 12 V)."},
    {k: "Backup time", v: "Minutes at a given load. Depends on battery Ah."},
    {k: "Efficiency / ECO mode", v: "93-97% online; ECO mode higher."},
    {k: "Input PF / THDi", v: "Modern UPS have input PF > 0.99 and low harmonics, kinder to DG sets."}
  ],
  brands: ["Delta (your partner)", "APC (Schneider)", "Vertiv (Emerson/Liebert)", "Eaton", "Numeric (Legrand)", "Socomec", "Microtek / Luminous (smaller)"],
  buyers: "Premium homeowners, clinics, small offices, showrooms, IT and AI offices",
  where: "Udyog Vihar and Cyber City offices, Golf Course Road and Sohna Road clinics and showrooms, builder floors at finishing stage.",
  wayIn: "Interior designers (fit-outs), tech contacts, builders at handover.",
  ask: [
    "What exactly must run during a cut: computers, servers, CCTV, medical machines?",
    "How long must it run: just until the DG starts (10-15 min) or hours?",
    "Single or three phase available? Is there a DG set?",
    "Is there space and ventilation for a battery rack?",
    "Any existing UPS? Age of batteries?"
  ],
  pitch: [
    "Delta is one of the world's big power electronics companies, with online UPS from 1 kVA to 4000 kVA. Same family as your VFDs and EV chargers.",
    "Online UPS means zero break. Your servers and systems never notice a power cut.",
    "I'll size it for what you have today and leave room to grow, with a battery plan for the backup you actually need."
  ],
  objections: [
    ["We have an inverter.", "An inverter has a switchover gap and dirty output for electronics. An online UPS is zero-break and clean. It's what servers and medical equipment need."],
    ["We have a DG.", "The DG takes 10-60 seconds to start. Without a UPS, everything reboots. The UPS covers that gap."],
    ["Batteries are expensive.", "We size the battery bank to your real need; for DG backup sites, 10-15 minutes is enough. Lithium batteries cost more but last longer and need less space."]
  ],
  mistakes: [
    "Don't forget battery cost in your quote. It can be half the total.",
    "Don't load an online UPS beyond ~80%.",
    "Batteries need replacing every 3-5 years (VRLA). Plan an AMC: repeat business."
  ],
  upsell: ["Batteries and battery racks", "Servo stabilizer ahead of the UPS", "Earthing for IT", "Annual maintenance contract (AMC)", "Solar hybrid later"],
  prices: [
    {item: "Online UPS 1 kVA (internal batteries)", unit: "each", low: 12000, high: 20000},
    {item: "Online UPS 3 kVA", unit: "each", low: 28000, high: 50000},
    {item: "Online UPS 6 kVA (without batteries)", unit: "each", low: 55000, high: 90000},
    {item: "Online UPS 10 kVA (without batteries)", unit: "each", low: 90000, high: 160000},
    {item: "Online UPS 20 kVA, 360 V DC", unit: "each", low: 240000, high: 450000},
    {item: "SMF battery 12 V 100 Ah", unit: "each", low: 9000, high: 14000},
    {item: "SMF battery 12 V 42 Ah", unit: "each", low: 4000, high: 6500}
  ],
  priceNote: "20 kVA range from a 2026 web listing; others are rough estimates. Delta dealer prices come from Chemotech or Delta's channel.",
  calc: "ups"
},
{
  id: "solar", name: "Solar Power Systems (with battery backup)", cat: "Power & Energy", stage: "m2", icon: "solar",
  tagline: "Cuts the electricity bill. Big tickets for farmhouses, villas and factories.",
  what: "Solar panels on the roof convert sunlight into DC electricity. An inverter turns it into AC for the building. On-grid systems export extra power to the grid through a net meter. Hybrid systems add batteries for backup. Off-grid systems run fully on solar and batteries.",
  why: "Electricity bills in NCR are high for big homes and factories. Solar pays back in about 3-5 years and then runs for 25 years. Government subsidy under PM Surya Ghar helps homes (up to ₹78,000), and Delhi now adds its own subsidy of up to ₹78,000 (combined up to ₹1.56 lakh inside Delhi). Businesses get about 3-4 year payback plus 40% accelerated depreciation. CAQM rules now restrict DG sets in NCR, so hybrid solar with batteries is the clean backup.",
  how: [
    "Panels (modules) produce DC power when light hits the silicon cells.",
    "Panels are wired in strings to reach the inverter's voltage range.",
    "The inverter converts DC to AC and syncs with the grid.",
    "Net meter records units exported and imported; you pay only for the net.",
    "Hybrid inverter also charges batteries and powers backup loads when the grid is off."
  ],
  types: [
    {name: "On-grid (grid-tied)", desc: "Cheapest, no battery. Shuts down in a power cut (safety). Best payback."},
    {name: "Hybrid", desc: "On-grid plus batteries. Backup during cuts. Costs more. Popular for farmhouses and villas."},
    {name: "Off-grid", desc: "No grid connection. Batteries essential. For remote sites, farm pumps."},
    {name: "Panel types", desc: "Mono PERC, TOPCon, bifacial. TOPCon is the current mainstream; bifacial gains from reflected light on raised structures."},
    {name: "Inverter types", desc: "String inverter (common), micro-inverters (per panel, small homes), hybrid inverter (with battery)."},
    {name: "Solar water pump", desc: "For farmhouses and agriculture. PM-KUSUM scheme for farmers."}
  ],
  sizing: [
    "In NCR, 1 kW produces about 120 units (kWh) per month on average, about 4 units per day. Winter (Dec-Jan) is lower due to smog and short days.",
    "System kW ≈ average monthly units ÷ 120. Check last 12 months of bills.",
    "Roof area: about 80-100 sq ft of shadow-free roof per kW.",
    "Sanctioned load caps the size you can net-meter (usually up to sanctioned load).",
    "Battery (hybrid): kWh needed = backup load kW × hours ÷ 0.8 (usable).",
    "Example: bill shows ~1,200 units/month → 1200/120 = 10 kW → needs ~900 sq ft shadow-free roof."
  ],
  specs: [
    {k: "kWp", v: "Kilowatt-peak: panel output under standard test conditions."},
    {k: "Panel wattage", v: "e.g. 550-600 Wp per panel now common. 10 kW ≈ 17-18 panels."},
    {k: "Efficiency", v: "Panel efficiency ~21-23% for TOPCon."},
    {k: "DCR / non-DCR", v: "DCR = Domestic Content Requirement (Indian-made cells). Required for subsidy under PM Surya Ghar."},
    {k: "ALMM", v: "Approved List of Models and Manufacturers. Govt-backed projects need ALMM modules."},
    {k: "Net metering", v: "Bi-directional meter from the DISCOM (BSES/Tata Power-DDL in Delhi, DHBVN in Gurugram)."},
    {k: "Structure", v: "GI/HDG structure; elevated structures for terraces in use."}
  ],
  brands: ["Panels: Waaree, Adani, Tata Power Solar, Vikram, Rayzon, Goldi, Premier", "Inverters: Delta, Growatt, Sungrow, Solis, Huawei, Fronius, Havells", "Batteries: Exide, Luminous, Amara Raja; lithium: various"],
  buyers: "Large homes and farmhouses (10-20 kW), small factories, schools, warehouses",
  where: "Farmhouse belts, DLF and Sushant Lok villas, industrial sheds in Manesar, Udyog Vihar, Okhla, Faridabad, Noida.",
  wayIn: "Farmhouse builders; upsell to every stabilizer or earthing customer.",
  ask: [
    "Can I see the last 6-12 months of electricity bills? (units and sanctioned load)",
    "How much shadow-free roof is available? Any water tanks, trees or taller buildings shading it?",
    "Do you want backup during power cuts (hybrid) or only bill savings (on-grid)?",
    "Do you run a DG set? How many hours a month?",
    "Home or business? (Subsidy only for residential.)"
  ],
  pitch: [
    "Your bill of ₹X a month can drop by 70-90%. The system pays for itself in about 3-5 years and keeps producing for 25.",
    "Homes get up to ₹78,000 central subsidy; inside Delhi the state adds up to ₹78,000 more. Businesses can claim 40% accelerated depreciation.", "With DG sets now restricted in NCR, a hybrid solar system is backup you are allowed to run every day.",
    "With a hybrid system, your essential loads keep running in a power cut, without running the DG."
  ],
  objections: [
    ["Solar doesn't work in NCR winter/smog.", "Output drops in Dec-Jan, but averaged over the year 1 kW gives about 120 units a month here. The payback numbers already include that."],
    ["It's too expensive.", "Look at it as prepaying 4 years of bills and then getting 20+ years almost free. With subsidy, a home system costs much less."],
    ["Maintenance is a headache.", "Panels need a water wash every 2-3 weeks in dusty months. That's it. Inverters have 5-10 year warranties, panels 25-30 years on output."]
  ],
  mistakes: [
    "Don't promise subsidy for commercial or factory installations; it's residential only.",
    "Subsidised home solar needs a PM Surya Ghar empanelled vendor per DISCOM. Until Maya qualifies, tie up with an empanelled installer (or Chemotech, if empanelled).",
    "Competition is heavy (26,000+ empanelled vendors). Win on trust, bundles and after-sales, not the lowest price per kW.",
    "Check the roof's load-bearing and waterproofing before structure work.",
    "Net metering approval takes weeks; set expectations.",
    "Shadow analysis: even one shaded panel drags a whole string down."
  ],
  upsell: ["Earthing for solar structure + SPD", "EV charger (charge the car on solar)", "Hybrid batteries", "Cleaning AMC", "Stabilizer"],
  prices: [
    {item: "On-grid solar, up to 5 kW", unit: "per kW", low: 60000, high: 67000},
    {item: "On-grid solar, 5-10 kW", unit: "per kW", low: 50000, high: 55000},
    {item: "On-grid solar, 10-20 kW", unit: "per kW", low: 45000, high: 50000},
    {item: "On-grid solar, 20-50 kW", unit: "per kW", low: 40000, high: 45000},
    {item: "Hybrid add-on (batteries + hybrid inverter)", unit: "per system", low: 50000, high: 80000}
  ],
  priceNote: "Delhi NCR web rates, 2026. PM Surya Ghar central subsidy: ₹30,000 (1 kW), ₹60,000 (2 kW), ₹78,000 cap (3 kW+). Delhi adds its own subsidy of up to ₹78,000 (combined up to ₹1.56 lakh; Delhi portal launched Sep 2026); Haryana has no state top-up, so Gurugram homes get only the central amount. Subsidised home solar must go through a PM Surya Ghar empanelled vendor; commercial solar has no subsidy and no empanelment rule. GST on solar systems changed in 2025; confirm current rate with your CA.",
  calc: "solar"
},
{
  id: "ev", name: "EV Chargers (AC & DC)", cat: "Power & Energy", stage: "m2", icon: "ev",
  tagline: "Every new EV owner, society and dealership needs one. Delta makes both AC and DC.",
  what: "An EV charger safely supplies power to an electric car's battery. AC chargers (3.3-22 kW) send AC power, and the car's onboard charger converts it to DC: used at homes, offices, societies. DC fast chargers (30-240 kW) convert to DC themselves and charge much faster: used at highways, dealerships and fleet depots.",
  why: "EV sales in NCR are rising fast. Every buyer needs a home charger, every society needs common chargers, and dealerships and offices want chargers for customers and staff. It's a modern, visible product that opens doors to builders and car dealers.",
  how: [
    "The charger talks to the car (control pilot signal) and agrees on how much current to send.",
    "It checks earthing and leakage before turning power on (safety).",
    "AC charger: power goes to the car's onboard charger, which limits speed (most cars take 7.2-11 kW AC).",
    "DC charger: converts to DC and feeds the battery directly at high power.",
    "Smart chargers connect over Wi-Fi/4G for app control, scheduling, billing (OCPP)."
  ],
  types: [
    {name: "3.3 kW portable / 15A", desc: "Comes with many cars. Plugs into a proper 15A socket. Slow: overnight top-up."},
    {name: "7.2/7.4 kW AC wallbox (single phase)", desc: "Most popular home charger. Full charge of a typical 30-40 kWh car in about 5-6 hours."},
    {name: "11 / 22 kW AC (three phase)", desc: "For 3-phase homes, offices, societies. Only useful if the car accepts 11 kW+ AC."},
    {name: "DC fast 30-60 kW", desc: "Dealerships, offices, fleet depots, small public stations. 30-80% in about 30-60 minutes."},
    {name: "DC 120-240 kW", desc: "Highway and public charging hubs."},
    {name: "Connectors", desc: "Type 2 (AC, standard in India now), CCS2 (DC, standard for cars), GB/T and Bharat chargers for older/fleet vehicles."}
  ],
  sizing: [
    "Charge time (hours) ≈ battery kWh to add ÷ (charger kW × 0.9). The car's onboard charger limit caps AC speed.",
    "7.2 kW charger draws about 32 A on single phase. Needs 6 sq mm copper dedicated circuit, 40 A MCB, Type B RCCB (or Type A + 6 mA DC detection in the charger), and Type 2 SPD.",
    "Check sanctioned load: a 7.2 kW charger plus the house's evening load may need a load enhancement from the DISCOM.",
    "Dedicated earth: target below ~5 ohm; a separate earth pit is often needed.",
    "Societies: plan load management (sharing power across chargers) instead of a huge new connection."
  ],
  specs: [
    {k: "Output kW", v: "3.3, 7.2/7.4, 11, 22 (AC); 30, 60, 120+ (DC)."},
    {k: "Connector", v: "Type 2 for AC, CCS2 for DC (cars)."},
    {k: "IP rating", v: "IP54/IP55 for outdoor/parking use."},
    {k: "OCPP 1.6 / 2.0", v: "Protocol for smart chargers to connect to apps and billing software."},
    {k: "RFID / app", v: "Who can use the charger; useful for societies and offices."},
    {k: "Protections", v: "RCD, overcurrent, over/under voltage, earth fault, surge."}
  ],
  brands: ["Delta (your partner: AC & DC)", "Tata Power EZ Charge", "Exicom", "Statiq", "Servotech", "Havells MotrON", "ABB", "Jio-bp pulse (public)"],
  buyers: "Premium homeowners, builders, housing societies, car dealerships, offices, hotels",
  where: "New builder floors, car dealership strips (Sohna Road, Golf Course Extension, Delhi), office parking.",
  wayIn: "Auto contacts (dealerships), builders, solar customers. Delhi had about 8,849 charging points in Jan 2026 against a need of about 36,000 by 2030.",
  ask: [
    "Which car(s)? (Battery size and onboard charger limit decide the charger.)",
    "Single or three phase at home? Sanctioned load?",
    "Distance from the main board to the parking spot?",
    "Covered or open parking? Society permission needed?",
    "Do you want app control, scheduling, or usage tracking?"
  ],
  pitch: [
    "A 7.2 kW wallbox charges most cars fully overnight, safer than a 15A socket, with proper earthing and protection.",
    "Delta makes both home AC and DC fast chargers; one brand from your home to your dealership.",
    "Pair it with solar and you're charging your car almost free during the day.",
    "Delhi's draft EV Policy 2.0 wants 20% of new-building parking pre-wired for charging and a public charger at every vehicle dealership. Get ahead of it now."
  ],
  objections: [
    ["The car came with a charger.", "That portable one is 3.3 kW: slow, and it depends on the socket's wiring. A wallbox charges about twice as fast with proper protection."],
    ["The dealer installs one.", "Many dealers only give the box. Installation, cabling, earthing and load approval are separate. I handle all of it."],
    ["Society won't allow it.", "Most societies now allow chargers with a separate meter or sub-meter. I can help with the proposal and load calculation for the RWA."]
  ],
  mistakes: [
    "Never install on an existing socket circuit. Always a dedicated circuit.",
    "Don't skip RCD/earth checks; EV chargers refuse to work on bad earthing.",
    "11/22 kW AC is wasted on a car that accepts only 7.2 kW AC."
  ],
  upsell: ["6 sq mm cable run and DB", "Earthing pit", "SPD", "Solar", "Load enhancement paperwork"],
  prices: [
    {item: "3.3 kW portable charger", unit: "each", low: 8000, high: 12000},
    {item: "7.2 kW AC wallbox, basic", unit: "each", low: 35000, high: 45000},
    {item: "7.2 kW AC wallbox, smart/app", unit: "each", low: 45000, high: 65000},
    {item: "11 kW AC (3-phase)", unit: "each", low: 55000, high: 85000},
    {item: "Installation: cable, MCB/RCBO, SPD, conduit, labour", unit: "per site", low: 8000, high: 20000},
    {item: "DC fast charger 30 kW", unit: "each", low: 500000, high: 800000},
    {item: "DC fast charger 60 kW", unit: "each", low: 1000000, high: 1600000}
  ],
  priceNote: "AC charger and installation ranges from 2026 web guides. DC charger prices are rough estimates; get Delta's price list.",
  calc: "ev"
}
];
