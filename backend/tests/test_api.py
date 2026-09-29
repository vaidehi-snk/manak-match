import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent.parent))
from fastapi.testclient import TestClient
from app import app

c = TestClient(app)
EVAL = json.load(open(pathlib.Path(__file__).parent.parent.parent / "eval" / "queries.json", encoding="utf-8"))

def rec(q, **kw):
    r = c.post("/api/v1/recommend", json={"query": q, **kw}); assert r.status_code == 200, r.text
    return r.json()

def test_health_and_meta():
    assert c.get("/api/v1/health").json()["standards_indexed"] >= 90
    m = c.get("/api/v1/meta").json()
    assert m["mandatory_certification"] > 0 and "Pipes & Fittings" in m["categories"]

def test_regression_set_top1():
    bad = [it["q"] for it in EVAL if rec(it["q"])["results"][0]["standard"] not in it["expect"]]
    assert not bad, bad

def test_hindi_marathi():
    assert rec("पीने के पानी के लिए पाइप")["language_detected"].startswith("devanagari")
    assert rec("सीमेंट")["results"][0]["standard"] == "IS 269:2015"

def test_certification_schemes():
    assert "Hallmarking" in rec("gold jewellery hallmarking")["results"][0]["certification"]["scheme"]
    assert "CRS" in rec("LED bulbs for classrooms")["results"][0]["certification"]["scheme"]
    assert rec("43 grade cement")["results"][0]["certification"]["mandatory"] is True

def test_allied_groups_and_gaps():
    r = rec("43 grade cement")
    assert r["results"][0]["allied_standards"]
    assert isinstance(r["also_consider"], list)

def test_superseded_hidden_then_shown():
    assert "IS 8112:2013" not in [x["standard"] for x in rec("43 grade ordinary portland cement")["results"]]
    assert "IS 8112:2013" in [x["standard"] for x in rec("43 grade ordinary portland cement", include_superseded=True, top_k=8)["results"]]

def test_audit_flags_superseded():
    a = c.post("/api/v1/audit", json={"text": "Cement shall conform to IS 8112:2013 and steel to IS 1786:2008."}).json()
    assert a["citations_found"] == 2 and a["critical_issues"] == 1
    assert any(i["level"] == "critical" for f in a["findings"] for i in f["issues"])

def test_bulk():
    b = c.post("/api/v1/recommend/bulk", json={"items": ["PVC pipes for drinking water", "safety helmets", "zzzz qqqq"]}).json()
    assert b["items"] == 3 and b["rows"][2]["match"] is None and b["rows"][2]["needs_review"]

def test_library_filters_and_lookup():
    j = c.get("/api/v1/standards", params={"category": "Pipes & Fittings", "limit": 5}).json()
    assert j["total"] >= 2 and len(j["items"]) <= 5
    assert c.get("/api/v1/standards/IS 4985:2021").status_code == 200
    assert c.get("/api/v1/standards/IS 999999").status_code == 404

def test_validation():
    assert c.post("/api/v1/recommend", json={"query": "x"}).status_code == 422
