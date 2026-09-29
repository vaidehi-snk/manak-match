# Manak Match — AI-Powered Recommendation Engine for Applicable Indian Standards

**Smart India Hackathon 2026 · Problem Statement SIH26108 · Theme: Smart Automation · Category: Software**
Ministry of Consumer Affairs, Food & Public Distribution · Department of Consumer Affairs (DoCA)

Manak Match reads a product description, technical specification or tender document and recommends the
most relevant Indian Standards, together with the allied, cross-referenced and normative standards that
should also be cited, the latest version and amendments, and the mandatory certification requirement.

## What is in this package

```
manak-match/
├── frontend/                  Website (static, no build step)
│   ├── index.html             Application shell, UI, navigation, modules
│   ├── standards-data.js      Standards corpus (90 records) + English / Hindi / Marathi lexicon
│   ├── search-engine.js       Retrieval, scoring, audit and gap-detection logic
│   ├── icons.js               Lucide icons inlined for offline use (generated)
│   ├── build.js               `node build.js` rebuilds standalone.html after editing index.html
│   ├── standalone.html        Everything inlined in ONE file (easiest to deploy or email)
│   └── vercel.json
├── backend/                   Reference REST API (FastAPI)
│   ├── app.py                 /api/v1/recommend · /audit · /standards/{no} · /health
│   ├── data/                  standards.json, lexicon.json (exported from the frontend corpus)
│   ├── tests/test_api.py      7 automated tests (all passing)
│   ├── requirements.txt · Dockerfile · render.yaml
├── eval/                      35-query regression set + runners (docs/PITCH_AND_DECK_NOTES.md §4)
└── docs/
    ├── DOCUMENTATION.md       Architecture, algorithm, data model, API reference, limitations
    ├── DEPLOYMENT.md          Step-by-step deployment (Vercel / Netlify / GitHub Pages / Render / Docker)
    ├── FEATURES_AND_ROADMAP.md  What was built, what to add next, innovation ideas
    └── PITCH_AND_DECK_NOTES.md  Demo script, judge Q&A, deck corrections
```

## Run it locally in 60 seconds

**Frontend** (no install): open `frontend/standalone.html` in a browser.
Or serve the split version: `cd frontend && python3 -m http.server 8080` → http://localhost:8080

**Backend:**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload                                 # http://localhost:8000/docs  (interactive API docs)
python -m pytest -q tests                                # 7 passed
```

## Problem statement → feature map

| Expected feature (as written in SIH26108) | Where it is delivered |
|---|---|
| Accept product descriptions, technical specifications, or tender documents as input | Find Standards · Audit a Tender (paste / .txt upload) · Bulk BOQ Analyzer |
| Recommend the most relevant Indian Standard(s) based on semantic understanding rather than keyword matching | Weighted retrieval + concept/synonym expansion + explainable confidence (Find) |
| Identify allied standards: normative references, test methods, terminology, safety, installation, related product standards | Six-way "Allied & cross-referenced standards" panel on every result |
| Highlight the latest published version and amendments | Status (current / superseded / withdrawn), replacing standard, amendments panel, audit |
| Suggest mandatory certification (BIS Product Certification, CRS, Hallmarking) | Scheme-aware badges + auto-generated clause wording |
| Support multilingual input and natural language queries | English, Hindi, Marathi (Devanagari), Hinglish; voice input; bilingual UI |
| Integrates with procurement portals | Portal Integration module + REST API (`backend/`) |

## Honest scope statement (say this to the judges before they ask)

The prototype indexes a **curated sample of 90 commonly procured standards**, not the full BIS catalogue of
20,000+. The full text of standards is paid content and BIS exposes no bulk API. What is being proven is the
**method** — retrieval, allied-standard graph, currency check, certification mapping — which is corpus-independent.
Live BIS lookups are not implemented and are listed as roadmap.
