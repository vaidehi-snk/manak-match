"""
Manak Match — recommendation engine (Python port of frontend/search-engine.js).

The browser prototype and this service run the SAME algorithm on the SAME corpus, so the
website and the REST API return the same answers (see eval/parity_check.py).

Method: query -> tokens -> concept/synonym expansion (English + Hindi/Marathi lexicon)
        -> field-weighted, IDF-weighted matching (title > category > scope, phrase hits
        strongest) -> product-specification preference -> explainable confidence.
No model download, no external service, fully deterministic.
"""
import json, math, re
from pathlib import Path
from typing import Dict, List, Optional

DATA = Path(__file__).parent / "data"
STANDARDS: List[dict] = json.loads((DATA / "standards.json").read_text(encoding="utf-8"))
_LEX = json.loads((DATA / "lexicon.json").read_text(encoding="utf-8"))
SYNONYMS: Dict[str, List[str]] = _LEX["synonyms"]
DEVANAGARI: Dict[str, str] = _LEX["devanagari"]
STOPWORDS = set(_LEX["stopwords"])
BY_NO = {s["no"]: s for s in STANDARDS}
_SEM_PATH = DATA / "semantic.json"
SEMANTIC = json.loads(_SEM_PATH.read_text(encoding="utf-8")) if _SEM_PATH.exists() else None
SEM_FLOOR, SEM_WEIGHT, SEM_ONLY_MIN = 0.35, 0.3, 0.5

# ------------------------------------------------------------------ text
_STRIP = re.compile(r"[^a-z0-9\u0900-\u097F\s./-]")

def tokenize(text: str) -> List[str]:
    return [t for t in _STRIP.sub(" ", text.lower()).split() if len(t) > 1 and t not in STOPWORDS]

def expand_token(token: str) -> dict:
    terms, phrases = {token}, set()
    if token.endswith("s") and len(token) > 3:
        terms.add(token[:-1])
    elif re.fullmatch(r"[a-z]{4,}", token):
        terms.add(token + "s")            # 'cylinder' also finds 'cylinders'
    if token in DEVANAGARI:                       # Hindi / Marathi -> canonical English key
        terms.add(DEVANAGARI[token])
        token = DEVANAGARI[token]
    def add(s):
        (phrases if " " in s else terms).add(s)
    for key, syns in SYNONYMS.items():
        hit = token == key or token in syns or (token.endswith("s") and (token[:-1] == key or token[:-1] in syns))
        if hit:
            add(key)
            for s in syns: add(s)
    return {"terms": list(terms), "phrases": list(phrases)}

# ------------------------------------------------------------------ document classification
def doc_type(std: dict) -> str:
    t = std["title"].lower()
    if "method" in t or "methods of test" in t: return "test-method"
    if "code of practice" in t or "guidelines" in t or "recommended" in t: return "code-of-practice"
    if "terms and definitions" in t: return "terminology"
    return "product-spec"

TYPE_LABEL = {"product-spec": "Product specification", "code-of-practice": "Code of practice",
              "test-method": "Test method", "terminology": "Terminology"}

# ------------------------------------------------------------------ scoring
_DF: Optional[Dict[str, int]] = None
_FIELD_TOKENS: Dict[str, dict] = {}

def _build():
    global _DF
    if _DF is not None: return
    _DF = {}
    for s in STANDARDS:
        for t in set(tokenize(s["title"] + " " + s["scope"] + " " + s["cat"])):
            _DF[t] = _DF.get(t, 0) + 1
        _FIELD_TOKENS[s["no"]] = {"title": set(tokenize(s["title"])), "scope": set(tokenize(s["scope"])),
                                  "cat": set(tokenize(s["cat"]))}

def idf(term: str) -> float:
    _build()
    return math.log((len(STANDARDS) + 1) / (_DF.get(term, 0) + 1)) + 1

def _score(std: dict, groups: List[dict]):
    _build()
    ft = _FIELD_TOKENS[std["no"]]
    title_raw, scope_raw = std["title"].lower(), std["scope"].lower()
    score, matched = 0.0, []
    for g in groups:
        best, best_term = 0.0, None
        for term in g["terms"]:
            s = 0.0
            if term in ft["title"]: s = max(s, 3.0 * idf(term))
            if term in ft["cat"]:   s = max(s, 2.0 * idf(term))
            if term in ft["scope"]: s = max(s, 1.5 * idf(term))
            if s > best: best, best_term = s, term
        for ph in g["phrases"]:
            s = 4.5 if ph in title_raw else 3.0 if ph in scope_raw else 0.0
            if s > best: best, best_term = s, ph
        if best > 0:
            score += best
            if best_term not in matched: matched.append(best_term)
    return score, matched

