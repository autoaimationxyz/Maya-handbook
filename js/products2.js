// Maya Traders app — product content, part 2 (automation, display, water & steam, panels)
window.PRODUCTS = window.PRODUCTS.concat([
{
  id: "vfd", name: "VFD (Variable Frequency Drive)", cat: "Automation & Control", stage: "m3", icon: "vfd",
  tagline: "Saves 20-50% energy on pumps, fans and blowers. The easiest industrial pitch: it pays for itself.",
  what: "A VFD (also called AC drive or inverter drive) controls the speed of an AC motor by changing the frequency and voltage it supplies. Instead of running a motor at full speed and throttling with a valve or damper, the VFD runs it only as fast as needed.",
  why: "Most pumps, fans and blowers in factories run at full speed all day while a valve or damper wastes the extra flow. Because power drops with the cube of speed, running a fan at 80% speed uses only about 51% of the power. VFDs also give soft starts (less mechanical stress, no current spikes) and precise process control.",
  how: [
    "Rectifier converts 3-phase AC to DC.",
    "DC bus with capacitors smooths it.",
    "Inverter (IGBTs) switches the DC to make a new AC wave at any frequency (0-50 Hz and above).",
    "Motor speed follows frequency: 25 Hz ≈ half speed.",
    "Affinity laws (centrifugal pumps & fans): flow ∝ speed, pressure ∝ speed², power ∝ speed³."
  ],
  types: [
    {name: "Micro / compact drives", desc: "0.2-22 kW. Conveyors, small pumps, machine tools. Delta MS300, ME300."},
    {name: "General purpose / vector drives", desc: "0.75-355 kW. Most industrial uses with better torque control. Delta C2000 Plus."},
    {name: "HVAC / fan & pump drives", desc: "Built-in PID, fire mode, BACnet for BMS. Delta CP2000."},
    {name: "High-performance / crane & lift drives", desc: "Precise torque, regenerative braking."},
    {name: "Solar pump drives", desc: "Run a pump directly from solar panels."},
    {name: "Soft starter (related)", desc: "Only softens start; no speed control. Cheaper alternative where speed control isn't needed."}
  ],
  sizing: [
    "Match the drive's rated current (A) to the motor's nameplate current, not just kW. Heavy-duty loads (crushers, extruders, conveyors under load) need one size up.",
    "1 HP = 0.746 kW. A '10 HP motor' ≈ 7.5 kW.",
    "Best savings: centrifugal pumps, fans, blowers, cooling tower fans, AHUs, compressors with variable demand.",
    "Little saving: loads that must run at full speed all the time.",
    "Long motor cables (> ~50 m) may need an output reactor/filter. Add a line reactor or harmonic filter if many drives share a supply."
  ],
  specs: [
    {k: "kW / HP and rated current", v: "Size by current."},
    {k: "Normal duty / heavy duty", v: "Overload ability: e.g. 120% for 60 s (normal) vs 150% for 60 s (heavy)."},
    {k: "Control mode", v: "V/f (simple), sensorless vector, closed loop vector (with encoder)."},
    {k: "Built-in PID", v: "Holds a pressure or flow setpoint using a sensor."},
    {k: "Communication", v: "Modbus RS-485 standard; Profinet, EtherNet/IP, BACnet options."},
    {k: "IP rating", v: "IP20 for panels; IP55/66 for field mounting."},
    {k: "EMC filter / DC choke", v: "Reduce interference and harmonics."}
  ],
  brands: ["Delta (your partner: MS300, ME300, C2000 Plus, CP2000)", "ABB", "Siemens", "Danfoss", "Schneider", "Yaskawa", "Mitsubishi", "Invertek"],
  buyers: "Plant and maintenance heads",
  where: "Steel: Wazirpur Industrial Area, Naraina Loha Mandi, Bawana. Auto: IMT Manesar, Bawal, Dharuhera, Faridabad.",
  wayIn: "Steel and auto contacts; lead with a free energy audit.",
  ask: [
    "Which motors run the longest hours? (pumps, blowers, cooling towers, AHUs)",
    "Is flow controlled by valves or dampers today?",
    "Motor kW/HP, nameplate current, and running hours per day?",
    "Electricity tariff per unit (₹/kWh) and monthly bill?",
    "Any existing drives? Which brand? Any harmonics or tripping problems?"
  ],
  pitch: [
    "Give me your 3 biggest pump and fan motors. I'll calculate the savings for free. Usually 20-50%, with payback in under 1-2 years.",
    "Delta is a top-5 global drive maker with service support in NCR, at a better price than European brands.",
    "Soft start means less belt, bearing and coupling wear, and no current spike on your DG."
  ],
  objections: [
    ["Our motors are fine as they are.", "They are; the waste is in the valve or damper. Let me measure one motor's power before and after on a trial."],
    ["We use ABB/Siemens only.", "Fair. Delta matches them on features at a lower cost, and many OEM machines already use Delta inside. Try one drive on a non-critical pump."],
    ["Drives cause harmonics.", "Delta drives have built-in DC chokes and we can add filters. I'll check your total drive load."]
  ],
  mistakes: [
    "Don't size by kW alone; check motor current.",
    "Don't promise savings on loads that run at full flow constantly.",
    "Very old motors may need insulation checks before using a VFD."
  ],
  upsell: ["PLC/HMI panel", "Energy meters and monitoring", "Harmonic filters", "Servo stabilizer for control panels", "Annual service"],
  prices: [
    {item: "Delta MS300 2.2 kW (3 HP), 415 V", unit: "each", low: 12000, high: 18000},
    {item: "Delta MS300 7.5 kW (10 HP)", unit: "each", low: 28000, high: 42000},
    {item: "Delta C2000 Plus 22 kW (30 HP)", unit: "each", low: 70000, high: 110000},
    {item: "Delta C2000 Plus 55 kW (75 HP)", unit: "each", low: 160000, high: 240000},
    {item: "VFD panel build (enclosure, MCCB, wiring)", unit: "per panel", low: 15000, high: 80000}
  ],
  priceNote: "Rough estimates. Get Delta's distributor price list through Chemotech.",
  calc: "vfd"
},
{
  id: "plc", name: "Plant Automation: PLC / HMI / Servo / SMPS", cat: "Automation & Control", stage: "m3", icon: "plc",
  tagline: "The brain and the screen of a machine or plant.",
  what: "A PLC (Programmable Logic Controller) is a rugged industrial computer that reads sensors and switches (inputs) and controls motors, valves and lights (outputs) based on a program. An HMI (Human-Machine Interface) is the touch screen operators use to see and control the process. Servo drives and motors give precise position and speed control. An SMPS (switched-mode power supply) gives clean 24 V DC to the control system.",
  why: "Factories automate to cut labour, reduce errors, speed up production and record data. Older relay-based panels fail often and are hard to fault-find. OEM machine builders need a reliable PLC/HMI/servo package at a good price.",
  how: [
    "Inputs: push buttons, limit switches, proximity sensors, temperature and pressure sensors.",
    "PLC scans inputs, runs the program (ladder logic) and updates outputs, many times per second.",
    "Outputs: contactors, solenoid valves, VFDs, servo drives, indicators.",
    "HMI shows status, alarms, recipes and counts, and sends operator commands to the PLC.",
    "Communication (Modbus, Ethernet) links PLC, HMI, drives and SCADA."
  ],
  types: [
    {name: "Compact / micro PLC", desc: "Fixed I/O (e.g. 16-60 points). Small machines. Delta DVP-ES2/ES3, DVP-SS2."},
    {name: "Modular / mid-range PLC", desc: "Add I/O modules. Plants, process lines. Delta AS300, AH series."},
    {name: "HMI", desc: "4.3\" to 15\" touch screens. Delta DOP-100 series."},
    {name: "Servo drive + motor", desc: "Precise motion: packaging, cutting, printing, CNC, pick & place. Delta ASDA-A3/B3."},
    {name: "SMPS", desc: "24 V DC power for PLC, sensors, HMI. Rated in amps/watts."},
    {name: "Remote I/O & communication modules", desc: "Bring signals from far parts of a plant."}
  ],
  sizing: [
    "Count I/O: digital inputs (DI), digital outputs (DO), analog inputs (AI, e.g. 4-20 mA), analog outputs (AO). Add 20% spare.",
    "Choose PLC with enough I/O, memory and the communication ports needed.",
    "SMPS: add up the 24 V current of all devices × 1.3 margin.",
    "Servo: size by torque, speed and inertia: the supplier's application engineer does this.",
    "Your role: collect the I/O list and machine description; Chemotech's engineers (e.g. design/programming team) handle programming."
  ],
  specs: [
    {k: "I/O count", v: "Number of inputs/outputs."},
    {k: "Scan time", v: "How fast the program runs. Milliseconds."},
    {k: "Ports", v: "RS-485 (Modbus), Ethernet, USB, CANopen, EtherCAT."},
    {k: "HMI size & resolution", v: "e.g. 7\" 800×480."},
    {k: "Servo torque / rpm / encoder bits", v: "Higher-bit encoder = finer positioning."},
    {k: "SMPS rating", v: "e.g. 24 V 5 A (120 W)."}
  ],
  brands: ["Delta (your partner)", "Siemens", "Allen-Bradley (Rockwell)", "Mitsubishi", "Schneider", "Omron", "Mean Well (SMPS)"],
  buyers: "Plant and maintenance heads, OEM machine builders, panel builders",
  where: "IMT Manesar, Bawal, Dharuhera, Faridabad (auto); Wazirpur, Bawana, Naraina (steel); Okhla and Noida (OEMs and panel makers).",
  wayIn: "Steel and auto contacts; follow up VFD customers; panel builders who need a supplier.",
  ask: [
    "What does the machine/line do? Is there a drawing or old panel?",
    "How many inputs/outputs, and which sensors?",
    "Existing PLC brand? Do you need to keep the same brand for spares?",
    "Who programs it: your team, an OEM, or do you need us?",
    "Timeline and budget? Any data logging or SCADA needs?"
  ],
  pitch: [
    "Delta gives you PLC, HMI, VFD and servo from one brand: everything talks to each other, one support number.",
    "Our team can design, program and commission, not just supply boxes.",
    "Replacing an old relay panel cuts breakdowns and makes fault-finding a matter of minutes."
  ],
  objections: [
    ["We're standardised on Siemens.", "Understood. For new machines or upgrades, Delta can cut automation hardware cost noticeably. Try it on one machine."],
    ["Who will support it?", "Chemotech's team in Delhi handles programming and service, backed by Delta India."],
    ["We don't need automation.", "Let's look at where you lose time today: manual counts, changeovers, breakdowns. Even a small PLC + HMI can fix one bottleneck."]
  ],
  mistakes: [
    "Don't quote a PLC without a clear I/O list.",
    "Programming and commissioning are often half the job value; quote them separately.",
    "Confirm who owns the program source code at handover."
  ],
  upsell: ["VFDs", "SCADA", "Control panels", "Sensors and field instruments", "AMC"],
  prices: [
    {item: "Delta compact PLC (DVP-ES2, ~24-32 I/O)", unit: "each", low: 8000, high: 20000},
    {item: "Delta 7\" HMI", unit: "each", low: 12000, high: 22000},
    {item: "Servo drive + motor ~1 kW", unit: "set", low: 45000, high: 80000},
    {item: "SMPS 24 V 5 A", unit: "each", low: 1500, high: 3500},
    {item: "PLC programming & commissioning (small machine)", unit: "per job", low: 20000, high: 100000},
    {item: "Automation control panel (build + components)", unit: "per panel", low: 50000, high: 500000}
  ],
  priceNote: "Rough estimates; project pricing varies a lot. Use for ballpark only.",
  calc: null
},
{
  id: "scada", name: "SCADA System", cat: "Automation & Control", stage: "later", icon: "scada",
  tagline: "One screen to watch and control a whole plant.",
  what: "SCADA (Supervisory Control and Data Acquisition) is software on a computer that connects to PLCs, drives and meters across a plant. It shows the whole process as live graphics, raises alarms, records trends and reports, and lets operators control from a control room. The Chemotech profile shows a Tata Steel bentonite slurry plant SCADA as an example.",
  why: "Plants with many machines or remote sites (water, steel, chemicals, dams) need one view of everything, historical data for quality and audits, and fast alarms to reduce downtime.",
  how: [
    "PLCs and RTUs in the field collect sensor data and control equipment.",
    "A network (Ethernet, fibre, radio, 4G) carries data to the SCADA server.",
    "SCADA software draws mimic screens, alarms, trends and reports.",
    "Operators acknowledge alarms and send commands; data is stored in a historian database.",
    "Web/mobile clients and cloud (e.g. Delta DIACloud) allow remote viewing."
  ],
  types: [
    {name: "Single-station SCADA", desc: "One PC for a small plant."},
    {name: "Client-server SCADA", desc: "Server + multiple operator stations."},
    {name: "Redundant SCADA", desc: "Backup server for critical plants."},
    {name: "Web/cloud SCADA & IIoT", desc: "Remote monitoring over the internet."}
  ],
  sizing: [
    "Licences are priced by 'tags' (data points). Count tags: each sensor value, status, command = 1 tag.",
    "List all PLCs/devices and communication protocols.",
    "Define screens, alarms, reports and data retention needs.",
    "This is engineering-heavy: Chemotech's design team scopes it."
  ],
  specs: [
    {k: "Tag count", v: "Licence size."},
    {k: "Protocols", v: "Modbus TCP/RTU, OPC UA, IEC 104, etc."},
    {k: "Historian", v: "How long data is stored and how fast it's logged."},
    {k: "Redundancy", v: "Hot standby servers."}
  ],
  brands: ["Delta DIAView", "Siemens WinCC", "AVEVA (Wonderware)", "Ignition", "GE iFIX", "Rockwell FactoryTalk"],
  buyers: "Plant heads of process industries, water utilities, government projects",
  where: "Process plants in Bawana, Manesar, Faridabad; utilities and government departments.",
  wayIn: "Not selected for the first months. Long sales cycle; revisit after first orders, via Chemotech's track record.",
  ask: ["How many machines/sites need monitoring?", "Existing PLC brands?", "Which reports and alarms matter most?", "Remote/mobile access needed?"],
  pitch: ["See your whole plant live from one screen, or your phone.", "Every alarm and trend is recorded: faster root-cause and audits.", "Chemotech has delivered SCADA for a Tata Steel plant."],
  objections: [["It's expensive.", "Start with the critical area only, and expand. Data alone often pays back by reducing downtime."], ["Our PLCs are mixed brands.", "Modern SCADA talks to most brands through standard protocols."]],
  mistakes: ["Don't quote without a tag list and scope document.", "Cybersecurity and network design are part of the job."],
  upsell: ["PLC/HMI upgrades", "Energy monitoring", "AMC"],
  prices: [
    {item: "SCADA software licence (small-medium)", unit: "per licence", low: 50000, high: 300000},
    {item: "SCADA engineering & commissioning", unit: "per project", low: 100000, high: 1000000}
  ],
  priceNote: "Very project-specific; for orientation only.",
  calc: null
},
{
  id: "bms", name: "Building Automation (BMS)", cat: "Automation & Control", stage: "m3", icon: "bms",
  tagline: "Smart control of HVAC, lights and energy in offices and premium buildings.",
  what: "A Building Management System (BMS) connects and controls a building's systems (air conditioning (HVAC), ventilation, lighting, energy meters, pumps, sometimes access control and fire alarm interfaces) from one central software. Delta offers a full BMS and building energy management (EMS) range.",
  why: "HVAC and lighting are 50-70% of an office building's power bill. A BMS schedules and optimises them, alerts on faults, and gives energy reports needed for green building ratings (IGBC/LEED/GRIHA). Corporate tenants in Cyber City and Golf Course Road expect it.",
  how: [
    "Field sensors: temperature, humidity, CO₂, occupancy, energy meters.",
    "DDC controllers near equipment (AHUs, chillers, pumps) run local control loops.",
    "Network (BACnet, Modbus, KNX) links controllers to the BMS server.",
    "Software shows floor plans, schedules, alarms, energy dashboards.",
    "Rules: switch off AHUs after hours, adjust setpoints by occupancy, alert on chiller faults."
  ],
  types: [
    {name: "HVAC control", desc: "AHUs, FCUs, chillers, VRF integration."},
    {name: "Lighting control", desc: "Scheduling, occupancy and daylight sensors (DALI/KNX)."},
    {name: "Energy management (EMS)", desc: "Meters on each floor/tenant, reports, billing."},
    {name: "Integration", desc: "Fire alarm status, access control, CCTV, lifts, DG, UPS monitoring."},
    {name: "Home automation (related)", desc: "Smart lighting, curtains, scenes for premium homes, via interior designers."}
  ],
  sizing: [
    "Count points: each sensor reading and each command = one point. Quotes are often per point or per sq ft.",
    "List equipment: number of AHUs, FCUs, chillers, pumps, meters, lighting circuits.",
    "Check existing protocols on equipment (BACnet/Modbus).",
    "Engineering-heavy: scope with Chemotech/Delta."
  ],
  specs: [
    {k: "Point count", v: "Size of the system."},
    {k: "BACnet / Modbus / KNX / DALI", v: "Communication standards."},
    {k: "DDC controller", v: "Direct Digital Controller in the field."},
    {k: "Open vs proprietary", v: "Open protocols avoid lock-in to one vendor."}
  ],
  brands: ["Delta (BMS / EMS; LOYTEC)", "Honeywell", "Siemens", "Johnson Controls", "Schneider EcoStruxure", "Legrand / Schneider (lighting)"],
  buyers: "Corporate offices, showrooms, banquet halls, control rooms, premium buildings",
  where: "Cyber City, Golf Course Road, Aerocity, Noida Sector 62.",
  wayIn: "Interior designers, AI and tech companies.",
  ask: ["Building area and number of floors?", "What HVAC system (central chiller, VRF, splits)?", "Main goal: energy saving, comfort, green rating, or central monitoring?", "Who is the MEP consultant?"],
  pitch: ["Cut HVAC and lighting waste with schedules and occupancy control. Typical savings 15-30%.", "One dashboard for the whole building: energy per floor, alarms on your phone.", "Delta's BMS integrates with Delta UPS, drives and EV chargers you may already use."],
  objections: [["Our facility team manages manually.", "BMS makes their job easier: alarms and schedules instead of rounds."], ["Too costly for our size.", "Start with energy meters and AHU scheduling; expand later."]],
  mistakes: ["Get the MEP consultant on your side early; they write the specs.", "Don't promise savings without baseline data."],
  upsell: ["VFDs on AHUs/pumps", "Energy meters", "UPS", "EV chargers in parking", "LED video wall in reception"],
  prices: [
    {item: "BMS (office, typical)", unit: "per sq ft", low: 40, high: 150},
    {item: "Energy meter with communication", unit: "each", low: 4000, high: 15000}
  ],
  priceNote: "Very rough; BMS is priced per point after design.",
  calc: null
},
{
  id: "damgate", name: "Automatic Dam Gate Control System", cat: "Automation & Control", stage: "later", icon: "dam",
  tagline: "PLC + SCADA control of dam and barrage gates. Government project work.",
  what: "Automates the opening and closing of dam, barrage or canal gates. Water level sensors at each gate feed RTUs/PLCs, which run the gate motors through VFDs. A control room with master and backup PLCs, SCADA and cloud alerts (SMS/email) watches all gates, as shown in the Chemotech profile (5 gates, fibre-optic links about 1 km apart).",
  why: "Manual gate operation is slow and risky during floods. Automation gives precise water level control, remote operation, alarms and records for irrigation and flood management.",
  how: [
    "Water level sensors measure upstream/downstream levels at each gate.",
    "Field RTU/PLC with VFD drives the gate motor; a 7\" HMI at each gate for local control.",
    "Fibre optic Ethernet links gates to the control room.",
    "Master + backup PLC in the control room; SCADA monitor; cloud router for SMS/email alerts."
  ],
  types: [{name: "Radial / vertical gate automation", desc: "Different gate types, same control approach."}, {name: "Canal & barrage automation", desc: "Multiple gates along a canal."}],
  sizing: ["Number of gates, motor ratings, distances between gates and control room.", "Redundancy and power backup (UPS/DG) for the control room."],
  specs: [{k: "Redundant PLC", v: "Master and backup PLC."}, {k: "Fibre optic network", v: "Long distance, immune to interference."}, {k: "RTU", v: "Remote terminal unit at each gate."}],
  brands: ["Delta (PLC, VFD, HMI, DIACloud)", "Siemens", "Schneider"],
  buyers: "Irrigation and water resources departments, EPC contractors",
  where: "Government and tender work, mostly outside NCR.",
  wayIn: "Not selected for now. Needs tender eligibility and track record; leave to Chemotech.",
  ask: ["Number of gates and type?", "Tender reference and eligibility criteria?", "EPC partner?"],
  pitch: ["Chemotech has a proven architecture: redundant PLCs, VFDs per gate, fibre network, SCADA and SMS alerts."],
  objections: [["Need past experience.", "Chemotech's references and Delta's support cover this."]],
  mistakes: ["Don't chase tenders alone; route through Chemotech."],
  upsell: ["UPS for control room", "SCADA", "Solar for remote gates"],
  prices: [{item: "Gate automation (per gate, rough)", unit: "per gate", low: 300000, high: 1200000}],
  priceNote: "Highly project-specific; orientation only.",
  calc: null
},
{
  id: "ledwall", name: "LED Screen / Video Wall", cat: "Display", stage: "m3", icon: "led",
  tagline: "High-visibility, high-ticket. Showrooms, offices, banquets, control rooms.",
  what: "A large display built from LED modules tiled together, with no visible gaps. Sizes from a few feet to whole walls, indoor or outdoor. Also LCD video walls (thin-bezel panels tiled) for control rooms.",
  why: "Reception walls, showroom brand walls, banquet stage backdrops, conference rooms and control rooms. Brands and venues want impact; corporate offices want large meeting-room displays.",
  how: [
    "Each module has thousands of tiny RGB LEDs. Pixel pitch = distance between LEDs (P2.5 = 2.5 mm).",
    "Modules mount on cabinets/frames to build any size.",
    "A sending card/controller takes the video input (HDMI) and drives the receiving cards in each cabinet.",
    "Content is managed by software (play schedules, multiple windows)."
  ],
  types: [
    {name: "Indoor fine-pitch (P1.2-P2)", desc: "Close viewing: boardrooms, control rooms, premium retail."},
    {name: "Indoor standard (P2.5-P4)", desc: "Receptions, showrooms, banquets, stages."},
    {name: "Outdoor (P3-P10)", desc: "Facades, hoardings, stadiums. Weatherproof, very bright."},
    {name: "Rental / event LED", desc: "Lightweight cabinets for events."},
    {name: "LCD video wall", desc: "55\" thin-bezel panels; cheaper per sq ft for control rooms, but has thin lines between panels."}
  ],
  sizing: [
    "Minimum comfortable viewing distance (m) ≈ pixel pitch (mm) × 1 to 2. P2.5 suits viewers from ~3 m.",
    "Choose size to fit the wall and resolution: a 16:9 wall 10 ft × 5.6 ft at P2.5 ≈ 1,220 × 680 pixels.",
    "Indoor brightness 600-1,200 nits; outdoor 5,000+ nits.",
    "Power: average about 25-35% of the max rated watts per sq m. Check heat and ventilation.",
    "Wall strength and structure must be checked."
  ],
  specs: [
    {k: "Pixel pitch (P)", v: "Smaller = sharper = costlier."},
    {k: "Brightness (nits)", v: "Indoor ~800, outdoor 5,000+."},
    {k: "Refresh rate", v: "3,840 Hz+ avoids flicker on cameras."},
    {k: "Cabinet size", v: "e.g. 500×500 mm or 640×480 mm."},
    {k: "Front / rear service", v: "Front service needed if the wall is flush."},
    {k: "IP rating", v: "IP65 front for outdoor."}
  ],
  brands: ["Samsung", "LG", "Absen", "Unilumin", "Leyard", "Daktronics", "Indian assemblers (various)"],
  buyers: "Corporate offices, showrooms, banquet halls, control rooms",
  where: "Cyber City, Golf Course Road, Aerocity, Noida Sector 62.",
  wayIn: "Interior designers, AI and tech companies.",
  ask: ["Where will it go, and what size of wall?", "Viewing distance?", "Content: video, presentations, data dashboards?", "Indoor or outdoor? Daylight on the wall?", "Budget range?"],
  pitch: ["A seamless LED wall makes your reception or showroom unforgettable: no bezels, no glare.", "I'll recommend the right pixel pitch for your viewing distance, so you don't overpay for resolution nobody sees.", "Complete job: structure, controller, installation and content setup."],
  objections: [["Too expensive.", "Pick the right pitch for the distance. P2.5 costs about half of P1.5 per sq ft and looks great from 3 m+."], ["Will it last?", "LED walls run 50,000-100,000 hours. Spare modules come with it."]],
  mistakes: ["Don't sell finer pitch than needed.", "Plan spare modules (same batch) for colour matching.", "Check power and ventilation."],
  upsell: ["UPS for the wall", "BMS/lighting control", "Content management", "AMC"],
  prices: [
    {item: "Indoor P1.5", unit: "per sq ft", low: 12000, high: 18000},
    {item: "Indoor P2.0", unit: "per sq ft", low: 8000, high: 12000},
    {item: "Indoor P2.5", unit: "per sq ft", low: 5000, high: 8000},
    {item: "Indoor P4", unit: "per sq ft", low: 3000, high: 5000},
    {item: "Outdoor P6", unit: "per sq ft", low: 3500, high: 6000},
    {item: "Outdoor P10", unit: "per sq ft", low: 2500, high: 4500}
  ],
  priceNote: "2026 web price list (includes controller and installation; GST extra). Outdoor typically 20-40% more than indoor at the same pitch.",
  calc: "led"
},
{
  id: "wtp", name: "Water Treatment Plant (RO, softener, STP/ETP)", cat: "Water & Steam", stage: "later", icon: "water",
  tagline: "Clean water for process, boilers, drinking and discharge rules.",
  what: "Systems that clean water for use or before discharge. RO (reverse osmosis) removes dissolved salts (TDS). Softeners remove hardness (calcium/magnesium) that causes scaling in boilers and pipes. Filters (sand, carbon) remove suspended solids and smell. STP treats sewage; ETP treats industrial effluent. The Chemotech profile shows industrial filter vessels and FRP softener tanks.",
  why: "NCR groundwater is hard and high in TDS. Boilers, cooling towers and process lines need soft water to avoid scaling. Pollution control boards require STP/ETP for many buildings and factories. Hospitals, hotels and food plants need treated water.",
  how: [
    "Pre-treatment: multigrade sand filter → activated carbon filter.",
    "Softener: resin exchanges hardness ions for sodium; regenerated with salt.",
    "RO: high-pressure pump pushes water through membranes; salts are rejected.",
    "Post-treatment: UV, pH correction, storage.",
    "STP/ETP: biological treatment (MBBR/SBR), clarifier, filters, sludge handling."
  ],
  types: [
    {name: "Industrial RO plant", desc: "250 LPH to 50,000+ LPH."},
    {name: "Water softener", desc: "For boilers, cooling towers, laundries."},
    {name: "DM plant", desc: "Demineralised water for labs, batteries, pharma."},
    {name: "STP (MBBR/SBR)", desc: "Sewage treatment for societies, hotels, offices."},
    {name: "ETP / ZLD", desc: "Effluent and zero-liquid-discharge for industries."}
  ],
  sizing: ["Flow rate (LPH or m³/hr) and daily volume (KLD).", "Raw water test: TDS, hardness, iron, pH.", "Target quality (e.g. boiler feed hardness < 5 ppm).", "Space and drain availability."],
  specs: [{k: "LPH / KLD", v: "Litres per hour / kilolitres per day."}, {k: "TDS (ppm)", v: "Total dissolved solids."}, {k: "Hardness (ppm as CaCO₃)", v: "Scale-forming minerals."}, {k: "Recovery %", v: "RO output vs input; rest is reject."}, {k: "MOC", v: "Material of construction: FRP, MS rubber-lined, SS."}],
  brands: ["Membranes: DuPont FilmTec, Hydranautics, Toray", "Vessels: Pentair, Wave Cyber", "Integrators: Ion Exchange, Thermax, Va Tech Wabag, local integrators"],
  buyers: "Factories, hospitals, hotels, food & beverage, pharma, housing societies",
  where: "Industrial areas: Manesar, Bawana, Okhla, Faridabad, Noida.",
  wayIn: "Not selected for now: long sales cycle and engineering. Chemotech's water team (industrial water treatment experience) can support later.",
  ask: ["Water source and raw water test report?", "Where is the water used: boiler, process, drinking?", "Required flow and daily volume?", "Pollution board requirements (STP/ETP)?"],
  pitch: ["Scale in your boiler wastes fuel. A softener pays back fast.", "Complete solution: test, design, supply, installation and AMC."],
  objections: [["We have an RO.", "Let me check its output and membranes; many plants run at low recovery and high cost."]],
  mistakes: ["Never size without a water test."],
  upsell: ["Dosing systems", "Membranes & resin replacement", "AMC"],
  prices: [
    {item: "Industrial RO 500 LPH", unit: "each", low: 120000, high: 250000},
    {item: "Industrial RO 1,000 LPH", unit: "each", low: 200000, high: 400000},
    {item: "Water softener ~1 m³/hr", unit: "each", low: 40000, high: 80000}
  ],
  priceNote: "Rough estimates; depends heavily on water quality and materials.",
  calc: null
},
{
  id: "steam", name: "Steam: PRV/PRS, Condensate Recovery, Steam Traps", cat: "Water & Steam", stage: "later", icon: "steam",
  tagline: "Fuel savings for any factory with a boiler.",
  what: "Steam system products help factories use boiler steam efficiently. A PRV (pressure reducing valve) or PRS (pressure reducing station) lowers steam pressure to what each machine needs. Steam traps let condensate (hot water) out of steam lines without letting steam escape. Condensate recovery systems pump that hot water back to the boiler.",
  why: "Leaking or failed steam traps and unrecovered condensate waste a lot of fuel. Condensate is hot, clean water: returning it saves fuel and water treatment. Correct pressure improves product quality and safety.",
  how: [
    "Boiler makes steam at high pressure (e.g. 10 bar).",
    "PRV station reduces it to process pressure (e.g. 3 bar) with strainer, separator, safety valve.",
    "Steam gives heat, condenses to water; traps discharge condensate.",
    "Condensate recovery pump (often pressure-powered) returns it to the boiler feed tank."
  ],
  types: [{name: "Thermodynamic (TD) trap", desc: "Small, cheap, for steam mains."}, {name: "Float & thermostatic trap", desc: "For process equipment, heat exchangers."}, {name: "Inverted bucket trap", desc: "Robust, for many applications."}, {name: "PRV / PRS stations", desc: "Direct-acting or pilot-operated."}, {name: "Condensate recovery pump", desc: "Electric or pressure-powered (no electricity)."}],
  sizing: ["Steam load (kg/hr) and pressures (inlet/outlet).", "Trap survey: count, type, condition of each trap.", "Rule of thumb: in plants without trap maintenance, a sizeable share of traps can be failed open."],
  specs: [{k: "NB / DN", v: "Pipe size (e.g. 15, 25, 50 NB)."}, {k: "Pressure rating", v: "e.g. PN16, PN40."}, {k: "kg/hr capacity", v: "Steam or condensate flow."}],
  brands: ["Spirax Sarco", "Forbes Marshall", "Thermax", "Armstrong"],
  buyers: "Factories with boilers: textiles, food, pharma, chemicals, paper, dairies",
  where: "Bawana, Manesar, Faridabad, Sonipat, Okhla.",
  wayIn: "Not selected for now. Chemotech has steam distribution project experience (Mukund Jha).",
  ask: ["Boiler capacity and fuel?", "Is condensate returned today?", "When were traps last surveyed?"],
  pitch: ["A steam trap survey usually finds failed traps leaking live steam: fixing them is quick fuel savings."],
  objections: [["Our boiler supplier handles it.", "Get a second opinion with a free trap survey."]],
  mistakes: ["Safety first: steam systems need trained engineers."],
  upsell: ["Water softener for boiler feed", "VFD on boiler feed pumps"],
  prices: [
    {item: "Thermodynamic trap 15 NB", unit: "each", low: 2500, high: 6000},
    {item: "Float & thermostatic trap", unit: "each", low: 15000, high: 40000},
    {item: "PRV station 25 NB", unit: "per station", low: 40000, high: 120000},
    {item: "Condensate recovery pump unit", unit: "per unit", low: 250000, high: 800000}
  ],
  priceNote: "Rough estimates.",
  calc: null
},
{
  id: "puf", name: "PUF / FUF Insulated Panels", cat: "Structures", stage: "later", icon: "panel",
  tagline: "Prefab rooms, clean rooms, godowns and cold storage.",
  what: "Sandwich panels with a foam core (PUF: polyurethane, or PIR) between two pre-painted steel sheets. Used to build insulated walls and roofs quickly: site offices, portable cabins, clean rooms, cold rooms, warehouses. Listed as 'FUF Panel' in the Chemotech profile for buildings, clean rooms, godowns and cold storage.",
  why: "Fast to build, insulated (saves cooling cost), clean surfaces for pharma/food, and movable. Cold storage and clean rooms need them.",
  how: ["Foam core gives insulation; steel skins give strength.", "Panels lock together with cam-locks or tongue-and-groove.", "Thickness (50-150 mm) chosen by temperature needed."],
  types: [{name: "Wall & roof panels", desc: "Warehouses, cabins."}, {name: "Cold room panels", desc: "80-150 mm for chillers and freezers."}, {name: "Clean room panels", desc: "Smooth, sealed, with coving."}, {name: "Portable cabins", desc: "Site offices, guard rooms."}],
  sizing: ["Area of walls and roof (sq m or sq ft).", "Cold room: 60-80 mm for +2 to +8°C, 100-150 mm for -18°C and below (typical)."],
  specs: [{k: "Thickness (mm)", v: "Insulation level."}, {k: "Density (kg/m³)", v: "Typically ~40 kg/m³."}, {k: "Sheet gauge", v: "e.g. 0.5 mm PPGI."}],
  brands: ["Lloyd Insulations", "Tata Steel Nest-In", "Everest", "Local fabricators"],
  buyers: "Pharma, food, cold storage, builders (site offices), warehouses",
  where: "Industrial belts across NCR.",
  wayIn: "Not selected for now.",
  ask: ["Use: cabin, clean room or cold room?", "Size and temperature?", "Timeline?"],
  pitch: ["Faster than brick, insulated, and can be moved later."],
  objections: [["Brick is cheaper.", "Panels are quicker and save cooling cost for years."]],
  mistakes: ["Cold rooms need refrigeration design too."],
  upsell: ["Electrical wiring", "Stabilizer for refrigeration", "Solar on roof"],
  prices: [{item: "PUF panel 50 mm", unit: "per sq ft", low: 110, high: 200}, {item: "Portable cabin 10×20 ft", unit: "each", low: 150000, high: 300000}],
  priceNote: "Rough estimates.",
  calc: null
}
]);
