// ============================================================================
// CURATED INDIAN STANDARDS CORPUS
// ----------------------------------------------------------------------------
// ~50 standards across the categories most commonly cited in government
// procurement. Every entry must be re-verified against the live BIS portal
// (bis.gov.in "Know Your Standard") before any real submission — IS numbers
// and revision years change, and this set is a demo corpus, not an official
// mirror of the full 20,000+ catalogue.
//
// status: 'current' | 'superseded' | 'withdrawn'
// isiMark: 'mandatory' (under a QCO) | 'voluntary' | 'na'
// ============================================================================

const STANDARDS = [
  // ---------- CEMENT & CONCRETE ----------
  { no:'IS 456:2000', title:'Plain and Reinforced Concrete — Code of Practice',
    scope:'General structural use of plain and reinforced concrete, design and construction requirements for concrete structures, mix proportioning, durability, cover requirements.',
    ics:'91.080.40', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:['IS 10262:2019','IS 516:2021','IS 383:2016'] ,
    amendments:['Amendment No. 3 (Aug 2007): revised durability and cover requirements.', 'Amendment No. 4 (Mar 2013): editorial corrections to Table 5.'] },

  { no:'IS 269:2015', title:'Ordinary Portland Cement — Specification',
    scope:'Ordinary Portland cement of 33, 43 and 53 grade, chemical and physical requirements, packing and marking for cement used in construction.',
    ics:'91.100.10', cat:'Cement', status:'current', isiMark:'mandatory',
    related:['IS 4031','IS 12269:2013'] ,
    amendments:['Amendment No. 1 (Nov 2016): clarification on 33 grade OPC withdrawal timeline.'] },

  { no:'IS 8112:2013', title:'Ordinary Portland Cement, 43 Grade — Specification',
    scope:'43 grade ordinary Portland cement requirements, compressive strength, fineness, setting time.',
    ics:'91.100.10', cat:'Cement', status:'superseded', supersededBy:'IS 269:2015', isiMark:'mandatory',
    related:['IS 269:2015'] },

  { no:'IS 12269:2013', title:'Ordinary Portland Cement, 53 Grade — Specification',
    scope:'53 grade ordinary Portland cement, high strength cement for structural concrete work.',
    ics:'91.100.10', cat:'Cement', status:'superseded', supersededBy:'IS 269:2015', isiMark:'mandatory',
    related:['IS 269:2015'] },

  { no:'IS 1489 (Part 1):2015', title:'Portland Pozzolana Cement — Fly Ash Based',
    scope:'Portland pozzolana cement made with fly ash, blended cement for general construction and mass concrete.',
    ics:'91.100.10', cat:'Cement', status:'current', isiMark:'mandatory',
    related:['IS 3812','IS 269:2015'] },

  { no:'IS 383:2016', title:'Coarse and Fine Aggregate for Concrete — Specification',
    scope:'Natural and manufactured aggregate, sand, crushed stone, grading requirements and quality of aggregate used in concrete and mortar.',
    ics:'91.100.15', cat:'Civil / Structural', status:'current', isiMark:'voluntary',
    related:['IS 2386','IS 456:2000'] },

  { no:'IS 10262:2019', title:'Concrete Mix Proportioning — Guidelines',
    scope:'Guidelines for proportioning concrete mixes, selecting water-cement ratio and trial mix design for target strength.',
    ics:'91.100.30', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:['IS 456:2000','IS 516:2021'] },

  { no:'IS 516:2021', title:'Hardened Concrete — Methods of Test',
    scope:'Test methods for compressive strength, flexural strength and other properties of hardened concrete cubes and cylinders.',
    ics:'91.100.30', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 456:2000'] },

  // ---------- STEEL & STRUCTURAL ----------
  { no:'IS 1786:2008', title:'High Strength Deformed Steel Bars and Wires for Concrete Reinforcement',
    scope:'TMT bars, deformed reinforcement bars, Fe 415 Fe 500 Fe 550 grades, rebar for reinforced concrete construction.',
    ics:'77.140.60', cat:'Steel', status:'current', isiMark:'mandatory',
    related:['IS 456:2000','IS 2502'] ,
    amendments:['Amendment No. 5 (2018): added Fe 550D and Fe 600 grade requirements.'] },

  { no:'IS 2062:2011', title:'Hot Rolled Medium and High Tensile Structural Steel — Specification',
    scope:'Structural steel plates, sections, angles, channels and beams for general structural and fabrication use.',
    ics:'77.140.10', cat:'Steel', status:'current', isiMark:'mandatory',
    related:['IS 800:2007'] },

  { no:'IS 800:2007', title:'General Construction in Steel — Code of Practice',
    scope:'Design and construction of steel structures, limit state design of steel buildings and structural members.',
    ics:'91.080.10', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:['IS 2062:2011','IS 875'] },

  { no:'IS 1239 (Part 1):2004', title:'Steel Tubes, Tubulars and Other Wrought Steel Fittings — Steel Tubes',
    scope:'Mild steel tubes and pipes for water, gas, air and steam, galvanized and black steel pipe for plumbing.',
    ics:'23.040.10', cat:'Pipes & Fittings', status:'current', isiMark:'mandatory',
    related:['IS 1239 (Part 2):2011','IS 3589:2001'] },

  { no:'IS 3589:2001', title:'Steel Pipes for Water and Sewage',
    scope:'Electrically welded steel pipes for conveying water, sewage and other fluids, larger diameter water mains.',
    ics:'23.040.10', cat:'Pipes & Fittings', status:'current', isiMark:'voluntary',
    related:['IS 1239 (Part 1):2004'] },

  { no:'IS 277:2018', title:'Galvanized Steel Sheets (Plain and Corrugated) — Specification',
    scope:'Zinc coated galvanized steel sheet, GI sheet, corrugated roofing sheet for roofing and cladding.',
    ics:'77.140.50', cat:'Steel', status:'current', isiMark:'mandatory',
    related:['IS 513'] },

  // ---------- PIPES & WATER ----------
  { no:'IS 4985:2021', title:'Unplasticized PVC Pipes for Potable Water Supplies — Specification',
    scope:'uPVC pipes, rigid PVC pipe for cold potable water supply, water distribution and plumbing lines.',
    ics:'23.040.20', cat:'Pipes & Fittings', status:'current', isiMark:'mandatory',
    related:['IS 10500:2012','IS 7834'] ,
    amendments:['Amendment No. 1 (2022): updated pressure rating tables for PN classes.'] },

  { no:'IS 15778:2007', title:'Chlorinated PVC (CPVC) Pipes for Potable Hot and Cold Water Distribution',
    scope:'CPVC pipes for hot and cold potable water distribution inside buildings, plumbing for hot water lines.',
    ics:'23.040.20', cat:'Pipes & Fittings', status:'current', isiMark:'mandatory',
    related:['IS 4985:2021'] },

  { no:'IS 4984:2016', title:'Polyethylene Pipes for Water Supply — Specification',
    scope:'HDPE pipes, polyethylene pipe for potable water supply, buried water mains and irrigation.',
    ics:'23.040.20', cat:'Pipes & Fittings', status:'current', isiMark:'mandatory',
    related:['IS 4985:2021'] },

  { no:'IS 10500:2012', title:'Drinking Water — Specification',
    scope:'Acceptable and permissible limits for drinking water quality parameters, potable water standards for public supply.',
    ics:'13.060.20', cat:'Water Quality', status:'current', isiMark:'na',
    related:['IS 3025','IS 4985:2021'] ,
    amendments:['Amendment No. 2 (2015): revised permissible limits for select trace elements.'] },

  { no:'IS 3025 (Part 1):1987', title:'Methods of Sampling and Test for Water and Wastewater',
    scope:'Sampling procedures and physical, chemical test methods for water and wastewater analysis.',
    ics:'13.060.45', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 10500:2012'] },

  // ---------- ELECTRICAL CABLES ----------
  { no:'IS 694:2010', title:'PVC Insulated Unsheathed and Sheathed Cables/Cords with Rigid and Flexible Conductor',
    scope:'PVC insulated copper and aluminium cables and cords for working voltages up to and including 1100 V, house wiring cable.',
    ics:'29.060.20', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 8130:1984','IS 1554 (Part 1):1988'] ,
    amendments:['Amendment No. 3 (2019): updated flame-retardant sheathing requirements.'] },

  { no:'IS 1554 (Part 1):1988', title:'PVC Insulated (Heavy Duty) Electric Cables — Working Voltages up to 1100 V',
    scope:'Heavy duty PVC insulated power cables, armoured and unarmoured LT power cable for distribution.',
    ics:'29.060.20', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 694:2010','IS 7098 (Part 1):1988'] },

  { no:'IS 7098 (Part 1):1988', title:'Crosslinked Polyethylene Insulated PVC Sheathed Cables — Up to 1100 V',
    scope:'XLPE insulated power cables for working voltage up to 1100 V, low tension XLPE distribution cable.',
    ics:'29.060.20', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 1554 (Part 1):1988'] },

  { no:'IS 8130:1984', title:'Conductors for Insulated Electric Cables and Flexible Cords',
    scope:'Copper and aluminium conductors used in insulated cables, conductor classes, resistance and construction.',
    ics:'29.060.10', cat:'Electrical', status:'current', isiMark:'voluntary',
    related:['IS 694:2010'] },

  { no:'IS 3961 (Part 2):1967', title:'Recommended Current Ratings for Cables — PVC Insulated and PVC Sheathed Cables',
    scope:'Current carrying capacity and derating factors for PVC insulated cables under various installation conditions.',
    ics:'29.060.20', cat:'Electrical', status:'current', isiMark:'na',
    related:['IS 694:2010'] },

  // ---------- ELECTRICAL EQUIPMENT ----------
  { no:'IS 13947 (Part 1):1993', title:'Low Voltage Switchgear and Controlgear — General Rules',
    scope:'General requirements for low voltage switchgear and controlgear, MCB MCCB switch fuse assemblies.',
    ics:'29.130.20', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 8828:1996'] },

  { no:'IS 8828:1996', title:'Electrical Accessories — Circuit Breakers for Overcurrent Protection for Household Installations',
    scope:'Miniature circuit breakers MCB for household and similar installations, overcurrent protection devices.',
    ics:'29.120.50', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 13947 (Part 1):1993'] },

  { no:'IS 1293:2019', title:'Plugs and Socket-Outlets of Rated Voltage up to and Including 250 V and Rated Current up to 16 A',
    scope:'Domestic plugs, sockets, switch socket outlets for household and similar general purpose use.',
    ics:'29.120.30', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 302 (Part 1):2008'] },

  { no:'IS 302 (Part 1):2008', title:'Safety of Household and Similar Electrical Appliances — General Requirements',
    scope:'General safety requirements for household electrical appliances, fans, heaters, kitchen appliances.',
    ics:'13.120', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 1293:2019'] },

  { no:'IS 374:2019', title:'Electric Ceiling Type Fans and Regulators — Specification',
    scope:'Ceiling fans, fan blades, regulators, performance and safety requirements, air delivery and power consumption.',
    ics:'23.120', cat:'Electrical', status:'current', isiMark:'mandatory',
    related:['IS 302 (Part 1):2008'] },

  { no:'IS 16102 (Part 1):2012', title:'Self-Ballasted LED Lamps for General Lighting Services — Safety Requirements',
    scope:'LED bulbs and self-ballasted LED lamps, safety requirements for general lighting service lamps.',
    ics:'29.140.30', cat:'Lighting', status:'current', isiMark:'mandatory', certScheme:'CRS',
    related:['IS 16102 (Part 2):2012','IS 10322 (Part 5/Sec 1):2012'] },

  { no:'IS 10322 (Part 5/Sec 1):2012', title:'Luminaires — Particular Requirements — Fixed General Purpose Luminaires',
    scope:'Fixed general purpose luminaires, light fittings, LED panel lights and tube light fixtures for indoor use.',
    ics:'29.140.40', cat:'Lighting', status:'current', isiMark:'mandatory',
    related:['IS 16102 (Part 1):2012'] },

  { no:'IS 16101:2012', title:'General Lighting — LEDs and LED Modules — Terms and Definitions',
    scope:'Terminology and definitions for LED lighting products, LED modules used in general lighting.',
    ics:'01.040.29', cat:'Lighting', status:'current', isiMark:'na',
    related:['IS 16102 (Part 1):2012'] },

  // ---------- IT HARDWARE & ELECTRONICS ----------
  { no:'IS 13252 (Part 1):2010', title:'Information Technology Equipment — Safety — General Requirements',
    scope:'Safety of IT equipment including computers, laptops, monitors, printers, servers and power supply units.',
    ics:'35.020', cat:'IT Hardware', status:'current', isiMark:'mandatory', certScheme:'CRS',
    related:['IS 616:2017'] },

  { no:'IS 616:2017', title:'Audio, Video and Similar Electronic Apparatus — Safety Requirements',
    scope:'Safety of audio video electronic apparatus, televisions, set top boxes, speakers and media players.',
    ics:'33.160.01', cat:'IT Hardware', status:'current', isiMark:'mandatory', certScheme:'CRS',
    related:['IS 13252 (Part 1):2010'] },

  // ---------- HALLMARKING (BIS Hallmarking scheme, HUID) ----------
  { no:'IS 1417:2016', title:'Gold and Gold Alloys, Jewellery/Artefacts — Fineness and Marking — Specification',
    scope:'Gold jewellery, gold artefacts, fineness grades 14 18 22 carat, hallmarking and marking requirements for gold ornaments.',
    ics:'39.060', cat:'Hallmarking', status:'current', isiMark:'na', certScheme:'Hallmark',
    related:['IS 2112:2014'] },

  { no:'IS 2112:2014', title:'Silver and Silver Alloys, Jewellery/Artefacts — Fineness and Marking — Specification',
    scope:'Silver jewellery, silver articles and artefacts, fineness grades, hallmarking and marking requirements for silver ornaments.',
    ics:'39.060', cat:'Hallmarking', status:'current', isiMark:'na', certScheme:'Hallmark',
    related:['IS 1417:2016'] },

  { no:'IS 16046 (Part 1):2018', title:'Secondary Cells and Batteries Containing Alkaline — Portable Sealed Rechargeable Cells',
    scope:'Lithium ion batteries and portable rechargeable cells for use in portable electronic equipment, power banks.',
    ics:'29.220.30', cat:'IT Hardware', status:'current', isiMark:'mandatory',
    related:['IS 13252 (Part 1):2010'] },

  // ---------- SAFETY / PPE ----------
  { no:'IS 2925:1984', title:'Industrial Safety Helmets — Specification',
    scope:'Industrial safety helmets, hard hats for protection of head against falling objects at construction sites.',
    ics:'13.340.20', cat:'Safety / PPE', status:'current', isiMark:'mandatory',
    related:['IS 15298 (Part 2):2016'] },

  { no:'IS 15298 (Part 2):2016', title:'Personal Protective Equipment — Safety Footwear',
    scope:'Safety shoes and boots with toe protection for industrial and construction use, protective footwear.',
    ics:'13.340.50', cat:'Safety / PPE', status:'current', isiMark:'mandatory',
    related:['IS 2925:1984'] },

  { no:'IS 9167:1979', title:'Ear Protectors — Specification',
    scope:'Ear muffs and ear plugs for hearing protection against industrial noise exposure.',
    ics:'13.340.20', cat:'Safety / PPE', status:'current', isiMark:'voluntary',
    related:['IS 2925:1984'] },

  { no:'IS 15683:2018', title:'Portable Fire Extinguishers — Performance and Construction',
    scope:'Portable fire extinguishers, ABC dry powder, CO2 and foam type extinguishers for fire safety.',
    ics:'13.220.10', cat:'Fire Safety', status:'current', isiMark:'mandatory',
    related:['IS 2190:2010'] },

  { no:'IS 2190:2010', title:'Selection, Installation and Maintenance of First-Aid Fire Extinguishers — Code of Practice',
    scope:'Guidance on selecting, placing, installing and maintaining fire extinguishers in buildings and premises.',
    ics:'13.220.10', cat:'Fire Safety', status:'current', isiMark:'na',
    related:['IS 15683:2018'] },

  { no:'IS 3844:1989', title:'Code of Practice for Installation and Maintenance of Internal Fire Hydrants and Hose Reels',
    scope:'Internal fire hydrant systems, hose reels, wet riser installation and maintenance in buildings.',
    ics:'13.220.10', cat:'Fire Safety', status:'current', isiMark:'na',
    related:['IS 2190:2010'] },

  // ---------- FURNITURE & TEXTILES ----------
  { no:'IS 17631:2022', title:'Furniture — Storage Units — Test Methods and Requirements for Safety, Strength and Durability',
    scope:'Office and domestic storage units, cupboards, filing cabinets, safety strength and durability requirements.',
    ics:'97.140', cat:'Furniture', status:'current', isiMark:'voluntary',
    related:['IS 17632:2022'] },

  { no:'IS 17632:2022', title:'Furniture — Chairs — Test Methods and Requirements for Strength, Durability and Safety',
    scope:'Office chairs and seating, strength durability and stability testing for chairs used in workplaces.',
    ics:'97.140', cat:'Furniture', status:'current', isiMark:'voluntary',
    related:['IS 17631:2022'] },

  { no:'IS 1969:2009', title:'Textiles — Tensile Properties of Fabrics — Determination of Breaking Force and Elongation',
    scope:'Test method for breaking strength and elongation of woven textile fabrics, fabric tensile testing.',
    ics:'59.080.30', cat:'Textiles', status:'current', isiMark:'na',
    related:[] },

  { no:'IS 15061:2002', title:'Textiles — Bed Sheets — Specification',
    scope:'Cotton and blended bed sheets, bedsheet fabric requirements for institutional and hospital supply.',
    ics:'97.160', cat:'Textiles', status:'current', isiMark:'voluntary',
    related:['IS 1969:2009'] },

  // ---------- MISC / WITHDRAWN EXAMPLES ----------
  { no:'IS 1077:1992', title:'Common Burnt Clay Building Bricks — Specification',
    scope:'Common burnt clay bricks for masonry walls, compressive strength classes and dimensional requirements.',
    ics:'91.100.25', cat:'Civil / Structural', status:'current', isiMark:'voluntary',
    related:['IS 2185 (Part 1):2005'] },

  { no:'IS 2185 (Part 1):2005', title:'Concrete Masonry Units — Hollow and Solid Concrete Blocks',
    scope:'Hollow and solid concrete blocks for masonry construction, block strength and dimensions.',
    ics:'91.100.30', cat:'Civil / Structural', status:'current', isiMark:'voluntary',
    related:['IS 1077:1992'] },

  { no:'IS 875 (Part 3):2015', title:'Design Loads (Other Than Earthquake) for Buildings and Structures — Wind Loads',
    scope:'Wind load calculation for design of buildings and structures, basic wind speed and pressure coefficients.',
    ics:'91.080.01', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:['IS 800:2007','IS 456:2000'] },

  { no:'IS 1200 (Part 1):1992', title:'Method of Measurement of Building and Civil Engineering Works — Earthwork',
    scope:'Standard method of measurement for earthwork in building and civil engineering contracts, billing and BOQ.',
    ics:'91.010.20', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:[] },

  { no:'IS 3043:2018', title:'Code of Practice for Earthing',
    scope:'Earthing and grounding of electrical installations, earth electrode design and earth resistance requirements.',
    ics:'29.020', cat:'Electrical', status:'current', isiMark:'na',
    related:['IS 732:2019'] },

  { no:'IS 732:2019', title:'Code of Practice for Electrical Wiring Installations',
    scope:'Electrical wiring installation in buildings, distribution boards, circuit design and internal wiring practice.',
    ics:'91.140.50', cat:'Electrical', status:'current', isiMark:'na',
    related:['IS 3043:2018','IS 694:2010'] },
  { no:'IS 4031 (Part 1):1996', title:'Methods of Physical Tests for Hydraulic Cement — Determination of Fineness',
    scope:'Physical test methods for cement including fineness, soundness, setting time and compressive strength determination.',
    ics:'91.100.10', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 269:2015'] },

  { no:'IS 2386 (Part 1):1963', title:'Methods of Test for Aggregates for Concrete — Particle Size and Shape',
    scope:'Test methods for aggregate grading, particle size distribution, shape and quality of coarse and fine aggregate.',
    ics:'91.100.15', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 383:2016'] },

  { no:'IS 2502:1963', title:'Code of Practice for Bending and Fixing of Bars for Concrete Reinforcement',
    scope:'Bending schedules, fixing and placement of reinforcement bars, rebar detailing for concrete work.',
    ics:'91.080.40', cat:'Civil / Structural', status:'current', isiMark:'na',
    related:['IS 1786:2008','IS 456:2000'] },

  { no:'IS 513 (Part 1):2016', title:'Cold Reduced Carbon Steel Sheet and Strip — Cold Forming and Drawing Purpose',
    scope:'Cold rolled carbon steel sheets and strips for forming, drawing and general fabrication use.',
    ics:'77.140.50', cat:'Steel', status:'current', isiMark:'mandatory',
    related:['IS 277:2018'] },

  { no:'IS 1239 (Part 2):2011', title:'Steel Tubes, Tubulars and Other Wrought Steel Fittings — Steel Pipe Fittings',
    scope:'Mild steel pipe fittings, elbows, tees, sockets and unions for plumbing and water supply lines.',
    ics:'23.040.40', cat:'Pipes & Fittings', status:'current', isiMark:'mandatory',
    related:['IS 1239 (Part 1):2004'] },

  { no:'IS 16102 (Part 2):2012', title:'Self-Ballasted LED Lamps for General Lighting Services — Performance Requirements',
    scope:'Performance requirements for LED bulbs including luminous flux, efficacy, colour rendering and lifetime.',
    ics:'29.140.30', cat:'Lighting', status:'current', isiMark:'mandatory',
    related:['IS 16102 (Part 1):2012'] },
  // ---------- FOOD & BEVERAGES ----------
  { no:'IS 14543:2016', title:'Packaged Drinking Water (Other Than Packaged Natural Mineral Water) — Specification',
    scope:'Packaged drinking water in bottles and pouches, treatment requirements, microbiological and chemical limits for bottled water supply.',
    ics:'67.160.20', cat:'Food & Beverages', status:'current', isiMark:'mandatory',
    related:['IS 13428:2005','IS 10500:2012'] },

  { no:'IS 13428:2005', title:'Packaged Natural Mineral Water — Specification',
    scope:'Packaged natural mineral water from underground sources, bottling requirements and composition limits.',
    ics:'67.160.20', cat:'Food & Beverages', status:'current', isiMark:'mandatory',
    related:['IS 14543:2016'] },

  { no:'IS 1155:1968', title:'Wheat Atta — Specification',
    scope:'Whole wheat flour atta for human consumption, moisture, gluten, ash content and freedom from adulterants.',
    ics:'67.060', cat:'Food & Beverages', status:'current', isiMark:'voluntary',
    related:['IS 4333 (Part 1):1996'] },

  { no:'IS 7224:2006', title:'Iodised Salt — Specification',
    scope:'Iodised common salt for edible use, iodine content limits, packaging and marking for public distribution supply.',
    ics:'67.220.20', cat:'Food & Beverages', status:'current', isiMark:'mandatory',
    related:['IS 4333 (Part 1):1996'] },

  { no:'IS 1165:2002', title:'Milk Powder — Specification',
    scope:'Whole and skimmed milk powder, moisture, fat and protein requirements for institutional and retail supply.',
    ics:'67.100.10', cat:'Food & Beverages', status:'current', isiMark:'mandatory',
    related:['IS 1224 (Part 1):1977'] },

  { no:'IS 4333 (Part 1):1996', title:'Methods of Analysis for Foodgrains — Refractions',
    scope:'Test methods for foodgrains including moisture, foreign matter, damaged and weevilled grain determination.',
    ics:'67.060', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 1155:1968'] },

  { no:'IS 548 (Part 1):1964', title:'Methods of Sampling and Test for Oils and Fats — Purity Tests',
    scope:'Sampling and purity test methods for edible oils and fats including refractive index and free fatty acid.',
    ics:'67.200.10', cat:'Testing', status:'current', isiMark:'na',
    related:[] },

  { no:'IS 1224 (Part 1):1977', title:'Determination of Fat by the Gerber Method — Milk',
    scope:'Gerber method for determining fat content in milk and milk products, dairy quality testing.',
    ics:'67.100.10', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 1165:2002'] },

  { no:'IS 5402:2012', title:'Microbiology of Food and Animal Feeding Stuffs — Enumeration of Microorganisms',
    scope:'Colony count technique for enumerating microorganisms in food samples, microbiological safety testing.',
    ics:'07.100.30', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 5887 (Part 1):1976'] },

  { no:'IS 5887 (Part 1):1976', title:'Methods for Detection of Bacteria Responsible for Food Poisoning',
    scope:'Detection of food poisoning bacteria including Salmonella and Staphylococcus in food samples.',
    ics:'07.100.30', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 5402:2012'] },

  { no:'IS 15000:2013', title:'Food Safety Management Systems — Requirements for Any Organization in the Food Chain (HACCP)',
    scope:'HACCP based food safety management system requirements for kitchens, caterers and food processing units.',
    ics:'67.020', cat:'Food & Beverages', status:'current', isiMark:'na',
    related:['IS 5402:2012'] },

  { no:'IS 2491:1998', title:'Food Hygiene — General Principles — Code of Practice',
    scope:'General hygiene practice for food handling, preparation premises, personnel hygiene in institutional kitchens.',
    ics:'67.020', cat:'Food & Beverages', status:'current', isiMark:'na',
    related:['IS 15000:2013'] },

  // ---------- KITCHEN / CATERING EQUIPMENT ----------
  { no:'IS 5522:2014', title:'Stainless Steel Sheets and Strips for Utensils — Specification',
    scope:'Stainless steel sheet and strip grades used for cooking utensils, food containers and kitchen equipment.',
    ics:'77.140.20', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 6911:2017'] },

  { no:'IS 6911:2017', title:'Stainless Steel Plate, Sheet and Strip — Specification',
    scope:'Stainless steel flat products for general engineering, food contact surfaces and fabrication.',
    ics:'77.140.20', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 5522:2014'] },

  { no:'IS 3196 (Part 1):2013', title:'Welded Low Carbon Steel Gas Cylinders — LPG Cylinders',
    scope:'Welded steel LPG cylinders for domestic and commercial cooking gas, construction and testing requirements.',
    ics:'23.020.30', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 9798:2013','IS 9573 (Part 2):2011'] },

  { no:'IS 9798:2013', title:'Low Pressure Regulators for Use with Liquefied Petroleum Gas',
    scope:'LPG pressure regulators for domestic and commercial gas cylinders, safety and performance requirements.',
    ics:'23.060.40', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 3196 (Part 1):2013'] },

  { no:'IS 9573 (Part 2):2011', title:'Rubber Hose for Liquefied Petroleum Gas — Specification',
    scope:'Flexible rubber hose for connecting LPG cylinders to burners in kitchens, pressure and safety requirements.',
    ics:'23.040.70', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 3196 (Part 1):2013'] },

  { no:'IS 4246:2002', title:'Domestic Gas Stoves for Use with LPG — Specification',
    scope:'Domestic LPG cooking gas stoves and burners, thermal efficiency, safety and construction requirements.',
    ics:'97.040.20', cat:'Kitchen Equipment', status:'current', isiMark:'mandatory',
    related:['IS 9798:2013'] },

  // ---------- MEDICAL / HEALTH ----------
  { no:'IS 10151:1982', title:'Polyvinyl Chloride (PVC) and Its Copolymers for Safe Use in Contact with Foodstuffs and Drugs',
    scope:'PVC materials safe for contact with food, pharmaceuticals and drinking water, migration limits.',
    ics:'11.120.20', cat:'Medical / Health', status:'current', isiMark:'voluntary',
    related:['IS 14543:2016'] },

  { no:'IS 16442:2017', title:'Medical Textiles — Surgical Face Masks — Specification',
    scope:'Surgical face masks, bacterial filtration efficiency, breathability for healthcare and clinical use.',
    ics:'11.140', cat:'Medical / Health', status:'current', isiMark:'voluntary',
    related:['IS 15298 (Part 2):2016'] },

  { no:'IS 4148:2011', title:'Hospital Beds — Specification',
    scope:'Hospital cots and beds, dimensions, load bearing and finish requirements for healthcare facilities.',
    ics:'11.140', cat:'Medical / Health', status:'current', isiMark:'voluntary',
    related:['IS 17631:2022'] },

  // ---------- SOLAR / ENERGY ----------
  { no:'IS 14286:2010', title:'Crystalline Silicon Terrestrial Photovoltaic (PV) Modules — Design Qualification',
    scope:'Solar PV modules, design qualification and type approval for rooftop and ground mounted solar plants.',
    ics:'27.160', cat:'Solar / Energy', status:'current', isiMark:'mandatory',
    related:['IS 16221 (Part 2):2015'] },

  { no:'IS 16221 (Part 2):2015', title:'Safety Qualification of Photovoltaic Modules — Requirements for Testing',
    scope:'Safety testing requirements for PV solar modules including electrical and fire safety qualification.',
    ics:'27.160', cat:'Solar / Energy', status:'current', isiMark:'mandatory',
    related:['IS 14286:2010'] },

  { no:'IS 16169:2019', title:'Solar Photovoltaic Water Pumping Systems — Specification',
    scope:'Solar powered water pumping systems for irrigation and drinking water, performance and testing.',
    ics:'27.160', cat:'Solar / Energy', status:'current', isiMark:'voluntary',
    related:['IS 14286:2010'] },

  // ---------- SANITATION ----------
  { no:'IS 2556 (Part 2):2019', title:'Vitreous Sanitary Appliances (Vitreous China) — Specific Requirements of Wash Basins',
    scope:'Ceramic wash basins and sanitary ware for toilets, dimensions and quality requirements.',
    ics:'91.140.70', cat:'Sanitation', status:'current', isiMark:'mandatory',
    related:['IS 771 (Part 2):1985'] },

  { no:'IS 771 (Part 2):1985', title:'Glazed Fire-Clay Sanitary Appliances — Specific Requirements of Wash-Down Water Closets',
    scope:'Water closets, toilet pans and squatting pans for sanitation facilities in buildings.',
    ics:'91.140.70', cat:'Sanitation', status:'current', isiMark:'voluntary',
    related:['IS 2556 (Part 2):2019'] },

  { no:'IS 12592:2002', title:'Precast Concrete Manhole Covers and Frames — Specification',
    scope:'Manhole covers and frames for sewerage and drainage systems, load classes and construction.',
    ics:'93.030', cat:'Sanitation', status:'current', isiMark:'mandatory',
    related:['IS 1726:1991'] },

  { no:'IS 1726:1991', title:'Cast Iron Manhole Covers and Frames — Specification',
    scope:'Cast iron manhole covers, gratings and frames for drainage and sewer access in roads and footpaths.',
    ics:'93.030', cat:'Sanitation', status:'current', isiMark:'mandatory',
    related:['IS 12592:2002'] },

  // ---------- ROADS ----------
  { no:'IS 73:2013', title:'Paving Bitumen — Specification',
    scope:'Bitumen grades for road paving, viscosity grades VG10 VG30 VG40 for bituminous road construction.',
    ics:'75.140', cat:'Roads', status:'current', isiMark:'mandatory',
    related:['IS 1203:1978'] },

  { no:'IS 1203:1978', title:'Methods for Testing Tar and Bituminous Materials — Determination of Penetration',
    scope:'Penetration test method for bitumen and tar used in road construction quality control.',
    ics:'75.140', cat:'Testing', status:'current', isiMark:'na',
    related:['IS 73:2013'] },

  { no:'IS 15658:2021', title:'Precast Concrete Blocks for Paving — Specification',
    scope:'Interlocking paver blocks for footpaths, parking areas and low traffic roads, strength and abrasion.',
    ics:'93.080.20', cat:'Roads', status:'current', isiMark:'mandatory',
    related:['IS 2185 (Part 1):2005'] },
];

// Synonym / term-expansion map. This is what lets a plain-language query like
// "pipes for drinking water" reach IS 4985 even though the standard's own
// title says "potable water supplies".
const SYNONYMS = {
  'pipe':['pipes','tube','tubing','tubular','conduit','piping'],
  'drinking':['potable','portable water','drinking water'],
  'water':['water','h2o','aqua'],
  'wire':['wires','cable','cables','cord','conductor','wiring'],
  'cable':['cables','wire','wires','cord','conductor'],
  'rebar':['reinforcement','reinforcing','tmt','deformed bar','steel bar'],
  'cement':['opc','portland','ppc','binder'],
  'concrete':['rcc','reinforced concrete','pcc'],
  'brick':['bricks','masonry','block','blocks'],
  'steel':['iron','ms','mild steel','structural steel'],
  'helmet':['helmets','hard hat','headgear','head protection'],
  'shoe':['shoes','footwear','boot','boots','safety shoe'],
  'fan':['fans','ceiling fan'],
  'bulb':['bulbs','lamp','lamps','led','light','lighting','luminaire'],
  'light':['lighting','lamp','luminaire','led','bulb'],
  'computer':['laptop','pc','desktop','server','monitor','it equipment'],
  'battery':['batteries','cell','cells','li-ion','lithium','power bank'],
  'extinguisher':['extinguishers','fire extinguisher','firefighting'],
  'chair':['chairs','seating','seat'],
  'cupboard':['cabinet','almirah','storage unit','locker'],
  'bedsheet':['bed sheet','bedsheets','linen'],
  'switch':['switches','mcb','breaker','circuit breaker','switchgear'],
  'socket':['sockets','plug','plugs','socket outlet'],
  'earthing':['grounding','earth','ground'],
  'aggregate':['sand','gravel','crushed stone','coarse aggregate','fine aggregate'],
  'roofing':['roof','sheet','sheets','cladding','corrugated'],
  'water bottle':['packaged water','bottled water','mineral water','drinking water'],
  'atta':['flour','wheat flour','wheat'],
  'salt':['iodised salt','iodized salt','namak'],
  'milk':['dairy','milk powder','skimmed milk'],
  'gas':['lpg','cooking gas','cylinder'],
  'cylinder':['lpg cylinder','gas cylinder','lpg'],
  'stove':['burner','gas stove','chulha','cooking range'],
  'utensil':['utensils','cookware','vessel','vessels','stainless steel'],
  'mask':['face mask','surgical mask','ppe'],
  'bed':['beds','cot','hospital bed'],
  'solar':['photovoltaic','pv','solar panel','solar module'],
  'panel':['module','solar panel','pv module'],
  'toilet':['water closet','wc','sanitary','latrine'],
  'basin':['wash basin','washbasin','sink'],
  'manhole':['manhole cover','drain cover','chamber cover'],
  'bitumen':['tar','asphalt','paving bitumen'],
  'paver':['paver block','paving block','interlocking block'],
  'hygiene':['food safety','haccp','sanitation'],
};

const STOPWORDS = new Set(['the','a','an','for','of','and','or','to','in','on','with','is','are','we','i','need','want','looking','buy','purchase','procure','procurement','required','requirement','standard','standards','which','what','should','use','used','my','our','please','tender','specification','spec',
  // Hindi stopwords (Devanagari) — particles/pronouns that carry no product meaning
  'के','का','की','को','में','से','है','हैं','और','या','लिए','हमें','चाहिए','खरीदना','हेतु','साठी','च्या','चे','ची','आणि','आहे','पाहिजे','हवे']);

// Hindi (Devanagari) term -> canonical English SYNONYMS key. Lets a natural-
// language Hindi query ("पीने के पानी के लिए पाइप") resolve to the same
// English token cluster a keyword search would use, without needing a
// translation API or model download.
const HINDI_SYNONYMS = {
  'सीमेंट':'cement', 'सिमेंट':'cement',
  'पाइप':'pipe', 'पाइपलाइन':'pipe', 'नली':'pipe',
  'पानी':'water', 'जल':'water', 'पेयजल':'drinking',
  'तार':'wire', 'केबल':'cable',
  'सरिया':'rebar', 'छड़':'rebar', 'सलाखें':'rebar',
  'ईंट':'brick', 'ईंटें':'brick',
  'स्टील':'steel', 'लोहा':'steel',
  'हेलमेट':'helmet', 'सुरक्षा टोपी':'helmet',
  'जूता':'shoe', 'जूते':'shoe',
  'पंखा':'fan',
  'बल्ब':'bulb', 'बत्ती':'light', 'रोशनी':'light',
  'कंप्यूटर':'computer', 'लैपटॉप':'computer',
  'बैटरी':'battery',
  'अग्निशामक':'extinguisher',
  'कुर्सी':'chair',
  'अलमारी':'cupboard',
  'चादर':'bedsheet',
  'स्विच':'switch',
  'सॉकेट':'socket', 'प्लग':'socket',
  'अर्थिंग':'earthing', 'ग्राउंडिंग':'earthing',
  'बजरी':'aggregate', 'रेत':'aggregate', 'गिट्टी':'aggregate',
  'छत':'roofing',
  'आटा':'atta', 'गेहूं':'atta',
  'नमक':'salt',
  'दूध':'milk',
  'गैस':'gas', 'सिलेंडर':'cylinder',
  'चूल्हा':'stove',
  'बर्तन':'utensil',
  'मास्क':'mask',
  'बिस्तर':'bed', 'पलंग':'bed',
  'सोलर':'solar', 'सौर':'solar', 'पैनल':'panel',
  'शौचालय':'toilet', 'टॉयलेट':'toilet',
  'बेसिन':'basin', 'सिंक':'basin',
  'डामर':'bitumen', 'तारकोल':'bitumen',
  'कंक्रीट':'concrete',
  'सड़क':'road',
  'पीने':'drinking',
  // Marathi (also Devanagari)
  'पाणी':'water', 'पाण्यासाठी':'water', 'पाण्याचे':'water', 'पाण्याच्या':'water',
  'पिण्याच्या':'drinking', 'पिण्याचे':'drinking',
  'नळ':'pipe', 'लोखंड':'steel', 'वीट':'brick', 'विटा':'brick',
  'खुर्ची':'chair', 'कपाट':'cupboard', 'दिवा':'light', 'दिवे':'light',
  'रस्ता':'road', 'वायर':'wire', 'बॅटरी':'battery', 'शिरस्त्राण':'helmet',
};