def semantic_scores(groups: List[dict]) -> Optional[Dict[str, float]]:
    """Latent-semantic (LSA) cosine of the query vs every standard - mirrors semanticScores() in search-engine.js."""
    if not SEMANTIC: return None
    k = SEMANTIC["k"]; q = [0.0] * k; used = set(); hit = 0
    for g in groups:
        for t in list(g["terms"]) + [w for p in g["phrases"] for w in p.split(" ")]:
            if t in used: continue
            used.add(t); v = SEMANTIC["terms"].get(t)
            if v:
                hit += 1
                for i in range(k): q[i] += v[i]
    if not hit: return None
    n = math.sqrt(sum(x * x for x in q)) or 1.0
    return {no: sum(q[i] * d[i] for i in range(k)) / n for no, d in SEMANTIC["docs"].items()}

def search(query: str, include_superseded: bool = True, limit: int = 8) -> List[dict]:
    q_tokens = tokenize(query)
    if not q_tokens: return []
    is_num = re.search(r"is\s*(\d{3,5})", query, re.I)
    groups = [expand_token(t) for t in q_tokens]
    max_possible = sum(max((max(idf(t) for t in g["terms"]) * 3.0) if g["terms"] else 0.0,
                           4.5 if g["phrases"] else 0.0) for g in groups) or 1.0
    wants_test = re.search(r"\b(test|testing|method|sampling|analysis)\b", query, re.I) is not None
    sem = semantic_scores(groups)
    out = []
    for std in STANDARDS:
        score, matched = _score(std, groups)
        final = score
        if score > 0:   # adjacent query words that appear together are stronger evidence
            tl, sl = std["title"].lower(), std["scope"].lower()
            for i in range(len(q_tokens) - 1):
                ph = q_tokens[i] + " " + q_tokens[i + 1]
                if ph in tl: final += 2.5
                elif ph in sl: final += 1.5
        cos = sem.get(std["no"], 0.0) if sem else 0.0
        sem_only = False
        if cos > SEM_FLOOR and (score > 0 or cos >= SEM_ONLY_MIN):
            final += (cos - SEM_FLOOR) / (1 - SEM_FLOOR) * max_possible * SEM_WEIGHT
            sem_only = score == 0
        if is_num and ("is " + is_num.group(1)) in std["no"].lower(): final += 100
        if not wants_test and final > 0:
            kind = doc_type(std)
            if kind == "product-spec": final *= 1.18
            elif kind in ("test-method", "terminology"): final *= 0.80
        if std.get("primary") and final > 0: final *= (std["primary"] if isinstance(std["primary"], (int, float)) and not isinstance(std["primary"], bool) else 1.12)
        if final > 0:
            out.append({"std": std, "raw": final, "matched": matched,
                        "confidence": min(99, int(final / max_possible * 100 + 0.5)),
                        "semantic": round(cos * 100), "sem_only": sem_only})
    if not include_superseded:
        out = [r for r in out if r["std"]["status"] == "current"]
    out.sort(key=lambda r: -r["raw"])
    return out[:limit]

def resolve(no: str) -> Optional[dict]:
    if no in BY_NO: return BY_NO[no]
    return next((s for s in STANDARDS if s["no"].startswith(no + ":") or s["no"].startswith(no + " (")), None)

def find_gaps(top: List[dict]) -> List[dict]:
    shown = {r["std"]["no"] for r in top}
    gaps: Dict[str, dict] = {}
    for r in top[:3]:
        for rel in r["std"].get("related", []):
            f = next((s for s in STANDARDS if s["no"] == rel or s["no"].startswith(rel)), None)
            if not f or f["no"] in shown or f["no"] in gaps: continue
            gaps[f["no"]] = {"std": f, "because_of": r["std"]["no"]}
    return list(gaps.values())[:4]

# ------------------------------------------------------------------ relations & certification
_OVERRIDES = {"IS 4031": "test_method", "IS 2386": "test_method", "IS 3025": "test_method", "IS 875": "normative_reference"}

def classify_relation(no: str) -> str:
    s = resolve(no)
    if no in _OVERRIDES and not s: return _OVERRIDES[no]
    t = s["title"].lower() if s else ""
    if re.search(r"method(s)? of test|methods for test|test(ing)? for|methods of sampling", t): return "test_method"
    if re.search(r"glossary|terminology|definitions|nomenclature", t): return "terminology"
    if s and s.get("cat") == "Safety / PPE": return "safety"
    if re.search(r"code of practice for (installation|laying|erection)|installation and maintenance|installation of", t): return "installation"
    if "code of practice" in t: return "normative_reference"
    return "related_product"

