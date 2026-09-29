// Regenerates backend/data/*.json from the frontend corpus (single source of truth).
// Usage (from package root):  node backend/scripts/export_data.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const fe = path.join(__dirname, '..', '..', 'frontend');
const code = fs.readFileSync(path.join(fe, 'standards-data.js'), 'utf8') + '\n' +
  ';globalThis.__d={STANDARDS:STANDARDS,SYNONYMS:SYNONYMS,DEVA:HINDI_SYNONYMS,STOP:Array.from(STOPWORDS)};';
const ctx = {}; vm.createContext(ctx); vm.runInContext(code, ctx);
const d = ctx.__d, out = path.join(__dirname, '..', 'data');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'standards.json'), JSON.stringify(d.STANDARDS, null, 1));
fs.writeFileSync(path.join(out, 'lexicon.json'), JSON.stringify({ synonyms: d.SYNONYMS, devanagari: d.DEVA, stopwords: d.STOP }, null, 1));
console.log('exported', d.STANDARDS.length, 'standards');
