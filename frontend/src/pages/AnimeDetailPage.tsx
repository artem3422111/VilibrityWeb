import React from 'react';
import { useParams } from 'react-router-dom';
import AnimeHero from '../components/anime/AnimeHero';
import { useAnimeDetail } from '../hooks/useAnimeDetail';
import { Loader2, AlertCircle } from 'lucide-react';

const AnimeDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { anime, loading, error } = useAnimeDetail(id);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Загрузка аниме...</p>
                </div>
            </div>
        );
    }

    if (error || !anime) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Ошибка загрузки</h2>
                    <p className="text-gray-400 mb-6">{error || 'Аниме не найдено'}</p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-purple-600 text-white rounded-[20px] hover:bg-purple-700 transition-colors"
                    >
                        Вернуться назад
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f]">
            <AnimeHero anime={anime} />

            {/* Дополнительный контент - адаптивная сетка */}
            <div className="container mx-auto px-4 sm:px-8 py-4 sm:py-6 md:py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {/* Левая колонка - основная информация */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        {/* Полное описание */}
                        <div className="bg-white/5 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/10">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-white">
                                Описание
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                                {anime.description || 'Описание отсутствует'}
                            </p>
                        </div>

                        {/* Дополнительная информация (если нужно) */}
                        {anime.genres.length > 5 && (
                            <div className="bg-white/5 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/10 lg:hidden">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white">
                                    Все жанры
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.genres.map((genre, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 bg-white/10 rounded-[16px] text-xs sm:text-sm border border-white/20"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Правая колонка - сайдбар */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Детали */}
                        <div className="bg-white/5 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/10">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white">
                                Детали
                            </h3>
                            <div className="space-y-2 sm:space-y-3 text-gray-300">
                                <div className="flex justify-between text-sm sm:text-base">
                                    <span>Эпизоды:</span>
                                    <span className="text-white font-medium">{anime.episodes || 'Неизвестно'}</span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base">
                                    <span>Статус:</span>
                                    <span className="text-white font-medium">
                                        {anime.status === 'FINISHED' ? 'Завершен' :
                                            anime.status === 'RELEASING' ? 'Онгоинг' :
                                                anime.status === 'NOT_YET_RELEASED' ? 'Анонс' :
                                                    anime.status || 'Неизвестно'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base">
                                    <span>Формат:</span>
                                    <span className="text-white font-medium">
                                        {anime.format === 'TV' ? 'ТВ-сериал' :
                                            anime.format === 'MOVIE' ? 'Фильм' :
                                                anime.format === 'OVA' ? 'OVA' :
                                                    anime.format === 'ONA' ? 'ONA' :
                                                        anime.format === 'SPECIAL' ? 'Спешл' :
                                                            anime.format || 'Неизвестно'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base">
                                    <span>Сезон:</span>
                                    <span className="text-white font-medium">
                                        {anime.season ?
                                            `${anime.season === 'WINTER' ? 'Зима' :
                                                anime.season === 'SPRING' ? 'Весна' :
                                                    anime.season === 'SUMMER' ? 'Лето' :
                                                        anime.season === 'FALL' ? 'Осень' : anime.season} ${anime.seasonYear || ''}`
                                            : 'Неизвестно'}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm sm:text-base">
                                    <span>Рейтинг:</span>
                                    <span className="text-white font-medium">
                                        {anime.meanScore ? (anime.meanScore / 10).toFixed(1) : '0.0'}/10
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Жанры (десктоп) */}
                        <div className="bg-white/5 rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 border border-white/10 hidden lg:block">
                            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white">
                                Жанры
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {anime.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-white/10 rounded-[16px] text-xs sm:text-sm border border-white/20"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetailPage;