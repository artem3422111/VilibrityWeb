"""Service for interacting with AniList API"""
import httpx
import asyncio
from typing import Dict, List, Optional, Any
from datetime import datetime
from app.core.config import settings
from app.core.errors import AniListException
from app.schemas.anime import BannerAnime, CoverImage
import logging

logger = logging.getLogger(__name__)


class AniListService:
    """Service for AniList API interactions"""
    
    BASE_URL = settings.ANILIST_API_URL
    TIMEOUT = settings.ANILIST_TIMEOUT
    
    # GraphQL queries
    TRENDING_ANIME_QUERY = """
    query ($page: Int) {
        Page(page: $page, perPage: 10) {
            media(sort: TRENDING_DESC, type: ANIME, status: RELEASING) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                coverImage {
                    large
                    medium
                    color
                }
                bannerImage
                meanScore
                popularity
                status
                episodes
                genres
                startDate {
                    year
                    month
                    day
                }
            }
        }
    }
    """
    
    POPULAR_ANIME_QUERY = """
    query ($page: Int) {
        Page(page: $page, perPage: 10) {
            media(sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                status
                episodes
            }
        }
    }
    """
    
    @classmethod
    async def _make_request(cls, query: str, variables: Optional[Dict] = None) -> Dict[str, Any]:
        """Make a request to AniList API"""
        try:
            async with httpx.AsyncClient(timeout=cls.TIMEOUT) as client:
                response = await client.post(
                    cls.BASE_URL,
                    json={"query": query, "variables": variables or {}},
                    headers={"Content-Type": "application/json"}
                )
                response.raise_for_status()
                data = response.json()
                
                if "errors" in data:
                    logger.error(f"AniList API Error: {data['errors']}")
                    raise AniListException(f"AniList API Error: {data['errors']}")
                
                return data.get("data", {})
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error: {e}")
            raise AniListException(f"Failed to connect to AniList: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            raise AniListException(f"Unexpected error: {str(e)}")
    
    @classmethod
    async def get_trending_anime(cls, page: int = 1) -> List[BannerAnime]:
        """Get trending anime for banner"""
        try:
            data = await cls._make_request(cls.TRENDING_ANIME_QUERY, {"page": page})
            
            anime_list = []
            for media in data.get("Page", {}).get("media", []):
                try:
                    banner_anime = cls._parse_anime_to_banner(media)
                    anime_list.append(banner_anime)
                except Exception as e:
                    logger.warning(f"Failed to parse anime {media.get('id')}: {e}")
                    continue
            
            return anime_list
        except AniListException:
            raise
        except Exception as e:
            logger.error(f"Error getting trending anime: {e}")
            raise AniListException(f"Error getting trending anime: {str(e)}")
    
    @classmethod
    async def get_popular_anime(cls, page: int = 1) -> List[BannerAnime]:
        """Get popular anime"""
        try:
            data = await cls._make_request(cls.POPULAR_ANIME_QUERY, {"page": page})
            
            anime_list = []
            for media in data.get("Page", {}).get("media", []):
                try:
                    banner_anime = cls._parse_anime_to_banner(media)
                    anime_list.append(banner_anime)
                except Exception as e:
                    logger.warning(f"Failed to parse anime {media.get('id')}: {e}")
                    continue
            
            return anime_list
        except AniListException:
            raise
        except Exception as e:
            logger.error(f"Error getting popular anime: {e}")
            raise AniListException(f"Error getting popular anime: {str(e)}")
    
    @classmethod
    def _parse_anime_to_banner(cls, media: Dict) -> BannerAnime:
        """Parse AniList media data to BannerAnime schema"""
        
        # Extract title
        title_obj = media.get("title", {})
        title = title_obj.get("english") or title_obj.get("romaji") or "Unknown"
        
        # Extract cover image
        cover_image_data = media.get("coverImage", {})
        cover_image = CoverImage(
            large=cover_image_data.get("large"),
            medium=cover_image_data.get("medium"),
            color=cover_image_data.get("color")
        )
        
        # Extract start date
        start_date = None
        if media.get("startDate"):
            start_date_obj = media.get("startDate", {})
            year = start_date_obj.get("year")
            month = start_date_obj.get("month") or 1
            day = start_date_obj.get("day") or 1
            if year:
                start_date = f"{year}-{month:02d}-{day:02d}"
        
        return BannerAnime(
            id=media.get("id"),
            title=title,
            description=media.get("description"),
            coverImage=cover_image,
            bannerImage=media.get("bannerImage"),
            meanScore=media.get("meanScore"),
            popularity=media.get("popularity"),
            status=media.get("status"),
            episodes=media.get("episodes"),
            genres=media.get("genres", []),
            startDate=start_date
        )


# Create a singleton instance
anilist_service = AniListService()
