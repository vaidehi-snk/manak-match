# Features delivered and roadmap

## 1. Delivered
### Required by the problem statement
- Input: descriptions, specifications, tender text (paste or .txt upload), full BOQs
- Semantic-style retrieval with synonym/concept expansion and explainable confidence
- Allied standards in six relation types (normative, test method, terminology, safety, installation, related product)
- Latest version, supersession, amendments
- Certification: ISI (QCO), CRS, Hallmarking (HUID) with clause wording
- Multilingual: English, Hindi, Marathi (Devanagari), Hinglish, voice input, bilingual UI
- Portal integration: embedded assistant screen + REST API + reference backend

### Beyond the brief
| Feature | Why it matters |
|---|---|
| Tender Auditor | Catches superseded, withdrawn, wrong-year and wrong-type citations in an existing tender |
| Bulk BOQ Analyzer + CSV | Turns a one-item search tool into a whole-tender tool |
| Spec-clause generator | Produces ready-to-paste tender wording including certification requirement |
| Gap check ("you may also need to cite") | Surfaces omitted standards — the exact failure the PS describes |
| Project Packs | Cross-category checklists for common projects |
| Compare | Explains differences between look-alike standards before citing one |
| Transparency panel | States what is live vs simulated (builds trust with evaluators) |
| Government-style UI | Tricolour strip, ministry header, dashboard shell, bilingual interface |

## 2. What to add next (ranked by impact for the finals, then effort)
| # | Feature | Impact | Effort | Notes |
|---|---|---|---|---|
| 1 | **Grow the corpus to 300–500 standards** | High | Medium | Your deck promises this range; use public "Know Your Standard" metadata (number, title, scope, status, ICS). Extend `standards.json` and the frontend data file |
| 2 | **Dense multilingual embeddings + FAISS** | High | Low–Med | Backend hook already exists (`EMBEDDINGS=1`). Add an eval set of 50 queries and report top-1 / top-3 accuracy — judges love a number |
| 3 | **Evaluation dashboard** | High | Low | Show precision@k on a labelled query set inside the app. Turns "AI-powered" into evidence |
| 4 | **Live BIS status check** | High | Medium | Cache Know Your Standard / Revised-Withdrawn listings nightly; show "verified on <date>" |
| 5 | **PDF / DOCX tender ingestion + OCR** | High | Medium | Extract clauses, then run each through the engine (pdfplumber, python-docx, Tesseract with Hindi model) |
| 6 | **Downloadable compliance report (PDF)** | Medium | Low | Item → standard → version → certification → allied → clause, with date and officer sign-off box |
| 7 | **"Why not this one?" explanations** | Medium | Low | Show why near-miss standards were excluded — explainability differentiator |
| 8 | **Standards knowledge graph view** | Medium | Medium | Interactive network of a standard and its allied standards |
| 9 | **Change alerts** | Medium | Medium | Notify when a standard cited in a saved tender is revised or withdrawn |
| 10 | **QCO tracker** | Medium | Medium | Which products are under Quality Control Orders, with effective dates |
| 11 | **Bidder licence verification** | Medium | High | Check a vendor's ISI licence / CRS registration number (deck lists manakonline as the source; confirm access terms first) |
| 12 | **More Indian languages** | Medium | Medium | Tamil, Telugu, Bengali, Gujarati, Kannada via multilingual embeddings rather than word lists |
| 13 | **Officer feedback loop** | Medium | Medium | Accept / reject buttons feeding a re-ranking model, with an audit trail |
| 14 | **Conflict detector** | Low–Med | Medium | Flags two cited standards that contradict or overlap |
| 15 | **Portal embed script** | Medium | Low | `<script src=".../manak-widget.js">` that attaches to any specification textarea |
| 16 | **Auth + roles + audit log** | Needed for real deployment | Medium | SSO / NIC integration is the realistic government path |

## 3. Innovation talking points (each maps to something that exists in the demo)
1. **It audits, not just searches** — the tender auditor finds the failure the problem statement describes (outdated or omitted standards).
2. **It works at tender scale** — a whole BOQ in one pass with a CSV for the file note.
3. **It speaks the officer's language** — Hindi and Marathi queries resolve to the same standards as English ones.
4. **Certification is part of the answer** — ISI, CRS or Hallmark shown beside the standard, with clause text.
5. **It is honest** — a visible matrix of what is live vs simulated, and confidence scores on every result.
6. **Human in the loop** — ranked, explainable suggestions; the officer decides.
