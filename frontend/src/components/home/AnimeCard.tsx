// frontend/src/components/home/AnimeCard.tsx
import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnimeCardProps {
    imageUrl: string;
    genre: string;
    episodes: string;
    title: string;
    rating?: number;
    animeId?: string;
    variant: 'desktop' | 'mobile';
}

const AnimeCard: React.FC<AnimeCardProps> = ({
    imageUrl,
    genre,
    episodes,
    title,
    rating = 0,
    animeId,
    variant
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const linkUrl = animeId ? `/anime/${animeId}` : '#';

    const handleWatchClick = (e: React.MouseEvent) => {
        if (!animeId) return;
        e.stopPropagation();
        window.open(linkUrl, '_self');
    };

    // Мобильная версия (компактная)
    if (variant === 'mobile') {
        return (
            <Link to={linkUrl} className="block w-full">
                <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#212121]">
                    {/* Изображение */}
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />

                    {/* Рейтинг */}
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded-md flex items-center gap-0.5">
                        <span className="text-yellow-400 text-[10px]">★</span>
                        <span className="text-white font-inter text-[10px] font-bold">
                            {rating.toFixed(1)}
                        </span>
                    </div>

                    {/* Информация внизу */}
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/90 to-transparent">
                        <h3 className="text-white font-inter text-xs font-semibold leading-tight line-clamp-2 mb-0.5">
                            {title}
                        </h3>
                        <div className="flex items-center justify-between text-[8px] text-gray-400">
                            <span className="truncate max-w-[60%]">{genre}</span>
                            <span className="truncate max-w-[35%]">{episodes}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Десктопная версия (полная)
    return (
        <Link to={linkUrl} className="block w-full">
            <div
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#212121] transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    boxShadow: isHovered
                        ? '0px 10px 25px 0px rgba(153, 50, 204, 0.8)'
                        : 'none'
                }}
            >
                {/* Изображение */}
                <div className="absolute inset-0">
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />
                </div>

                {/* Затемнение при наведении */}
                <div className={`absolute inset-0 transition-all duration-300 ${isHovered ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' : ''
                    }`} />

                {/* Рейтинг */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-lg flex items-center gap-1 z-10">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white font-inter text-sm font-bold">
                        {rating.toFixed(1)}
                    </span>
                </div>

                {/* Кнопка "Смотреть" при наведении */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    } z-10`}>
                    <button
                        onClick={handleWatchClick}
                        className="w-[140px] h-12 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95 relative"
                        style={{
                            background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                            boxShadow: '0 0 15px rgba(180, 70, 230, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        }}
                    >
                        {/* Свечение для кнопки */}
                        <div
                            className="absolute inset-0 rounded-xl opacity-60"
                            style={{
                                background: 'linear-gradient(135deg, rgba(200, 100, 255, 0.4), rgba(123, 31, 162, 0.2))',
                                filter: 'blur(8px)',
                                zIndex: -1
                            }}
                        />
                        <Play className="w-4 h-4 text-white" />
                        <span className="text-white font-inter text-sm font-semibold">
                            Смотреть
                        </span>
                    </button>
                </div>

                {/* Информация внизу карточки */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/90 to-transparent">
                    <h3 className="text-white font-inter text-sm font-semibold leading-tight line-clamp-2 mb-1">
                        {title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="truncate max-w-[60%]">{genre}</span>
                        <span className="truncate max-w-[35%]">{episodes}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;