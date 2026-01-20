from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from backend.app.database import Base

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    user_input = Column(String, nullable=False)
    recommended_movies = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # 🔥 LINK TO USER
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
