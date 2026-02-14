import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Swords, Compass, Laugh, Drama, Sparkles } from 'lucide-react';

interface Genre {
    id: number;
    name: string;
    count: number;
    color: string;
    icon: React.ReactNode;
    gradient: string;
}

const GenresSection: React.FC = () => {
    const genres: Genre[] = [
        { id: 1, name: 'Экшен', count: 1250, color: 'from-red-500 to-orange-500', icon: <Swords className="h-6 w-6" />, gradient: 'from-red-900/30 to-orange-900/20' },
        { id: 2, name: 'Приключения', count: 980, color: 'from-blue-500 to-cyan-500', icon: <Compass className="h-6 w-6" />, gradient: 'from-blue-900/30 to-cyan-900/20' },
        { id: 3, name: 'Комедия', count: 1560, color: 'from-yellow-500 to-amber-500', icon: <Laugh className="h-6 w-6" />, gradient: 'from-yellow-900/30 to-amber-900/20' },
        { id: 4, name: 'Драма', count: 870, color: 'from-purple-500 to-pink-500', icon: <Drama className="h-6 w-6" />, gradient: 'from-purple-900/30 to-pink-900/20' },
        { id: 5, name: 'Фэнтези', count: 1340, color: 'from-green-500 to-emerald-500', icon: <Sparkles className="h-6 w-6" />, gradient: 'from-green-900/30 to-emerald-900/20' },
    ];

    return (
        <div className="bg-[#212121] rounded-xl p-6 border border-[#3a3a3a]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white font-inter">Популярные жанры</h2>
                    <p className="text-gray-400 text-sm mt-1">Исследуйте аниме по жанрам</p>
                </div>
                <button className="flex items-center gap-2 text-[#00f8ff] hover:text-[#00ccff] transition-colors group">
                    <span className="font-inter font-bold">Все жанры</span>
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {genres.map((genre) => (
                    <div
                        key={genre.id}
                        className="relative overflow-hidden rounded-lg p-4 cursor-pointer group h-32"
                        onClick={() => console.log('Navigate to genre:', genre.name)}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient} opacity-50 group-hover:opacity-70 transition-opacity`} />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${genre.color} bg-opacity-20`}>
                                        {genre.icon}
                                    </div>
                                    <span className="text-xl font-bold text-white">{genre.count}</span>
                                </div>
                                <h3 className="text-lg font-bold text-white font-inter mb-1">{genre.name}</h3>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-gray-300 text-sm">аниме</span>
                                <button className="text-white font-inter font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                    Смотреть
                                    <ChevronRight className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenresSection;