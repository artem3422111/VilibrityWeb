// frontend/src/utils/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
// const API_BASE_URL = 'http://localhost:8000/api/v1';

// Интерфейсы для данных
export interface AnimeImage {
    large: string;
    medium: string;
    color?: string;
}

export interface Anime {
    id: number;
    title_ru: string;
    title_en: string;
    description: string;
    coverImage: AnimeImage;
    bannerImage?: string;
    meanScore?: number;
    popularity: number;
    status: string;
    episodes: number;
    genres: string[];
    startDate?: string;
    season?: string;
    seasonYear?: number;
    format?: string;
    studio?: string;
    is_recommended: boolean;
    is_trending: boolean;
    is_popular: boolean;
    is_new: boolean;
    views_count: number;
}

export interface BannerResponse {
    trending: Anime[];
    updated_at: string;
}

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    status: number;
}

// Конфигурация кэширования
const CACHE_CONFIG = {
    // Время жизни кэша в миллисекундах (1 час)
    CACHE_TTL: 60 * 60 * 1000,
    // Префикс для ключей кэша
    CACHE_PREFIX: 'vilibrity_cache_',
    // Максимальное количество записей в кэше
    MAX_CACHE_ENTRIES: 100
};

// Интерфейс для кэшированной записи
interface CacheEntry<T> {
    data: T;
    timestamp: number;
}

// Функция для генерации ключа кэша
function getCacheKey(endpoint: string, options?: RequestInit): string {
    const key = `${endpoint}_${JSON.stringify(options || {})}`;
    return CACHE_CONFIG.CACHE_PREFIX + btoa(encodeURIComponent(key));
}

// Функция для получения данных из кэша
function getFromCache<T>(key: string): T | null {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;
        
        const entry: CacheEntry<T> = JSON.parse(cached);
        const now = Date.now();
        
        // Проверяем, не истек ли срок действия кэша
        if (now - entry.timestamp > CACHE_CONFIG.CACHE_TTL) {
            localStorage.removeItem(key);
            return null;
        }
        
        return entry.data;
    } catch (error) {
        console.warn('Cache read error:', error);
        return null;
    }
}

// Функция для сохранения данных в кэш
function saveToCache<T>(key: string, data: T): void {
    try {
        // Проверяем количество записей в кэше
        const cacheKeys = Object.keys(localStorage).filter(key => 
            key.startsWith(CACHE_CONFIG.CACHE_PREFIX)
        );
        
        // Если превышено максимальное количество записей, удаляем самые старые
        if (cacheKeys.length >= CACHE_CONFIG.MAX_CACHE_ENTRIES) {
            cacheKeys.sort((a, b) => {
                const aEntry = JSON.parse(localStorage.getItem(a) || '{}');
                const bEntry = JSON.parse(localStorage.getItem(b) || '{}');
                return (aEntry.timestamp || 0) - (bEntry.timestamp || 0);
            });
            
            // Удаляем 10 самых старых записей
            cacheKeys.slice(0, 10).forEach(key => localStorage.removeItem(key));
        }
        
        const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now()
        };
        
        localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
        console.warn('Cache write error:', error);
    }
}

// Функция для очистки устаревшего кэша
function cleanupOldCache(): void {
    try {
        const cacheKeys = Object.keys(localStorage).filter(key => 
            key.startsWith(CACHE_CONFIG.CACHE_PREFIX)
        );
        
        const now = Date.now();
        cacheKeys.forEach(key => {
            try {
                const cached = localStorage.getItem(key);
                if (cached) {
                    const entry: CacheEntry<any> = JSON.parse(cached);
                    if (now - entry.timestamp > CACHE_CONFIG.CACHE_TTL) {
                        localStorage.removeItem(key);
                    }
                }
            } catch (error) {
                console.warn('Cache cleanup error for key:', key, error);
            }
        });
    } catch (error) {
        console.warn('Cache cleanup error:', error);
    }
}

// Автоматическая очистка устаревшего кэша при загрузке страницы
if (typeof window !== 'undefined') {
    cleanupOldCache();
}

// Преобразование рейтинга из 100-балльной системы в 5-балльную
// const convertRating = (score: number | undefined): number => {
//     if (!score) return 0;
//     return Math.round((score / 100) * 5 * 10) / 10;
// };

// Определяем новизну аниме (текущий или прошлый год)
const isNewAnime = (startDate?: string): boolean => {
    if (!startDate) return false;
    const year = parseInt(startDate.split('-')[0]);
    const currentYear = new Date().getFullYear();
    return year >= currentYear - 1;
};

