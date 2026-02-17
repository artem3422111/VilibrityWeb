import React from 'react';
import ContinueWatchingCard from './ContinueWatchingCard';
import { watchingData } from './data/watchingData';

const ContinueWatchingSection: React.FC = () => {
    // Фильтруем только те аниме, которые были начаты (watchedPercent > 0)
    const activeAnime = watchingData.filter(anime => anime.watchedPercent > 0);

    // Если нет активных аниме, возвращаем null
    if (activeAnime.length === 0) {
        return null;
    }

    return (
        <div className="w-full mt-6">
            {/* Текст заголовка */}
            <div className="w-full h-[29px] flex flex-row justify-start items-end gap-2.5 px-0 mb-6">
                <h2 className="text-white font-inter text-[28px] font-bold leading-[29px]">
                    Продолжить просмотр
                </h2>
            </div>

            {/* Карточки */}
            <div className="w-full flex flex-row justify-start items-start gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {activeAnime.map((anime) => (
                    <ContinueWatchingCard
                        key={anime.id}
                        anime={anime}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContinueWatchingSection;