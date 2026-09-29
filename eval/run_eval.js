// Evaluates the in-browser engine. Usage: node eval/run_eval.js   (from the package root)
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.join(__dirname,'..','frontend');
const code=fs.readFileSync(path.join(root,'standards-data.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'search-engine.js'),'utf8')+'\n;globalThis.__s=searchStandards;';
const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);
const Q=JSON.parse(fs.readFileSync(path.join(__dirname,'queries.json'),'utf8'));
let t1=0,t3=0;const by={};const miss=[];
for(const {q,lang,expect} of Q){
  const r=ctx.__s(q,{includeSuperseded:false}).map(x=>x.std.no);
  const h1=expect.includes(r[0]), h3=r.slice(0,3).some(n=>expect.includes(n));
  t1+=h1;t3+=h3;(by[lang]=by[lang]||{n:0,h1:0,h3:0});by[lang].n++;by[lang].h1+=h1;by[lang].h3+=h3;
  if(!h1)miss.push(`${q}  →  got ${r.slice(0,3).join(' | ')||'nothing'}  (expected ${expect[0]})`);
}
console.log(`Frontend engine — ${Q.length} queries: top-1 ${t1}/${Q.length} (${(100*t1/Q.length).toFixed(0)}%), top-3 ${t3}/${Q.length} (${(100*t3/Q.length).toFixed(0)}%)`);
for(const [l,v] of Object.entries(by))console.log(`  ${l}: top-1 ${v.h1}/${v.n}, top-3 ${v.h3}/${v.n}`);
if(miss.length){console.log('Top-1 misses:');miss.forEach(m=>console.log('  - '+m));}