// Форматирование данных аниме из бэкенда
const formatAnimeData = (anime: any): Anime => ({
    id: anime.id,
    title_ru: anime.title || 'Unknown',
    title_en: anime.title || 'Unknown',
    description: anime.description?.replace(/<[^>]*>/g, '') || '',
    coverImage: {
        large: anime.coverImage?.large || '',
        medium: anime.coverImage?.medium || '',
        color: anime.coverImage?.color
    },
    bannerImage: anime.bannerImage,
    meanScore: anime.meanScore,
    popularity: anime.popularity || 0,
    status: anime.status || 'UNKNOWN',
    episodes: anime.episodes || 0,
    genres: anime.genres || [],
    startDate: anime.startDate,
    season: anime.season,
    seasonYear: anime.seasonYear,
    format: anime.format,
    studio: anime.studio,
    is_recommended: (anime.meanScore || 0) > 75,
    is_trending: true,
    is_popular: (anime.popularity || 0) > 10000,
    is_new: isNewAnime(anime.startDate),
    views_count: anime.popularity || 0
});

// Универсальная функция для запросов с кэшированием
async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    // Генерируем ключ кэша
    const cacheKey = getCacheKey(endpoint, options);
    
    // Пытаемся получить данные из кэша
    const cachedData = getFromCache<ApiResponse<T>>(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        const data = await response.json();

        const result: ApiResponse<T> = !response.ok 
            ? {
                data: null,
                error: data.detail || 'API Error',
                status: response.status,
            }
            : {
                data: data as T,
                error: null,
                status: response.status,
            };

        // Сохраняем успешные ответы в кэш
        if (result.status >= 200 && result.status < 300) {
            saveToCache(cacheKey, result);
        }

        return result;
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error.message : 'Network error',
            status: 500,
        };
    }
}

// Получение баннера (трендовое аниме)
export async function getBanner(): Promise<ApiResponse<Anime>> {
    const result = await fetchApi<BannerResponse>('/anime/trending?page=1&limit=2');

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const trendingAnime = result.data.trending;
    if (trendingAnime.length === 0) {
        return {
            data: null,
            error: 'No trending anime found',
            status: 404,
        };
    }

    // Берем первое аниме для баннера
    return {
        data: formatAnimeData(trendingAnime[0]),
        error: null,
        status: 200,
    };
}

// Получение трендового аниме (для каталога)
export async function getTrendingAnime(page: number = 1, limit: number = 30): Promise<ApiResponse<Anime[]>> {
    const result = await fetchApi<BannerResponse>(`/anime/trending?page=${page}&limit=${limit}`);

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const formattedAnime = result.data.trending.map(formatAnimeData);

    return {
        data: formattedAnime,
        error: null,
        status: 200,
    };
}

// Получение популярного аниме
export async function getPopularAnime(page: number = 1, limit: number = 30): Promise<ApiResponse<Anime[]>> {
    const result = await fetchApi<Anime[]>(`/anime/popular?page=${page}&limit=${limit}`);

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const formattedAnime = result.data.map(formatAnimeData);

    return {
        data: formattedAnime,
        error: null,
        status: 200,
    };
}

// Получение сезонного аниме
export async function getSeasonalAnime(
    season: string,
    year: number,
    page: number = 1,
    limit: number = 30
): Promise<ApiResponse<Anime[]>> {
    const result = await fetchApi<Anime[]>(
        `/anime/seasonal?season=${season}&year=${year}&page=${page}&limit=${limit}`
    );

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const formattedAnime = result.data.map(formatAnimeData);

    return {
        data: formattedAnime,
        error: null,
        status: 200,
    };
}

// Получение аниме по жанру
export async function getAnimeByGenre(
    genre: string,
    page: number = 1,
    limit: number = 30
): Promise<ApiResponse<Anime[]>> {
    const result = await fetchApi<Anime[]>(
        `/anime/genre/${encodeURIComponent(genre)}?page=${page}&limit=${limit}`
    );

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const formattedAnime = result.data.map(formatAnimeData);

    return {
        data: formattedAnime,
        error: null,
        status: 200,
    };
}

// Поиск аниме по названию
export async function searchAnime(
    query: string,
    page: number = 1,
    limit: number = 30
): Promise<ApiResponse<Anime[]>> {
    const result = await fetchApi<Anime[]>(
        `/anime/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    const formattedAnime = result.data.map(formatAnimeData);

    return {
        data: formattedAnime,
        error: null,
        status: 200,
    };
}

// Получение аниме по ID
export async function getAnimeById(id: number): Promise<ApiResponse<Anime>> {
    const result = await fetchApi<Anime>(`/anime/${id}`);

    if (result.error || !result.data) {
        return {
            data: null,
            error: result.error,
            status: result.status,
        };
    }

    return {
        data: formatAnimeData(result.data),
        error: null,
        status: 200,
    };
}

// Получение популярных жанров
export async function getPopularGenres(limit: number = 10): Promise<ApiResponse<string[]>> {
    return fetchApi<string[]>(`/anime/genres/popular?limit=${limit}`);
}