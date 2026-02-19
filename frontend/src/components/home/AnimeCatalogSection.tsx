import React, { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';
import AnimeCard from './AnimeCard';
import { RefreshCw } from 'lucide-react';

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

const AnimeCatalogSection: React.FC<{ hasPreviousSection?: boolean }> = ({ hasPreviousSection = true }) => {
    const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentCategory, setCurrentCategory] = useState<string>('all');
    const [refreshing, setRefreshing] = useState(false);

    // Статические данные для демонстрации
    const staticAnime: AnimeItem[] = [
        {
            id: 'dr-stone-final',
            title_ru: 'Доктор Стоун: Финальная битва',
            title_en: 'Dr. Stone: Final Battle',
            description: 'Эпический финал легендарного аниме. Сенку и его друзья вступают в последнюю битву за судьбу человечества.',
            genres: ['Научная фантастика', 'Экшен', 'Приключения'],
            rating: 8.7,
            year: 2024,
            episodes: 24,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21519-SUo3ZQuCbYhJ.png',
            banner_url: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            popularity: 100,
            is_recommended: true,
            is_trending: true,
            is_popular: true,
            is_new: true,
            views_count: 1500000,
            source: 'Static Data'
        },
        {
            id: 'attack-on-titan',
            title_ru: 'Атака титанов',
            title_en: 'Attack on Titan',
            description: 'Столетия назад человечество было почти уничтожено титанами.',
            genres: ['Экшен', 'Драма', 'Фэнтези'],
            rating: 8.5,
            year: 2013,
            episodes: 75,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16498-buvcRTBx4NSm.jpg',
            banner_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg',
            popularity: 50,
            is_recommended: true,
            is_trending: false,
            is_popular: true,
            is_new: false,
            views_count: 2500000,
            source: 'Static Data'
        },
        {
            id: 'demon-slayer',
            title_ru: 'Клинок, рассекающий демонов',
            title_en: 'Demon Slayer',
            description: 'Тандзиро Камадо становится истребителем демонов.',
            genres: ['Экшен', 'Фэнтези', 'Историческое'],
            rating: 8.6,
            year: 2019,
            episodes: 55,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx20605-rC8LjFXyMxtx.jpg',
            banner_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/20605-B8FfLLcSC3Ab.jpg',
            popularity: 30,
            is_recommended: true,
            is_trending: true,
            is_popular: true,
            is_new: false,
            views_count: 1800000,
            source: 'Static Data'
        },
        {
            id: 'my-hero-academia',
            title_ru: 'Моя геройская академия',
            title_en: 'My Hero Academia',
            description: 'В мире, где у большинства людей есть сверхспособности.',
            genres: ['Экшен', 'Комедия', 'Школа'],
            rating: 8.0,
            year: 2016,
            episodes: 138,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21459-2pVGDKXMttXq.jpg',
            banner_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21459-f5QYIqFq1QXA.jpg',
            popularity: 80,
            is_recommended: true,
            is_trending: false,
            is_popular: true,
            is_new: false,
            views_count: 1200000,
            source: 'Static Data'
        },
        {
            id: 'one-piece',
            title_ru: 'Ван Пис',
            title_en: 'One Piece',
            description: 'Монки Д. Луффи и его команда пиратов ищут сокровище.',
            genres: ['Экшен', 'Приключения', 'Комедия'],
            rating: 8.7,
            year: 1999,
            episodes: 1100,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx21-1OquNNCyoWUV.jpg',
            banner_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg',
            popularity: 10,
            is_recommended: true,
            is_trending: false,
            is_popular: true,
            is_new: false,
            views_count: 5000000,
            source: 'Static Data'
        },
        {
            id: 'jujutsu-kaisen',
            title_ru: 'Магическая битва',
            title_en: 'Jujutsu Kaisen',
            description: 'Юдзи Итадори становится сосудом для могущественного проклятия.',
            genres: ['Экшен', 'Сверхъестественное'],
            rating: 8.8,
            year: 2020,
            episodes: 47,
            image_url: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx113415-HlcCk7G7cPcE.jpg',
            popularity: 20,
            is_recommended: true,
            is_trending: true,
            is_popular: true,
            is_new: false,
            views_count: 3200000,
            source: 'Static Data'
        }
    ];

    const fetchAnimeCatalog = async (category: string = 'all') => {
        try {
            setLoading(true);
            setError(null);

            // Имитация загрузки с сервера
            await new Promise(resolve => setTimeout(resolve, 500));

            // Фильтрация данных по категории
            let filteredAnime = [...staticAnime];
            
            switch(category) {
                case 'trending':
                    filteredAnime = filteredAnime.filter(a => a.is_trending);
                    break;
                case 'new':
                    filteredAnime = filteredAnime.filter(a => a.is_new);
                    break;
                case 'popular':
                    filteredAnime = filteredAnime.filter(a => a.is_popular);
                    break;
                default:
                    // Все аниме
                    break;
            }

            setAnimeList(filteredAnime);
            console.log(`Данные каталога получены (${category}):`, filteredAnime.length, 'аниме');
        } catch (err) {
            console.error('Ошибка при загрузке каталога:', err);
            setError('Не удалось загрузить каталог аниме');
            setAnimeList(staticAnime);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = async (category: string) => {
        console.log('Категория изменена:', category);
        setCurrentCategory(category);
        await fetchAnimeCatalog(category);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAnimeCatalog(currentCategory);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchAnimeCatalog('all');
    }, []);

    return (
        <div className={`w-full max-w-[1530px] mx-auto px-4 sm:px-6 lg:px-8 ${hasPreviousSection ? 'mt-[20px]' : 'mt-[35px]'} pb-8`}>
            {/* Заголовок секции */}
            <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-white font-inter text-2xl sm:text-3xl lg:text-[28px] font-bold leading-tight">
                            Каталог аниме
                        </h2>
                        <p className="text-gray-400 font-inter text-sm sm:text-base mt-2">
                            Откройте для себя лучшие аниме в разных категориях
                        </p>
                    </div>

                    {/* Кнопка обновления */}
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing || loading}
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto"
                        title="Обновить каталог"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-300 ${refreshing ? 'animate-spin' : ''}`} />
                        <span className="text-gray-300 text-sm hidden sm:inline">Обновить</span>
                    </button>
                </div>
            </div>

            {/* Селектор категорий */}
            <CategorySelector onCategoryChange={handleCategoryChange} />

            {/* Состояние загрузки */}
            {loading && (
                <div className="mt-8 w-full min-h-[400px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00f8ff]"></div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 justify-items-center">
                        {animeList.map((anime) => (
                            <AnimeCard
                                key={anime.id}
                                imageUrl={anime.image_url}
                                genre={anime.genres?.length > 0 ? anime.genres[0] : 'Аниме'}
                                episodes={`${anime.episodes} эп.`}
                                title={anime.title_ru}
                                rating={anime.rating}
                                animeId={anime.id}
                            />
                        ))}
                    </div>
                    
                    {/* Показать сообщение если нет аниме в категории */}
                    {animeList.length === 0 && (
                        <div className="w-full py-12 text-center">
                            <p className="text-gray-400">В этой категории пока нет аниме</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnimeCatalogSection;