from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database
from backend.app.database import Base, engine

# Models (important for table creation)
from backend.models.user import User
from backend.models.recommendation import Recommendation

# Routers
from backend.app.routes.auth import router as auth_router
from backend.app.routes.recommend import router as recommend_router

app = FastAPI(title="Movie Recommendation API")

# ✅ CORS CONFIGURATION (REQUIRED FOR FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(auth_router)
app.include_router(recommend_router)

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
