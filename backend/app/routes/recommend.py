from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from models.recommendation import Recommendation
from app.services.gemini import get_movie_recommendations
from app.routes.auth import get_current_user
import json

router = APIRouter(prefix="/recommend", tags=["Recommendations"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===============================
# CREATE RECOMMENDATION (AUTH)
# ===============================
@router.post("/")
def recommend_movies(
    user_input: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    if not user_input.strip():
        raise HTTPException(status_code=400, detail="Input cannot be empty")

    movies = get_movie_recommendations(user_input)

    record = Recommendation(
        user_input=user_input,
        recommended_movies=json.dumps(movies),
        user_id=current_user.id,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "user_input": user_input,
        "recommendations": movies,
    }


# ===============================
# FETCH HISTORY (AUTH)
# ===============================
@router.get("/history")
def get_recommendation_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    records = (
        db.query(Recommendation)
        .filter(Recommendation.user_id == current_user.id)
        .order_by(Recommendation.created_at.desc())
        .all()
    )

    return [
        {
            "id": rec.id,
            "user_input": rec.user_input,
            # ✅ ISO format so frontend Date() works
            "created_at": rec.created_at.isoformat() if rec.created_at else None,
        }
        for rec in records
    ]
