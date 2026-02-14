"""Anime endpoints"""
from fastapi import APIRouter, HTTPException, Query
from typing import List
from app.schemas.anime import BannerAnime, BannerResponse
from app.services.anilist_service import anilist_service
from app.core.errors import AniListException
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/anime", tags=["anime"])


@router.get("/trending", response_model=BannerResponse)
async def get_trending_anime(page: int = Query(1, ge=1)):
    """
    Get trending anime for home banner
    
    - **page**: Page number (default: 1)
    """
    try:
        anime_list = await anilist_service.get_trending_anime(page=page)
        return BannerResponse(
            trending=anime_list,
            updated_at=datetime.now()
        )
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/popular", response_model=List[BannerAnime])
async def get_popular_anime(page: int = Query(1, ge=1)):
    """
    Get popular anime
    
    - **page**: Page number (default: 1)
    """
    try:
        anime_list = await anilist_service.get_popular_anime(page=page)
        return anime_list
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
