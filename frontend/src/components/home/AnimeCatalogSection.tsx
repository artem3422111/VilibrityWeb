// frontend/src/components/home/AnimeCatalogSection.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategorySelector from './CategorySelector';
import AnimeCard from './AnimeCard';
import { ChevronRight } from 'lucide-react';
import { getTrendingAnime, getPopularAnime, getAnimeByGenre, Anime } from '../../utils/api';

interface CategoryData {
    id: string;
    label: string;
    icon: string;
    description: string;
    link: string;
    apiFunction: (page?: number, limit?: number) => Promise<any>;
}

const AnimeCatalogSection: React.FC<{ hasPreviousSection?: boolean }> = ({ hasPreviousSection = true }) => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentCategory, setCurrentCategory] = useState<string>('all');

    // Данные для каждой категории с привязанной API функцией
    const mobileCategories: CategoryData[] = [
        {
            id: 'trending',
            label: 'В тренде',
            icon: '🔥',
            description: 'Самые обсуждаемые сейчас',
            link: '/category/trending',
            apiFunction: (page = 1) => getTrendingAnime(page, 10)
        },
        {
            id: 'popular',
            label: 'Популярное',
            icon: '⭐',
            description: 'Лучшее по версии зрителей',
            link: '/category/popular',
            apiFunction: (page = 1) => getPopularAnime(page, 10)
        },
        {
            id: 'action',
            label: 'Экшен',
            icon: '⚔️',
            description: 'Динамичные боевики',
            link: '/category/action',
            apiFunction: (page = 1) => getAnimeByGenre('Action', page, 10)
        },
        {
            id: 'romance',
            label: 'Романтика',
            icon: '❤️',
            description: 'Истории о любви',
            link: '/category/romance',
            apiFunction: (page = 1) => getAnimeByGenre('Romance', page, 10)
        },
        {
            id: 'comedy',
            label: 'Комедия',
            icon: '😄',
            description: 'Поднимут настроение',
            link: '/category/comedy',
            apiFunction: (page = 1) => getAnimeByGenre('Comedy', page, 10)
        },
        {
            id: 'drama',
            label: 'Драма',
            icon: '🎭',
            description: 'Глубокие эмоциональные истории',
            link: '/category/drama',
            apiFunction: (page = 1) => getAnimeByGenre('Drama', page, 10)
        },
    ];

    // Состояния для хранения данных каждой категории
    const [categoryData, setCategoryData] = useState<Record<string, Anime[]>>({});
    const [categoryLoading, setCategoryLoading] = useState<Record<string, boolean>>({});

    // Загрузка данных для всех категорий
    useEffect(() => {
        const fetchAllCategories = async () => {
            const newData: Record<string, Anime[]> = {};
            const newLoading: Record<string, boolean> = {};

            for (const category of mobileCategories) {
                newLoading[category.id] = true;
                setCategoryLoading(prev => ({ ...prev, [category.id]: true }));

                try {
                    const result = await category.apiFunction(1, 10);
                    if (!result.error && result.data) {
                        newData[category.id] = result.data;
                    } else {
                        newData[category.id] = [];
                    }
                } catch (err) {
                    console.error(`Error fetching ${category.id}:`, err);
                    newData[category.id] = [];
                }

                newLoading[category.id] = false;
                setCategoryLoading(prev => ({ ...prev, [category.id]: false }));
            }

            setCategoryData(newData);
        };

        fetchAllCategories();
    }, []);

    // Загрузка данных для десктопного каталога
    const fetchAnimeCatalog = async (category: string = 'all') => {
        try {
            setLoading(true);
            setError(null);

            let result;
            switch (category) {
                case 'trending':
                    result = await getTrendingAnime(1, 30);
                    break;
                case 'popular':
                    result = await getPopularAnime(1, 30);
                    break;
                default:
                    result = await getTrendingAnime(1, 30);
                    break;
            }

            if (result.error || !result.data) {
                throw new Error(result.error || 'Failed to fetch anime');
            }

            setAnimeList(result.data);
        } catch (err) {
            console.error('Error fetching anime catalog:', err);
            setError('Не удалось загрузить каталог аниме');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = async (category: string) => {
        setCurrentCategory(category);
        await fetchAnimeCatalog(category);
    };

    useEffect(() => {
        fetchAnimeCatalog('all');
    }, []);

    return (
        <>
            {/* Десктопная версия (lg и выше) */}
            <div className="hidden lg:block w-full max-w-[1530px] mx-auto px-8">
                <div className={`${hasPreviousSection ? 'mt-[20px]' : 'mt-[35px]'} pb-8`}>
                    {/* Заголовок секции */}
                    <div className="mb-6">
                        <h2 className="text-white font-inter text-[28px] font-bold leading-tight">
                            Каталог аниме
                        </h2>
                        <p className="text-gray-400 font-inter text-base mt-2">
                            Откройте для себя лучшие аниме в разных категориях
                        </p>
                    </div>

                    {/* Селектор категорий */}
                    <CategorySelector onCategoryChange={handleCategoryChange} />

                    {/* Состояние загрузки */}
                    {loading && (
                        <div className="mt-8 w-full min-h-[400px] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#00f8ff] border-t-transparent"></div>
                                <span className="text-gray-400">Загрузка аниме...</span>
                            </div>
                        </div>
                    )}

                    {/* Состояние ошибки */}
                    {error && !loading && (
                        <div className="mt-8 w-full min-h-[400px] flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <span className="text-red-400">{error}</span>
                                <button
                                    onClick={() => fetchAnimeCatalog(currentCategory)}
                                    className="px-4 py-2 bg-gradient-to-r from-[#00f8ff] to-[#9932cc] rounded-lg hover:opacity-90 transition-opacity"
                                >
                                    Попробовать снова
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Сетка карточек аниме */}
                    {!loading && !error && (
                        <div className="mt-8 w-full">
                            <div className="grid grid-cols-5 gap-6">
                                {animeList.slice(0, 30).map((anime) => (
                                    <AnimeCard
                                        key={anime.id}
                                        imageUrl={anime.coverImage.large}
                                        genre={anime.genres?.length > 0 ? anime.genres[0] : 'Аниме'}
                                        episodes={`${anime.episodes} эп.`}
                                        title={anime.title_ru}
                                        rating={convertRating(anime.meanScore || 0)}
                                        animeId={anime.id.toString()}
                                        variant="desktop"
                                    />
                                ))}
                            </div>

                            {animeList.length === 0 && (
                                <div className="w-full py-12 text-center">
                                    <p className="text-gray-400">В этой категории пока нет аниме</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Мобильная версия (до lg) */}
            <div className="lg:hidden w-full px-4 mt-4 pb-8">
                {/* Заголовок секции */}
                <div className="mb-6">
                    <h2 className="text-white font-inter text-2xl font-bold">
                        Исследуйте аниме
                    </h2>
                    <p className="text-gray-400 font-inter text-sm mt-1">
                        Выберите категорию и найдите что-то новое
                    </p>
                </div>

                {/* Категории с карточками */}
                <div className="space-y-8">
                    {mobileCategories.map((category) => {
                        const categoryAnime = categoryData[category.id] || [];
                        const isLoading = categoryLoading[category.id];

                        return (
                            <div key={category.id} className="space-y-3">
                                {/* Заголовок категории с кнопкой "Всё" */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{category.icon}</span>
                                        <div>
                                            <h3 className="text-white font-inter text-lg font-bold">
                                                {category.label}
                                            </h3>
                                            <p className="text-gray-500 font-inter text-xs">
                                                {category.description}
                                            </p>
                                        </div>
                                    </div>

                                    <Link
                                        to={category.link}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-[#2D2D2E] rounded-full border border-white/5"
                                    >
                                        <span className="text-gray-300 font-inter text-xs">Всё</span>
                                        <ChevronRight className="w-3 h-3 text-gray-400" />
                                    </Link>
                                </div>

                                {/* Горизонтальная прокрутка карточек категории */}
                                {isLoading ? (
                                    <div className="w-full h-[200px] flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#00f8ff] border-t-transparent"></div>
                                    </div>
                                ) : (
                                    <div className="w-full overflow-x-auto scrollbar-hide">
                                        <div className="flex flex-row gap-3 pb-2 min-w-max">
                                            {categoryAnime.map((anime) => (
                                                <div key={anime.id} className="w-[130px]">
                                                    <AnimeCard
                                                        imageUrl={anime.coverImage.medium || anime.coverImage.large}
                                                        genre={anime.genres?.length > 0 ? anime.genres[0] : 'Аниме'}
                                                        episodes={`${anime.episodes} эп.`}
                                                        title={anime.title_ru}
                                                        rating={convertRating(anime.meanScore || 0)}
                                                        animeId={anime.id.toString()}
                                                        variant="mobile"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

// Вспомогательная функция для конвертации рейтинга
const convertRating = (score: number): number => {
    return Math.round((score / 100) * 5 * 10) / 10;
};

export default AnimeCatalogSection;