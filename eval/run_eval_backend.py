"""Evaluates the FastAPI backend retrieval. Usage (from package root): python eval/run_eval_backend.py"""
import json, sys, pathlib
root = pathlib.Path(__file__).parent.parent
sys.path.insert(0, str(root / "backend"))
from fastapi.testclient import TestClient
from app import app
c = TestClient(app)
Q = json.load(open(pathlib.Path(__file__).parent / "queries.json", encoding="utf-8"))
t1 = t3 = 0; miss = []
for it in Q:
    r = [x["standard"] for x in c.post("/api/v1/recommend", json={"query": it["q"], "top_k": 3}).json()["results"]]
    h1 = bool(r) and r[0] in it["expect"]; h3 = any(n in it["expect"] for n in r[:3])
    t1 += h1; t3 += h3
    if not h1: miss.append(f'{it["q"]}  ->  got {" | ".join(r) or "nothing"}  (expected {it["expect"][0]})')
print(f"Backend — {len(Q)} queries: top-1 {t1}/{len(Q)} ({100*t1/len(Q):.0f}%), top-3 {t3}/{len(Q)} ({100*t3/len(Q):.0f}%)")
for m in miss: print("  - " + m)
