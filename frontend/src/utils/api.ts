// frontend/src/utils/api.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

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

// Преобразование рейтинга из 100-балльной системы в 5-балльную
const convertRating = (score: number | undefined): number => {
    if (!score) return 0;
    return Math.round((score / 100) * 5 * 10) / 10;
};

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

// Универсальная функция для запросов
async function fetchApi<T>(
    endpoint: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                data: null,
                error: data.detail || 'API Error',
                status: response.status,
            };
        }

        return {
            data: data as T,
            error: null,
            status: response.status,
        };
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
    const result = await fetchApi<BannerResponse>('/anime/trending?page=1&limit=10');

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