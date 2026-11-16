import urllib.request
import json
import ssl
import hashlib
from pypdf import PdfReader
import io
import re

ctx = ssl.create_default_context()

print("=" * 70)
print("HIREMEAI LIVE PRODUCTION VERIFICATION SUITE")
print("=" * 70)

# 1. VERIFY FRONTEND
frontend_url = "https://hiremeai-frontend-rs38.onrender.com/"
print(f"\n[1] Testing Live Frontend: {frontend_url}")
req = urllib.request.Request(frontend_url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
    assert resp.status == 200, f"Frontend returned status {resp.status}"
    html = resp.read().decode("utf-8")
    print(f"  ✓ Frontend index.html returned HTTP 200 ({len(html)} bytes)")

js_match = re.search(r'src="(/assets/[^"]+\.js)"', html)
assert js_match, "Could not find JS asset in HTML"
js_url = frontend_url.rstrip("/") + js_match.group(1)
print(f"  ✓ Found deployed JS asset: {js_match.group(1)}")

with urllib.request.urlopen(urllib.request.Request(js_url, headers={"User-Agent": "Mozilla/5.0"}), timeout=15, context=ctx) as js_resp:
    js_content = js_resp.read().decode("utf-8")
    print(f"  ✓ Deployed JS bundle size: {len(js_content)} bytes")
    assert "Nikhil_Hoskatta_Resume.pdf" in js_content, "Resume filename missing from live bundle"
    print("  ✓ Resume filename 'Nikhil_Hoskatta_Resume.pdf' confirmed in bundle")
    assert "Protein Structure Prediction" in js_content, "New project missing from live bundle"
    print("  ✓ Project 'Protein Structure Prediction & Disease Mutation Analysis' confirmed in bundle")
    assert "Memory Decay Simulator" not in js_content, "Stale Memory Decay Simulator still present in live bundle!"
    print("  ✓ Stale project 'Memory Decay Simulator' successfully purged from live bundle")

# 2. VERIFY RESUME DOWNLOAD
resume_url = "https://hiremeai-frontend-rs38.onrender.com/Nikhil_Hoskatta_Resume.pdf"
print(f"\n[2] Testing Live Resume Download: {resume_url}")
with urllib.request.urlopen(urllib.request.Request(resume_url, headers={"User-Agent": "Mozilla/5.0"}), timeout=15, context=ctx) as resp:
    assert resp.status == 200, f"Resume download returned status {resp.status}"
    pdf_bytes = resp.read()
    live_sha256 = hashlib.sha256(pdf_bytes).hexdigest()
    expected_sha256 = "6ec07e17f6b652f251a75e62991726ddb4a399a3e58057a6cbf249542ec682c2"
    print(f"  ✓ Live PDF download status: 200 OK ({len(pdf_bytes)} bytes)")
    print(f"  ✓ Live PDF SHA-256: {live_sha256}")
    assert live_sha256 == expected_sha256, f"SHA-256 mismatch! Got {live_sha256}, expected {expected_sha256}"
    print("  ✓ Downloaded resume EXACTLY matches backend updated resume SHA-256!")

    # Verify extracted text from live PDF
    reader = PdfReader(io.BytesIO(pdf_bytes))
    full_text = "".join(p.extract_text() or "" for p in reader.pages)
    assert "NIKHIL HOSKATTA" in full_text
    assert "Protein Structure Prediction & Disease Mutation Analysis" in full_text
    assert "ESMFold" in full_text and "ESM-2" in full_text
    assert "ClinVar API" in full_text
    assert "Resume Parser" in full_text
    assert "AMC Engineering College" in full_text
    assert "7.9/10" in full_text
    print("  ✓ Live PDF content verified: all updated sections, projects, and metrics present")

# 3. VERIFY BACKEND HEALTH AND /resume ENDPOINTS
backend_url = "https://hiremeai-backend-weol.onrender.com"
print(f"\n[3] Testing Live Backend Service: {backend_url}")
with urllib.request.urlopen(urllib.request.Request(f"{backend_url}/", headers={"User-Agent": "Mozilla/5.0"}), timeout=15, context=ctx) as resp:
    data = json.loads(resp.read().decode("utf-8"))
    assert resp.status == 200
    assert data.get("message") == "resume parsed"
    print("  ✓ Backend GET / returned 200 OK: {'message': 'resume parsed'}")

with urllib.request.urlopen(urllib.request.Request(f"{backend_url}/resume", headers={"User-Agent": "Mozilla/5.0"}), timeout=15, context=ctx) as resp:
    backend_pdf = resp.read()
    b_hash = hashlib.sha256(backend_pdf).hexdigest()
    assert b_hash == expected_sha256
    print(f"  ✓ Backend GET /resume returned 200 OK: matches exact SHA-256 ({b_hash[:12]}...)")

# 4. VERIFY AI TWIN CHAT AND STREAMING
print(f"\n[4] Testing Live AI Twin Endpoint: {backend_url}/chat")

def ask_live_ai(question):
    req = urllib.request.Request(
        f"{backend_url}/chat",
        data=json.dumps({"question": question}).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        assert resp.status == 200
        assert "text/plain" in resp.headers.get("content-type", "")
        chunks = []
        while True:
            chunk = resp.read(512)
            if not chunk:
                break
            chunks.append(chunk.decode("utf-8", errors="ignore"))
        return "".join(chunks)

# Test 4a: Technical Skills
q1 = "What are your primary technical skills?"
a1 = ask_live_ai(q1)
print(f"  ✓ Q: {q1}")
print(f"    Sample Answer: {a1[:120].strip()}...")
assert "python" in a1.lower()
assert "fastapi" in a1.lower()

# Test 4b: Projects
q2 = "What projects have you developed?"
a2 = ask_live_ai(q2)
print(f"  ✓ Q: {q2}")
print(f"    Sample Answer: {a2[:120].strip()}...")
assert "protein structure prediction" in a2.lower()
assert "resume parser" in a2.lower()
assert "memory decay simulator" not in a2.lower()

# Test 4c: Anti-Hallucination on stale data
q3 = "Tell me about the Memory Decay Simulator project."
a3 = ask_live_ai(q3)
print(f"  ✓ Q: {q3}")
print(f"    Answer: {a3.strip()}")
assert "don't have enough information" in a3.lower() or "not enough information" in a3.lower()

# Test 4d: Education
q4 = "What is your education and GPA?"
a4 = ask_live_ai(q4)
print(f"  ✓ Q: {q4}")
print(f"    Answer: {a4.strip()}")
assert "amc engineering college" in a4.lower()
assert "7.9" in a4.lower()

# Test 4e: Certifications
q5 = "What certifications do you hold?"
a5 = ask_live_ai(q5)
print(f"  ✓ Q: {q5}")
print(f"    Sample Answer: {a5[:120].strip()}...")
assert "oracle" in a5.lower()
assert "aws academy" in a5.lower() or "aws" in a5.lower()

print("\n" + "=" * 70)
print("ALL LIVE PRODUCTION VERIFICATIONS PASSED WITH 100% SUCCESS!")
print("=" * 70)
