"""
Manak Match REST API (FastAPI).

Runs the same recommendation engine as the website (engine.py is a line-for-line port of
frontend/search-engine.js; parity is verified by eval/parity_check.py), so a procurement portal
gets exactly what the officer sees in the browser.

Run:  uvicorn app:app --reload        Docs: http://localhost:8000/docs
"""
import os, re
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import engine

app = FastAPI(
    title="Manak Match API",
    version="1.1.0",
    description="Recommend applicable Indian Standards (with allied standards, currency and certification) "
                "for procurement specifications. Prototype for Smart India Hackathon 2026, PS SIH26108.",
)
app.add_middleware(CORSMiddleware, allow_origins=[o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")],
                   allow_methods=["*"], allow_headers=["*"])

# ------------------------------------------------------------------ models
class RecommendRequest(BaseModel):
    query: str = Field(..., min_length=2, max_length=2000,
                       description="Product description or specification line (English, Hindi, Marathi)")
    top_k: int = Field(5, ge=1, le=8)
    include_superseded: bool = False

class BulkRequest(BaseModel):
    items: List[str] = Field(..., min_length=1, max_length=200, description="One BOQ line item per entry")
    include_superseded: bool = False

class AuditRequest(BaseModel):
    text: str = Field(..., min_length=2, max_length=200_000, description="Tender / specification text")

def _language(text: str) -> str:
    return "devanagari (hi/mr)" if re.search(r"[\u0900-\u097F]", text) else "en"

# ------------------------------------------------------------------ endpoints
@app.get("/api/v1/health", tags=["system"])
def health():
    return {"status": "ok", "service": "manak-match", "version": app.version, "standards_indexed": len(engine.STANDARDS)}

@app.get("/api/v1/meta", tags=["system"])
def meta():
    S = engine.STANDARDS
    cats: dict = {}
    for s in S: cats[s["cat"]] = cats.get(s["cat"], 0) + 1
    return {
        "standards_indexed": len(S),
        "current": sum(1 for s in S if s["status"] == "current"),
        "superseded_or_withdrawn": sum(1 for s in S if s["status"] != "current"),
        "mandatory_certification": sum(1 for s in S if engine.certification(s)["mandatory"]),
        "categories": dict(sorted(cats.items())),
        "languages": ["en", "hi", "mr"],
    }

@app.post("/api/v1/recommend", tags=["recommend"])
def recommend(req: RecommendRequest):
    hits = engine.search(req.query, include_superseded=req.include_superseded)
    top = hits[: req.top_k]
    return {
        "query": req.query,
        "language_detected": _language(req.query),
        "results": [engine.present(h["std"], h["confidence"], h["matched"]) for h in top],
        "also_consider": [{"standard": g["std"]["no"], "title": g["std"]["title"], "because_of": g["because_of"]}
                          for g in engine.find_gaps(top)],
    }

@app.post("/api/v1/recommend/bulk", tags=["recommend"])
def recommend_bulk(req: BulkRequest):
    rows = []
    for i, item in enumerate(req.items, 1):
        hits = engine.search(item, include_superseded=req.include_superseded)
        if not hits:
            rows.append({"line": i, "item": item, "match": None, "needs_review": True}); continue
        h = hits[0]
        rows.append({"line": i, "item": item, "match": engine.present(h["std"], h["confidence"], h["matched"]),
                     "needs_review": h["confidence"] < 60})
    return {"items": len(rows), "matched_confidently": sum(1 for r in rows if not r["needs_review"]), "rows": rows}

@app.post("/api/v1/audit", tags=["audit"])
def audit(req: AuditRequest):
    return engine.audit(req.text)

@app.get("/api/v1/standards", tags=["standards"])
def list_standards(q: Optional[str] = None, category: Optional[str] = None, status: Optional[str] = None,
                   mandatory_certification: Optional[bool] = None,
                   limit: int = Query(50, ge=1, le=200), offset: int = Query(0, ge=0)):
    items = engine.STANDARDS
    if q:
        ql = q.lower()
        items = [s for s in items if ql in (s["no"] + " " + s["title"] + " " + s["scope"]).lower()]
    if category: items = [s for s in items if s["cat"].lower() == category.lower()]
    if status: items = [s for s in items if s["status"] == status]
    if mandatory_certification is not None:
        items = [s for s in items if engine.certification(s)["mandatory"] == mandatory_certification]
    return {"total": len(items), "offset": offset,
            "items": [engine.present(s) for s in items[offset: offset + limit]]}

@app.get("/api/v1/standards/{no:path}", tags=["standards"])
def get_standard(no: str):
    s = engine.resolve(no)
    if not s: raise HTTPException(404, "Standard not found in the indexed corpus")
    return engine.present(s)
