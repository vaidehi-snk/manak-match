# Pitch, demo script and deck notes

## 1. Fixes needed in your current deck (IS_Standards.pptx)
These are things I found reading the file. Fix before submitting.

1. **Slide 2 has the wrong title.** It still reads *"MPLAD Sentinel: AI-Driven Anomaly & Fraud Detection for MPLAD Fund Utilization"* —
   a leftover from the other deck. It should name Manak Match and this problem statement.
2. **Placeholders remain:** "Your Team Name" on slides 2–6, blank Team ID / Team Name on slide 1, and "[Fill Name]" for every team role on slide 6.
3. **Scope figure does not match the build.** Slide 3 says a sample of "~300–500" standards; the prototype has **90**. Either grow the corpus
   (roadmap item 1) or write "90 in the prototype, designed to scale to the full catalogue".
4. **Architecture slide vs. what exists.** The slide lists React + Tailwind, FastAPI, sentence-transformers → FAISS/pgvector, PostgreSQL.
   What is built: a static JavaScript front end with an in-browser engine, plus a FastAPI reference backend using TF-IDF and a lexicon
   (embeddings are an optional hook, PostgreSQL/FAISS are not built). Label the slide **"Prototype"** and **"Production target"** columns so
   nothing reads as overclaimed. Judges who open the code will check this.
5. **Slide 3 layout:** in my LibreOffice render, tier titles overlap their descriptions and "MANAK MATCH" wraps inside the centre circle
   ("MANA / K"). PowerPoint may render differently — check it there and shrink the text if it wraps.
6. **Unverified numbers:** "20,227+ standards (2019)", "~1,800/yr" and "GeM 62L+ orders/year" are not something I could confirm.
   Put a source on the slide or remove them. Also soften "0 officially documented public APIs" to "no public bulk API we could find".
7. **Use the problem statement's own words** on the solution slide: *semantic understanding rather than keyword matching · allied, cross-referenced,
   normative standards · latest published version and amendments · BIS Product Certification, CRS, Hallmarking · multilingual input and natural
   language queries · integrates with procurement portals.* The feature map in README.md is written to be pasted straight in.
8. **Add a screenshot slide** of the working site (Find result with allied standards + Portal Integration). Your MPLAD deck has a
   "what an official actually sees" panel — do the same here.

I could not open the reference website (mplad-sentinel-rho.vercel.app) or watch Video_Project_2.mp4, so I took style cues from the MPLAD deck only.

## 2. Three-minute demo script
| Time | Do this | Say this |
|---|---|---|
| 0:00 | Home page | "An officer drafting a tender must cite the right Indian Standards. Keyword search on BIS misses superseded numbers and related standards. Manak Match fixes that." |
| 0:25 | Find → type `PVC pipes for drinking water supply` | "Plain language in, ranked standards out, with the reason each matched." |
| 0:50 | Point at allied panel, status, badge | "Allied standards grouped as normative, test method, terminology, safety, installation, related product — plus current version, amendments and the certification the vendor must hold." |
| 1:15 | Type `पीने के पानी के लिए पाइप` | "Same answer in Hindi. Marathi works too, and voice input." |
| 1:35 | Search `gold jewellery hallmarking`, then `LED bulbs` | "Certification is scheme-aware: ISI, CRS, Hallmarking — with clause wording ready to paste." |
| 1:55 | Audit → paste a clause citing `IS 8112:2013` | "Existing tenders get audited: this citation was superseded." |
| 2:15 | Bulk BOQ → Analyze | "A whole BOQ in one pass, exported to CSV for the file." |
| 2:35 | Portal Integration → Load demo text | "This is how it sits inside a portal's specification screen, calling a REST API." |
| 2:55 | Home page matrix | "Every expected feature in SIH26108 maps to a module. Corpus is a 90-standard sample; the method is what we prove." |

## 3. Likely judge questions and honest answers
1. **"Is this really AI, or keyword search?"** — Retrieval is TF-IDF with concept and synonym expansion and a Hindi/Marathi lexicon; it is *semantic in the concept-expansion sense*, not a learned embedding model. A dense-embedding upgrade path is implemented as an option in the backend. Say this plainly.
2. **"How accurate is it?"** — On an internal 35-query regression set the frontend engine gets 35/35 top-1 and the backend 31/35 top-1, 35/35 top-3. **Do not present this as accuracy**: I wrote the queries knowing the corpus. A credible number needs a blind set written by someone else (see §4).
3. **"Only 238 standards?"** — Yes: full texts are paid content and BIS has no bulk API. The pipeline is corpus-independent; scaling is data work.
4. **"Where does status and amendment data come from?"** — Demo sample data. Production would sync from BIS public listings (Know Your Standard, revised/withdrawn lists); not built.
5. **"How does it integrate with a portal?"** — REST API (`/api/v1/recommend`, `/audit`); the Portal screen shows the embedded-assistant pattern.
6. **"What if it recommends wrongly?"** — It ranks with confidence and explanations; the officer decides. Low-confidence items are flagged for manual review in bulk mode.
7. **"Data privacy?"** — The prototype runs in the browser; nothing is sent anywhere. Backend stores nothing.
8. **"How is this different from searching BIS?"** — Plain-language and multilingual input, allied-standard graph, currency check on existing tenders, certification mapping, bulk mode.
9. **"Scale and cost?"** — Open-source stack, no paid services; the backend is a small stateless API.
10. **"What is next?"** — Larger corpus, embeddings + evaluation set, live BIS checks, PDF ingestion (docs/FEATURES_AND_ROADMAP.md).

## 4. Getting a number you can defend
The repo contains `eval/queries.json` and two runners (`node eval/run_eval.js`, `python eval/run_eval_backend.py`).
To make it credible: (a) have two teammates write 50 realistic item descriptions **without looking at the corpus** (use real GeM item names),
(b) label the correct standard for each, (c) report top-1 and top-3 on that blind set, and show the misses. A 75–85 % blind top-3 that you
can explain beats a suspicious 100 %.

## 5. One-line positioning
*"Manak Match doesn't just find a standard — it audits the tender, completes the standard set, and states the certification the vendor must hold, in the officer's own language."*
