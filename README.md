HireMeAI 🤖
> **An AI-powered portfolio that lets recruiters interact with a candidate's verified resume data through a conversational AI Twin.**
![Live Demo](https://img.shields.io/badge/Live%20Demo-HireMeAI-000000?style=for-the-badge&logo=render)
![Backend API](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Python](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Groq](https://img.shields.io/badge/AI-Groq%20%2B%20Llama%203.3-000000?style=for-the-badge)
✨ Overview
HireMeAI is a cinematic, AI-powered developer portfolio designed to turn a traditional resume into an interactive hiring experience.
Instead of making recruiters search through a static resume, HireMeAI provides an AI Twin that can answer questions about the candidate using information extracted from the verified resume.
The application combines a modern React interface, a FastAPI backend, PDF resume extraction, structured resume parsing, and Groq-powered LLM inference.
🎯 Core idea
Resume → Structured Candidate Profile → AI Twin → Recruiter Conversation
The AI is intentionally grounded in the parsed resume data. It is instructed not to invent information and to acknowledge when the available profile data is insufficient to answer a question.
---
🚀 Live Application
🌐 Frontend
https://hiremeai-frontend-rs38.onrender.com/
⚡ Backend API
https://hiremeai-backend-weol.onrender.com/
📚 API Documentation
https://hiremeai-backend-weol.onrender.com/docs
---
🧠 How It Works
```text
                    ┌──────────────────────┐
                    │     Recruiter / HR   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   HireMeAI Frontend  │
                    │ React + TypeScript   │
                    └──────────┬───────────┘
                               │ HTTP
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
          ┌──────────────────┐   ┌──────────────────┐
          │   DevResume.pdf  │   │   Groq API       │
          │   PDF Extraction │   │ Llama 3.3 70B    │
          └────────┬─────────┘   └────────┬─────────┘
                   │                      │
                   └──────────┬───────────┘
                              ▼
                    ┌──────────────────────┐
                    │ Structured Resume    │
                    │ Profile + AI Answer  │
                    └──────────────────────┘
```
Request flow
A recruiter opens the HireMeAI portfolio.
The frontend sends a question to the `/chat` endpoint.
FastAPI reads the candidate's PDF resume.
The backend extracts text using pypdf.
Groq's Llama 3.3 70B Versatile model converts the resume into a structured profile.
The structured profile is supplied to the AI Twin as its trusted context.
The model generates a professional answer grounded only in that information.
The answer is returned to the React interface.
---
⭐ Key Features
🤖 AI Twin
Conversational AI representative of the candidate
Recruiter-style question answering
Grounded exclusively in parsed resume information
Explicit anti-hallucination instructions
Professional HR-interview response style
📄 Intelligent Resume Parsing
Extracts text directly from the candidate PDF
Uses semantic understanding instead of relying only on section headings
Handles variations such as Experience, Work History, Employment, and Internships
Extracts skills from multiple parts of the resume
Produces structured JSON validated with Pydantic
🎨 Cinematic Portfolio UI
Dark editorial visual language
Liquid-glass inspired interface
Responsive React frontend
Smooth motion and interaction effects
Dedicated sections for About, Skills, Projects, Experience, AI Twin, and Contact
🔐 Grounded AI Design
The backend explicitly instructs the AI to:
Answer only from verified candidate information
Never hallucinate
Return a clear fallback when information is unavailable
Respond professionally as if being interviewed by HR
⚡ Production Deployment
Frontend deployed as a Render Static Site
Backend deployed as a Render Web Service
Environment variables used for secrets
CORS configured for the deployed frontend
FastAPI Swagger documentation available in production
---
🛠️ Tech Stack
Frontend
Technology	Purpose
React	UI development
TypeScript	Type-safe frontend development
Vite	Frontend tooling and production builds
Tailwind CSS	Styling and responsive UI
Framer Motion	Animations and transitions
Lucide React	Interface icons
Backend
Technology	Purpose
Python 3.11+	Backend runtime
FastAPI	REST API framework
Uvicorn	ASGI server
Pydantic	Data validation and schemas
pypdf	PDF text extraction
python-dotenv	Environment configuration
Groq SDK	LLM API integration
AI
Groq API
Llama 3.3 70B Versatile
Structured JSON resume extraction
Grounded conversational generation
---
📁 Project Structure
```text
HireMeAI/
│
├── backend/
│   ├── DevResume.pdf       # Candidate resume used as the source of truth
│   └── main.py             # FastAPI application, parsing and AI logic
│
├── frontend/
│   ├── public/             # Static frontend assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── sections/       # Portfolio sections
│   │   ├── services/       # API client and frontend services
│   │   ├── styles/         # Styling
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Application root
│   │   └── main.tsx        # Frontend entry point
│   ├── package.json
│   └── vite.config.ts
│
├── .env.example
├── .gitignore
├── pyproject.toml
├── README.md
└── uv.lock
```
---
⚙️ Local Setup
Prerequisites
Python 3.11+
Node.js 18+
npm
A Groq API key
1. Clone the repository
```bash
git clone https://github.com/NIKHILDH07/HireMeAI.git
cd HireMeAI
```
2. Configure the backend
Create a `.env` file in the project root:
```env
GROQ_API_KEY=your_groq_api_key_here
```
> Never commit your real API key to GitHub.
3. Install Python dependencies
Using `uv`:
```bash
uv sync
```
Or using pip:
```bash
pip install -e .
```
4. Start the FastAPI backend
From the project root:
```bash
uv run uvicorn backend.main:app --reload --port 8000
```
The API will be available at:
```text
http://localhost:8000
```
Swagger documentation:
```text
http://localhost:8000/docs
```
5. Start the frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will normally run at:
```text
http://localhost:5173
```
---
🔑 Environment Variables
Variable	Required	Description
`GROQ_API_KEY`	Yes	API key used to access the Groq LLM
For the deployed application, the secret is configured through the hosting platform rather than committed to the repository.
---
🔌 API Endpoints
`GET /`
Loads and parses the configured resume and confirms that resume processing is available.
`POST /chat`
Accepts a recruiter question and returns an AI-generated answer grounded in the parsed resume.
Example request:
```json
{
  "question": "What are the candidate's strongest technical skills?"
}
```
Example response:
```json
{
  "answer": "..."
}
```
Interactive API documentation is available at `/docs` on the deployed backend.
---
🧩 Design Principles
1. Resume as the source of truth
The AI Twin does not operate as a general-purpose chatbot. Candidate-specific answers are grounded in the structured information extracted from the resume.
2. Structured data before generation
The resume is first transformed into a validated Pydantic model containing fields such as:
Name
Email
Phone
Skills
Experience
Education
Projects
Certifications
This structured representation is then provided to the conversational model.
3. Fail safely
If the AI does not have enough information to answer a question, the system is designed to state that rather than fabricate a response.
4. Recruiter-first experience
The interface is designed around the way recruiters evaluate candidates: quickly understanding skills, experience, projects, education, and technical strengths without navigating a conventional static resume.
---
📌 Why HireMeAI?
Traditional portfolios show recruiters what a candidate built.
HireMeAI also lets recruiters ask about the candidate.
It turns a static portfolio into an interactive hiring interface where the candidate's verified profile becomes a conversational knowledge base.
---
🔮 Future Improvements
Streaming AI responses
Conversation history and session memory
Recruiter-specific question suggestions
Resume version management
Multi-resume support
More granular source citations for AI answers
Analytics for recruiter interactions
Automated project and GitHub profile synchronization
Improved accessibility and keyboard navigation
---
🔒 Security Notes
API keys are stored in environment variables.
Secrets should never be committed to the repository.
Candidate information supplied to the AI is restricted to the parsed profile context.
Production CORS is configured to allow the deployed frontend to communicate with the backend.
---
👨‍💻 Author
Nikhil D H
HireMeAI was built as an AI-powered portfolio project combining full-stack development, LLM integration, resume intelligence, and modern frontend engineering.
---
📄 License
This project is currently provided for portfolio and educational purposes.
---
⭐ If you found HireMeAI interesting, consider giving the repository a star!