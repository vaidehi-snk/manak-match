"""Proves the REST API engine and the website engine agree.
Runs both on the labelled queries plus ~180 generated from the corpus, compares full top-8 rankings and confidences.
Usage (package root):  python eval/parity_check.py"""
import json, subprocess, sys, pathlib, random
root = pathlib.Path(__file__).parent.parent
sys.path.insert(0, str(root / "backend"))
import engine

queries = [q["q"] for q in json.load(open(root / "eval" / "queries.json", encoding="utf-8"))]
random.seed(7)
for s in engine.STANDARDS:
    words = s["title"].replace("—", " ").split()
    queries.append(" ".join(words[:4]))
    queries.append(" ".join(random.sample(s["scope"].split(), min(4, len(s["scope"].split())))))
queries += ["IS 456", "test method for cement", "आटा", "बैटरी", "बिस्तर", "gold", "xyz nonsense"]

js = r"""
const fs=require('fs'),vm=require('vm');
const fe=process.argv[1];
const code=fs.readFileSync(fe+'/standards-data.js','utf8')+'\n'+fs.readFileSync(fe+'/search-engine.js','utf8')+'\n;globalThis.__s=searchStandards;';
const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);
const Q=JSON.parse(fs.readFileSync(0,'utf8'));
console.log(JSON.stringify(Q.map(q=>ctx.__s(q,{includeSuperseded:true}).map(r=>[r.std.no,r.confidence]))));
"""
out = subprocess.run(["node", "-e", js, str(root / "frontend")], input=json.dumps(queries), capture_output=True, text=True)
if out.returncode: print(out.stderr); sys.exit(1)
js_res = json.loads(out.stdout)
bad = 0
for q, jr in zip(queries, js_res):
    py = [[r["std"]["no"], r["confidence"]] for r in engine.search(q, include_superseded=True)]
    if py != jr:
        bad += 1
        if bad <= 5: print("MISMATCH:", q, "\n  js:", jr[:3], "\n  py:", py[:3])
print(f"parity: {len(queries) - bad}/{len(queries)} queries identical (rank order and confidence)")
sys.exit(1 if bad else 0)
