🎬 AI Movie Recommendation Web App

A full-stack AI-powered movie recommendation platform that suggests movies based on user preferences.
Built with FastAPI, React, Gemini AI, JWT Authentication, and SQLite.

🚀 Features
🔐 Authentication

User registration & login

Secure JWT-based authentication

Protected routes (recommendations & history)

🤖 AI Movie Recommendations

Powered by Google Gemini AI

Generates 3–5 relevant movie suggestions

Structured JSON output

Retry & fallback handling for AI overload (503 errors)

🧠 Persistent User History

Saves user inputs & recommendations

History is user-specific

Fetch past searches on login

Clear search history option

🎨 Modern Frontend

Animated landing page (login/register)

Interactive dashboard

Smooth UI with Tailwind CSS

Responsive design

🏗️ Tech Stack
Frontend

React (Vite + TypeScript)

Tailwind CSS

Axios

JWT token handling (localStorage)

Backend

FastAPI

SQLite (lightweight database)

SQLAlchemy ORM

JWT (python-jose)

Gemini AI (google.genai SDK)

📁 Project Structure
movie-recommendation-app/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   └── recommend.py
│   │   ├── services/
│   │   │   └── gemini.py
│   │   ├── auth/
│   │   │   ├── jwt.py
│   │   │   └── security.py
│   │   ├── database.py
│   │   └── main.py
│   ├── models/
│   │   ├── user.py
│   │   └── recommendation.py
│   └── app.db (ignored)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── requirements.txt
├── .gitignore
└── README.md

⚙️ Setup Instructions (Local)
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/movie-recommendation-app.git
cd movie-recommendation-app

2️⃣ Backend Setup
Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

Install dependencies
pip install -r requirements.txt

Create .env file
SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Run backend
uvicorn backend.app.main:app --reload


Backend runs at:

http://127.0.0.1:8000


Swagger Docs:

http://127.0.0.1:8000/docs

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173