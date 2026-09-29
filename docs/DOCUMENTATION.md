# Technical documentation

## 1. Problem and approach
Procurement officers must cite the correct Indian Standards in tender specifications. The catalogue is large,
scopes overlap, standards are revised, and related standards (test methods, safety, installation) are easily
missed. Manak Match turns a plain-language description into a ranked, explainable list of standards with the
context an officer needs to write a defensible clause. The officer stays in control: the system recommends, the
officer decides.

## 2. Architecture

```
 Officer (browser)                                 Procurement portal (any)
 ┌─────────────────────────────┐                   ┌──────────────────────────┐
 │ Frontend: HTML/CSS/JS       │                   │ Tender specification form│
 │  Find · Audit · Bulk ·      │                   └────────────┬─────────────┘
 │  Portal · Packs · Compare   │                                │ POST /api/v1/recommend
 │  In-browser engine (JS)     │                                ▼
 └──────────────┬──────────────┘                   ┌──────────────────────────┐
                │ same logic, same corpus          │ Backend: FastAPI         │
                └─────────────────────────────────▶│ TF-IDF + lexicon (+opt.  │
                                                    │ sentence-transformers)   │
                                                    └────────────┬─────────────┘
                                                                 ▼
                                                    standards.json · lexicon.json
```

The prototype runs fully in the browser (no server needed for the demo). The FastAPI backend implements the same
pipeline as a service so portals can integrate over REST.

## 3. Recommendation pipeline
1. **Normalise** — lowercase, strip punctuation, keep Devanagari, drop stop-words (English, Hindi, Marathi).
2. **Translate concepts** — Devanagari terms map to canonical English keys (e.g. `पाइप`/`नळ` → `pipe`, `पाणी` → `water`).
3. **Expand** — each key expands to synonyms and phrases (`drinking` → `potable`, `drinking water`…). Original terms are
   weighted above expansions so recall grows without overriding what the officer typed.
4. **Score** — IDF-weighted matching of title and scope (title weighted higher) plus category/document-type signals;
   the frontend returns a 0–100 confidence and the terms that matched (explainability).
5. **Filter** — superseded / withdrawn standards are hidden unless requested; optional "mandatory certification only".
6. **Enrich** — for every hit: status, replacing standard, amendments, certification scheme, allied standards.
7. **Gap check** — standards commonly cited with the top hits that the query did not surface.

## 4. Allied-standard classification
Each `related` link is classified into the six relation types named in the problem statement:
normative reference, test method, terminology standard, safety standard, installation standard, related product standard.
Classification is **rule-based** (title / category patterns, plus a small override table for referenced standards outside the
corpus). It is deliberately transparent; replacing it with a trained classifier is on the roadmap.

## 5. Certification logic
`isiMark` (`mandatory | voluntary | na`) and optional `certScheme` (`CRS | Hallmark`) drive the badge, the filter, the bulk
export and the generated clause wording:
- **ISI mark under a Quality Control Order** — product certification via BIS licence.
- **CRS** — Compulsory Registration Scheme for electronics and IT goods (standard mark + R-number).
- **Hallmarking** — BIS Hallmark with HUID for gold and silver articles.
Certification flags in the demo corpus must be verified against the current QCO / CRS / hallmarking notifications before
operational use.

## 6. Data model (`standards-data.js` / `standards.json`)
```json
{ "no": "IS 4985:2021", "title": "...", "scope": "...", "ics": "23.040.10", "cat": "Pipes & Fittings",
  "status": "current | superseded | withdrawn", "supersededBy": "IS ...",
  "isiMark": "mandatory | voluntary | na", "certScheme": "CRS | Hallmark",
  "amendments": ["Amendment No. 1 (2022): ..."], "related": ["IS 4984:2016", "..."] }
```
Amendment entries in the demo corpus are illustrative placeholders and must be replaced with verified BIS data.

## 7. Modules
| Module | Purpose |
|---|---|
| Find Standards | Natural-language / Hindi / Marathi / voice search with explanations, filters, clause generator |
| Audit a Tender | Extracts every IS citation from pasted or uploaded text and checks currency and document type |
| Bulk BOQ Analyzer | One recommendation per Bill-of-Quantities line, confidence, certification, CSV export |
| Portal Integration | Assistant embedded in a mock tender screen + live API request/response |
| Project Packs | Cross-category checklists (school kitchen, rural water scheme, PHC …) |
| Compare | Side-by-side of two similar standards with a plain-language difference summary |

## 8. REST API
Interactive docs at `/docs` when the backend runs.

`POST /api/v1/recommend`
```json
{ "query": "पीने के पानी के लिए पाइप", "top_k": 3, "include_superseded": false }
```
→ `language_detected`, and per result: `standard, title, scope, ics, confidence (0-1), status, superseded_by, amendments,
certification{scheme, mandatory}, allied_standards{ normative_reference|test_method|terminology|safety|installation|related_product }`.

`POST /api/v1/audit` `{ "text": "... IS 8112:2013 ..." }` → per citation: `current | superseded | withdrawn | wrong_year | year_missing | not_in_corpus`, latest standard, certification.

`GET /api/v1/standards/{no}` · `GET /api/v1/health`

Calling from a portal (JavaScript):
```js
const r = await fetch("https://YOUR-API/api/v1/recommend", {
  method: "POST", headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ query: specLine, top_k: 3 })
});
const { results } = await r.json();
```

## 9. Testing
- Backend: `python -m pytest -q backend/tests` → 7 tests (English, Hindi, Marathi, certification schemes, allied groups,
  superseded handling + audit, 404).
- Retrieval regression set: `eval/` (35 queries; frontend 35/35 top-1, backend 31/35 top-1 and 35/35 top-3). Self-authored, so treat as a regression test, not an accuracy claim.
- Frontend: smoke-tested in headless Chromium (home, Hindi search, Hallmark badge, bulk analysis, portal) with zero JS errors.

## 10. Known limitations (be upfront)
- Corpus is a 90-record curated sample; scope text is paraphrased, not the licensed full text.
- Retrieval is lexical + lexicon-based. It handles synonyms and Hindi/Marathi through the lexicon, not through learned
  embeddings. Ambiguous queries (e.g. "pipe for drinking water") can rank a water-quality standard alongside a pipe standard.
- Marathi/Hindi coverage is a curated term list (~80 terms), not a general translator.
- No live BIS status check; amendments and certification flags are sample data.
- Audit handles plain-text input (.txt); PDF/DOCX parsing is on the roadmap.
