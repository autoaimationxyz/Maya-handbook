// Lessons, customer playbooks and survey checklists
window.LESSONS = [
{
  id: "basics", title: "Voltage, current, power", mins: 4,
  intro: "Three words you'll use in every meeting.",
  body: [
    ["Voltage (V)", "The electrical 'pressure' that pushes current. Homes in India get 230 V single phase; buildings with bigger loads get 415 V three phase."],
    ["Current (A, amps)", "How much electricity is flowing. Wires, MCBs and cables are sized by current. More current = more heat."],
    ["Power (W, kW)", "The work being done. Power = Voltage × Current (× power factor in AC). 1 kW = 1,000 W."],
    ["Energy (kWh = units)", "Power × time. A 1 kW heater running 1 hour uses 1 kWh, which is the '1 unit' on the electricity bill."],
    ["Quick maths", "Single phase: Amps ≈ Watts ÷ 230 (for heaters). With motors/ACs use Watts ÷ (230 × 0.8). Example: a 2 kW geyser draws 2000 ÷ 230 ≈ 8.7 A."]
  ],
  quiz: [
    {q: "A 1.5 kW AC runs for 4 hours. How many units does it use?", o: ["1.5", "4", "6", "60"], a: 2, why: "1.5 kW × 4 h = 6 kWh = 6 units."},
    {q: "What decides the size of a wire?", o: ["Voltage", "Current", "Colour", "Brand"], a: 1, why: "Wires are sized by the current they must carry safely."},
    {q: "1 kW equals…", o: ["100 W", "1,000 W", "10,000 W", "746 W"], a: 1, why: "Kilo = 1,000."}
  ]
},
{
  id: "phase", title: "Single phase vs three phase", mins: 4,
  intro: "Why big homes, offices and factories use three phase.",
  body: [
    ["Single phase", "One live wire (phase) + neutral. 230 V. Common for small homes, shops. Usually up to about 7-10 kW sanctioned load."],
    ["Three phase", "Three live wires (R, Y, B) + neutral. 415 V between phases, 230 V phase-to-neutral. Big homes, builder floors, offices, factories, anything with motors."],
    ["Why it matters", "Three phase carries more power on smaller cables, and 3-phase motors run smoother. Stabilizers, UPS, EV chargers and VFDs come in 1-phase and 3-phase versions; always ask which supply the site has."],
    ["How to check", "Look at the meter and main board: three phase has 3 incoming phase wires and usually a 4-pole main switch (TPN/4P MCB). The bill also shows connection type and sanctioned load."],
    ["Unbalanced phases", "In NCR, loads are often uneven across R, Y, B, so phase voltages differ. That's why independent-phase (unbalanced) servo stabilizers are recommended."],
    ["Formula", "3-phase current I = P ÷ (1.732 × 415 × PF). A 15 kW 3-phase load at PF 0.8 ≈ 26 A per phase."]
  ],
  quiz: [
    {q: "Voltage between two phases in a 3-phase supply is about…", o: ["230 V", "415 V", "110 V", "11 kV"], a: 1, why: "Phase-to-phase is ~415 V; phase-to-neutral is ~230 V."},
    {q: "Why recommend an unbalanced (independent) servo stabilizer in NCR?", o: ["It's cheaper", "Each phase voltage can differ", "It needs no wiring", "It works without load"], a: 1, why: "It corrects each phase separately."},
    {q: "Which has a 4-pole main switch?", o: ["Single phase", "Three phase", "DC supply", "Solar panel"], a: 1, why: "3 phases + neutral."}
  ]
},
{
  id: "kva", title: "kW vs kVA and power factor", mins: 5,
  intro: "The single most-asked sizing question for UPS, stabilizers and DG sets.",
  body: [
    ["kW (real power)", "Power that actually does work: heat, light, motion. Bills charge for kWh."],
    ["kVA (apparent power)", "Total power the supply must deliver, including the part that just flows back and forth for motors and electronics. UPS, stabilizers, transformers and DG sets are rated in kVA."],
    ["Power factor (PF)", "PF = kW ÷ kVA. Between 0 and 1. Heaters ≈ 1.0; motors and old equipment 0.7-0.85; modern electronics with PF correction 0.95+."],
    ["Converting", "kVA = kW ÷ PF. With PF 0.8, a 16 kW load needs 20 kVA. Use 0.8 when unsure."],
    ["Why it matters to you", "If a client says 'I have 10 kW of load' and you sell a 10 kVA stabilizer, it's undersized. Always convert and add 20-30% margin."],
    ["Industrial angle", "Low PF means higher current, bigger cables, and in factories a penalty from the DISCOM. Capacitor banks or APFC panels fix PF; that's another product conversation."]
  ],
  quiz: [
    {q: "A 12 kW load at PF 0.8 needs how many kVA?", o: ["9.6 kVA", "12 kVA", "15 kVA", "20 kVA"], a: 2, why: "12 ÷ 0.8 = 15 kVA (then add margin)."},
    {q: "Which is rated in kVA?", o: ["Electricity bill", "Heater", "Servo stabilizer", "LED bulb"], a: 2, why: "Stabilizers, UPS, DG sets and transformers use kVA."},
    {q: "Power factor of a pure heater is about…", o: ["0.5", "0.8", "1.0", "1.5"], a: 2, why: "Resistive loads have PF ≈ 1."}
  ]
},
{
  id: "bill", title: "Reading an electricity bill", mins: 4,
  intro: "The bill tells you load, usage and savings potential. Ask for it in every meeting.",
  body: [
    ["Sanctioned / contracted load (kW or kVA)", "The maximum load the DISCOM has approved. Caps solar net-metering size and EV charger additions."],
    ["Units consumed (kWh)", "Monthly usage. Solar size ≈ monthly units ÷ 120 (NCR)."],
    ["Tariff (₹/unit)", "Energy charge per unit; slab-based for homes. Factories pay commercial/industrial rates plus demand charges."],
    ["Fixed / demand charges", "Charged on sanctioned load or maximum demand regardless of use."],
    ["Power factor / kVAh billing", "Some industrial bills charge on kVAh, so poor PF directly increases the bill."],
    ["Who supplies", "Delhi: BSES Rajdhani, BSES Yamuna, Tata Power-DDL, NDMC. Gurugram/Faridabad: DHBVN. Noida: NPCL/PVVNL."]
  ],
  quiz: [
    {q: "A home uses 900 units/month. Rough solar size in NCR?", o: ["3 kW", "7.5 kW", "12 kW", "20 kW"], a: 1, why: "900 ÷ 120 = 7.5 kW."},
    {q: "Which DISCOM supplies Gurugram?", o: ["BSES", "Tata Power-DDL", "DHBVN", "NPCL"], a: 2, why: "Dakshin Haryana Bijli Vitran Nigam."},
    {q: "What limits how big a net-metered solar system can be?", o: ["Roof colour", "Sanctioned load", "Number of floors", "Wire brand"], a: 1, why: "Usually capped at sanctioned load."}
  ]
},
{
  id: "protection", title: "MCB, RCCB, MCCB, SPD", mins: 5,
  intro: "The boxes in every distribution board, and what each one stops.",
  body: [
    ["MCB (Miniature Circuit Breaker)", "Trips on overload and short circuit. Rated in amps (6, 10, 16, 20, 32, 40, 63 A). B curve for lights/sockets, C curve for motors/ACs (handles starting current)."],
    ["RCCB / ELCB", "Trips on earth leakage (current escaping, e.g. through a person). 30 mA for human safety, 100/300 mA for fire protection. Type AC, A, B handle different leakage types; EV chargers need Type B or Type A + DC detection."],
    ["RCBO", "MCB + RCCB in one device."],
    ["MCCB", "Bigger breaker (63-1600 A) for main incomers and feeders in buildings and factories, often with adjustable settings."],
    ["SPD", "Surge Protection Device. Diverts voltage spikes (lightning, switching) to earth. Type 1 at main incomer, Type 2 at DBs."],
    ["Isolator / changeover", "Isolator cuts power for maintenance. Changeover switches between grid and DG/inverter."]
  ],
  quiz: [
    {q: "Which device protects a person from a shock through earth leakage?", o: ["MCB", "RCCB 30 mA", "Isolator", "Fuse"], a: 1, why: "RCCB senses leakage."},
    {q: "Which MCB curve suits an AC compressor?", o: ["B", "C", "Z", "None"], a: 1, why: "C curve tolerates motor starting current."},
    {q: "SPD protects against…", o: ["Overload", "Low voltage", "Voltage spikes", "Earth leakage"], a: 2, why: "Surges and spikes."}
  ]
},
{
  id: "earthing", title: "Earthing explained simply", mins: 4,
  intro: "Why a good earth matters and how to check one.",
  body: [
    ["What earthing does", "Gives fault current a low-resistance path to ground so breakers trip fast and metal bodies don't become live."],
    ["Earth resistance", "Measured in ohms with an earth tester. Lower is better: aim below 1 ohm for IT/sensitive, a few ohms for general use."],
    ["Signs of bad earthing", "Tingling shocks from taps or appliance bodies, RCCB nuisance trips, inverter/UPS faults, burnt boards after storms, EV charger refusing to start."],
    ["Neutral-earth voltage", "Should be under ~2 V. Higher values point to a poor earth or neutral problem. A multimeter check at a socket is a quick site-survey trick."],
    ["Pit types", "GI pipe/plate (cheap, needs watering), chemical (maintenance-free, stable), copper plate (sensitive equipment)."]
  ],
  quiz: [
    {q: "What's a sign of poor earthing?", o: ["Low bill", "Shocks from appliance body", "Bright LEDs", "Fast Wi-Fi"], a: 1, why: "Leakage isn't going to earth properly."},
    {q: "Earth resistance is measured in…", o: ["Volts", "Amps", "Ohms", "kVA"], a: 2, why: "Resistance is in ohms."},
    {q: "Neutral-earth voltage should ideally be…", o: ["Under ~2 V", "About 230 V", "Over 50 V", "Exactly 415 V"], a: 0, why: "A high N-E voltage indicates a problem."}
  ]
},
{
  id: "cables", title: "Cables: sizes, grades and voltage drop", mins: 5,
  intro: "Talk to electricians in their language.",
  body: [
    ["sq mm", "Conductor area. 1.5 (lights), 2.5 (sockets), 4 (geyser/AC), 6 (EV/feeders), 10+ for mains."],
    ["Copper vs aluminium", "Copper carries more current per size and is used for house wiring. Aluminium is lighter and cheaper for big feeders (needs about 1.6× the area)."],
    ["FR / FRLS / HFFR", "Fire behaviour grades. FRLS = low smoke. HFFR/ZHFR = no halogen gases (hospitals, malls)."],
    ["Armoured", "Steel armour for underground and outdoor runs."],
    ["Voltage drop", "Long cables lose voltage. Keep it under 3-5%. Drop (V) ≈ 2 × length × current × resistance per metre (single phase)."],
    ["Derating", "Cables bunched together, in hot places or in conduit carry less current than the table value."]
  ],
  quiz: [
    {q: "Typical wire size for a geyser or 1.5 ton AC circuit?", o: ["0.75 sq mm", "1.5 sq mm", "4 sq mm", "16 sq mm"], a: 2, why: "4 sq mm for ~20-25 A circuits."},
    {q: "Which grade is best for hospitals?", o: ["FR", "FRLS", "HFFR/ZHFR", "Any PVC"], a: 2, why: "No toxic halogen gas in fire."},
    {q: "A long cable run mainly risks…", o: ["Voltage drop", "Colour fading", "Higher bills only", "Nothing"], a: 0, why: "Drop rises with length and current."}
  ]
},
{
  id: "batteries", title: "Batteries & backup time", mins: 5,
  intro: "For UPS, inverters and hybrid solar.",
  body: [
    ["Ah (amp-hour)", "Capacity. A 12 V 100 Ah battery stores about 12 × 100 = 1,200 Wh (1.2 kWh) on paper."],
    ["Usable energy", "Lead-acid shouldn't be drained fully: use ~50-80%. Lithium can use 80-95%."],
    ["Types", "Tubular (inverters, cheap, needs water top-up), SMF/VRLA (UPS, sealed), Lithium LFP (long life, compact, costlier)."],
    ["Bank voltage", "Batteries in series add voltage: 30 × 12 V = 360 V DC for a 20 kVA UPS."],
    ["Backup estimate", "Hours ≈ (Bank V × Ah × efficiency 0.8) ÷ Load W. Example: 192 V × 100 Ah × 0.8 ÷ 5,000 W ≈ 3 h."],
    ["Life", "VRLA 3-5 years; lithium 8-10+ years. Heat shortens life; keep battery rooms cool."]
  ],
  quiz: [
    {q: "Energy in a 12 V 150 Ah battery is about…", o: ["150 Wh", "1.8 kWh", "12 kWh", "18 kWh"], a: 1, why: "12 × 150 = 1,800 Wh."},
    {q: "Which battery lasts longest?", o: ["Tubular", "SMF", "Lithium LFP", "Car battery"], a: 2, why: "LFP: many more cycles."},
    {q: "20 × 12 V batteries in series give…", o: ["12 V", "120 V", "240 V", "2,400 V"], a: 2, why: "Series voltages add."}
  ]
},
{
  id: "motors", title: "Motors, HP and starting", mins: 4,
  intro: "Needed for VFD, stabilizer and factory conversations.",
  body: [
    ["HP and kW", "1 HP = 0.746 kW. A 10 HP motor ≈ 7.5 kW."],
    ["Nameplate", "Shows kW/HP, voltage, full-load current (FLC), rpm, efficiency class (IE2/IE3/IE4), PF."],
    ["Starting current", "Direct-on-line (DOL) start draws 6-8× FLC for a few seconds. That's why stabilizers, UPS and DG sets need margin for motors."],
    ["Starters", "DOL (small), star-delta (reduces start current), soft starter, and VFD (smoothest, plus speed control)."],
    ["Speed", "4-pole motor at 50 Hz ≈ 1,450 rpm. VFD changes speed by changing frequency."],
    ["Affinity laws", "For pumps and fans: power ∝ speed³. 80% speed → about 51% power. This is the VFD savings story."]
  ],
  quiz: [
    {q: "15 HP is about…", o: ["7.5 kW", "11 kW", "15 kW", "20 kW"], a: 1, why: "15 × 0.746 ≈ 11.2 kW."},
    {q: "Fan at 70% speed uses roughly…", o: ["70% power", "49% power", "34% power", "10% power"], a: 2, why: "0.7³ ≈ 0.34."},
    {q: "Which starter also controls speed?", o: ["DOL", "Star-delta", "VFD", "Isolator"], a: 2, why: "VFD varies frequency."}
  ]
},
{
  id: "powerquality", title: "Power quality: sags, surges, harmonics", mins: 4,
  intro: "Name the problem, then pick the product.",
  body: [
    ["Under/over voltage (long)", "Voltage stays low or high for minutes or hours. → Servo stabilizer."],
    ["Power cut / outage", "→ UPS (zero break), inverter, DG, hybrid solar."],
    ["Surges & spikes", "Very short high-voltage bursts from lightning or switching. → SPD + good earthing."],
    ["Sags / dips", "Short drops when big motors start. → UPS for critical loads, soft starters/VFDs on motors."],
    ["Harmonics", "Distorted waveform from drives, UPS, LED drivers. Heats transformers and neutrals. → Filters, chokes, good drive selection."],
    ["Neutral problems", "Loose/broken neutral causes some sockets to get very high voltage. → Proper wiring and earthing; stabilizer with protection."]
  ],
  quiz: [
    {q: "Client's ACs trip when voltage stays at 180 V in summer evenings. Best product?", o: ["SPD", "Servo stabilizer", "LED wall", "PLC"], a: 1, why: "Long-duration low voltage."},
    {q: "Electronics burnt after a thunderstorm. Best product?", o: ["SPD + earthing", "Bigger wire", "VFD", "Softener"], a: 0, why: "Surge from lightning."},
    {q: "Servers must not see even a 10 ms break. Best product?", o: ["Inverter", "Online UPS", "Stabilizer", "DG only"], a: 1, why: "Zero transfer time."}
  ]
},
{
  id: "solar101", title: "Solar basics for sales", mins: 5,
  intro: "Numbers you can quote with confidence.",
  body: [
    ["Generation", "~4 units per kW per day in NCR, ~120 per month on average. Lower in Dec-Jan."],
    ["Space", "~80-100 sq ft of shadow-free roof per kW."],
    ["On-grid vs hybrid", "On-grid: cheapest, no backup. Hybrid: adds batteries for backup."],
    ["Net metering", "DISCOM installs a bi-directional meter. Exported units offset imported units."],
    ["PM Surya Ghar", "Residential subsidy: ₹30k (1 kW), ₹60k (2 kW), ₹78k max (3 kW+). Needs DCR panels and an empanelled vendor. Delhi adds its own up to ₹78k (combined up to ₹1.56 lakh). Haryana: central only."],
    ["Why now", "CAQM restricts DG sets in NCR (gas/dual-fuel only, limited hours; GRAP bans most each winter). Hybrid solar and UPS are the allowed backup. Pitch backup in Oct-Jan, savings in spring and summer."],
    ["Payback", "Typically 3-5 years for homes paying high slab tariffs."]
  ],
  quiz: [
    {q: "A 5 kW system in NCR makes about how many units a month?", o: ["120", "300", "600", "1,500"], a: 2, why: "5 × 120 = 600."},
    {q: "Which system works during a power cut?", o: ["On-grid", "Hybrid", "Neither", "Both"], a: 1, why: "On-grid shuts off for safety."},
    {q: "Max PM Surya Ghar central subsidy for a home?", o: ["₹30,000", "₹60,000", "₹78,000", "₹1,50,000"], a: 2, why: "Capped at ₹78k for 3 kW+."}
  ]
},
{
  id: "automation101", title: "Automation words: PLC, HMI, SCADA, Modbus", mins: 4,
  intro: "Sound credible with plant heads.",
  body: [
    ["Sensor / transmitter", "Measures something (temperature, pressure, level, flow) and sends a signal, often 4-20 mA."],
    ["PLC", "Rugged controller that reads inputs and runs outputs by program."],
    ["HMI", "Touch screen near the machine for operators."],
    ["SCADA", "Software in the control room to watch and control many PLCs, with alarms and history."],
    ["Modbus / Ethernet", "Common languages devices use to talk. Modbus RTU over RS-485 is everywhere."],
    ["I/O count", "Number of inputs and outputs: the first thing to ask for any PLC quote."]
  ],
  quiz: [
    {q: "Operator touch screen next to a machine is called…", o: ["SCADA", "HMI", "VFD", "SMPS"], a: 1, why: "Human-Machine Interface."},
    {q: "First thing to ask for a PLC quote?", o: ["Colour", "I/O list", "Wire brand", "Roof area"], a: 1, why: "I/O decides the PLC."},
    {q: "4-20 mA is a…", o: ["Fuse rating", "Sensor signal", "Cable size", "Battery size"], a: 1, why: "Standard analog signal."}
  ]
},
{
  id: "gst", title: "Pricing, GST and quotes", mins: 4,
  intro: "Get the numbers right on paper.",
  body: [
    ["Cost, margin, markup", "Margin % = (Sell − Cost) ÷ Sell. Markup % = (Sell − Cost) ÷ Cost. 20% markup = 16.7% margin."],
    ["GST", "Most electrical goods are 18%. Solar and some renewable items have lower rates, and rules changed in 2025; confirm the HSN code and rate with your CA."],
    ["Intra vs inter-state", "Same state: CGST + SGST (half each). Different state: IGST (full). Delhi buyer from a Delhi seller = CGST+SGST."],
    ["Supply vs installation", "Show supply and installation as separate lines. Labour/services may have different treatment; check with CA."],
    ["Quote basics", "Item, make/model, qty, rate, GST, total, validity (e.g. 7-15 days for copper items), payment terms, delivery time, warranty."],
    ["Payment terms", "For new clients: advance with order is common in NCR trading. Avoid long credit until trust is built."]
  ],
  quiz: [
    {q: "Cost ₹80, sell ₹100. Margin?", o: ["20%", "25%", "80%", "100%"], a: 0, why: "(100-80)/100 = 20%. Markup is 25%."},
    {q: "Delhi seller to Gurugram buyer: which GST?", o: ["CGST+SGST", "IGST", "No GST", "Only SGST"], a: 1, why: "Inter-state = IGST."},
    {q: "Why give a short validity on cable quotes?", o: ["Tradition", "Copper prices change often", "GST changes daily", "No reason"], a: 1, why: "Metal prices move weekly."}
  ]
}
];

window.PLAYBOOKS = [
{
  id: "builder", name: "Builder (floors / plots)", sells: ["cables", "earthing", "stabilizer", "ev", "solar"],
  cares: "Cost per floor, timely delivery so electricians never wait, reliable brands buyers recognise, credit terms.",
  open: "Sir, which stage are your current sites at? I supply wires, earthing and stabilizers for builder floors, on time to site, at today's brand price.",
  ask: ["How many sites and floors running now?", "Who buys electrical material: you or the contractor?", "Brand preference for wires?", "Do you give EV charging or solar as a selling point to buyers?"],
  win: "Sell by construction stage: one floor can buy three times. Structure/wiring stage: earthing and cables. Finishing: stabilizer, UPS, SPDs. Handover: solar, backup, EV charger. Ask the stage of every site, and who actually buys (often the electrical contractor). In Gurugram, check approvals before credit (DTCP froze fresh approvals from 21 Jul 2026)."
},
{
  id: "designer", name: "Interior designer", sells: ["stabilizer", "ups", "ledwall", "bms", "ev"],
  cares: "Their client's experience, aesthetics, no site delays, and their own reputation (and often a referral fee).",
  open: "When you hand over a premium home or office, I can take care of power protection: a stabilizer, UPS for the study or server, even an LED wall or smart lighting.",
  ask: ["What projects are you working on now?", "Do clients ask for smart home or lighting control?", "Who handles electrical on your sites?", "How do you usually work with vendors (referral, direct billing)?"],
  win: "Make their life easier: one point for power protection and tech. Agree a clear referral arrangement up front."
},
{
  id: "farmhouse", name: "Farmhouse owner / builder", sells: ["earthing", "solar", "stabilizer", "ev", "ups"],
  cares: "Safety in open land, power cuts and low voltage, big bills, DG running cost, premium lifestyle (EVs).",
  open: "Farmhouses face two problems: lightning on open land and unstable voltage. I can make the place safe and cut your bill with solar.",
  ask: ["Do you face power cuts or low voltage? How long does the DG run?", "Any lightning protection now?", "Last few electricity bills?", "Any EVs in the family?"],
  win: "Start with an earthing/lightning check (low ticket, high trust), then propose hybrid solar and stabilizer."
},
{
  id: "factory", name: "Factory / plant head", sells: ["vfd", "plc", "stabilizer", "earthing", "solar", "steam", "wtp"],
  cares: "Uptime, energy cost per unit produced, maintenance headaches, payback period, proven brands.",
  open: "I'd like to do a free energy check on your three biggest pump or fan motors. Most plants save 20-50% with drives.",
  ask: ["Which motors run longest?", "Monthly power bill and tariff?", "Any breakdowns from voltage or automation problems?", "Who approves capex?"],
  win: "Lead with numbers: savings and payback. Start with one trial drive on a non-critical pump."
},
{
  id: "office", name: "Office / IT / AI company", sells: ["ups", "stabilizer", "bms", "ledwall", "ev", "earthing"],
  cares: "Zero downtime for systems, clean power, professional look, employee facilities (EV charging).",
  open: "For an office running servers and workstations, even a 10 ms break means reboots. Let me check your UPS and earthing setup.",
  ask: ["How many workstations/servers?", "Existing UPS: size, age, batteries?", "DG available?", "Plans for EV charging in parking?"],
  win: "Free UPS and earthing health check; offer an AMC."
},
{
  id: "clinic", name: "Clinic / showroom / shop", sells: ["stabilizer", "ups", "earthing", "ledwall"],
  cares: "Expensive equipment safety (medical machines, display lighting), no interruptions with customers.",
  open: "Your machines are expensive and sensitive. A stabilizer and online UPS protect them from voltage swings and cuts.",
  ask: ["Which machines are critical?", "Any breakdowns from power issues?", "Single or three phase?"],
  win: "Show the cost of one equipment failure vs. protection cost."
},
{
  id: "dealership", name: "Car dealership", sells: ["ev", "solar", "ledwall", "ups"],
  cares: "EV demo and delivery charging, customer experience, OEM requirements, showroom display.",
  open: "Every EV you sell needs a home charger. I can install it for your customers, and set up DC charging at your showroom.",
  ask: ["Which EV models do you sell?", "Who installs home chargers for buyers now?", "Any charger at the showroom?"],
  win: "Become their installation partner for customer home chargers: steady flow of orders. Delhi's draft EV Policy 2.0 wants a public charger at every dealership: lead with that."
},
{
  id: "electrician", name: "Electrician / small contractor", sells: ["cables", "earthing", "stabilizer", "ev", "solar"],
  cares: "Getting material on time, fair rates, a referral income, not losing their own customer.",
  open: "You're on more sites than I can ever visit. Become a Maya partner: you spot the need, I supply and help install, and you earn a fixed referral fee on every closed job.",
  ask: ["Which areas and how many sites a month?", "Which brands do your clients ask for?", "Do clients ask about stabilizers, solar or EV chargers?", "How do you like to be paid for referrals?"],
  win: "Recruit 10-15 local electricians as partners with a written referral fee. They bring homes, shops and small offices; you never compete for their wiring work."
},
{
  id: "society", name: "Housing society / RWA", sells: ["ev", "solar", "earthing"],
  cares: "Fair billing, safety, approvals, cost shared among members.",
  open: "More residents are buying EVs. A shared, metered charging setup avoids messy wiring from individual flats.",
  ask: ["How many EV owners or requests?", "Parking layout and available load?", "Common area bill?"],
  win: "Propose common-area solar to cut maintenance charges, plus managed EV charging. Pitch before and during GRAP season (Oct-Jan) when DG restrictions hurt most; Delhi's scheme also covers group housing societies."
}
];

