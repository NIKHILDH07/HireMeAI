<<<<<<< Updated upstream
# HireMeAI 🤖

> **An AI-powered portfolio that transforms a traditional resume into an interactive hiring experience through a conversational AI Twin.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-HireMeAI-000000?style=for-the-badge\&logo=render)](https://hiremeai-frontend-rs38.onrender.com/)
[![Backend API](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge\&logo=fastapi)](https://hiremeai-backend-weol.onrender.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)](https://react.dev/)
[![Python](https://img.shields.io/badge/Backend-Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)](https://www.python.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20%2B%20Llama%203.3-000000?style=for-the-badge)](https://groq.com/)

---

## 🌟 Overview

**HireMeAI** is a cinematic, AI-powered developer portfolio designed to make the hiring process more interactive.

Instead of requiring recruiters to browse through a traditional resume, HireMeAI provides an **AI Twin** that can answer questions about the candidate's:

* 💼 Experience
* 🛠️ Technical skills
* 🚀 Projects
* 🎓 Education
* 🏆 Certifications
* 📚 Professional background

The AI Twin is grounded in information extracted from the candidate's **verified resume**, helping ensure that responses remain relevant, professional, and candidate-specific.

### 💡 Core Concept

```text
Resume
   ↓
PDF Text Extraction
   ↓
Structured Candidate Profile
   ↓
AI Twin
   ↓
Recruiter Conversation
```

HireMeAI combines **React, TypeScript, FastAPI, Python, PDF parsing, Pydantic validation, Groq, and Llama 3.3 70B** into a single recruiter-focused platform.

---

## 🚀 Live Demo

### 🌐 Frontend

**HireMeAI Portfolio:**
https://hiremeai-frontend-rs38.onrender.com/

### ⚡ Backend API

**FastAPI Backend:**
https://hiremeai-backend-weol.onrender.com/

### 📚 API Documentation

**Interactive Swagger Docs:**
https://hiremeai-backend-weol.onrender.com/docs

---

## 🎯 Why HireMeAI?

Traditional portfolios are mostly **one-way experiences**.

A recruiter visits → reads information → searches for answers → decides whether to continue.

HireMeAI changes that interaction:

```text
Traditional Portfolio
Recruiter → Browse → Read → Search → Evaluate

HireMeAI
Recruiter → Ask → AI Twin → Get Answer → Evaluate
```

The recruiter can ask questions such as:

> "What are the candidate's strongest technical skills?"

> "Tell me about the candidate's most important project."

> "Does the candidate have experience with FastAPI?"

> "What AI/ML technologies has the candidate worked with?"

The AI Twin responds using the structured candidate profile generated from the resume.

---

# 🧠 How It Works

```text
                         ┌─────────────────────┐
                         │    Recruiter / HR   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   HireMeAI Frontend │
                         │   React + TypeScript│
                         └──────────┬──────────┘
                                    │
                                  HTTP
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         │       Python        │
                         └──────────┬──────────┘
                                    │
                     ┌──────────────┴──────────────┐
                     │                             │
                     ▼                             ▼
          ┌───────────────────┐         ┌───────────────────┐
          │   DevResume.pdf   │         │     Groq API      │
          │                   │         │                   │
          │  PDF Extraction   │         │ Llama 3.3 70B     │
          └─────────┬─────────┘         └─────────┬─────────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   ▼
                         ┌─────────────────────┐
                         │ Structured Resume   │
                         │ Profile + AI Answer │
                         └─────────────────────┘
```

### 🔄 Request Flow

1. 👤 A recruiter opens the HireMeAI portfolio.
2. 💬 The recruiter asks a question through the AI Twin.
3. ⚛️ The React frontend sends the request to the FastAPI `/chat` endpoint.
4. 📄 The backend loads the candidate's PDF resume.
5. 🔍 `pypdf` extracts the resume text.
6. 🧠 Groq's Llama 3.3 70B model converts the resume into a structured candidate profile.
7. ✅ Pydantic validates the structured data.
8. 🔐 The structured profile is supplied to the AI Twin as trusted context.
9. 🤖 The AI generates a professional response based on the available candidate information.
10. ⚡ The answer is returned to the React interface.

---

# ⭐ Key Features

## 🤖 AI Twin

* Conversational AI representation of the candidate
* Recruiter-focused question answering
* Professional HR-style responses
* Candidate-specific contextual responses
* Grounded generation using structured resume data
* Explicit anti-hallucination instructions
* Safe fallback when information is unavailable

---

## 📄 Intelligent Resume Parsing

HireMeAI automatically processes the candidate's resume instead of relying on manually hardcoded portfolio information.

The system can identify information such as:

* 👤 Name
* 📧 Contact information
* 🛠️ Skills
* 💼 Experience
* 🎓 Education
* 🚀 Projects
* 🏆 Certifications
* 📚 Internships

The resume is transformed into a structured Pydantic model before being used by the conversational AI.

---

## 🔐 Grounded AI Architecture

The AI Twin is intentionally **not a general-purpose chatbot**.

The backend instructs the model to:

* ✅ Answer using available candidate information
* ❌ Avoid inventing experience or skills
* ❌ Avoid fabricating projects or achievements
* 🛑 Clearly state when information is unavailable
* 💼 Maintain a professional recruiter-friendly tone

This creates a more trustworthy AI portfolio experience.

---

## 🎨 Cinematic Portfolio UI

HireMeAI uses a modern editorial interface designed to feel more like an interactive product than a traditional resume website.

### UI Highlights

* 🌑 Dark cinematic visual language
* 🪟 Glassmorphism-inspired components
* ✨ Smooth animations
* 🎞️ Motion-driven interactions
* 📱 Responsive design
* 🧭 Recruiter-friendly navigation
* 💬 Interactive AI Twin
* 🧩 Modular React architecture

### Main Sections

```text
Home
 ├── About
 ├── Skills
 ├── Experience
 ├── Projects
 ├── AI Twin
 └── Contact
```

---

# 🛠️ Tech Stack

## 🎨 Frontend

| Technology       | Purpose                           |
| ---------------- | --------------------------------- |
| ⚛️ React         | UI development                    |
| 🔷 TypeScript    | Type-safe application development |
| ⚡ Vite           | Frontend tooling and build system |
| 🎨 Tailwind CSS  | Styling and responsive design     |
| 🎬 Framer Motion | Animations and transitions        |
| 🧩 Lucide React  | Interface icons                   |

---

## ⚙️ Backend

| Technology       | Purpose                     |
| ---------------- | --------------------------- |
| 🐍 Python 3.11+  | Backend runtime             |
| ⚡ FastAPI        | REST API framework          |
| 🚀 Uvicorn       | ASGI server                 |
| 🧩 Pydantic      | Data validation and schemas |
| 📄 pypdf         | PDF text extraction         |
| 🔐 python-dotenv | Environment configuration   |
| 🤖 Groq SDK      | LLM API integration         |

---

## 🧠 AI

| Technology                 | Purpose                                            |
| -------------------------- | -------------------------------------------------- |
| 🧠 Groq API                | LLM inference                                      |
| 🤖 Llama 3.3 70B Versatile | Resume understanding and conversational generation |
| 📦 Structured JSON         | Candidate profile generation                       |
| 🔐 Grounded prompting      | Candidate-specific responses                       |

---

# 📁 Project Structure

```text
HireMeAI/
│
├── backend/
│   ├── DevResume.pdf
│   └── main.py
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
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

# ⚙️ Local Development

## 📋 Prerequisites

Make sure the following are installed:

* Python 3.11+
* Node.js 18+
* npm
* Git
* A Groq API key

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/NIKHILDH07/HireMeAI.git
cd HireMeAI
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ **Never commit your real API key to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## 3️⃣ Install Backend Dependencies

### Using `uv`

```bash
uv sync
```

### Or using `pip`

```bash
pip install -e .
```

---

## 4️⃣ Start the FastAPI Backend

From the project root:

```bash
uv run uvicorn backend.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

## 5️⃣ Start the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The Vite development server will normally be available at:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

| Variable       | Required | Description                         |
| -------------- | -------- | ----------------------------------- |
| `GROQ_API_KEY` | ✅ Yes    | API key used to access the Groq LLM |

For production deployment, the API key should be configured through the hosting platform's environment variable settings.

---

# 🔌 API

HireMeAI exposes a simple REST API through FastAPI.

## `GET /`

Checks that the backend is running and that resume processing is available.

---

## `POST /chat`

Accepts a recruiter question and returns an AI-generated response.

### Request

```json
{
  "question": "What are the candidate's strongest technical skills?"
}
```

### Response

```json
{
  "answer": "..."
}
```

### Interactive Documentation

FastAPI automatically provides interactive documentation at:

```text
/docs
```

---

# 🧩 Design Principles

## 1. 📄 Resume as the Source of Truth

The candidate's resume acts as the primary knowledge source for the AI Twin.

The system is designed to keep candidate-specific answers grounded in verified resume information.

---

## 2. 🧠 Structured Data Before Generation

The resume is first converted into structured information containing fields such as:

```text
Name
Email
Phone
Skills
Experience
Education
Projects
Certifications
```

The structured profile is then provided to the conversational model.

This separates:

```text
Unstructured Resume
        ↓
Structured Candidate Data
        ↓
AI Generation
```

---

## 3. 🛡️ Fail Safely

If the required information is not available, the AI Twin should acknowledge the limitation rather than invent an answer.

This is especially important for recruiter-facing applications where inaccurate candidate information could be misleading.

---

## 4. 👔 Recruiter-First Experience

HireMeAI is designed around the questions recruiters typically ask when evaluating candidates.

Instead of forcing recruiters to navigate multiple sections, the AI Twin allows them to directly ask for the information they need.

---

# 🚀 Deployment

HireMeAI is designed for production deployment using separate frontend and backend services.

### Frontend

Deployed as a **Render Static Site**.

### Backend

Deployed as a **Render Web Service**.

### Production Architecture

```text
                    Internet
                       │
                       ▼
             ┌──────────────────┐
             │  Recruiter / HR  │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │ React Frontend   │
             │     Render       │
             └────────┬─────────┘
                      │ HTTPS
                      ▼
             ┌──────────────────┐
             │ FastAPI Backend  │
             │     Render       │
             └────────┬─────────┘
                      │
               ┌──────┴──────┐
               ▼             ▼
        ┌────────────┐  ┌────────────┐
        │ Resume PDF │  │  Groq API  │
        └────────────┘  └────────────┘
```

Production secrets are configured through environment variables rather than committed to the repository.

---

# 🔒 Security

HireMeAI follows several basic security practices:

* 🔐 API keys are stored in environment variables.
* 🚫 Secrets are not committed to GitHub.
* 🛡️ Candidate-specific responses are grounded in parsed resume information.
* 🌐 Production CORS is configured for frontend-backend communication.
* 📄 Resume data is processed through the backend rather than exposed as a frontend secret.
* ⚠️ Sensitive configuration should always be managed through deployment environment variables.

---

# 🔮 Future Improvements

The architecture can be extended with:

* ⚡ Streaming AI responses
* 💬 Conversation history
* 🧠 Session-based memory
* 🎯 Recruiter-specific question suggestions
* 📄 Resume version management
* 📚 Multi-resume support
* 🔎 Source citations for AI responses
* 📊 Recruiter interaction analytics
* 🐙 Automated GitHub profile synchronization
* 🔄 Automatic project synchronization
* ♿ Improved accessibility
* ⌨️ Enhanced keyboard navigation
* 🔐 More granular AI grounding and validation

---

# 📊 Project Highlights

HireMeAI demonstrates practical implementation of:

```text
Full-Stack Development
        +
AI / LLM Integration
        +
Resume Intelligence
        +
Natural Language Interaction
        +
REST API Development
        +
Modern UI Engineering
        +
Cloud Deployment
```

It brings these technologies together into a single real-world application designed around a practical problem:

> **How can a portfolio communicate a candidate's capabilities more effectively to recruiters?**

---

# 💼 Use Case

### 👨‍💼 Recruiter

A recruiter discovers the portfolio and wants to quickly understand the candidate's background.

Instead of downloading and manually reading the resume, they can ask:

```text
"What technologies does the candidate know?"
```

```text
"Tell me about their AI/ML projects."
```

```text
"What experience do they have with React?"
```

```text
"What is their educational background?"
```

The AI Twin provides a concise answer based on the candidate profile.

---

# 🌟 What Makes HireMeAI Different?

| Traditional Portfolio            | HireMeAI                          |
| -------------------------------- | --------------------------------- |
| 📄 Static resume                 | 🤖 Conversational AI Twin         |
| 🔎 Manual information search     | 💬 Ask questions directly         |
| 🧑‍💻 Candidate-written sections | 📄 Resume-grounded profile        |
| 📚 Recruiter reads everything    | ⚡ Recruiter gets targeted answers |
| 🖥️ Static presentation          | 🎬 Interactive experience         |
| ❓ Limited interaction            | 🧠 Conversational exploration     |

---

# 👨‍💻 Author

## Nikhil D H

**HireMeAI** was developed as an AI-powered portfolio project combining:

* 🤖 Artificial Intelligence
* 🧠 Large Language Models
* ⚛️ React Development
* 🐍 Python & FastAPI
* 📄 Resume Intelligence
* 🎨 Modern UI Engineering
* ☁️ Cloud Deployment

The goal is to create a more interactive and recruiter-friendly way of presenting a developer's professional profile.

---

# 📄 License

This project is currently provided for **portfolio and educational purposes**.

---

# ⭐ Support

If you found **HireMeAI** interesting or useful, consider giving the repository a ⭐ **Star** on GitHub.

Your support is appreciated! 🚀

---

<p align="center">
  Built with ❤️ using React, FastAPI, Groq, and Llama 3.3
</p>
=======
>>>>>>> Stashed changes
