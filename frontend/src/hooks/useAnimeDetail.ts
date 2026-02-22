import { useState, useEffect } from 'react';
import { getAnimeById, Anime, ApiResponse } from '../utils/api';

interface UseAnimeDetailResult {
    anime: Anime | null;
    loading: boolean;
    error: string | null;
}

export const useAnimeDetail = (id: string | undefined): UseAnimeDetailResult => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAnime = async () => {
            if (!id) {
                setError('ID аниме не указан');
                setLoading(false);
                return;
            }

            const numericId = parseInt(id);
            if (isNaN(numericId)) {
                setError('Некорректный ID аниме');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const response: ApiResponse<Anime> = await getAnimeById(numericId);

                if (response.error) {
                    setError(response.error);
                    setAnime(null);
                } else {
                    setAnime(response.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке');
                setAnime(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAnime();
    }, [id]);

    return { anime, loading, error };
};