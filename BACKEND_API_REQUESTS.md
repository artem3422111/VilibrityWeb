# Backend API Requests for Home Page

## Overview
This document outlines the API endpoints needed for the Home page to fetch categories and populate anime cards.

## Current Frontend Structure

### Components Added:
1. **CategorySelector** - Category filtering panel
2. **AnimeCard** - Individual anime display card
3. **AnimeCatalogSection** - Main catalog section with grid layout

### Current Data Structure (Static):
```typescript
interface AnimeItem {
    id: string;
    title_ru: string;
    title_en: string;
    title_jp?: string;
    description: string;
    description_short?: string;
    genres: string[];
    rating: number;
    year: number;
    episodes: number;
    episode_duration?: number;
    status?: string;
    image_url: string;
    banner_url?: string;
    cover_color?: string;
    popularity: number;
    favourites?: number;
    average_score?: number;
    is_recommended: boolean;
    is_trending: boolean;
    is_popular: boolean;
    is_new: boolean;
    studio?: string;
    format?: string;
    season?: string;
    season_year?: number;
    views_count: number;
    watch_count?: number;
    external_links?: Array<{ url: string, site: string }>;
    trailer_url?: string;
    external_id?: number;
    source?: string;
}
```

## Required API Endpoints

### 1. Get Categories
**Endpoint:** `GET /api/v1/anime/categories`

**Response:**
```json
{
  "categories": [
    {
      "id": "all",
      "label": "Все",
      "icon": "📺",
      "count": 1500
    },
    {
      "id": "trending", 
      "label": "В тренде",
      "icon": "🔥",
      "count": 150
    },
    {
      "id": "new",
      "label": "Новинки", 
      "icon": "🆕",
      "count": 89
    },
    {
      "id": "popular",
      "label": "Популярное",
      "icon": "⭐",
      "count": 342
    }
  ]
}
```

### 2. Get Anime Catalog
**Endpoint:** `GET /api/v1/anime/catalog`

**Query Parameters:**
- `category` (optional): "all" | "trending" | "new" | "popular"
- `limit` (optional): number (default: 20)
- `offset` (optional): number (default: 0)
- `sort` (optional): "popularity" | "rating" | "year" | "episodes"
- `order` (optional): "asc" | "desc" (default: "desc")

**Response:**
```json
{
  "animes": [
    {
      "id": "dr-stone-final",
      "title_ru": "Доктор Стоун: Финальная битва",
      "title_en": "Dr. Stone: Final Battle",
      "title_jp": "ドクターストーン",
      "description": "Эпический финал легендарного аниме...",
      "description_short": "Эпический финал легендарного аниме",
      "genres": ["Научная фантастика", "Экшен", "Приключения"],
      "rating": 8.7,
      "year": 2024,
      "episodes": 24,
      "episode_duration": 24,
      "status": "released",
      "image_url": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21519-SUo3ZQuCbYhJ.png",
      "banner_url": "https://images.unsplash.com/photo-1531259683007-016a7b628fc3",
      "cover_color": "#1a0a2a",
      "popularity": 100,
      "favourites": 15000,
      "average_score": 8.7,
      "is_recommended": true,
      "is_trending": true,
      "is_popular": true,
      "is_new": true,
      "studio": "TMS Entertainment",
      "format": "TV",
      "season": "SPRING",
      "season_year": 2024,
      "views_count": 1500000,
      "watch_count": 850000,
      "external_links": [
        {
          "url": "https://anilist.co/anime/21519",
          "site": "AniList"
        }
      ],
      "trailer_url": "https://www.youtube.com/watch?v=example",
      "external_id": 21519,
      "source": "MANGA"
    }
  ],
  "total": 1500,
  "has_more": true
}
```

### 3. Get Continue Watching (Existing)
**Endpoint:** `GET /api/v1/anime/continue-watching`

**Response:**
```json
{
  "animes": [
    {
      "id": "spy-x-family",
      "title": "Шпионская семья",
      "episode": "Эпизод 12",
      "image_url": "https://example.com/image.jpg",
      "progress": 75
    }
  ]
}
```

