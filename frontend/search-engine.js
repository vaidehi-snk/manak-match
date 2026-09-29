// ============================================================================
// SEARCH ENGINE
// Plain-language query -> ranked, explainable Indian Standards matches.
//
// Approach: term expansion (synonyms) + field-weighted token scoring + IDF.
// This is a genuine retrieval method, not a random or hardcoded lookup, and
// it runs fully offline with no model download. A transformer embedding model
// would handle paraphrase better but costs a multi-MB download — noted as the
// documented upgrade path rather than claimed as built.
// ============================================================================

// ============================================================================
// DOCUMENT TYPE CLASSIFICATION
// Standards aren't interchangeable: a test-method standard describes HOW to
// test, a code of practice describes HOW to build, only a product spec can be
// cited as "material shall conform to X". Citing the wrong type is a real and
// common tender drafting error, so we detect it.
// ============================================================================
function docType(std){
  const t = std.title.toLowerCase();
  if(t.includes('method') || t.includes('methods of test')) return 'test-method';
  if(t.includes('code of practice') || t.includes('guidelines') || t.includes('recommended')) return 'code-of-practice';
  if(t.includes('terms and definitions')) return 'terminology';
  return 'product-spec';
}
const TYPE_LABEL = {
  'product-spec':'Product specification',
  'code-of-practice':'Code of practice',
  'test-method':'Test method',
  'terminology':'Terminology',
};

// ============================================================================
// TENDER AUDITOR
// Paste an existing tender / spec document. Extract every IS citation, then
// check each one for: unknown reference, superseded/withdrawn status, and
// whether the cited document type can actually carry a conformity obligation.
// ============================================================================
function auditTenderText(text){
  // Matches "IS 456", "IS 456:2000", "IS 1239 (Part 1):2004", "IS:8112"
  const re = /IS\s*:?\s*(\d{2,5})\s*(\(\s*Part\s*[^)]*\))?\s*(?::\s*(\d{4}))?/gi;
  const found = [];
  const seen = new Set();
  let m;
  while((m = re.exec(text)) !== null){
    const raw = m[0].replace(/\s+/g,' ').trim();
    const num = m[1];
    const part = m[2] ? m[2].replace(/\s+/g,' ') : null;
    const year = m[3] || null;
    const key = num + (part||'') + (year||'');
    if(seen.has(key)) continue;
    seen.add(key);
    found.push({ raw, num, part, year });
  }

  return found.map(f => {
    // Resolve against the corpus: prefer exact number+part match
    const candidates = STANDARDS.filter(s => {
      const sNum = (s.no.match(/IS\s*(\d+)/i)||[])[1];
      if(sNum !== f.num) return false;
      if(f.part){
        const wantPart = f.part.replace(/\s+/g,' ').toLowerCase();
        return s.no.toLowerCase().includes(wantPart.replace(/[()]/g,'').trim().slice(0,10));
      }
      return true;
    });

    const std = candidates[0] || null;
    const issues = [];

    if(!std){
      issues.push({
        level:'unknown',
        msg:`"${f.raw}" isn't in this demo corpus — verify it exists and is current on bis.gov.in.`
      });
      return { cited:f, std:null, issues };
    }

    // year mismatch — cited an older revision than the one on record
    const stdYear = (std.no.match(/:(\d{4})/)||[])[1];
    if(f.year && stdYear && f.year !== stdYear){
      issues.push({
        level:'warn',
        msg:`Cited as ${f.raw}, but the revision on record is ${std.no}. Confirm which revision applies.`
      });
    }

    if(std.status === 'superseded'){
      issues.push({
        level:'critical',
        msg:`${std.no} is SUPERSEDED by ${std.supersededBy}. Citing it can invalidate the specification.`,
        fix: std.supersededBy
      });
    } else if(std.status === 'withdrawn'){
      issues.push({ level:'critical', msg:`${std.no} has been WITHDRAWN by BIS.` });
    }

    const type = docType(std);
    if(type === 'test-method' || type === 'terminology'){
      issues.push({
        level:'warn',
        msg:`${std.no} is a ${TYPE_LABEL[type].toLowerCase()}, not a product specification. It defines how to test/describe, so "shall conform to ${std.no}" is not enforceable on its own — pair it with the relevant product standard.`
      });
    }

    return { cited:f, std, issues, type };
  });
}

