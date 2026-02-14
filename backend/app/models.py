"""Database models (for future use)"""
# This file will contain SQLAlchemy models when database integration is added
# Example structure for future development:

"""
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()


class Anime(Base):
    __tablename__ = "anime"
    
    id = Column(Integer, primary_key=True, index=True)
    anilist_id = Column(Integer, unique=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    cover_image = Column(String)
    banner_image = Column(String)
    status = Column(String)
    episodes = Column(Integer)
    mean_score = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class UserFavorite(Base):
    __tablename__ = "user_favorites"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)
    anime_id = Column(Integer, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
"""
