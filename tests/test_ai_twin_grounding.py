import pytest
from pathlib import Path
import sys

root_dir = Path(__file__).parent.parent
sys.path.insert(0, str(root_dir))
sys.path.insert(0, str(root_dir / "backend"))

from backend.main import get_parsed_resume, ask_candidate_stream

def get_answer(question: str) -> str:
    resume = get_parsed_resume()
    return "".join(list(ask_candidate_stream(question, resume)))

def test_ai_twin_technical_skills():
    ans = get_answer("What are your technical skills?")
    ans_lower = ans.lower()
    assert "python" in ans_lower
    assert "fastapi" in ans_lower
    assert "react" in ans_lower
    assert any(term in ans_lower for term in ["docker", "pytorch", "hugging face"])

def test_ai_twin_projects():
    ans = get_answer("What projects have you worked on?")
    ans_lower = ans.lower()
    assert "protein structure prediction" in ans_lower
    assert "resume parser" in ans_lower
    # Ensure Memory Decay Simulator is not claimed as a project
    assert "memory decay simulator" not in ans_lower

def test_ai_twin_stale_memory_decay_simulator():
    ans = get_answer("Tell me about the Memory Decay Simulator project.")
    ans_lower = ans.lower()
    assert "don't have enough information" in ans_lower or "not enough information" in ans_lower

def test_ai_twin_education():
    ans = get_answer("Where did you study and what is your GPA?")
    ans_lower = ans.lower()
    assert "amc engineering college" in ans_lower
    assert "7.9" in ans_lower

def test_ai_twin_certifications():
    ans = get_answer("What certifications do you have?")
    ans_lower = ans.lower()
    assert "oracle" in ans_lower
    assert "aws academy" in ans_lower or "aws" in ans_lower
    assert "power bi" in ans_lower or "microsoft elevate" in ans_lower

def test_frontend_dist_download_links():
    dist_html = root_dir / "frontend" / "dist" / "index.html"
    assert dist_html.exists(), "frontend/dist/index.html missing"
    # Find built asset JS files
    assets_dir = root_dir / "frontend" / "dist" / "assets"
    js_files = list(assets_dir.glob("*.js"))
    assert len(js_files) > 0, "No JS files found in frontend/dist/assets"
    
    js_content = "".join(f.read_text(encoding="utf-8") for f in js_files)
    assert "Nikhil_Hoskatta_Resume.pdf" in js_content, "Resume filename missing from built bundle"
    # Verify the download attribute is present in bundle
    assert 'download:"Nikhil_Hoskatta_Resume.pdf"' in js_content or 'download="Nikhil_Hoskatta_Resume.pdf"' in js_content
