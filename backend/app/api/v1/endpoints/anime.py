"""Anime endpoints"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.anime import BannerAnime, BannerResponse
from app.services.anilist_service import anilist_service
from app.core.errors import AniListException
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/anime", tags=["anime"])


@router.get("/trending", response_model=BannerResponse)
async def get_trending_anime(
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100)
):
    """
    Get trending anime for home banner
    
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 30, max: 100)
    """
    try:
        anime_list = await anilist_service.get_trending_anime(page=page, per_page=limit)
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
async def get_popular_anime(
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100)
):
    """
    Get popular anime
    
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 30, max: 100)
    """
    try:
        anime_list = await anilist_service.get_popular_anime(page=page, per_page=limit)
        return anime_list
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/seasonal", response_model=List[BannerAnime])
async def get_seasonal_anime(
    season: str = Query(..., regex="^(WINTER|SPRING|SUMMER|FALL)$"),
    year: int = Query(..., ge=1900, le=2100),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100)
):
    """
    Get seasonal anime
    
    - **season**: Season (WINTER, SPRING, SUMMER, FALL)
    - **year**: Year (1900-2100)
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 30, max: 100)
    """
    try:
        anime_list = await anilist_service.get_seasonal_anime(
            season=season, 
            year=year, 
            page=page, 
            per_page=limit
        )
        return anime_list
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/genre/{genre}", response_model=List[BannerAnime])
async def get_anime_by_genre(
    genre: str,
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100)
):
    """
    Get anime by genre
    
    - **genre**: Genre name (e.g., Action, Comedy, Drama, Romance)
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 30, max: 100)
    """
    try:
        anime_list = await anilist_service.get_anime_by_genre(
            genre=genre,
            page=page,
            per_page=limit
        )
        return anime_list
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/search", response_model=List[BannerAnime])
async def search_anime(
    query: str = Query(..., min_length=1),
    page: int = Query(1, ge=1),
    limit: int = Query(30, ge=1, le=100)
):
    """
    Search anime by title
    
    - **query**: Search query
    - **page**: Page number (default: 1)
    - **limit**: Items per page (default: 30, max: 100)
    """
    try:
        anime_list = await anilist_service.search_anime(
            query=query,
            page=page,
            per_page=limit
        )
        return anime_list
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/genres/popular", response_model=List[str])
async def get_popular_genres(
    limit: int = Query(10, ge=1, le=20)
):
    """
    Get popular anime genres
    
    - **limit**: Number of genres (default: 10, max: 20)
    """
    try:
        genres = await anilist_service.get_popular_genres(limit=limit)
        return genres
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{anime_id}", response_model=BannerAnime)
async def get_anime_by_id(
    anime_id: int,
):
    """
    Get anime by ID
    
    - **anime_id**: Anime ID from AniList
    """
    try:
        anime = await anilist_service.get_anime_by_id(anime_id=anime_id)
        if not anime:
            raise HTTPException(status_code=404, detail="Anime not found")
        return anime
    except AniListException as e:
        logger.error(f"AniList error: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")