"""Service for interacting with AniList API"""
import httpx
import asyncio
from typing import Dict, List, Optional, Any
from datetime import datetime
from app.core.config import settings
from app.core.errors import AniListException
from app.schemas.anime import BannerAnime, CoverImage
import logging
import re

logger = logging.getLogger(__name__)


class AniListService:
    """Service for AniList API interactions"""
    
    BASE_URL = settings.ANILIST_API_URL
    TIMEOUT = settings.ANILIST_TIMEOUT
    
    # GraphQL queries
    TRENDING_ANIME_QUERY = """
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
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
                season
                seasonYear
                format
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    """
    
    POPULAR_ANIME_QUERY = """
    query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            media(sort: POPULARITY_DESC, type: ANIME) {
                id
                title {
                    romaji
                    english
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
                season
                seasonYear
                format
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    """
    
    SEASONAL_ANIME_QUERY = """
    query ($page: Int, $perPage: Int, $season: MediaSeason, $seasonYear: Int) {
        Page(page: $page, perPage: $perPage) {
            media(season: $season, seasonYear: $seasonYear, type: ANIME, sort: POPULARITY_DESC) {
                id
                title {
                    romaji
                    english
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
                season
                seasonYear
                format
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    """
    
    GENRE_ANIME_QUERY = """
    query ($page: Int, $perPage: Int, $genre: String) {
        Page(page: $page, perPage: $perPage) {
            media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
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
                season
                seasonYear
                format
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    """
    
    SEARCH_ANIME_QUERY = """
    query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
            media(search: $search, type: ANIME) {
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
                season
                seasonYear
                format
                studios(isMain: true) {
                    nodes {
                        name
                    }
                }
            }
        }
    }
    """
    
    ANIME_BY_ID_QUERY = """
    query ($id: Int) {
        Media(id: $id, type: ANIME) {
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
            duration
            genres
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            season
            seasonYear
            format
            studios(isMain: true) {
                nodes {
                    name
                }
            }
            synonyms
            trailer {
                id
                site
            }
            nextAiringEpisode {
                airingAt
                episode
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
        except httpx.TimeoutException:
            logger.error("Request to AniList timed out")
            raise AniListException("Request to AniList timed out")
        except httpx.HTTPError as e:
            logger.error(f"HTTP Error: {e}")
            raise AniListException(f"Failed to connect to AniList: {str(e)}")
        except Exception as e:
            logger.error(f"Unexpected error: {e}")
            raise AniListException(f"Unexpected error: {str(e)}")
    
    @classmethod
    async def get_trending_anime(cls, page: int = 1, per_page: int = 30) -> List[BannerAnime]:
        """Get trending anime for banner"""
        try:
            data = await cls._make_request(cls.TRENDING_ANIME_QUERY, {"page": page, "perPage": per_page})
            
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
    async def get_popular_anime(cls, page: int = 1, per_page: int = 30) -> List[BannerAnime]:
        """Get popular anime"""
        try:
            data = await cls._make_request(cls.POPULAR_ANIME_QUERY, {"page": page, "perPage": per_page})
            
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
    async def get_seasonal_anime(cls, season: str, year: int, page: int = 1, per_page: int = 30) -> List[BannerAnime]:
        """Get seasonal anime"""
        try:
            variables = {
                "page": page,
                "perPage": per_page,
                "season": season.upper(),
                "seasonYear": year
            }
            data = await cls._make_request(cls.SEASONAL_ANIME_QUERY, variables)
            
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
            logger.error(f"Error getting seasonal anime: {e}")
            raise AniListException(f"Error getting seasonal anime: {str(e)}")
    
    @classmethod
    async def get_anime_by_genre(cls, genre: str, page: int = 1, per_page: int = 30) -> List[BannerAnime]:
        """Get anime by genre"""
        try:
            # Маппинг русских жанров на английские
            genre_mapping = {
                "Экшен": "Action",
                "action": "Action",
                "Романтика": "Romance",
                "romance": "Romance",
                "Комедия": "Comedy",
                "comedy": "Comedy",
                "Драма": "Drama",
                "drama": "Drama",
                "Фэнтези": "Fantasy",
                "fantasy": "Fantasy",
                "Приключения": "Adventure",
                "adventure": "Adventure",
                "Научная фантастика": "Sci-Fi",
                "scifi": "Sci-Fi",
                "Ужасы": "Horror",
                "horror": "Horror",
                "Мистика": "Mystery",
                "mystery": "Mystery",
                "Спорт": "Sports",
                "sports": "Sports",
                "Триллер": "Thriller",
                "thriller": "Thriller",
                "Сверхъестественное": "Supernatural",
                "supernatural": "Supernatural",
                "Историческое": "Historical",
                "historical": "Historical"
            }
            
            # Получаем английское название жанра
            english_genre = genre_mapping.get(genre, genre)
            
            variables = {
                "page": page,
                "perPage": per_page,
                "genre": english_genre
            }
            data = await cls._make_request(cls.GENRE_ANIME_QUERY, variables)
            
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
            logger.error(f"Error getting anime by genre: {e}")
            raise AniListException(f"Error getting anime by genre: {str(e)}")
    
    @classmethod
    async def search_anime(cls, query: str, page: int = 1, per_page: int = 30) -> List[BannerAnime]:
        """Search anime by title"""
        try:
            variables = {
                "page": page,
                "perPage": per_page,
                "search": query
            }
            data = await cls._make_request(cls.SEARCH_ANIME_QUERY, variables)
            
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
            logger.error(f"Error searching anime: {e}")
            raise AniListException(f"Error searching anime: {str(e)}")
    
    @classmethod
    async def get_anime_by_id(cls, anime_id: int) -> Optional[BannerAnime]:
        """Get anime by ID"""
        try:
            data = await cls._make_request(cls.ANIME_BY_ID_QUERY, {"id": anime_id})
            
            media = data.get("Media")
            if not media:
                return None
            
            return cls._parse_anime_to_banner(media)
        except AniListException:
            raise
        except Exception as e:
            logger.error(f"Error getting anime by ID: {e}")
            raise AniListException(f"Error getting anime by ID: {str(e)}")
    
    @classmethod
    async def get_popular_genres(cls, limit: int = 10) -> List[str]:
        """Get popular anime genres"""
        # Статический список популярных жанров
        popular_genres = [
            "Action", "Adventure", "Comedy", "Drama", "Fantasy",
            "Romance", "Sci-Fi", "Slice of Life", "Mystery", "Horror",
            "Sports", "Supernatural", "Thriller", "Historical", "Mecha"
        ]
        return popular_genres[:limit]
    
    @classmethod
    def _clean_description(cls, description: Optional[str]) -> Optional[str]:
        """Clean HTML tags from description"""
        if not description:
            return description
        # Remove HTML tags
        clean = re.sub('<[^<]+?>', '', description)
        # Remove extra whitespace
        clean = re.sub(r'\s+', ' ', clean).strip()
        # Truncate to reasonable length
        if len(clean) > 500:
            clean = clean[:500] + "..."
        return clean
    
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
        
        # Extract studio
        studio = None
        studios = media.get("studios", {}).get("nodes", [])
        if studios:
            studio = studios[0].get("name")
        
        # Clean description
        description = cls._clean_description(media.get("description"))
        
        return BannerAnime(
            id=media.get("id"),
            title=title,
            description=description,
            coverImage=cover_image,
            bannerImage=media.get("bannerImage"),
            meanScore=media.get("meanScore"),
            popularity=media.get("popularity"),
            status=media.get("status"),
            episodes=media.get("episodes"),
            genres=media.get("genres", []),
            startDate=start_date,
            season=media.get("season"),
            seasonYear=media.get("seasonYear"),
            format=media.get("format"),
            studio=studio
        )


# Create a singleton instance
anilist_service = AniListService()