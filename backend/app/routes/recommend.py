from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.database import SessionLocal
from backend.models.recommendation import Recommendation
from backend.app.services.gemini import get_movie_recommendations
import json

router = APIRouter(prefix="/recommend", tags=["Recommendations"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def recommend_movies(user_input: str, db: Session = Depends(get_db)):
    if not user_input.strip():
        raise HTTPException(status_code=400, detail="Input cannot be empty")

    movies = get_movie_recommendations(user_input)

    record = Recommendation(
        user_input=user_input,
        recommended_movies=json.dumps(movies)
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "user_input": user_input,
        "recommendations": movies
    }
