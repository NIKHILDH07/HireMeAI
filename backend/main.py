from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware

from pathlib import Path
from pypdf import PdfReader
from docx import Document
import json

import os
import time
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field


load_dotenv()
load_dotenv(Path(__file__).parent / ".env")
load_dotenv(Path(__file__).parent.parent / ".env")

my_api_key = os.getenv("GROQ_API_KEY")

if not my_api_key:
    # Allow server to start even if GROQ_API_KEY is not set yet in dev environment
    print("[WARNING] GROQ_API_KEY is not set in environment or .env file.")
    client = None
else:
    client = Groq(api_key=my_api_key)

model = "openai/gpt-oss-120b"



app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://hiremeai-frontend-rs38.onrender.com"    
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_resume_path() -> Path:
    candidates = [
        Path(__file__).parent / "Nikhil_Hoskatta_Resume.pdf",
        Path(__file__).parent / "Nikhil_Hoskatta.Resume (1).pdf",
        Path("backend/Nikhil_Hoskatta_Resume.pdf"),
        Path("backend/Nikhil_Hoskatta.Resume (1).pdf"),
        Path("Nikhil_Hoskatta_Resume.pdf"),
        Path("Nikhil_Hoskatta.Resume (1).pdf"),
        Path(__file__).parent / "DevResume.pdf",
        Path("DevResume.pdf"),
    ]
    for p in candidates:
        if p.exists() and p.is_file():
            return p.resolve()
    # Check directory for any matching pdf
    for pattern in ["*Resume*.pdf", "*.pdf"]:
        matches = list(Path(__file__).parent.glob(pattern))
        if matches:
            return matches[0].resolve()
    return (Path(__file__).parent / "Nikhil_Hoskatta_Resume.pdf").resolve()

RESUME_PATH = get_resume_path()


#parse resume
class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class Project(BaseModel):
    name: str | None = None
    technologies: list[str] = []
    description: str | None = None
    highlights: list[str] = []

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[Project | str] = []
    certifications: list[str] = []

resume_schema = Resume.model_json_schema()

class ChatRequest(BaseModel):
    question:str

def ask_candidate(question: str, resume: Resume):
    if not client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend server.")

    system_prompt = f"""
You are an AI assistant representing a job candidate.

Below is everything you know about the candidate.

{resume.model_dump_json(indent=2)}

Rules:

1. Answer only using this information.

2. Never hallucinate.

3. If information is unavailable,
say

"I don't have enough information to answer that."

4. Be professional.

5. Answer as if HR is interviewing this candidate.
"""

    response = client.chat.completions.create(

        model=model,

        messages=[

            {
                "role":"system",
                "content":system_prompt
            },

            {
                "role":"user",
                "content":question
            }

        ]

    )

    return response.choices[0].message.content

def ask_candidate_stream(question: str, resume: Resume):
    if not client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend server.")

    system_prompt = f"""
You are an AI assistant representing a job candidate.

Below is everything you know about the candidate.

{resume.model_dump_json(indent=2)}

Rules:

1. Answer only using this information.

2. Never hallucinate.

3. If information is unavailable,
say

"I don't have enough information to answer that."

4. Be professional.

5. Answer as if HR is interviewing this candidate.
"""

    stream = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": question
            }
        ],
        stream=True
    )

    for chunk in stream:
        delta = chunk.choices[0].delta.content or ""
        if delta:
            yield delta


def parse_resume(resume_text):
    if not client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend server.")

    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    6. For projects, extract the project name, technologies used, overview description, and all key highlights/metrics.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume

#pdf extraction
def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

_cached_resume: Resume | None = None
_cached_file_path: Path | None = None
_cached_file_mtime: float | None = None

def get_parsed_resume() -> Resume:
    global _cached_resume, _cached_file_path, _cached_file_mtime
    current_path = get_resume_path()
    current_mtime = current_path.stat().st_mtime if current_path.exists() else None

    if _cached_resume is None or _cached_file_path != current_path or _cached_file_mtime != current_mtime:
        if not current_path.exists():
            raise HTTPException(status_code=500, detail=f"Resume file not found at {current_path}")
        resume_text = read_pdf(current_path)
        _cached_resume = parse_resume(resume_text)
        _cached_file_path = current_path
        _cached_file_mtime = current_mtime
    return _cached_resume

@app.get("/")
def home():
    resume = get_parsed_resume()
    print(resume.model_dump_json(indent=2))
    return {
        "message": "resume parsed"
    }

@app.get("/resume")
def download_resume():
    current_path = get_resume_path()
    if not current_path.exists():
        raise HTTPException(status_code=404, detail="Resume file not found")
    return FileResponse(
        path=current_path,
        filename="Nikhil_Hoskatta_Resume.pdf",
        media_type="application/pdf"
    )

@app.post("/chat")
def chat(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured on the backend server.")
    resume = get_parsed_resume()
    return StreamingResponse(
        ask_candidate_stream(request.question, resume),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )



