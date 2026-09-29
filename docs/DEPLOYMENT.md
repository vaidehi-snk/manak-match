# Deployment guide

There are two independent pieces. **You only need the frontend for the hackathon demo.** Deploy the backend if you want to
demonstrate the REST API / portal integration live.

---
## A. Frontend (static site — free)

### Option 1 — Vercel (recommended; same host as your MPLAD Sentinel site)
**Via GitHub (best, auto-redeploys on every push):**
1. Create a GitHub repo and push this whole folder:
   ```bash
   cd manak-match
   git init && git add . && git commit -m "Manak Match"
   git branch -M main
   git remote add origin https://github.com/<you>/manak-match.git
   git push -u origin main
   ```
2. Go to vercel.com → **Add New… → Project** → import the repo.
3. **Root Directory:** `frontend` · **Framework Preset:** Other · leave Build Command and Output Directory empty.
4. Click **Deploy**. You get `https://manak-match-<hash>.vercel.app`. Rename under Settings → Domains.

**Via CLI (no GitHub):**
```bash
npm i -g vercel
cd manak-match/frontend
vercel --prod
```

### Option 2 — Netlify Drop (fastest, 30 seconds)
Open app.netlify.com/drop and drag the `frontend` folder in. Done. (Or drag only `standalone.html` renamed to `index.html`.)

### Option 3 — GitHub Pages
```bash
git subtree push --prefix frontend origin gh-pages
```
Then repo → Settings → Pages → Source: branch `gh-pages`, folder `/ (root)`. URL: `https://<you>.github.io/manak-match/`.

### Option 4 — Any static host / college server
Upload the contents of `frontend/` (or the single `standalone.html` as `index.html`). No build step, no server code.

**Smoke test after deploying:** open the URL → Launch the Platform → search `पीने के पानी के लिए पाइप` → results appear;
open Portal Integration → "Load demo text" → suggestions appear.

---
## B. Backend API (FastAPI)

### Option 1 — Render (free tier)
1. Push the repo to GitHub (as above).
2. render.com → **New → Web Service** → connect the repo.
3. Settings: **Root Directory** `backend` · **Runtime** Python 3 ·
   **Build** `pip install -r requirements.txt` · **Start** `uvicorn app:app --host 0.0.0.0 --port $PORT`
   (or use the included `render.yaml` via **New → Blueprint**).
4. Add env var `CORS_ORIGINS` = your frontend URL (e.g. `https://manak-match.vercel.app`).
5. Deploy. Check `https://<service>.onrender.com/api/v1/health` and `/docs`.
   *Free instances sleep when idle; the first request can take ~30–60 s. Open `/api/v1/health` a minute before you demo.*

### Option 2 — Docker (Railway, Fly.io, any VPS, college server)
```bash
cd backend
docker build -t manak-api .
docker run -p 8000:8000 manak-api        # http://localhost:8000/docs
```

### Option 3 — Plain server
```bash
cd backend && pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```
Put nginx / Caddy in front for HTTPS.

---
## C. Making the Portal Integration screen call the real API (optional, ~10 lines)
In `frontend/index.html`, inside `renderPortalAssist()`, replace the local search with a call to your deployed API:
```js
const API = "https://YOUR-API.onrender.com";
const r = await fetch(API + "/api/v1/recommend", {
  method: "POST", headers: {"Content-Type": "application/json"},
  body: JSON.stringify({ query: q, top_k: 3 })
});
const { results } = await r.json();   // then render `results` instead of the local ones
```
Make the function `async` and keep the local engine as a fallback if the request fails — this way the demo never breaks
when the free-tier server is asleep.

---
## D. Optional: dense embeddings
```bash
pip install sentence-transformers
EMBEDDINGS=1 uvicorn app:app
```
Blends multilingual sentence-embedding similarity (default model `paraphrase-multilingual-MiniLM-L12-v2`, override with
`EMBED_MODEL`) with TF-IDF. This path downloads a model from Hugging Face on first start and has **not** been exercised in
the automated tests; verify it on your machine before claiming it in the demo.

## E. Troubleshooting
| Symptom | Fix |
|---|---|
| Page looks unchanged after redeploy | Hard refresh (Ctrl+Shift+R) or open in a private window |
| Fonts look plain | Google Fonts blocked offline — cosmetic only |
| API call blocked in browser | Set `CORS_ORIGINS` to your exact frontend URL |
| `ModuleNotFoundError` | Activate the venv and re-run `pip install -r requirements.txt` |
| Render says port not detected | Start command must use `--port $PORT` |
| Voice input does nothing | Speech recognition works in Chrome/Edge over HTTPS or localhost |
