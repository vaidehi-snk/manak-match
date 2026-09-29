// ============================================================================
// CORPUS EXPANSION (v2) — additional curated Indian Standards.
// Same schema as standards-data.js; appended to STANDARDS at load time.
// Curated demo data: verify every number/year against bis.gov.in before use.
// Row: [no, title, scope, ics, cat, isiMark, related[], opts?]
//   opts: { status, supersededBy, certScheme, amendments[] }
// ============================================================================
(function(){
const R = [
// ---- Cement, masonry & concrete ----
['IS 455:2015','Portland Slag Cement — Specification','Portland slag cement (PSC) made from clinker and granulated blast furnace slag, chemical and physical requirements for general construction.','91.100.10','Cement','mandatory',['IS 4031 (Part 1):1996','IS 269:2015']],
['IS 12330:1988','Sulphate Resisting Portland Cement — Specification','Sulphate resisting cement for foundations, marine works and structures exposed to sulphate bearing soil or groundwater.','91.100.10','Cement','mandatory',['IS 456:2000','IS 4031 (Part 1):1996']],
['IS 8043:1991','Hydrophobic Portland Cement — Specification','Water repellent hydrophobic cement for storage in humid conditions and long transport, rapid hardening.','91.100.10','Cement','mandatory',['IS 269:2015']],
['IS 12600:1989','Low Heat Portland Cement — Specification','Low heat cement for mass concrete, dams and large foundations where heat of hydration must be limited.','91.100.10','Cement','mandatory',['IS 456:2000']],
['IS 3466:1988','Masonry Cement — Specification','Masonry cement for mortar, plaster and non-structural masonry work.','91.100.10','Cement','mandatory',['IS 2250:1981']],
['IS 4031 (Part 6):1988','Methods of Physical Tests for Hydraulic Cement — Compressive Strength','Test method for compressive strength of cement mortar cubes with standard sand.','91.100.10','Testing','na',['IS 650:1991','IS 269:2015']],
['IS 650:1991','Standard Sand for Testing of Cement — Specification','Standard sand (Ennore sand) grades used for testing cement strength.','91.100.10','Testing','na',['IS 4031 (Part 6):1988']],
['IS 1489 (Part 1):1991','Portland Pozzolana Cement — Fly Ash Based','Older edition of PPC fly ash based specification.','91.100.10','Cement','mandatory',[],{status:'superseded',supersededBy:'IS 1489 (Part 1):2015'}],
['IS 383:1970','Coarse and Fine Aggregates from Natural Sources for Concrete','Older edition of aggregates specification.','91.100.20','Civil / Structural','na',[],{status:'superseded',supersededBy:'IS 383:2016'}],
['IS 456:1978','Code of Practice for Plain and Reinforced Concrete','Older edition of the plain and reinforced concrete code.','91.080.40','Civil / Structural','na',[],{status:'superseded',supersededBy:'IS 456:2000'}],
['IS 1786:1985','High Strength Deformed Steel Bars and Wires for Concrete Reinforcement','Older edition of TMT / deformed reinforcement bar specification.','77.140.15','Steel','mandatory',[],{status:'superseded',supersededBy:'IS 1786:2008'}],
['IS 4926:2003','Ready-Mixed Concrete — Code of Practice','Ready mixed concrete production, transport, delivery, sampling and acceptance at site.','91.100.30','Civil / Structural','na',['IS 456:2000','IS 516:2021']],
['IS 9103:1999','Concrete Admixtures — Specification','Chemical admixtures such as plasticisers, superplasticisers, retarders and accelerators for concrete.','91.100.30','Civil / Structural','na',['IS 456:2000']],
['IS 2645:2003','Integral Waterproofing Compounds for Cement Mortar and Concrete','Waterproofing admixtures added to mortar and concrete to reduce water permeability.','91.100.50','Civil / Structural','na',['IS 456:2000']],
['IS 15388:2003','Silica Fume — Specification','Silica fume as mineral admixture for high performance concrete.','91.100.30','Civil / Structural','na',['IS 456:2000']],
['IS 1199 (Part 1):2018','Fresh Concrete — Methods of Sampling, Testing and Analysis','Sampling of fresh concrete and slump, workability, density tests.','91.100.30','Testing','na',['IS 456:2000','IS 516:2021']],
['IS 2116:1980','Sand for Masonry Mortars — Specification','Natural sand for masonry mortar grading and impurities.','91.100.15','Civil / Structural','na',['IS 2250:1981']],
['IS 1542:1992','Sand for Plaster — Specification','Sand for plaster work, grading zones and deleterious materials.','91.100.15','Civil / Structural','na',['IS 1661:1972']],
['IS 2250:1981','Code of Practice for Preparation and Use of Masonry Mortars','Mortar mixes, proportions and use in brick and block masonry.','91.100.10','Civil / Structural','na',['IS 2116:1980','IS 1077:1992']],
['IS 1661:1972','Code of Practice for Cement and Cement-Lime Plaster Finishes on Walls and Ceilings','Application of cement plaster, thickness, curing and finishing on walls and ceilings.','91.100.10','Civil / Structural','na',['IS 1542:1992']],
['IS 2212:1991','Code of Practice for Brickwork','Brick masonry construction, bonds, joints and workmanship.','91.080.30','Civil / Structural','na',['IS 1077:1992','IS 2250:1981']],
['IS 12894:2002','Fly Ash Lime Bricks — Specification','Fly ash lime bricks, compressive strength and water absorption for masonry.','91.100.25','Civil / Structural','na',['IS 3495 (Part 1):1992','IS 3812 (Part 1):2013']],
['IS 3495 (Part 1):1992','Methods of Tests of Burnt Clay Building Bricks — Compressive Strength','Test method for compressive strength of bricks.','91.100.25','Testing','na',['IS 1077:1992']],
['IS 2185 (Part 3):1984','Concrete Masonry Units — Autoclaved Cellular Aerated Concrete Blocks','AAC blocks, lightweight aerated autoclaved cellular concrete blocks for walls.','91.100.30','Civil / Structural','na',['IS 2185 (Part 1):2005']],
['IS 1893 (Part 1):2016','Criteria for Earthquake Resistant Design of Structures — General Provisions and Buildings','Seismic zones, design forces and criteria for buildings and structures.','91.120.25','Civil / Structural','na',['IS 13920:2016','IS 456:2000','IS 4326:2013']],
['IS 1893:2002','Criteria for Earthquake Resistant Design of Structures','Older edition of earthquake resistant design criteria.','91.120.25','Civil / Structural','na',[],{status:'superseded',supersededBy:'IS 1893 (Part 1):2016'}],
['IS 13920:2016','Ductile Design and Detailing of Reinforced Concrete Structures Subjected to Seismic Forces','Seismic detailing of reinforced concrete frames, beams, columns and joints.','91.080.40','Civil / Structural','na',['IS 456:2000','IS 1893 (Part 1):2016']],
['IS 4326:2013','Earthquake Resistant Design and Construction of Buildings — Code of Practice','Earthquake resistant construction of masonry and other buildings.','91.120.25','Civil / Structural','na',['IS 1893 (Part 1):2016']],
['IS 875 (Part 1):1987','Design Loads for Buildings — Dead Loads','Unit weights of building materials and dead load calculation.','91.080.01','Civil / Structural','na',['IS 875 (Part 3):2015']],
['IS 875 (Part 2):1987','Design Loads for Buildings — Imposed Loads','Live loads for floors, roofs and occupancies.','91.080.01','Civil / Structural','na',['IS 875 (Part 1):1987']],
['IS 2911 (Part 1/Sec 1):2010','Design and Construction of Pile Foundations — Driven Cast In-situ Concrete Piles','Pile foundation design, construction and testing.','93.020','Civil / Structural','na',['IS 456:2000']],
['IS 6403:1981','Code of Practice for Determination of Bearing Capacity of Shallow Foundations','Bearing capacity of soil for footings and raft foundations.','93.020','Civil / Structural','na',['IS 1498:1970']],
['IS 1498:1970','Classification and Identification of Soils for General Engineering Purposes','Soil classification system for engineering use.','93.020','Testing','na',['IS 2720 (Part 1):1983']],
['IS 2720 (Part 1):1983','Methods of Test for Soils — Preparation of Dry Soil Samples','Preparation of soil samples for laboratory testing.','93.020','Testing','na',['IS 1498:1970']],
['NBC 2016','National Building Code of India 2016 (SP 7)','Comprehensive building code covering planning, structural design, fire and life safety, services, accessibility and sustainability.','91.040.01','Civil / Structural','na',['IS 456:2000','IS 1641:2013','IS 732:2019']],
// ---- Steel & metals ----
['IS 2062:1999','Hot Rolled Low, Medium and High Tensile Structural Steel','Older edition of structural steel specification.','77.140.10','Steel','mandatory',[],{status:'superseded',supersededBy:'IS 2062:2011'}],
['IS 1161:2014','Steel Tubes for Structural Purposes — Specification','Steel tubes, square and rectangular hollow sections for structural use.','77.140.75','Steel','mandatory',['IS 800:2007','IS 2062:2011']],
['IS 4923:2017','Hollow Steel Sections for Structural Use — Specification','Cold formed hollow structural sections, box sections for buildings and frames.','77.140.75','Steel','mandatory',['IS 800:2007']],
['IS 1566:1982','Plain Hard-Drawn Steel Wire Fabric for Concrete Reinforcement','Welded wire mesh fabric for slabs and pavements.','77.140.15','Steel','na',['IS 456:2000']],
['IS 280:2006','Mild Steel Wire for General Engineering Purposes','Mild steel wire, binding wire, general purpose.','77.140.65','Steel','na',[]],
['IS 1363 (Part 1):2019','Hexagon Head Bolts, Screws and Nuts of Product Grade C','Fasteners — hexagon head bolts and nuts for general engineering and structures.','21.060.10','Steel','na',['IS 800:2007']],
['IS 1608 (Part 1):2022','Metallic Materials — Tensile Testing at Ambient Temperature','Tensile test method for steel bars and metals.','77.040.10','Testing','na',['IS 1786:2008','IS 2062:2011']],
['IS 10748:2004','Hot Rolled Steel Strip for Welded Tubes and Pipes','Hot rolled steel strip used to make tubes and pipes.','77.140.50','Steel','na',['IS 1239 (Part 1):2004']],
// ---- Pipes, valves, water supply, drainage ----
['IS 4985:2000','Unplasticised PVC Pipes for Potable Water Supplies','Older edition of PVC pressure pipe specification.','23.040.20','Pipes & Fittings','voluntary',[],{status:'superseded',supersededBy:'IS 4985:2021'}],
['IS 1536:2001','Centrifugally Cast (Spun) Iron Pressure Pipes for Water, Gas and Sewage','Spun cast iron pressure pipes.','23.040.10','Pipes & Fittings','voluntary',['IS 8329:2000']],
['IS 8329:2000','Centrifugally Cast (Spun) Ductile Iron Pressure Pipes for Water, Gas and Sewage','Ductile iron (DI) pipes for water mains and sewers.','23.040.10','Pipes & Fittings','mandatory',['IS 5382:1985','IS 14846:2000']],
['IS 458:2021','Concrete Pipes (With and Without Reinforcement) — Specification','Precast RCC and plain concrete pipes for culverts, drains and sewers.','23.040.50','Pipes & Fittings','na',['IS 783:1985']],
['IS 783:1985','Code of Practice for Laying of Concrete Pipes','Laying and jointing of concrete pipes in trenches.','23.040.50','Pipes & Fittings','na',['IS 458:2021']],
['IS 651:2007','Salt Glazed Stoneware Pipes and Fittings','Stoneware pipes for drains and sewers.','23.040.20','Pipes & Fittings','na',[]],
['IS 13592:2013','Unplasticized PVC Pipes for Soil and Waste Discharge Systems Inside Buildings','UPVC soil, waste and vent pipes for building drainage.','23.040.20','Pipes & Fittings','voluntary',['IS 5329:1983']],
['IS 12818:2010','Unplasticized PVC Screen and Casing Pipes for Borewells and Tubewells','UPVC casing and screen pipes for bore wells.','23.040.20','Pipes & Fittings','voluntary',[]],
['IS 14333:1996','High Density Polyethylene Pipes for Sewerage','HDPE sewer pipes.','23.040.20','Pipes & Fittings','na',['IS 4984:2016']],
['IS 14151 (Part 1):1994','Polyethylene Pipes for Irrigation — Low Density','Polyethylene pipes for agricultural irrigation and drip lines.','23.040.20','Agriculture','na',[]],
['IS 778:1984','Copper Alloy Gate, Globe and Check Valves for Water Works Purposes','Gunmetal valves for water supply.','23.060.01','Pipes & Fittings','na',['IS 14846:2000']],
['IS 14846:2000','Sluice Valves for Water Works Purposes (50 to 1200 mm)','Sluice valves, gate valves for water mains.','23.060.20','Pipes & Fittings','na',['IS 8329:2000']],
['IS 5382:1985','Rubber Sealing Rings for Gas Mains, Water Mains and Sewers','Rubber gaskets and sealing rings for pipe joints.','23.040.80','Pipes & Fittings','na',['IS 8329:2000']],
['IS 781:1984','Cast Copper Alloy Screw Down Bib Taps and Stop Valves for Water Services','Bib taps, water taps, stop cocks for domestic water supply.','23.060.40','Sanitation','na',['IS 8931:1993']],
['IS 8931:1993','Copper Alloy Fancy Single Taps, Combination Tap Assembly and Stop Valves','Fancy taps, mixer taps, faucets for bathrooms and kitchens.','23.060.40','Sanitation','na',['IS 781:1984']],
['IS 1795:1982','Pillar Taps for Water Supply Purposes','Pillar taps for wash basins and sinks.','23.060.40','Sanitation','na',['IS 781:1984']],
['IS 12701:1996','Rotational Moulded Polyethylene Water Storage Tanks','Plastic overhead water tanks, PE storage tanks, Sintex type tanks.','23.020.10','Pipes & Fittings','mandatory',['IS 2065:1983']],
['IS 2065:1983','Code of Practice for Water Supply in Buildings','Water supply distribution inside buildings, tank sizing, pipework.','91.140.60','Sanitation','na',['IS 1172:1993']],
['IS 1172:1993','Code of Basic Requirements for Water Supply, Drainage and Sanitation','Per capita water requirement, drainage and sanitation for buildings.','91.140.60','Sanitation','na',['IS 2065:1983','IS 1742:1983']],
['IS 1742:1983','Code of Practice for Building Drainage','Design and layout of drainage in buildings.','91.140.80','Sanitation','na',['IS 5329:1983']],
['IS 5329:1983','Code of Practice for Sanitary Pipe Work Above Ground for Buildings','Soil, waste and vent pipework above ground.','91.140.80','Sanitation','na',['IS 1742:1983']],
['IS 2470 (Part 1):1985','Code of Practice for Installation of Septic Tanks — Design Criteria','Septic tank design, sizing, soak pit and construction.','91.140.80','Sanitation','na',['IS 1172:1993']],
// ---- Electrical ----
['IS 694:1990','PVC Insulated Cables for Working Voltages up to 1100 V','Older edition of PVC insulated wire specification.','29.060.20','Electrical','mandatory',[],{status:'superseded',supersededBy:'IS 694:2010'}],
['IS 7098 (Part 2):2011','Cross-linked Polyethylene Insulated PVC Sheathed Cables — 3.3 kV to 33 kV','XLPE HT power cables for medium voltage distribution.','29.060.20','Electrical','voluntary',['IS 8130:2013']],
['IS 8130:2013','Conductors for Insulated Electric Cables and Flexible Cords','Copper and aluminium conductor classes for cables and wires.','29.060.10','Electrical','na',['IS 694:2010','IS 1554 (Part 1):1988']],
['IS 3854:1997','Switches for Domestic and Similar Purposes','Modular switches, wall switches, regulators for home wiring.','29.120.40','Electrical','mandatory',['IS 1293:2019','IS 732:2019']],
['IS/IEC 60898-1:2015','Circuit Breakers for Overcurrent Protection for Household and Similar Installations (MCB)','Miniature circuit breakers MCB for household and similar use.','29.120.50','Electrical','mandatory',['IS 732:2019','IS 3043:2018']],
['IS 12640 (Part 1):2008','Residual Current Operated Circuit Breakers (RCCB) — General','RCCB, earth leakage circuit breakers, ELCB for shock protection.','29.120.50','Electrical','mandatory',['IS 3043:2018','IS/IEC 60898-1:2015']],
['IS 1180 (Part 1):2014','Outdoor Type Three-Phase Distribution Transformers up to 2500 kVA','Distribution transformers, oil immersed, 11 kV and 33 kV class.','29.180','Electrical','mandatory',['IS 2026 (Part 1):2011']],
['IS 2026 (Part 1):2011','Power Transformers — General','Power transformer general requirements, rating and testing.','29.180','Electrical','na',['IS 1180 (Part 1):2014']],
['IS 13779:1999','AC Static Watt-hour Meters, Class 1 and 2','Static energy meters, electricity meters for billing.','17.220.20','Electrical','mandatory',['IS 16444 (Part 1):2015']],
['IS 16444 (Part 1):2015','AC Static Direct Connected Watt-hour Smart Meter Class 1 and 2','Smart meters, prepaid smart energy meters with communication.','17.220.20','Electrical','mandatory',['IS 13779:1999']],
['IS 325:1996','Three-Phase Induction Motors','Three phase induction motors for industry, pumps and drives.','29.160.30','Electrical','mandatory',['IS 12615:2018']],
['IS 12615:2018','Line Operated Three Phase AC Motors (IE Code) — Efficiency Classes','Energy efficient motors IE2 IE3 classification.','29.160.30','Electrical','mandatory',['IS 325:1996']],
['IS 9079:2002','Monoset Pumps for Clear Cold Water for Agricultural and Water Supply Purposes','Monoblock pumps, water pumps for agriculture and supply.','23.080','Electrical','mandatory',['IS 325:1996']],
['IS 8034:2018','Submersible Pump Sets','Submersible pumps, borewell pumps, openwell submersible.','23.080','Electrical','mandatory',['IS 325:1996']],
['IS 1520:1980','Horizontal Centrifugal Pumps for Clear Cold Fresh Water','Centrifugal water pumps for water supply and irrigation.','23.080','Electrical','mandatory',['IS 325:1996']],
['IS 2312:1967','Propeller Type AC Ventilating Fans','Exhaust fans and ventilating fans.','23.120','Electrical','na',['IS 374:2019']],
['IS 302 (Part 2/Sec 21):2008','Household and Similar Electrical Appliances — Safety — Storage Water Heaters','Electric geyser, storage water heater safety.','97.030','Electrical','mandatory',['IS 302 (Part 1):2008']],
['IS 1391 (Part 1):1992','Room Air Conditioners — Unitary Air Conditioners','Window air conditioner, AC rating and performance.','23.120','Electrical','mandatory',['IS 1391 (Part 2):1992']],
['IS 1391 (Part 2):1992','Room Air Conditioners — Split Air Conditioners','Split AC indoor and outdoor units performance.','23.120','Electrical','mandatory',['IS 1391 (Part 1):1992']],
['IS 16242 (Part 1):2014','Uninterruptible Power Systems (UPS) — General and Safety Requirements','UPS for computers and offices, inverter safety.','29.200','IT Hardware','na',['IS 13252 (Part 1):2010'],{certScheme:'CRS'}],
['IS 1651:2013','Stationary Cells and Batteries, Lead-Acid Type (with Tubular Positive Plates)','Lead acid batteries for inverters, UPS and stationary use.','29.220.20','Electrical','na',['IS 15549:2005']],
['IS 15549:2005','Stationary Valve Regulated Lead Acid Batteries','VRLA batteries, SMF batteries for UPS and telecom.','29.220.20','Electrical','na',['IS 1651:2013']],
['IS 16046 (Part 2):2018','Secondary Cells and Batteries — Safety of Portable Sealed Secondary Lithium Cells and Batteries','Lithium ion batteries, power banks, portable battery safety.','29.220.30','IT Hardware','na',['IS 16046 (Part 1):2018'],{certScheme:'CRS'}],
['IS 2026 (Part 1):1977','Power Transformers — General','Older edition of power transformer general requirements.','29.180','Electrical','na',[],{status:'withdrawn'}],
// ---- Solar / energy ----
['IS 12933 (Part 1):2003','Solar Flat Plate Collectors — Components','Solar water heating collectors, solar geyser flat plate.','27.160','Solar / Energy','na',['IS 14286:2010']],
['IS 16077:2013','Thin-film Terrestrial Photovoltaic Modules — Design Qualification and Type Approval','Thin film solar modules qualification.','27.160','Solar / Energy','na',['IS 14286:2010']],
// ---- Fire & safety ----
['IS 2189:2008','Selection, Installation and Maintenance of Automatic Fire Detection and Alarm System','Fire alarm system, smoke detectors, heat detectors installation.','13.220.20','Fire Safety','na',['IS 1646:1997','NBC 2016']],
['IS 1646:1997','Fire Safety of Buildings — Electrical Installations','Fire safety in electrical installations of buildings.','13.220.20','Fire Safety','na',['IS 732:2019']],
['IS 1641:2013','Fire Safety of Buildings — General Principles of Fire Grading and Classification','Occupancy classification and fire grading of buildings.','13.220.20','Fire Safety','na',['IS 1642:2013','NBC 2016']],
['IS 1642:2013','Fire Safety of Buildings — Details of Construction','Fire resistance and construction details for buildings.','13.220.20','Fire Safety','na',['IS 1641:2013']],
['IS 15105:2002','Design and Installation of Fixed Automatic Sprinkler Fire Extinguishing Systems','Sprinkler system design and installation.','13.220.10','Fire Safety','na',['IS 9668:2018','NBC 2016']],
['IS 9668:2018','Provision and Maintenance of Water Supplies for Fire Fighting','Fire water tanks, hydrant water supply.','13.220.10','Fire Safety','na',['IS 3844:1989','IS 15105:2002']],
['IS 636:1988','Non-percolating Flexible Fire Fighting Delivery Hose','Fire hose pipe, delivery hose for hydrants.','13.220.10','Fire Safety','na',['IS 3844:1989','IS 903:1993']],
['IS 903:1993','Fire Hose Delivery Couplings, Branch Pipe, Nozzles and Nozzle Spanner','Hose couplings and branch pipes for fire fighting.','13.220.10','Fire Safety','na',['IS 636:1988']],
['IS 2878:2004','Fire Extinguishers — Carbon Dioxide Type (Portable and Trolley Mounted)','CO2 fire extinguisher for electrical fires.','13.220.10','Fire Safety','na',['IS 2190:2010']],
['IS 3521:1999','Industrial Safety Belts and Harnesses','Safety belt, full body harness for work at height.','13.340.99','Safety / PPE','na',['IS 2925:1984']],
['IS 5983:1980','Eye Protectors','Safety goggles, welding goggles, eye protection.','13.340.20','Safety / PPE','na',['IS 2925:1984']],
['IS 4770:1991','Rubber Gloves for Electrical Purposes','Electrical insulating rubber gloves for live working.','13.260','Safety / PPE','na',['IS 3043:2018']],
['IS 6994 (Part 1):1973','Industrial Safety Gloves — Leather and Cotton Gloves','Hand gloves, safety gloves for workers.','13.340.40','Safety / PPE','na',['IS 2925:1984']],
['IS 9473:2002','Respiratory Protective Devices — Filtering Half Masks to Protect Against Particles','Dust masks, respirators, N95 type filtering half mask.','13.340.30','Safety / PPE','na',['IS 2925:1984']],
['IS 11226:1985','Leather Safety Footwear with Steel Toe Cap','Safety shoes, steel toe cap leather footwear.','61.060','Safety / PPE','na',['IS 15298 (Part 2):2016']],
['IS 4151:2015','Protective Helmets for Two-Wheeler Riders','Motorcycle helmet, two wheeler helmet, scooter rider protection.','43.150','Safety / PPE','mandatory',[]],
// ---- Wood, boards, doors ----
['IS 303:1989','Plywood for General Purposes','Plywood for furniture, partitions and interiors, BWR and MR grades.','79.060.10','Timber & Wood','mandatory',['IS 848:2006']],
['IS 710:2010','Marine Plywood','Marine grade waterproof plywood, BWP.','79.060.10','Timber & Wood','mandatory',['IS 848:2006']],
['IS 848:2006','Synthetic Resin Adhesives for Plywood (Phenolic and Aminoplastic)','Adhesives for plywood manufacture.','83.180','Timber & Wood','na',['IS 303:1989']],
['IS 1659:2004','Block Boards — Specification','Blockboard for furniture and doors.','79.060.10','Timber & Wood','na',['IS 303:1989']],
['IS 12406:2003','Medium Density Fibre Boards for General Purposes','MDF board for furniture.','79.060.20','Timber & Wood','na',[]],
['IS 3087:2005','Particle Boards of Wood and Other Lignocellulosic Materials (Medium Density)','Particle board, chipboard for furniture and panelling.','79.060.20','Timber & Wood','na',[]],
['IS 2202 (Part 1):1999','Wooden Flush Door Shutters — Solid Core Type','Flush doors, solid core wooden door shutters.','91.060.50','Timber & Wood','na',['IS 4021:1995']],
['IS 1003 (Part 1):1994','Timber Panelled and Glazed Shutters — Door Shutters','Panelled wooden doors and glazed door shutters.','91.060.50','Timber & Wood','na',['IS 4021:1995']],
['IS 4021:1995','Timber Door, Window and Ventilator Frames','Wooden door frames and window frames.','91.060.50','Timber & Wood','na',['IS 1003 (Part 1):1994']],
['IS 1141:1993','Code of Practice for Seasoning of Timber','Timber seasoning, drying of wood.','79.040','Timber & Wood','na',['IS 401:2001']],
['IS 401:2001','Code of Practice for Preservation of Timber','Wood preservatives, treatment against termite and decay.','79.040','Timber & Wood','na',['IS 1141:1993']],
['IS 883:1994','Design of Structural Timber in Building','Structural timber design.','79.040','Timber & Wood','na',[]],
// ---- Glass, tiles, flooring ----
['IS 2553 (Part 1):1990','Safety Glass — General Purpose','Toughened glass, laminated safety glass for buildings.','81.040.20','Glass & Ceramics','mandatory',['IS 14900:2018']],
['IS 14900:2018','Transparent Float Glass','Float glass for windows, doors and glazing.','81.040.20','Glass & Ceramics','mandatory',['IS 2553 (Part 1):1990']],
['IS 15622:2006','Pressed Ceramic Tiles — Specification','Ceramic floor and wall tiles, vitrified tiles.','81.060.30','Glass & Ceramics','voluntary',['IS 13712:1993']],
['IS 13712:1993','Ceramic Tiles — Definitions, Classification, Characteristics and Marking','Classification of ceramic tiles.','81.060.30','Glass & Ceramics','na',['IS 15622:2006']],
['IS 1237:2012','Cement Concrete Flooring Tiles','Cement concrete tiles, terrazzo, mosaic floor tiles.','91.100.30','Glass & Ceramics','na',['IS 1443:1972']],
['IS 13801:2013','Chequered Cement Concrete Tiles','Chequered tiles for outdoor flooring, footpaths.','91.100.30','Glass & Ceramics','na',['IS 1237:2012']],
['IS 1443:1972','Code of Practice for Laying and Finishing of Cement Concrete Flooring Tiles','Laying of flooring tiles.','91.100.30','Glass & Ceramics','na',['IS 1237:2012']],
['IS 2571:1970','Code of Practice for Laying In-situ Cement Concrete Flooring','In-situ concrete flooring, screed and topping.','91.100.30','Civil / Structural','na',['IS 456:2000']],
['IS 777:1988','Glazed Earthenware Tiles','Glazed wall tiles for kitchens and bathrooms.','81.060.30','Glass & Ceramics','na',[]],
// ---- Paints, bitumen & waterproofing ----
['IS 428:2013','Distemper, Oil Emulsion, Colour as Required','Oil bound distemper for walls.','87.060.20','Paints & Coatings','na',['IS 5410:1992']],
['IS 5410:1992','Cement Paint — Specification','Cement based paint for exterior masonry walls.','87.060.20','Paints & Coatings','na',['IS 428:2013']],
['IS 5411 (Part 1):1974','Plastic Emulsion Paint for Interior Use','Emulsion paint, interior wall paint.','87.060.20','Paints & Coatings','na',['IS 5410:1992']],
['IS 2932:2003','Enamel, Synthetic, Exterior (a) Undercoating (b) Finishing','Synthetic enamel paint for wood and metal.','87.060.20','Paints & Coatings','na',['IS 2074:2015']],
['IS 2074:2015','Ready Mixed Paint, Air Drying, Red Oxide-Zinc Chrome, Priming','Red oxide primer for steel.','87.060.20','Paints & Coatings','na',['IS 2932:2003']],
['IS 133:1993','Enamel, Interior (a) Undercoating (b) Finishing','Interior synthetic enamel.','87.060.20','Paints & Coatings','na',['IS 2932:2003']],
['IS 217:1988','Cutback Bitumen — Specification','Cutback bitumen for road priming and tack coat.','75.140','Roads','na',['IS 73:2013']],
['IS 8887:2004','Bitumen Emulsion for Road Purposes','Bitumen emulsion for tack coat and surface dressing.','75.140','Roads','na',['IS 73:2013']],
['IS 1322:1993','Bitumen Felts for Waterproofing and Damp-proofing','Bitumen felt for roof waterproofing.','91.100.50','Civil / Structural','na',['IS 3384:1986']],
['IS 3384:1986','Bitumen Primer for Use in Waterproofing and Damp-proofing','Primer for waterproofing works.','91.100.50','Civil / Structural','na',['IS 1322:1993']],
['IS 1834:1984','Hot Applied Sealing Compounds for Joints in Concrete','Joint sealant, expansion joint filler for concrete.','91.100.50','Civil / Structural','na',[]],
['IS 1726:1974','Cast Iron Manhole Covers and Frames','Older edition of cast iron manhole covers.','23.040.10','Sanitation','na',[],{status:'withdrawn'}],
// ---- Kitchen, gas, food ----
['IS 2347:2017','Aluminium Pressure Cookers','Pressure cooker, aluminium, safety and capacity.','97.040.20','Kitchen Equipment','mandatory',['IS 302 (Part 1):2008']],
['IS 4941:1994','Honey — Specification','Honey purity, moisture and sugar limits.','67.180.10','Food & Beverages','na',[]],
['IS 10500:1991','Drinking Water — Specification','Older edition of drinking water quality standard.','13.060.20','Water Quality','na',[],{status:'superseded',supersededBy:'IS 10500:2012'}],
// ---- Toys, plastics, misc ----
['IS 9873 (Part 1):2019','Safety of Toys — Mechanical and Physical Properties','Toys for children, mechanical and physical safety.','97.200.50','Toys','mandatory',['IS 9873 (Part 3):2019']],
['IS 9873 (Part 2):2019','Safety of Toys — Flammability','Flammability requirements for toys.','97.200.50','Toys','mandatory',['IS 9873 (Part 1):2019']],
['IS 9873 (Part 3):2019','Safety of Toys — Migration of Certain Elements','Heavy metals migration limits in toys.','97.200.50','Toys','mandatory',['IS 9873 (Part 1):2019']],
['IS 3812 (Part 1):2013','Pulverized Fuel Ash (Fly Ash) for Use as Pozzolana in Cement, Cement Mortar and Concrete','Fly ash specification for use as pozzolana in cement and concrete.','91.100.10','Cement','na',['IS 1489 (Part 1):2015','IS 456:2000']],
['IS 7834 (Part 1):1987','Injection Moulded PVC Socket Fittings with Solvent Cement Joints for Water Supplies','PVC fittings, elbows, tees and couplers for PVC pipe.','23.040.45','Pipes & Fittings','na',['IS 4985:2021']],
['IS 1726:1991','Cast Iron Manhole Covers and Frames','Cast iron manhole covers.','23.040.10','Sanitation','na',['IS 12592:2002']]
];
const seen = new Set(STANDARDS.map(s => s.no));
R.forEach(r => {
  if(seen.has(r[0])) return; seen.add(r[0]);
  const o = r[7] || {};
  const s = { no:r[0], title:r[1], scope:r[2], ics:r[3], cat:r[4], status:o.status || 'current', isiMark:r[5], related:r[6] || [], amendments:o.amendments || [] };
  if(o.supersededBy) s.supersededBy = o.supersededBy;
  if(o.certScheme) s.certScheme = o.certScheme;
  STANDARDS.push(s);
});

// ---- colloquial names: how officers actually describe things (appended to scope, searched + embedded) ----
const AKA = {
 'IS 302 (Part 2/Sec 21):2008':'geyser, hot water tank, bathroom water heater, keeps water hot, immersion heater',
 'IS 4151:2015':'bike helmet, motorcycle helmet, head protection while riding a bike or scooter, two wheeler helmet',
 'IS 2925:1984':'construction site helmet, hard hat, industrial head protection for workers',
 'IS 16242 (Part 1):2014':'inverter, power backup for computers and offices, battery backup, UPS',
 'IS 1893 (Part 1):2016':'earthquake safe building, quake resistant design, seismic design, building collapse in earthquake',
 'IS 4326:2013':'earthquake safe construction, quake resistant house, seismic construction',
 'IS/IEC 60898-1:2015':'MCB, miniature circuit breaker, distribution board breaker, household breaker',
 'IS 12640 (Part 1):2008':'RCCB, ELCB, earth leakage breaker, shock protection switch',
 'IS 2553 (Part 1):1990':'toughened glass, tempered glass, laminated glass, safety glass for windows and doors',
 'IS 14900:2018':'plain window glass, clear glass sheet, float glass for windows',
 'IS 1391 (Part 1):1992':'window AC, room air conditioner, air conditioning',
 'IS 1391 (Part 2):1992':'split AC, air conditioner indoor outdoor unit, air conditioning',
 'IS 12701:1996':'plastic water tank, overhead tank, Sintex tank, PVC tank',
 'IS 16444 (Part 1):2015':'smart meter, electricity meter, prepaid meter',
 'IS 9873 (Part 1):2019':'children toys, kids toys, plaything safety',
 'IS 269:2015':'cement, OPC, ordinary portland cement, general purpose cement, 33 43 53 grade cement',
 'IS 15683:2018':'fire extinguisher, portable extinguisher, ABC extinguisher, fire cylinder',
 'IS 3196 (Part 1):2013':'LPG cylinder, gas cylinder, cooking gas cylinder, LPG cylinder for domestic kitchen use, LPG cylinder for kitchen',
 'IS 1786:2008':'TMT bar, rebar, reinforcement steel, saria',
 'IS 1661:1972':'wall plaster, cement plastering, plaster work on walls',
 'IS 8034:2018':'borewell pump, submersible motor pump, tubewell pump',
 'IS 15105:2002':'fire sprinkler, sprinkler system, automatic fire fighting',
 'IS 2189:2008':'smoke detector, fire alarm, fire detection system'
};
STANDARDS.forEach(s => { if(AKA[s.no] && !s.scope.includes('Also called')) s.scope += ' Also called: ' + AKA[s.no] + '.'; });
// flagship standard per everyday item: wins ties against sibling standards of the same family
const PRIMARY = ['IS 269:2015','IS 456:2000','IS 1786:2008','IS 2062:2011','IS 15683:2018','IS 3196 (Part 1):2013','IS 4985:2021','IS 694:2010','IS 1554 (Part 1):1988','IS 2925:1984','IS 374:2019','IS 303:1989','IS 10500:2012','IS 1077:1992','IS 383:2016','IS 1293:2019','IS 4246:2002','IS 2553 (Part 1):1990','IS 15298 (Part 2):2016','IS 16102 (Part 1):2012'];
STANDARDS.forEach(s => { if(PRIMARY.includes(s.no)) s.primary = true; });

// ---- vocabulary for the new domains (merged into existing synonym tables) ----
const SYN = {
  'plywood':['ply','blockboard','mdf','particle board','hardboard'], 'door':['shutter','flush door','door frame'], 'timber':['wood','wooden','lumber'],
  'glass':['glazing','toughened','float glass','laminated'], 'tile':['tiles','vitrified','ceramic','flooring','terrazzo'],
  'paint':['distemper','emulsion','enamel','primer','coating','putty'], 'waterproofing':['damp proofing','waterproof','sealant','bitumen felt'],
  'valve':['gate valve','sluice valve','tap','faucet','stop cock'], 'tap':['faucet','bib cock','mixer'], 'tank':['water tank','overhead tank','storage tank','sintex'],
  'transformer':['distribution transformer','power transformer'], 'meter':['energy meter','smart meter','watt-hour','electricity meter'],
  'breaker':['mcb','rccb','elcb','circuit breaker','mccb'], 'motor':['induction motor','pump motor'], 'pump':['submersible','monoblock','centrifugal pump','borewell'],
  'air conditioner':['split ac','window ac','airconditioner','air conditioning'], 'geyser':['water heater','storage water heater'], 'ups':['inverter','uninterruptible','power backup'],
  'toy':['toys','children toy','plaything'], 'sprinkler':['fire sprinkler','hydrant','fire alarm','smoke detector','fire hose'],
  'harness':['safety belt','fall protection','safety harness'], 'goggles':['eye protection','safety glasses'], 'gloves':['hand gloves','safety gloves'],
  'seismic':['earthquake','earthquake resistant'], 'foundation':['footing','pile','raft'], 'mortar':['plaster','masonry','plastering'],
  'admixture':['plasticiser','superplasticiser','retarder'], 'transformer oil':['insulating oil'], 'cooker':['pressure cooker'], 'honey':['madhu'],
  'ready mix':['rmc','ready mixed concrete'], 'irrigation':['drip','sprinkler irrigation','emitter']
};
Object.entries(SYN).forEach(([k, v]) => { SYNONYMS[k] = [...new Set([...(SYNONYMS[k] || []), ...v])]; });
Object.assign(HINDI_SYNONYMS, {
  'प्लाईवुड':'plywood','ब्लॉकबोर्ड':'plywood','दरवाजा':'door','दरवाज़ा':'door','दरवाजे':'door','लकड़ी':'timber','काँच':'glass','कांच':'glass','शीशा':'glass',
  'टाइल':'tile','टाइल्स':'tile','फर्श':'tile','पेंट':'paint','रंग':'paint','वाटरप्रूफिंग':'waterproofing','वाल्व':'valve','नल':'tap','टंकी':'tank','टैंक':'tank',
  'ट्रांसफार्मर':'transformer','मीटर':'meter','पंप':'pump','मोटर':'motor','पंखा':'fan','एसी':'air conditioner','गीजर':'geyser','यूपीएस':'ups','इन्वर्टर':'ups',
  'खिलौने':'toy','खिलौना':'toy','स्प्रिंकलर':'sprinkler','अग्निशमन':'extinguisher','दस्ताने':'gloves','चश्मा':'goggles','भूकंप':'seismic','नींव':'foundation',
  'सीमेंट':'cement','मैनहोल':'manhole','केबल':'cable','बल्ब':'bulb','ईंट':'brick','ईंटें':'brick','सरिया':'rebar','शहद':'honey','कुकर':'cooker',
  'दरवाजा':'door','खिडकी':'door','खिड़की':'door','टाईल':'tile','रंगकाम':'paint','पाइपलाइन':'pipe','सिंचाई':'irrigation','ड्रिप':'irrigation'
});
})();
