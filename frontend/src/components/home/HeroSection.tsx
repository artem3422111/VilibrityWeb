// frontend/src/components/home/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getBanner, Anime } from '../../utils/api';

const HeroSection: React.FC = () => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            const result = await getBanner();

            if (result.error || !result.data) {
                setError(result.error || 'Failed to load banner');
                setLoading(false);
                return;
            }

            setAnime(result.data);
            setLoading(false);
        };

        fetchBanner();
    }, []);

    const getMainGenres = () => {
        if (!anime?.genres) return [];
        return anime.genres.slice(0, 2);
    };

    const formatViews = (views: number) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views.toString();
    };

    const isNewRelease = anime?.is_new;

    if (loading) {
        return (
            <div className="w-full h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-r from-[#212121] to-[#2a2a2a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f8ff]"></div>
                    <span className="text-gray-400">Загрузка баннера...</span>
                </div>
            </div>
        );
    }

    if (error || !anime) {
        return (
            <div className="w-full h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-r from-[#212121] to-[#2a2a2a]">
                <div className="flex flex-col items-center gap-4">
                    <span className="text-red-400 text-sm">Не удалось загрузить баннер</span>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-gradient-to-r from-[#00f8ff] to-[#9932cc] rounded-lg text-sm hover:opacity-90 transition-opacity"
                    >
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[450px] md:h-[500px] lg:h-[550px] rounded-2xl overflow-hidden group">
            {/* Фоновое изображение */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                    backgroundImage: `url("${anime.bannerImage || anime.coverImage.large}")`,
                }}
            />

            {/* Градиентные наложения */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Контент */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6 lg:p-8">
                {/* Теги и информация */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {anime.is_recommended && (
                        <div className="px-3 py-1 rounded-[10px] bg-gradient-to-r from-[#00f8ff] to-[#9932cc]">
                            <span className="text-white text-xs md:text-sm font-semibold">
                                Рекомендуем
                            </span>
                        </div>
                    )}

                    {isNewRelease && (
                        <div className="px-3 py-1 rounded-[10px] bg-gradient-to-r from-blue-600 to-blue-800">
                            <span className="text-white text-xs md:text-sm font-semibold">
                                Новинка
                            </span>
                        </div>
                    )}

                    {getMainGenres().map((genre, index) => (
                        <div
                            key={index}
                            className="px-3 py-1 rounded-[10px] bg-gray-800/70 backdrop-blur-sm border border-gray-700"
                        >
                            <span className="text-gray-200 text-xs font-medium">
                                {genre}
                            </span>
                        </div>
                    ))}

                    {anime.meanScore && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-[10px] bg-yellow-900/50 backdrop-blur-sm">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-white font-semibold text-sm">
                                {convertRating(anime.meanScore).toFixed(1)}
                            </span>
                        </div>
                    )}

                    {anime.popularity > 0 && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-[10px] bg-gray-800/50 backdrop-blur-sm">
                            <span className="text-gray-400 text-xs">👁️</span>
                            <span className="text-gray-300 text-xs md:text-sm">
                                {formatViews(anime.popularity)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Название и описание */}
                <div className="mb-6 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                        {anime.title_ru}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base lg:text-lg line-clamp-2 md:line-clamp-3">
                        {anime.description?.replace(/<[^>]*>/g, '') || 'Описание отсутствует'}
                    </p>
                </div>

                {/* Кнопки */}
                <div className="flex flex-wrap gap-3">
                    <Link
                        to={`/anime/${anime.id}`}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#00f8ff] to-[#9932cc] hover:opacity-90 rounded-[10px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/30"
                    >
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="text-white font-semibold text-sm md:text-base">
                            Смотреть сейчас
                        </span>
                    </Link>

                    <Link
                        to={`/anime/${anime.id}`}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-[10px] backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="text-white font-semibold text-sm md:text-base">
                            Подробнее
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Вспомогательная функция для конвертации рейтинга
const convertRating = (score: number): number => {
    return Math.round((score / 100) * 5 * 10) / 10;
};

export default HeroSection;