window.SURVEYS = {
  general: {name: "General site survey", items: [
    "Client name, contact, address, date",
    "Supply type: single / three phase; sanctioned load (photo of bill)",
    "Main board photo: incoming, main switch, MCBs/RCCB present?",
    "Voltage at main: R / Y / B / N-E (measure at different times if possible)",
    "Earthing: number of pits, location, last test, N-E voltage at a socket",
    "Major loads: ACs, geysers, motors, lifts, pumps, servers, medical machines",
    "DG / inverter / UPS present? Ratings and age",
    "Any complaints: shocks, trips, burnt equipment, low voltage, bills",
    "Space for equipment (stabilizer/UPS/battery) and ventilation",
    "Decision maker and budget; timeline"
  ]},
  solar: {name: "Solar survey", items: [
    "12 months of bills: units, sanctioned load, tariff",
    "Roof type (RCC/tin), area, orientation; photos from all corners",
    "Shadows: water tanks, parapets, trees, nearby buildings (morning/evening)",
    "Roof usage needs: elevated structure?",
    "Distance roof → main board (cable length)",
    "Backup need: which loads, how many hours (hybrid sizing)",
    "DISCOM and consumer number; residential or commercial",
    "Earthing pits available for structure/inverter"
  ]},
  ev: {name: "EV charger survey", items: [
    "Car model(s) and battery kWh; onboard AC charger limit",
    "Supply phase and sanctioned load",
    "Distance from DB/meter to parking spot (cable length)",
    "Parking: covered/open; wall or pillar for mounting",
    "Society permission / separate meter needed?",
    "Earth resistance at the spot",
    "Wi-Fi/4G coverage (for smart charger)"
  ]},
  stabilizer: {name: "Stabilizer / UPS survey", items: [
    "Supply phase, sanctioned load",
    "Voltage readings: morning, afternoon, evening (min/max)",
    "Load list with kW (ACs, motors, IT, medical)",
    "Critical loads needing zero break (UPS)",
    "Backup time required; DG start time",
    "Installation spot: dry, ventilated, near main board",
    "Existing protections and earthing condition"
  ]},
  factory: {name: "Factory energy (VFD) survey", items: [
    "List of motors: application, kW/HP, nameplate current, rpm",
    "Running hours per day and days per year",
    "Control method today: valve/damper/bypass/on-off",
    "Actual running current (clamp meter) if allowed",
    "Tariff ₹/kWh and monthly bill",
    "Existing drives and brands; harmonic or tripping issues",
    "Panel space and ambient temperature"
  ]}
};