// Suggest product standards the tender probably should cite but doesn't,
// based on the categories already present in the document.
function auditSuggestions(auditRows){
  const citedNos = new Set(auditRows.filter(r=>r.std).map(r=>r.std.no));
  const cats = new Set(auditRows.filter(r=>r.std).map(r=>r.std.cat));
  const out = [];
  auditRows.forEach(r => {
    if(!r.std) return;
    (r.std.related||[]).forEach(relNo => {
      const found = STANDARDS.find(s => s.no === relNo || s.no.startsWith(relNo));
      if(!found || citedNos.has(found.no)) return;
      if(out.some(o => o.std.no === found.no)) return;
      out.push({ std: found, becauseOf: r.std.no });
    });
  });
  return out.slice(0,5);
}

// ============================================================================
// PROCUREMENT PACKS
// An officer buying for a real project has to pull standards from categories
// they may not even think of — a school kitchen needs food safety AND LPG AND
// stainless steel AND water AND fire safety. Missing a category is the most
// common and least visible failure in spec drafting, because you can't search
// for what you didn't know to look for. Each pack is a cross-category
// checklist for one project archetype.
// ============================================================================
const PROCUREMENT_PACKS = [
  {
    id:'school-kitchen',
    name:'School Mid-Day Meal Kitchen',
    icon:'🍲',
    blurb:'Kitchen set-up and food supply for a school or Anganwadi centre.',
    groups:[
      { label:'Food supply', items:['IS 1155:1968','IS 7224:2006','IS 1165:2002'] },
      { label:'Food safety & hygiene', items:['IS 15000:2013','IS 2491:1998','IS 5402:2012'] },
      { label:'Cooking equipment', items:['IS 4246:2002','IS 3196 (Part 1):2013','IS 9798:2013','IS 9573 (Part 2):2011'] },
      { label:'Utensils & food contact', items:['IS 5522:2014','IS 10151:1982'] },
      { label:'Water', items:['IS 10500:2012','IS 14543:2016'] },
      { label:'Fire safety', items:['IS 15683:2018','IS 2190:2010'] },
    ],
  },
  {
    id:'rural-water',
    name:'Rural Piped Water Supply Scheme',
    icon:'🚰',
    blurb:'Village-level piped drinking water distribution network.',
    groups:[
      { label:'Water quality', items:['IS 10500:2012','IS 3025 (Part 1):1987'] },
      { label:'Distribution piping', items:['IS 4985:2021','IS 4984:2016','IS 1239 (Part 1):2004','IS 1239 (Part 2):2011'] },
      { label:'Large mains', items:['IS 3589:2001'] },
      { label:'Pumping', items:['IS 16169:2019','IS 14286:2010'] },
      { label:'Civil works', items:['IS 456:2000','IS 269:2015','IS 383:2016'] },
      { label:'Electrical', items:['IS 694:2010','IS 3043:2018'] },
    ],
  },
  {
    id:'office-it',
    name:'Government Office IT Refresh',
    icon:'💻',
    blurb:'Computers, peripherals and office infrastructure procurement.',
    groups:[
      { label:'IT hardware safety', items:['IS 13252 (Part 1):2010','IS 616:2017'] },
      { label:'Batteries & power', items:['IS 16046 (Part 1):2018'] },
      { label:'Electrical supply', items:['IS 1293:2019','IS 8828:1996','IS 694:2010','IS 3043:2018'] },
      { label:'Lighting', items:['IS 16102 (Part 1):2012','IS 16102 (Part 2):2012','IS 10322 (Part 5/Sec 1):2012'] },
      { label:'Furniture', items:['IS 17632:2022','IS 17631:2022'] },
      { label:'Fire safety', items:['IS 15683:2018','IS 2190:2010'] },
    ],
  },
  {
    id:'phc-build',
    name:'Primary Health Centre — Construction & Fit-out',
    icon:'🏥',
    blurb:'Building a small health facility, structure through equipment.',
    groups:[
      { label:'Structure', items:['IS 456:2000','IS 1786:2008','IS 2062:2011','IS 875 (Part 3):2015'] },
      { label:'Materials', items:['IS 269:2015','IS 383:2016','IS 1077:1992'] },
      { label:'Sanitation', items:['IS 2556 (Part 2):2019','IS 771 (Part 2):1985','IS 1726:1991'] },
      { label:'Water', items:['IS 10500:2012','IS 15778:2007','IS 4985:2021'] },
      { label:'Medical items', items:['IS 4148:2011','IS 16442:2017'] },
      { label:'Electrical & lighting', items:['IS 732:2019','IS 3043:2018','IS 16102 (Part 1):2012'] },
      { label:'Fire safety', items:['IS 15683:2018','IS 3844:1989'] },
    ],
  },
  {
    id:'road-works',
    name:'Village Road / Internal Road Works',
    icon:'🛣️',
    blurb:'Bituminous or paver-block road construction package.',
    groups:[
      { label:'Bituminous works', items:['IS 73:2013','IS 1203:1978'] },
      { label:'Paving', items:['IS 15658:2021','IS 2185 (Part 1):2005'] },
      { label:'Concrete & materials', items:['IS 456:2000','IS 269:2015','IS 383:2016','IS 516:2021'] },
      { label:'Drainage', items:['IS 1726:1991','IS 12592:2002'] },
      { label:'Measurement', items:['IS 1200 (Part 1):1992'] },
      { label:'Worker safety', items:['IS 2925:1984','IS 15298 (Part 2):2016'] },
    ],
  },
  {
    id:'solar-rooftop',
    name:'Rooftop Solar Installation',
    icon:'☀️',
    blurb:'Solar PV plant on a government building rooftop.',
    groups:[
      { label:'PV modules', items:['IS 14286:2010','IS 16221 (Part 2):2015'] },
      { label:'Cabling', items:['IS 694:2010','IS 7098 (Part 1):1988','IS 8130:1984'] },
      { label:'Protection & earthing', items:['IS 13947 (Part 1):1993','IS 8828:1996','IS 3043:2018'] },
      { label:'Mounting structure', items:['IS 2062:2011','IS 277:2018','IS 800:2007'] },
      { label:'Wind loading', items:['IS 875 (Part 3):2015'] },
      { label:'Wiring practice', items:['IS 732:2019'] },
    ],
  },
];

