import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { getBanner } from '../../utils/api'; // Импортируем API функции

interface Anime {
    id: string;
    title_ru: string;
    title_en: string;
    description: string;
    image_url: string;
    banner_url: string;
    rating: number;
    year: number;
    genres: string[];
    is_recommended: boolean;
    is_popular: boolean;
    is_trending: boolean;
    is_new: boolean;
    views_count: number;
    status?: string;
}

const HeroSection: React.FC = () => {
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBannerData = async (force = false) => {
        try {
            if (!force) {
                setLoading(true);
            }
            setError(null);

            // Получаем данные с бэкенда
            const response = await getBanner();

            if (response.error) {
                throw new Error(response.error);
            }

            if (response.data) {
                setAnime(response.data);
            } else {
                throw new Error('No data received from server');
            }

        } catch (err) {
            console.error('Ошибка при загрузке баннера:', err);
            setError(err instanceof Error ? err.message : 'Не удалось загрузить данные баннера');

            // Резервные данные на случай ошибки
            const fallbackData: Anime = {
                id: 'dr-stone-final',
                title_ru: 'Доктор Стоун: Финальная битва',
                title_en: 'Dr. Stone: Final Battle',
                description: 'Эпический финал легендарного аниме. Сенку и его друзья вступают в последнюю битву за судьбу человечества. После того как мир был загадочным образом превращён в камень, человечество находится на грани исчезновения. Гениальный учёный Сенку Ишигами возрождает цивилизацию с помощью науки, но теперь ему предстоит столкнуться с сильным противником.',
                image_url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
                banner_url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
                rating: 8.7,
                year: 2024,
                genres: ['Научная фантастика', 'Экшен', 'Приключения', 'Драма'],
                is_recommended: true,
                is_popular: true,
                is_trending: true,
                is_new: true,
                views_count: 1500000,
                status: 'Вышел',
            };

            setAnime(fallbackData);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBannerData(false);
    }, []);

    const handleWatchNow = () => {
        if (anime) {
            console.log('Watch now:', anime.id);
            // TODO: Добавить навигацию к аниме
            alert(`Начать просмотр: ${anime.title_ru}`);
        }
    };

    const handleMoreInfo = () => {
        if (anime) {
            console.log('More info:', anime.id);
            // TODO: Добавить навигацию к детальной странице
            alert(`Подробнее об: ${anime.title_ru}\nГод: ${anime.year}\nРейтинг: ${anime.rating}\nЖанры: ${anime.genres?.join(', ')}`);
        }
    };

    const isNewRelease = anime?.year === new Date().getFullYear();

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

    if (loading && !anime) {
        return (
            <div className="w-full h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-r from-[#212121] to-[#2a2a2a]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    <span className="text-gray-400">Загрузка баннера...</span>
                </div>
            </div>
        );
    }

    if (error && !anime) {
        return (
            <div className="w-full h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center rounded-2xl overflow-hidden bg-gradient-to-r from-[#212121] to-[#2a2a2a]">
                <div className="flex flex-col items-center gap-4 p-4">
                    <span className="text-red-400 text-center">Ошибка: {error}</span>
                    <button
                        onClick={() => fetchBannerData(true)}
                        className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
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
                    backgroundImage: `url("${anime?.banner_url || anime?.image_url}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Градиентные наложения */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Контент */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6 lg:p-8">
                {/* Теги и информация */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    {/* Тег "Рекомендуем" */}
                    {anime?.is_recommended && (
                        <div className="px-3 py-1 rounded-[10px] bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-700">
                            <span className="text-white text-xs md:text-sm font-semibold">
                                Рекомендуем
                            </span>
                        </div>
                    )}

                    {/* Тег "Новинка" или Год */}
                    <div className="px-3 py-1 rounded-[10px] bg-gradient-to-r from-blue-600 to-blue-800 border border-blue-700">
                        <span className="text-white text-xs md:text-sm font-semibold">
                            {isNewRelease ? 'Новинка' : anime?.year}
                        </span>
                    </div>

                    {/* Теги жанров */}
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

                    {/* Рейтинг */}
                    {anime?.rating && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-[10px] bg-yellow-900/50 backdrop-blur-sm">
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-white font-semibold text-sm">
                                {anime.rating.toFixed(1)}
                            </span>
                        </div>
                    )}

                    {/* Просмотры */}
                    {anime?.views_count && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-[10px] bg-gray-800/50 backdrop-blur-sm">
                            <span className="text-gray-400 text-xs">👁️</span>
                            <span className="text-gray-300 text-xs md:text-sm">
                                {formatViews(anime.views_count)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Название и описание */}
                <div className="mb-6 max-w-2xl">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
                        {anime?.title_ru || 'Название аниме'}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base lg:text-lg line-clamp-2 md:line-clamp-3">
                        {anime?.description || 'Описание отсутствует'}
                    </p>
                </div>

                {/* Кнопки */}
                <div className="flex flex-wrap gap-3">
                    {/* Кнопка "Смотреть сейчас" */}
                    <button
                        onClick={handleWatchNow}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 rounded-[10px] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-purple-900/30"
                    >
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="text-white font-semibold text-sm md:text-base">
                            Смотреть сейчас
                        </span>
                    </button>

                    {/* Кнопка "Подробнее" */}
                    <button
                        onClick={handleMoreInfo}
                        className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-[10px] backdrop-blur-sm border border-gray-700 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <Info className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        <span className="text-white font-semibold text-sm md:text-base">
                            Подробнее
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;