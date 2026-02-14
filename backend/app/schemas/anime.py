"""Schemas for anime data"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class CoverImage(BaseModel):
    """Cover image data"""
    large: Optional[str] = None
    medium: Optional[str] = None
    color: Optional[str] = None

    class Config:
        from_attributes = True


class BannerAnime(BaseModel):
    """Anime data for home banner"""
    id: int
    title: str = Field(..., alias="title")
    description: Optional[str] = None
    coverImage: CoverImage
    bannerImage: Optional[str] = None
    meanScore: Optional[int] = None
    popularity: Optional[int] = None
    status: Optional[str] = None
    episodes: Optional[int] = None
    genres: Optional[List[str]] = []
    startDate: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True


class BannerResponse(BaseModel):
    """Response for banner data"""
    trending: List[BannerAnime]
    updated_at: datetime


class AnimeListItem(BaseModel):
    """Single anime item for lists"""
    id: int
    title: str
    coverImage: CoverImage
    status: Optional[str] = None
    episodes: Optional[int] = None

    class Config:
        from_attributes = True
        populate_by_name = True