function buildPack(packId){
  const pack = PROCUREMENT_PACKS.find(p => p.id === packId);
  if(!pack) return null;
  const groups = pack.groups.map(g => ({
    label: g.label,
    items: g.items.map(no => {
      const std = STANDARDS.find(s => s.no === no);
      return std ? { std, issue: std.status !== 'current' ? std : null } : { std:null, missingRef: no };
    }),
  }));
  const all = groups.flatMap(g => g.items).filter(i => i.std);
  return {
    pack,
    groups,
    total: all.length,
    mandatory: all.filter(i => i.std.isiMark === 'mandatory').length,
    flagged: all.filter(i => i.std.status !== 'current').length,
  };
}

function tokenize(text){
  // Keep Devanagari (\u0900-\u097F) alongside a-z/0-9 so Hindi-script queries
  // ("सीमेंट", "पाइप") tokenize instead of being stripped to nothing — this is
  // what makes the multilingual input requirement real rather than cosmetic.
  return text.toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097F\s./-]/g,' ')
    .split(/\s+/)
    .filter(t => t && t.length > 1 && !STOPWORDS.has(t));
}

// Expand a query token into itself + known synonyms.
// Multi-word synonyms ("solar panel") are kept as intact phrases rather than
// split into loose words — splitting made "panel" a synonym for "solar", which
// wrongly matched LED panel lights against a solar PV query.
function expandToken(token){
  const terms = new Set([token]);
  const phrases = new Set();
  if(token.endsWith('s') && token.length > 3) terms.add(token.slice(0,-1));

  // Hindi (Devanagari) input: map straight to the canonical English key,
  // then fall through to the normal SYNONYMS expansion below for that key.
  if(typeof HINDI_SYNONYMS !== 'undefined' && HINDI_SYNONYMS[token]){
    terms.add(HINDI_SYNONYMS[token]);
    token = HINDI_SYNONYMS[token];
  }

  const addSyn = s => {
    if(s.includes(' ')) phrases.add(s);
    else terms.add(s);
  };
  for(const [key, syns] of Object.entries(SYNONYMS)){
    const hit = token === key || syns.includes(token) ||
                (token.endsWith('s') && (token.slice(0,-1) === key || syns.includes(token.slice(0,-1))));
    if(hit){
      addSyn(key);
      syns.forEach(addSyn);
    }
  }
  return { terms:[...terms], phrases:[...phrases] };
}