window.DRIVERS = [
  {t:"DG sets restricted", d:"CAQM allows only gas or dual-fuel DG sets with emission devices, for limited hours, and GRAP bans most others each winter. Pitch hybrid solar, batteries and UPS as backup.", who:"Societies, builder floors, offices, factories"},
  {t:"Delhi solar subsidy doubled", d:"Delhi adds up to ₹78,000 on top of the central ₹78,000 (up to ₹1.56 lakh). New portal since Sep 2026. Gurugram (Haryana) gets central only.", who:"Large Delhi homes, farmhouses, societies"},
  {t:"Delhi EV Policy 2.0", d:"Draft wants 20% of new-building parking pre-wired and a public charger at every dealership. Delhi needs ~36,000 points by 2030 vs ~8,849 in Jan 2026.", who:"Builders, societies, dealerships, hotels, offices"},
  {t:"Commercial power is costly", d:"Commercial tariffs ~₹8-11/unit. Business rooftop solar pays back in about 3-4 years, with 40% accelerated depreciation.", who:"Shops, schools, hospitals, factories"},
  {t:"Copper prices rising", d:"Cable makers revise lists several times a year. Quote short validity, buy only against PO + advance.", who:"Caution for cables"},
  {t:"Gurugram approvals slowed", d:"Stilt-plus-four stayed (Apr 2026); DTCP froze fresh approvals from 21 Jul 2026. Focus on stilt-plus-three, Delhi floors, farmhouses, renovations.", who:"Caution for builder credit"}
];

