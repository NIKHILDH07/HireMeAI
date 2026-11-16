import pytest
from pathlib import Path
from fastapi.testclient import TestClient
import sys

# Ensure project root is in sys.path
root_dir = Path(__file__).parent.parent
sys.path.insert(0, str(root_dir))
sys.path.insert(0, str(root_dir / "backend"))

from backend.main import app, get_resume_path, read_pdf, get_parsed_resume

client = TestClient(app)

def test_resume_path_resolution():
    resume_path = get_resume_path()
    assert resume_path.exists(), f"Resume path does not exist: {resume_path}"
    assert resume_path.is_file(), f"Resume path is not a file: {resume_path}"
    assert "Nikhil_Hoskatta" in resume_path.name or resume_path.name == "DevResume.pdf"

def test_pdf_extraction():
    resume_path = get_resume_path()
    text = read_pdf(resume_path)
    assert len(text) > 500, "Extracted PDF text is too short"
    assert "NIKHIL HOSKATTA" in text
    assert "Protein Structure Prediction" in text
    assert "Resume Parser" in text
    assert "AMC Engineering College" in text
    assert "Oracle Cloud Infrastructure" in text
    # Verify stale project is NOT in the updated PDF
    assert "Memory Decay Simulator" not in text

def test_get_resume_endpoint():
    response = client.get("/resume")
    assert response.status_code == 200
    assert response.headers.get("content-type") == "application/pdf"
    assert len(response.content) > 10000

def test_home_endpoint():
    # If GROQ_API_KEY is available, GET / should return {"message": "resume parsed"}
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "resume parsed"}

def test_chat_endpoint_streaming():
    response = client.post("/chat", json={"question": "What is your name?"})
    assert response.status_code == 200
    assert "text/plain" in response.headers.get("content-type", "")
    content = response.text
    assert len(content) > 0
    assert "Nikhil" in content