function scoreStandard(std, expandedGroups){
  const titleTokens = new Set(tokenize(std.title));
  const scopeTokens = new Set(tokenize(std.scope));
  const catTokens   = new Set(tokenize(std.cat));
  const titleRaw = std.title.toLowerCase();
  const scopeRaw = std.scope.toLowerCase();

  let score = 0;
  const matchedTerms = new Set();

  expandedGroups.forEach(group => {
    let best = 0, bestTerm = null;
    group.terms.forEach(term => {
      let s = 0;
      if(titleTokens.has(term)) s = Math.max(s, 3.0 * idf(term));
      if(catTokens.has(term))   s = Math.max(s, 2.0 * idf(term));
      if(scopeTokens.has(term)) s = Math.max(s, 1.5 * idf(term));
      if(s > best){ best = s; bestTerm = term; }
    });
    // phrase hits are stronger evidence than any single loose word
    group.phrases.forEach(ph => {
      let s = 0;
      if(titleRaw.includes(ph)) s = 4.5;
      else if(scopeRaw.includes(ph)) s = 3.0;
      if(s > best){ best = s; bestTerm = ph; }
    });
    if(best > 0){ score += best; matchedTerms.add(bestTerm); }
  });

  return { score, matchedTerms:[...matchedTerms] };
}

// Build document frequency table once, so common words ("water", "steel")
// count for less than distinctive ones ("pozzolana", "luminaire").
let DF = null;
function buildDF(){
  if(DF) return DF;
  DF = {};
  STANDARDS.forEach(s => {
    const seen = new Set(tokenize(s.title + ' ' + s.scope + ' ' + s.cat));
    seen.forEach(t => { DF[t] = (DF[t]||0) + 1; });
  });
  return DF;
}

function idf(term){
  const df = buildDF()[term] || 0;
  return Math.log((STANDARDS.length + 1) / (df + 1)) + 1;
}

function searchStandards(query, opts = {}){
  const { includeSuperseded = true } = opts;
  const qTokens = tokenize(query);
  if(!qTokens.length) return [];

  // Direct "IS 456" style lookup
  const isNumMatch = query.match(/is\s*(\d{3,5})/i);

  const expandedGroups = qTokens.map(expandToken);
  const maxPossible = expandedGroups.reduce((sum,g) => {
    const bestTerm = g.terms.length ? Math.max(...g.terms.map(idf)) * 3.0 : 0;
    const bestPhrase = g.phrases.length ? 4.5 : 0;
    return sum + Math.max(bestTerm, bestPhrase);
  }, 0) || 1;

  let results = STANDARDS.map(std => {
    const { score, matchedTerms } = scoreStandard(std, expandedGroups);
    let finalScore = score;
    if(isNumMatch && std.no.toLowerCase().includes('is ' + isNumMatch[1])){
      finalScore += 100;
    }
    // An officer writing a spec almost always wants the product standard, not
    // the test method for it — unless they explicitly asked about testing.
    const wantsTest = /\b(test|testing|method|sampling|analysis)\b/i.test(query);
    const type = docType(std);
    if(!wantsTest && finalScore > 0){
      if(type === 'product-spec') finalScore *= 1.18;
      else if(type === 'test-method' || type === 'terminology') finalScore *= 0.80;
    }
    return {
      std,
      rawScore: finalScore,
      confidence: Math.min(99, Math.round((finalScore / maxPossible) * 100)),
      matchedTerms,
    };
  }).filter(r => r.rawScore > 0);

  if(!includeSuperseded){
    results = results.filter(r => r.std.status === 'current');
  }

  results.sort((a,b) => b.rawScore - a.rawScore);
  return results.slice(0, 8);
}

// "Gap report" — related standards the officer will likely also need to cite
// but didn't ask for. Pulled from the `related` field of the top hits.
function findRelatedGaps(topResults){
  const alreadyShown = new Set(topResults.map(r => r.std.no));
  const gaps = new Map();
  topResults.slice(0,3).forEach(r => {
    (r.std.related || []).forEach(relNo => {
      const found = STANDARDS.find(s => s.no === relNo || s.no.startsWith(relNo));
      // Resolve the reference FIRST, then dedup on the resolved number —
      // `related` entries are sometimes written without the revision year
      // (e.g. 'IS 2502' vs 'IS 2502:1963'), so checking before resolving
      // lets an already-listed standard slip into the gap report.
      if(!found) return;
      if(alreadyShown.has(found.no)) return;
      if(!gaps.has(found.no)){
        gaps.set(found.no, { std: found, becauseOf: r.std.no });
      }
    });
  });
  return [...gaps.values()].slice(0,4);
}

if(typeof module !== 'undefined'){ module.exports = { searchStandards, findRelatedGaps, tokenize, expandToken }; }
