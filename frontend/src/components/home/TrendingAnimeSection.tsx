import React from 'react';
import { ChevronRight, Star } from 'lucide-react';

interface Anime {
    id: number;
    title: string;
    episodes: number;
    rating: number;
    image: string;
    genres?: string[];
    year?: number;
}

const TrendingAnimeSection: React.FC = () => {
    const trendingAnime: Anime[] = [
        { id: 1, title: 'Атака титанов', episodes: 75, rating: 9.0, image: '', genres: ['Экшен', 'Драма', 'Фэнтези'], year: 2013 },
        { id: 2, title: 'Наруто', episodes: 720, rating: 8.7, image: '', genres: ['Экшен', 'Приключения'], year: 2002 },
        { id: 3, title: 'Ван Пис', episodes: 1100, rating: 8.8, image: '', genres: ['Экшен', 'Комедия'], year: 1999 },
        { id: 4, title: 'Мастера меча онлайн', episodes: 96, rating: 8.3, image: '', genres: ['Экшен', 'Фэнтези'], year: 2012 },
        { id: 5, title: 'Хоримия', episodes: 13, rating: 8.8, image: '', genres: ['Романтика', 'Комедия'], year: 2021 },
    ];

    return (
        <div className="bg-[#212121] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-inter">Популярные сейчас</h2>
                    <p className="text-gray-400 text-sm mt-1">Самые популярные аниме этой недели</p>
                </div>
                <button className="flex items-center gap-2 text-[#00f8ff] hover:text-[#00ccff] transition-colors group">
                    <span className="font-inter font-bold">Все</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {trendingAnime.map((anime) => (
                    <div
                        key={anime.id}
                        className="group cursor-pointer"
                        onClick={() => console.log('Navigate to anime:', anime.id)}
                    >
                        <div className="relative overflow-hidden rounded-lg mb-3 aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                            {/* Информация о рейтинге */}
                            <div className="absolute top-2 right-2 z-10">
                                <div className="flex items-center gap-1 bg-black/80 rounded-full px-2 py-1">
                                    <Star className="h-3 w-3 text-yellow-400" />
                                    <span className="text-white text-xs font-bold">{anime.rating}</span>
                                </div>
                            </div>

                            {/* Информация об эпизодах */}
                            <div className="absolute bottom-2 left-2">
                                <div className="bg-black/70 rounded px-2 py-1">
                                    <span className="text-white text-xs">{anime.episodes} эп.</span>
                                </div>
                            </div>

                            {/* Год выпуска */}
                            {anime.year && (
                                <div className="absolute top-2 left-2">
                                    <div className="bg-blue-600/80 rounded px-2 py-1">
                                        <span className="text-white text-xs">{anime.year}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-2">
                            <h3 className="text-white font-inter font-bold text-center group-hover:text-[#00f8ff] transition-colors line-clamp-2">
                                {anime.title}
                            </h3>
                            {anime.genres && (
                                <div className="flex flex-wrap justify-center gap-1 mt-2">
                                    {anime.genres.slice(0, 2).map((genre, index) => (
                                        <span
                                            key={index}
                                            className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingAnimeSection;