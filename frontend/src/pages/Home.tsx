// frontend/src/pages/Home.tsx
import React from 'react';
import { Play, Star, TrendingUp, Clock, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
    // const trendingAnime = [
    //     { id: 1, title: 'Атака титанов', episodes: 75, rating: 9.0, image: 'https://via.placeholder.com/200x300/641f86/ffffff?text=Titans' },
    //     { id: 2, title: 'Наруто', episodes: 720, rating: 8.7, image: 'https://via.placeholder.com/200x300/00f8ff/000000?text=Naruto' },
    //     { id: 3, title: 'Ван Пис', episodes: 1100, rating: 8.8, image: 'https://via.placeholder.com/200x300/9932cc/ffffff?text=One+Piece' },
    //     { id: 4, title: 'Мастера меча онлайн', episodes: 96, rating: 8.3, image: 'https://via.placeholder.com/200x300/641f86/ffffff?text=SAO' },
    //     { id: 5, title: 'Хоримия', episodes: 13, rating: 8.8, image: 'https://via.placeholder.com/200x300/00f8ff/000000?text=Horimiya' },
    // ];

    // const popularGenres = [
    //     { name: 'Экшен', count: 1250, color: 'from-red-500 to-orange-500' },
    //     { name: 'Приключения', count: 980, color: 'from-blue-500 to-cyan-500' },
    //     { name: 'Комедия', count: 1560, color: 'from-yellow-500 to-amber-500' },
    //     { name: 'Драма', count: 870, color: 'from-purple-500 to-pink-500' },
    //     { name: 'Фэнтези', count: 1340, color: 'from-green-500 to-emerald-500' },
    // ];

    return (
        <div className="space-y-6 lg:space-y-8 w-full overflow-x-hidden">
            {/* Герой секция */}
            <div className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#641f86] to-[#9932cc] p-4 lg:p-8 w-full">
                <div className="relative z-10 max-w-full lg:max-w-3xl">
                    <h1 className="mb-3 lg:mb-4 text-2xl lg:text-5xl font-bold text-white font-inter">
                        Добро пожаловать в <span className="text-[#00f8ff]">Vilibrity</span>
                    </h1>
                    <p className="mb-4 lg:mb-6 text-base lg:text-xl text-gray-200 font-inter">
                        Крупнейшая коллекция аниме в рунете.
                        Смотрите в HD качестве, с субтитрами и озвучкой.
                        Новые серии добавляются ежедневно.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 rounded-[10px] bg-gradient-to-r from-[#00f8ff] to-[#0088cc] px-4 lg:px-6 py-2 lg:py-3 font-inter font-bold text-sm lg:text-lg text-white transition-all hover:opacity-90">
                            <Play className="h-4 w-4" />
                            Начать просмотр
                        </button>
                        <button className="rounded-[10px] border-2 border-white/30 bg-transparent px-4 lg:px-6 py-2 lg:py-3 font-inter font-bold text-sm lg:text-lg text-white transition-all hover:bg-white/10">
                            Подробнее
                        </button>
                    </div>
                </div>

                {/* Декоративные элементы */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#641f86]/50 to-transparent" />
                <div className="absolute -right-10 -top-10 w-32 h-32 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-[#00f8ff]/20 to-transparent" />
            </div>

            {/* Статистика */}
            {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                <div className="rounded-xl lg:rounded-2xl bg-[#212121] p-3 lg:p-6 border border-[#3a3a3a] hover:border-[#641f86] transition-colors">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="rounded-lg lg:rounded-xl bg-gradient-to-br from-[#00f8ff] to-[#0088cc] p-2 lg:p-3">
                            <Play className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-3xl font-bold text-white font-inter">10,000+</p>
                            <p className="text-xs lg:text-base text-gray-400 font-inter">Аниме серий</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl lg:rounded-2xl bg-[#212121] p-3 lg:p-6 border border-[#3a3a3a] hover:border-[#641f86] transition-colors">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="rounded-lg lg:rounded-xl bg-gradient-to-br from-[#9932cc] to-[#641f86] p-2 lg:p-3">
                            <Star className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-3xl font-bold text-white font-inter">9.2</p>
                            <p className="text-xs lg:text-base text-gray-400 font-inter">Средний рейтинг</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl lg:rounded-2xl bg-[#212121] p-3 lg:p-6 border border-[#3a3a3a] hover:border-[#641f86] transition-colors">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="rounded-lg lg:rounded-xl bg-gradient-to-br from-[#00cc88] to-[#008855] p-2 lg:p-3">
                            <TrendingUp className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-3xl font-bold text-white font-inter">500+</p>
                            <p className="text-xs lg:text-base text-gray-400 font-inter">Новых в месяц</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl lg:rounded-2xl bg-[#212121] p-3 lg:p-6 border border-[#3a3a3a] hover:border-[#641f86] transition-colors">
                    <div className="flex items-center gap-2 lg:gap-4">
                        <div className="rounded-lg lg:rounded-xl bg-gradient-to-br from-[#ff6b6b] to-[#cc5555] p-2 lg:p-3">
                            <Clock className="h-5 w-5 lg:h-8 lg:w-8 text-white" />
                        </div>
                        <div>
                            <p className="text-lg lg:text-3xl font-bold text-white font-inter">24/7</p>
                            <p className="text-xs lg:text-base text-gray-400 font-inter">Доступность</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Популярные сейчас */}
            {/* <div className="bg-[#212121] rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-[#3a3a3a]">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-white font-inter">Популярные сейчас</h2>
                    <button className="flex items-center gap-1 lg:gap-2 text-[#00f8ff] hover:text-[#00ccff] transition-colors">
                        <span className="font-inter font-bold text-sm lg:text-base">Все</span>
                        <ChevronRight className="h-4 w-4 lg:h-5 lg:w-5" />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                    {trendingAnime.map((anime) => (
                        <div key={anime.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-lg lg:rounded-xl mb-2 lg:mb-3">
                                <img
                                    src={anime.image}
                                    alt={anime.title}
                                    className="w-full h-32 lg:h-48 object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <div className="absolute bottom-2 left-2 right-2">
                                    <div className="flex items-center gap-1 lg:gap-2">
                                        <div className="flex items-center gap-1 bg-black/70 rounded px-1 lg:px-2 py-1">
                                            <Star className="h-2 w-2 lg:h-3 lg:w-3 text-yellow-400" />
                                            <span className="text-white text-xs lg:text-sm font-bold">{anime.rating}</span>
                                        </div>
                                        <div className="bg-black/70 rounded px-1 lg:px-2 py-1">
                                            <span className="text-white text-xs lg:text-sm">{anime.episodes} эп.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-white font-inter font-bold text-sm lg:text-base text-center group-hover:text-[#00f8ff] transition-colors">
                                {anime.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Популярные жанры */}
            {/* <div className="bg-[#212121] rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-[#3a3a3a]">
                <h2 className="text-lg lg:text-2xl font-bold text-white font-inter mb-4 lg:mb-6">Популярные жанры</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
                    {popularGenres.map((genre) => (
                        <div
                            key={genre.name}
                            className="relative overflow-hidden rounded-lg lg:rounded-xl p-3 lg:p-6 cursor-pointer group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                            <div className="relative z-10">
                                <h3 className="text-base lg:text-2xl font-bold text-white font-inter mb-1 lg:mb-2">{genre.name}</h3>
                                <p className="text-gray-300 font-inter text-xs lg:text-sm">{genre.count} аниме</p>
                                <button className="mt-2 lg:mt-4 text-white font-inter font-bold text-sm flex items-center gap-1 lg:gap-2 hover:gap-2 lg:hover:gap-3 transition-all">
                                    Смотреть
                                    <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}

            {/* Призыв к регистрации */}
            {/* <div className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#212121] to-[#2a2a2a] p-4 lg:p-8 border border-[#641f86] w-full">
                <div className="relative z-10 text-center">
                    <h2 className="mb-3 lg:mb-4 text-xl lg:text-3xl font-bold text-white font-inter">
                        Присоединяйтесь к сообществу
                    </h2>
                    <p className="mb-4 lg:mb-6 text-sm lg:text-base text-gray-300 font-inter">
                        Создайте аккаунт, чтобы сохранять прогресс просмотра,
                        добавлять аниме в избранное и получать персональные рекомендации
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <button className="rounded-[10px] bg-gradient-to-r from-[#641f86] to-[#9932cc] px-4 lg:px-8 py-2 lg:py-3 font-inter font-bold text-sm lg:text-lg text-white transition-all hover:opacity-90">
                            Зарегистрироваться
                        </button>
                        <button className="rounded-[10px] border-2 border-[#641f86] bg-transparent px-4 lg:px-8 py-2 lg:py-3 font-inter font-bold text-sm lg:text-lg text-white transition-all hover:bg-[#641f86]/20">
                            Узнать больше
                        </button>
                    </div>
                </div>

                <div className="absolute -right-5 -top-5 w-20 h-20 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#641f86]/30 to-transparent" />
                <div className="absolute -left-5 -bottom-5 w-20 h-20 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-[#00f8ff]/30 to-transparent" />
            </div> */}
        </div>
    );
};

export default Home;