## Implementation Notes

### Database Schema Requirements:
1. **anime** table with all the fields from AnimeItem interface
2. **categories** table for category management
3. **user_progress** table for continue watching functionality

### Performance Considerations:
1. Implement pagination for catalog endpoint
2. Add caching for category data
3. Use database indexes for filtering and sorting
4. Consider implementing Redis for frequently accessed data

### Error Handling:
1. Return appropriate HTTP status codes
2. Include error messages in response body
3. Handle rate limiting
4. Implement proper validation for query parameters

### Security:
1. Validate all input parameters
2. Implement proper authentication/authorization
3. Use HTTPS for all endpoints
4. Sanitize all user inputs

## Frontend Integration

### Current API Usage:
```typescript
// In AnimeCatalogSection.tsx
const fetchAnimeCatalog = async (category: string = 'all') => {
    try {
        const response = await fetch(`/api/v1/anime/catalog?category=${category}&limit=20`);
        const data = await response.json();
        setAnimeList(data.animes);
    } catch (error) {
        console.error('Error fetching anime catalog:', error);
    }
};
```

### Required Changes:
1. Replace static data with API calls
2. Implement pagination
3. Add loading states
4. Add error handling
5. Implement caching

## Next Steps

1. Create database models for anime and categories
2. Implement the API endpoints in FastAPI
3. Add proper validation and error handling
4. Implement pagination and filtering
5. Add caching layer for performance
6. Update frontend to use real API endpoints
7. Test all functionality thoroughly

## Safe Integration Strategy

### Current Backend Analysis:
- **Existing Structure**: FastAPI with AniListService integration
- **Current Endpoints**: `/anime/trending`, `/anime/popular`
- **Data Flow**: AniList API → Service → Router → Response
- **Error Handling**: Custom AniListException with proper HTTP status codes
- **Caching**: No current caching implementation

### Integration Approach:

#### 1. **Extend Existing Service** (Safe)
```python
# Add to anilist_service.py
class AniListService:
    # Existing methods...
    
    async def get_anime_catalog(self, category: str = "all", limit: int = 20, offset: int = 0) -> List[BannerAnime]:
        """Get anime catalog with filtering"""
        # Reuse existing _make_request and _parse_anime_to_banner methods
        # Add category filtering logic
```

#### 2. **Extend Existing Router** (Safe)
```python
# Add to anime.py endpoints
@router.get("/catalog", response_model=List[BannerAnime])
async def get_anime_catalog(
    category: str = Query("all", regex="^(all|trending|new|popular)$"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """Get anime catalog with filtering"""
    # Reuse existing service methods
```

#### 3. **Extend Existing Schemas** (Safe)
```python
# Add to anime.py schemas
class AnimeCatalogResponse(BaseModel):
    """Enhanced response for catalog"""
    animes: List[BannerAnime]
    total: int
    has_more: bool
```

### Risk Mitigation:
- ✅ **No Breaking Changes**: Extend existing endpoints, don't modify
- ✅ **Reuse Existing Code**: Leverage proven AniListService patterns
- ✅ **Maintain Error Handling**: Use existing AniListException structure
- ✅ **Preserve Performance**: No changes to existing query patterns
- ✅ **Backward Compatibility**: All existing endpoints remain unchanged

### Implementation Priority:
1. **Phase 1**: Add `/anime/catalog` endpoint (new, no conflicts)
2. **Phase 2**: Add `/anime/categories` endpoint (new, no conflicts)  
3. **Phase 3**: Enhance existing schemas (backward compatible)
4. **Phase 4**: Add caching and performance optimizations
5. **Phase 5**: Update frontend to use new endpoints

### Testing Strategy:
1. **Unit Tests**: Test new service methods in isolation
2. **Integration Tests**: Test new endpoints with mock data
3. **Regression Tests**: Ensure existing endpoints still work
4. **Load Tests**: Verify performance with new filtering
5. **Frontend Tests**: Test integration with new API structure
