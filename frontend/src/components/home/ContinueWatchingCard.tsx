import React from 'react';
import { Play } from 'lucide-react';

interface WatchingAnime {
    id: string;
    title: string;
    imageUrl: string;
    currentEpisode: number;
    totalEpisodes: number;
    watchedPercent: number;
    timeRemaining: number;
}

interface ContinueWatchingCardProps {
    anime: WatchingAnime;
}

const ContinueWatchingCard: React.FC<ContinueWatchingCardProps> = ({
    anime
}) => {
    const formatTime = (minutes: number): string => {
        if (minutes <= 0) return "Завершено";
        if (minutes < 60) return `${minutes} мин`;

        const hours = Math.floor(minutes / 60);
        const mins = Math.round(minutes % 60);
        return `${hours} ч ${mins} мин`;
    };

    const getWatchStatus = (percent: number): string => {
        if (percent >= 90) return "Просмотрено";
        if (percent >= 87.5) return "Почти завершено";
        if (percent >= 35) return "В процессе";
        return "Начато";
    };

    const status = getWatchStatus(anime.watchedPercent);
    const timeText = formatTime(anime.timeRemaining);

    return (
        <div className="w-[190px] sm:w-[220px] md:w-[300px] lg:w-[300px] shrink-0 cursor-pointer group">
            {/* Карточка с изображением */}
            <div className="relative w-full h-[115px] sm:h-[130px] md:h-[180px] lg:h-[180px] rounded-[24px] overflow-hidden mb-3">
                {/* Фоновое изображение с анимацией при наведении */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{
                        backgroundImage: `url("${anime.imageUrl}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />

                {/* Наложение градиента (постоянное) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Дополнительное затемнение при наведении */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 ease-out" />

                {/* Статус */}
                <div className="absolute top-2 left-2 z-10">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${anime.watchedPercent >= 100
                            ? 'bg-green-600/90 text-white'
                            : anime.watchedPercent >= 90
                                ? 'bg-yellow-600/90 text-white'
                                : 'bg-blue-600/90 text-white'
                        }`}>
                        {status}
                    </span>
                </div>

                {/* Кнопка воспроизведения (появляется при наведении) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
                    <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center transform scale-95 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                        <Play className="w-7 h-7 text-gray-900 ml-0.5" />
                    </div>
                </div>

                {/* Прогресс-бар */}
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/20 z-10">
                    <div
                        className="h-full bg-[#6366F1] transition-all duration-300"
                        style={{ width: `${anime.watchedPercent}%` }}
                    />
                </div>
            </div>

            {/* Информация о серии */}
            <div className="w-full">
                {/* Название с эффектом при наведении */}
                <div className="w-full h-[27px] mb-1  ml-[10px]">
                    <h3 className="text-white font-inter text-[14px] sm:text-[16px] md:text-[20px] lg:text-[20px] font-bold leading-[20px] sm:leading-[22px] md:leading-[29px] lg:leading-[29px] text-left truncate group-hover:text-gray-200 transition-colors duration-200">
                        {anime.title}
                    </h3>
                </div>

                {/* Информация об эпизоде и времени */}
                <div className="w-full ml-[10px]">
                    <p className="text-gray-400 font-inter text-[10px] sm:text-[11px] md:text-[14px] lg:text-[14px] font-normal leading-[14px] sm:leading-[15px] md:leading-[17px] lg:leading-[17px] text-left group-hover:text-gray-300 transition-colors duration-200">
                        {anime.totalEpisodes === 1 ? (
                            'Фильм'
                        ) : (
                            `Эпизод ${anime.currentEpisode} • ${timeText}`
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContinueWatchingCard;