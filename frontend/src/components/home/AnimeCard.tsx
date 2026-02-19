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
}

const AnimeCard: React.FC<AnimeCardProps> = ({
    imageUrl,
    genre,
    episodes,
    title,
    rating = 0,
    animeId
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const linkUrl = animeId ? `/anime/${animeId}` : '#';

    const handleWatchClick = (e: React.MouseEvent) => {
        if (!animeId) return;
        e.stopPropagation();
        window.open(linkUrl, '_self');
    };

    return (
        <Link to={linkUrl} className="block w-full h-full">
            <div
                className="relative w-full max-w-[270px] mx-auto h-[450px] rounded-[18px] overflow-hidden bg-[#212121] transition-all duration-300 cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    boxShadow: isHovered
                        ? '0px 10px 25px 0px rgba(153, 50, 204, 0.8)'
                        : 'none'
                }}
            >
                {/* Изображение с затемнением при наведении */}
                <div className="relative w-full h-[334px] overflow-hidden">
                    {/* Фоновое изображение */}
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    />

                    {/* Затемнение при наведении */}
                    <div className={`absolute inset-0 transition-all duration-300 ${
                        isHovered ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' : ''
                    }`} />

                    {/* Рейтинг в правом верхнем углу */}
                    <div className="absolute top-3 right-3 w-12 h-6 bg-black/70 backdrop-blur-sm rounded-[4px] flex items-center justify-center gap-1">
                        <span className="text-yellow-400 text-[12px]">★</span>
                        <span className="text-white font-inter text-[12px] font-bold">
                            {rating.toFixed(1)}
                        </span>
                    </div>

                    {/* Кнопка "Смотреть" при наведении */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <button
                            onClick={handleWatchClick}
                            className="w-[160px] h-[40px] flex flex-row justify-center items-center gap-[8px] px-[15px] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                background: 'linear-gradient(135deg, #00f8ff, #9932cc)',
                                borderRadius: '10px',
                                boxShadow: '0 4px 20px rgba(153, 50, 204, 0.4)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #00e5e5, #8a2be2)';
                                e.currentTarget.style.boxShadow = '0 6px 25px rgba(153, 50, 204, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #00f8ff, #9932cc)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(153, 50, 204, 0.4)';
                            }}
                        >
                            <Play className="w-4 h-4 text-white" />
                            <span className="text-white font-inter text-[14px] font-semibold">
                                Смотреть
                            </span>
                        </button>
                    </div>
                </div>

                {/* Информация */}
                <div className="w-full h-[116px] bg-[#212121] px-[15px] pt-[15px]">
                    {/* Название */}
                    <div className="w-full h-[52px] mb-[12px]">
                        <span className="w-full text-white font-inter text-[16px] font-semibold leading-[20px] line-clamp-2">
                            {title}
                        </span>
                    </div>

                    {/* Жанр и эпизоды */}
                    <div className="w-full h-[17px] flex flex-row justify-between items-center">
                        <span className="text-[#797979] font-inter text-[12px] font-medium leading-[17px] truncate max-w-[140px]">
                            {genre}
                        </span>
                        <span className="text-[#797979] font-inter text-[12px] font-medium leading-[17px] truncate max-w-[80px]">
                            {episodes}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;