// Added Nov 2026: lessons for the new products
window.LESSONS.push(
{
  id: "lighting", title: "Lighting basics: lumens, lux, colour", mins: 4,
  intro: "Sell light by what people see, not by watts.",
  body: [
    ["Lumens (lm)", "Total light a lamp gives. A 15 W LED panel gives about 1,500 lm; a 150 W high-bay about 18,000-22,000 lm."],
    ["Efficacy (lm/W)", "Light per watt. Good LEDs give 100-150 lm/W; cheap ones 70-90. This is what separates a good LED from a bad one."],
    ["Lux", "Light falling on a surface. Desks need about 300-500 lux, corridors 100, warehouses 150-200, factory work areas 300-500."],
    ["Colour temperature (K)", "3000 K warm white (homes, hotels), 4000 K neutral (offices, shops), 5700-6500 K cool white (factories, streets)."],
    ["CRI", "How true colours look. 80+ is fine for most places; 90+ for showrooms, clinics and photo studios."],
    ["IP rating", "First digit = dust, second = water. IP20 indoor only; IP65 dust-tight and jet-proof for outdoor and sheds."]
  ],
  quiz: [
    {q: "Which number tells you how efficient an LED is?", o: ["Watts", "Lumens per watt", "Colour temperature", "IP rating"], a: 1, why: "lm/W is light output per unit of power."},
    {q: "Best colour for a hotel room?", o: ["3000 K", "6500 K", "10000 K", "Any"], a: 0, why: "Warm white feels relaxing."},
    {q: "An outdoor flood light should be at least…", o: ["IP20", "IP44", "IP65", "IP00"], a: 2, why: "IP65 is dust-tight and handles rain jets."}
  ]
},
{
  id: "cctv", title: "CCTV basics: cameras, NVR, storage", mins: 4,
  intro: "Plan a system you can quote in ten minutes.",
  body: [
    ["IP vs analogue", "IP cameras send digital video over network cable to an NVR and can be powered by the same cable (PoE). Analogue/HD cameras use coaxial cable to a DVR and are cheaper for small sites."],
    ["Resolution", "2 MP = 1080p (enough for most homes and shops). 4-5 MP for wider areas and faces at a distance. 8 MP = 4K for large campuses."],
    ["Lens", "2.8 mm = wide view (rooms, lobbies). 3.6 mm = standard. 6 mm+ = long, narrow views (gates, driveways)."],
    ["Storage", "TB ≈ cameras × Mbps × days × 0.0108 (for 24 h recording). A 2 MP H.265 camera is about 2 Mbps, so 8 cameras for 30 days ≈ 5 TB."],
    ["PoE", "Power over Ethernet: each camera takes 5-8 W. One Cat6 run up to about 90-100 m."],
    ["Night view", "IR gives black-and-white night video; colour-night models add a white light. Always test at night before handover."]
  ],
  quiz: [
    {q: "Which camera type can be powered through its network cable?", o: ["Analogue", "IP with PoE", "Wi-Fi only", "None"], a: 1, why: "PoE carries power and data on one Cat6 cable."},
    {q: "8 cameras at 2 Mbps for 30 days need roughly…", o: ["500 GB", "2 TB", "5-6 TB", "20 TB"], a: 2, why: "8 × 2 × 30 × 0.0108 ≈ 5.2 TB."},
    {q: "Best lens for a long driveway?", o: ["2.8 mm", "3.6 mm", "6 mm or more", "Fisheye"], a: 2, why: "Longer focal length sees further with a narrower view."}
  ]
});

// Which lessons belong inside each product's Learn tab (first = most relevant)
window.LESSON_FOR = {
  cables: ["basics", "cables", "protection"],
  switchgear: ["protection", "basics", "phase", "earthing"],
  earthing: ["earthing", "powerquality", "protection"],
  stabilizer: ["powerquality", "kva", "phase", "bill"],
  ups: ["kva", "batteries", "powerquality"],
  lighting: ["lighting", "basics"],
  cctv: ["cctv", "earthing"],
  solar: ["solar101", "bill", "batteries"],
  ev: ["phase", "protection", "bill", "earthing"],
  vfd: ["motors", "kva", "powerquality"],
  plc: ["automation101", "motors"],
  ledwall: ["basics", "powerquality"],
  bms: ["automation101", "bill"],
  scada: ["automation101"],
  damgate: ["automation101", "motors"],
  wtp: ["motors"],
  steam: [],
  puf: []
};
