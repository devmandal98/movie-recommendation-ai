from fastapi import FastAPI
from dotenv import load_dotenv
load_dotenv()
from backend.app.database import Base, engine
from backend.models.user import User
from backend.app.routes.auth import router as auth_router
from backend.models.recommendation import Recommendation
from backend.app.routes.recommend import router as recommend_router




app = FastAPI(title="Movie Recommendation API")

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(recommend_router)

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