def allied(std: dict) -> Dict[str, list]:
    groups: Dict[str, list] = {}
    for no in std.get("related", []):
        r = resolve(no)
        groups.setdefault(classify_relation(no), []).append(
            {"standard": r["no"] if r else no, "status": r["status"] if r else "not_in_corpus",
             "title": r["title"] if r else None})
    return groups

def certification(std: dict) -> dict:
    sch = std.get("certScheme")
    if sch == "CRS": return {"scheme": "BIS Compulsory Registration Scheme (CRS)", "mandatory": True}
    if sch == "Hallmark": return {"scheme": "BIS Hallmarking (HUID)", "mandatory": True}
    if std.get("isiMark") == "mandatory": return {"scheme": "BIS Product Certification (ISI mark, under QCO)", "mandatory": True}
    if std.get("isiMark") == "voluntary": return {"scheme": "BIS Product Certification (ISI mark)", "mandatory": False}
    return {"scheme": None, "mandatory": False}

def present(std: dict, confidence: Optional[int] = None, matched: Optional[list] = None) -> dict:
    d = {"standard": std["no"], "title": std["title"], "scope": std["scope"], "ics": std.get("ics"),
         "category": std.get("cat"), "document_type": TYPE_LABEL[doc_type(std)],
         "status": std["status"], "superseded_by": std.get("supersededBy"),
         "amendments": std.get("amendments", []), "certification": certification(std),
         "allied_standards": allied(std)}
    if confidence is not None: d["confidence"] = round(confidence / 100, 2)
    if matched is not None: d["matched_terms"] = matched
    return d

# ------------------------------------------------------------------ tender audit
_CITE = re.compile(r"IS\s*:?\s*(\d{2,5})\s*(\(\s*Part\s*[^)]*\))?\s*(?::\s*(\d{4}))?", re.I)

def audit(text: str) -> dict:
    found, seen = [], set()
    for m in _CITE.finditer(text):
        raw = re.sub(r"\s+", " ", m.group(0)).strip()
        num, part, year = m.group(1), (re.sub(r"\s+", " ", m.group(2)) if m.group(2) else None), m.group(3)
        key = num + (part or "") + (year or "")
        if key in seen: continue
        seen.add(key); found.append((raw, num, part, year))
    rows, cited_nos = [], set()
    for raw, num, part, year in found:
        cands = []
        for s in STANDARDS:
            sn = re.search(r"IS\s*(\d+)", s["no"], re.I)
            if not sn or sn.group(1) != num: continue
            if part:
                want = re.sub(r"[()]", "", part.lower()).strip()[:10]
                if want not in s["no"].lower(): continue
            cands.append(s)
        exact = next((c for c in cands if year and c["no"].endswith(":" + year)), None) if year else None
        std = exact or next((c for c in cands if c["status"] == "current"), None) or (cands[0] if cands else None)
        issues = []
        if not std:
            issues.append({"level": "unknown", "message": f'"{raw}" is not in the indexed corpus - verify on bis.gov.in.'})
            rows.append({"cited": raw, "standard": None, "issues": issues}); continue
        cited_nos.add(std["no"])
        sy = re.search(r":(\d{4})", std["no"])
        if year and sy and year != sy.group(1):
            issues.append({"level": "warn", "message": f"Cited as {raw}, but the revision on record is {std['no']}."})
        if std["status"] == "superseded":
            issues.append({"level": "critical", "message": f"{std['no']} is SUPERSEDED by {std.get('supersededBy')}.", "fix": std.get("supersededBy")})
        elif std["status"] == "withdrawn":
            issues.append({"level": "critical", "message": f"{std['no']} has been WITHDRAWN by BIS."})
        kind = doc_type(std)
        if kind in ("test-method", "terminology"):
            issues.append({"level": "warn", "message": f"{std['no']} is a {TYPE_LABEL[kind].lower()}, not a product specification; pair it with the relevant product standard."})
        rows.append({"cited": raw, "standard": std["no"], "document_type": TYPE_LABEL[kind], "status": std["status"],
                     "certification": certification(std), "issues": issues})
    missing, seen_m = [], set()
    for raw in rows:
        std = BY_NO.get(raw.get("standard") or "")
        if not std: continue
        for rel in std.get("related", []):
            f = next((s for s in STANDARDS if s["no"] == rel or s["no"].startswith(rel)), None)
            if not f or f["no"] in cited_nos or f["no"] in seen_m: continue
            seen_m.add(f["no"]); missing.append({"standard": f["no"], "title": f["title"], "because_of": std["no"]})
    critical = sum(1 for r in rows for i in r["issues"] if i["level"] == "critical")
    return {"citations_found": len(rows), "critical_issues": critical, "findings": rows, "consider_adding": missing[:5]}
