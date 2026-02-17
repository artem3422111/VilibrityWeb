// frontend/src/utils/api.ts

// Интерфейс для ответа API
interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    fromCache: boolean;
}

// Базовый URL для API (берем из env, fallback на localhost)
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Преобразование рейтинга из 100-балльной системы в 5-балльную
const convertRating = (score: number | undefined): number => {
    if (!score) return 0;
    // Преобразуем из 0-100 в 0-5 и округляем до одной цифры после запятой
    return Math.round((score / 100) * 5 * 10) / 10;
};

// Запрос баннера
export const getBanner = async (): Promise<ApiResponse<any>> => {
    try {
        console.log('Fetching banner from backend...');
        const response = await fetch(`${API_BASE_URL}/anime/trending`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Banner response:', data);

        // Извлекаем первое аниме из массива trending
        if (data.trending && data.trending.length > 0) {
            const anime = data.trending[0];
            
            // Преобразуем данные из бэкенда в формат фронтенда
            const transformedData = {
                id: anime.id.toString(),
                title_ru: anime.title || 'Unknown',
                title_en: anime.title || 'Unknown',
                description: anime.description || '',
                image_url: anime.coverImage?.large || anime.coverImage?.medium || '',
                banner_url: anime.bannerImage || anime.coverImage?.large || anime.coverImage?.medium || '',
                rating: convertRating(anime.meanScore),
                year: anime.startDate ? parseInt(anime.startDate.split('-')[0]) : new Date().getFullYear(),
                genres: anime.genres || [],
                is_recommended: true,
                is_popular: anime.popularity ? anime.popularity > 10000 : false,
                is_trending: true,
                is_new: false,
                views_count: anime.popularity || 0,
                status: anime.status || 'UNKNOWN',
            };

            return {
                data: transformedData,
                error: null,
                fromCache: false
            };
        } else {
            throw new Error('No anime data in response');
        }
    } catch (error) {
        console.error('Error fetching banner:', error);
        return {
            data: null,
            error: error instanceof Error ? error.message : 'Failed to fetch banner data',
            fromCache: false
        };
    }
};

// Принудительное обновление кэша
export const forceRefresh = async (url: string, cacheKey: string): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/banner/force-refresh?url=${encodeURIComponent(url)}&cache_key=${cacheKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error force refreshing:', error);
        return {
            data: null,
            error: 'Failed to force refresh',
            fromCache: false
        };
    }
};

// Функции для работы с аниме
export const getTrendingAnime = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/trending`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Преобразуем данные из бэкенда в формат фронтенда
        if (data.trending && Array.isArray(data.trending)) {
            return data.trending.map((anime: any) => ({
                id: anime.id.toString(),
                title_ru: anime.title || 'Unknown',
                title_en: anime.title || 'Unknown',
                description: anime.description || '',
                image_url: anime.coverImage?.large || anime.coverImage?.medium || '',
                banner_url: anime.bannerImage || anime.coverImage?.large || anime.coverImage?.medium || '',
                rating: convertRating(anime.meanScore),
                year: anime.startDate ? parseInt(anime.startDate.split('-')[0]) : new Date().getFullYear(),
                genres: anime.genres || [],
                is_recommended: false,
                is_popular: anime.popularity ? anime.popularity > 10000 : false,
                is_trending: true,
                is_new: false,
                views_count: anime.popularity || 0,
                status: anime.status || 'UNKNOWN',
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        return [];
    }
};

export const getPopularAnime = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/popular`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Преобразуем данные из бэкенда в формат фронтенда
        if (Array.isArray(data)) {
            return data.map((anime: any) => ({
                id: anime.id.toString(),
                title_ru: anime.title || 'Unknown',
                title_en: anime.title || 'Unknown',
                description: anime.description || '',
                image_url: anime.coverImage?.large || anime.coverImage?.medium || '',
                banner_url: anime.bannerImage || anime.coverImage?.large || anime.coverImage?.medium || '',
                rating: convertRating(anime.meanScore),
                year: anime.startDate ? parseInt(anime.startDate.split('-')[0]) : new Date().getFullYear(),
                genres: anime.genres || [],
                is_recommended: false,
                is_popular: true,
                is_trending: false,
                is_new: false,
                views_count: anime.popularity || 0,
                status: anime.status || 'UNKNOWN',
            }));
        }
        return [];
    } catch (error) {
        console.error('Error fetching popular anime:', error);
        return [];
    }
};

export const getPopularGenres = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/genres/popular`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching popular genres:', error);
        return [];
    }
};

export const getAnimeByGenre = async (genre: string): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/genre/${genre}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching anime by genre:', error);
        return [];
    }
};

export const searchAnime = async (query: string): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error searching anime:', error);
        return [];
    }
};

// Функции для работы с пользователем
export const getUserData = async (): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        return {};
    }
};

// Функции для работы с избранным
export const getFavorites = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/favorites`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};

export const addToFavorites = async (animeId: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/favorites/${animeId}`, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.success || false;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return false;
    }
};

// Функции для работы с историей просмотра
export const getWatchHistory = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/history`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching watch history:', error);
        return [];
    }
};

// Функции для работы с коллекцией
export const getCollection = async (): Promise<any[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/collection`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching collection:', error);
        return [];
    }
};