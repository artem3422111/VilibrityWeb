import React, { useState, useEffect } from 'react';
import {
    Play,
    Heart,
    ChevronDown,
    Check,
    Star,
    Eye,
    Tv,
    Bookmark,
    Clock,
    X,
    ThumbsDown,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { Anime } from '../utils/api';

interface AnimeHeroProps {
    anime: Anime;
}

const AnimeHero: React.FC<AnimeHeroProps> = ({ anime }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [watchStatus, setWatchStatus] = useState<string>('Не просмотрено');
    const [isFavorite, setIsFavorite] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Проверка на мобильное устройство
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const statusOptions = [
        { label: 'Просмотрено', icon: Check, value: 'watched', color: 'text-green-400' },
        { label: 'Смотрю', icon: Eye, value: 'watching', color: 'text-blue-400' },
        { label: 'Буду смотреть', icon: Bookmark, value: 'planned', color: 'text-yellow-400' },
        { label: 'Отложено', icon: Clock, value: 'on_hold', color: 'text-orange-400' },
        { label: 'Брошено', icon: X, value: 'dropped', color: 'text-red-400' },
        { label: 'Не нравится', icon: ThumbsDown, value: 'not_interested', color: 'text-gray-400' },
    ];

    const handleStatusSelect = (status: string) => {
        setWatchStatus(status);
        setShowDropdown(false);
    };

    // Конвертация рейтинга из 100-балльной системы в 10-балльную
    const displayRating = anime.meanScore ? (anime.meanScore / 10).toFixed(1) : '0.0';

    // Форматирование количества просмотров
    const formatViews = (views: number): string => {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K';
        }
        return views.toString();
    };

    // Получение года из даты старта
    const year = anime.startDate ? new Date(anime.startDate).getFullYear() : anime.seasonYear || 'N/A';

    return (
        <div className="relative w-full min-h-[600px] md:h-[650px] overflow-hidden">
            {/* Фоновый баннер с правильным позиционированием */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${anime.bannerImage || anime.coverImage.large})`,
                    backgroundSize: isMobile ? 'cover' : 'cover',
                    backgroundPosition: isMobile ? '30% center' : 'center center', // Смещение для мобильных
                }}
            >
                {/* Затемнение для мобильных - более сильное */}
                <div className={`absolute inset-0 ${isMobile ? 'bg-black/60' : 'bg-black/20'}`} />

                {/* Градиенты - разные для мобильных и десктопа */}
                {isMobile ? (
                    // Мобильные градиенты (более темные)
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-transparent" />
                    </>
                ) : (
                    // Десктопные градиенты
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/40 to-transparent" />
                    </>
                )}
            </div>

            {/* Альтернативный фон для мобильных если баннер не подходит */}
            {isMobile && !anime.bannerImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${anime.coverImage.large})`,
                        filter: 'blur(10px) brightness(0.5)',
                        transform: 'scale(0.5)',
                    }}
                />
            )}

            {/* Контент */}
            <div className="relative container mx-auto px-4 sm:px-8 h-full py-6 md:py-0 flex flex-col md:flex-row items-center z-10">
                {/* Постер - адаптивная ширина */}
                <div className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[280px] lg:w-[320px] xl:w-[400px] h-[240px] sm:h-[300px] md:h-[420px] lg:h-[480px] xl:h-[550px] rounded-[12px] sm:rounded-[16px] md:rounded-[24px] overflow-hidden shadow-2xl z-10 border-2 border-white/10 mb-4 md:mb-0 md:mr-6 lg:mr-8">
                    <img
                        src={anime.coverImage.large}
                        alt={anime.title_ru}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=No+Image';
                        }}
                    />
                </div>

                {/* Информация об аниме */}
                <div className="flex-1 text-white z-10 w-full md:max-w-2xl">
                    {/* Верхняя мета-информация - адаптивный wrap */}
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-3 mb-3 md:mb-6">
                        <span className="px-2.5 md:px-4 py-1 md:py-1.5 bg-white/10 rounded-[16px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                            {year}
                        </span>
                        {anime.studio && (
                            <span className="px-2.5 md:px-4 py-1 md:py-1.5 bg-white/10 rounded-[16px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                                {anime.studio}
                            </span>
                        )}
                        <span className="px-2.5 md:px-4 py-1 md:py-1.5 bg-white/10 rounded-[16px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                            {anime.status === 'FINISHED' ? 'Завершен' :
                                anime.status === 'RELEASING' ? 'Онгоинг' :
                                    anime.status || 'Неизвестно'}
                        </span>
                        {anime.format && (
                            <span className="px-2.5 md:px-4 py-1 md:py-1.5 bg-white/10 rounded-[16px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-xs md:text-sm">
                                {anime.format === 'TV' ? 'ТВ' :
                                    anime.format === 'MOVIE' ? 'Фильм' :
                                        anime.format === 'OVA' ? 'OVA' :
                                            anime.format || 'Неизвестно'}
                            </span>
                        )}
                    </div>

                    {/* Названия - адаптивные размеры */}
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2 line-clamp-2">
                        {anime.title_ru}
                    </h1>
                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 mb-3 md:mb-8 line-clamp-1">
                        {anime.title_en}
                    </p>

                    {/* Жанры - адаптивный wrap */}
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                        {anime.genres.slice(0, isMobile ? 3 : 5).map((genre, index) => (
                            <span
                                key={index}
                                className="px-2 md:px-4 py-0.5 md:py-1.5 bg-white/10 rounded-[12px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-[10px] md:text-sm"
                            >
                                {genre}
                            </span>
                        ))}
                        {anime.genres.length > (isMobile ? 3 : 5) && (
                            <span className="px-2 md:px-4 py-0.5 md:py-1.5 bg-white/10 rounded-[12px] md:rounded-[20px] backdrop-blur-sm border border-white/20 text-[10px] md:text-sm">
                                +{anime.genres.length - (isMobile ? 3 : 5)}
                            </span>
                        )}
                    </div>

                    {/* Статистика - адаптивная сетка */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 md:gap-2 mb-3 md:mb-6">
                        <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-3 bg-white/5 rounded-[12px] md:rounded-[20px] border border-white/10">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-[8px] md:rounded-[16px] bg-yellow-500/20 flex items-center justify-center">
                                <Star className="w-3 h-3 md:w-5 md:h-5 text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-sm md:text-xl font-bold">{displayRating}</div>
                                <div className="text-gray-400 text-[8px] md:text-xs">Рейтинг</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-3 bg-white/5 rounded-[12px] md:rounded-[20px] border border-white/10">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-[8px] md:rounded-[16px] bg-blue-500/20 flex items-center justify-center">
                                <Eye className="w-3 h-3 md:w-5 md:h-5 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-sm md:text-xl font-bold">{formatViews(anime.views_count)}</div>
                                <div className="text-gray-400 text-[8px] md:text-xs">Просмотры</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-3 bg-white/5 rounded-[12px] md:rounded-[20px] border border-white/10">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-[8px] md:rounded-[16px] bg-purple-500/20 flex items-center justify-center">
                                <Tv className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-sm md:text-xl font-bold">{anime.episodes || '?'}</div>
                                <div className="text-gray-400 text-[8px] md:text-xs">Эпизоды</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 md:gap-2 p-1.5 md:p-3 bg-white/5 rounded-[12px] md:rounded-[20px] border border-white/10">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-[8px] md:rounded-[16px] bg-red-500/20 flex items-center justify-center">
                                <TrendingUp className="w-3 h-3 md:w-5 md:h-5 text-red-400" />
                            </div>
                            <div>
                                <div className="text-sm md:text-xl font-bold">#{anime.popularity > 0 ? Math.floor(anime.popularity / 1000) : '-'}</div>
                                <div className="text-gray-400 text-[8px] md:text-xs">Попул.</div>
                            </div>
                        </div>
                    </div>

                    {/* Описание - скрыто на мобильных */}
                    {!isMobile && (
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
                            {anime.description || 'Описание отсутствует'}
                        </p>
                    )}

                    {/* Кнопки действий - адаптивная верстка */}
                    <div className="flex flex-row flex-wrap items-center gap-2 md:gap-3">
                        <button
                            className="px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-4 rounded-[12px] md:rounded-[20px] flex items-center gap-1.5 md:gap-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 z-[999] flex-1 sm:flex-none min-w-[100px] sm:min-w-[140px] justify-center"
                            style={{
                                background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                                boxShadow: '0 10px 30px rgba(180, 70, 230, 0.3)',
                            }}
                        >
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                            <span className="text-xs sm:text-sm md:text-base">Смотреть</span>
                        </button>

                        {/* Выпадающее меню статуса */}
                        <div className="relative z-[9999] flex-1 sm:flex-none">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="w-full px-2 sm:px-3 md:px-5 py-2 sm:py-2.5 md:py-4 bg-white/10 backdrop-blur-sm rounded-[12px] md:rounded-[20px] flex items-center gap-1 md:gap-2 hover:bg-white/20 transition-colors border border-white/20 justify-center"
                            >
                                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                                    {watchStatus === 'Не просмотрено' ? 'Статус' : watchStatus}
                                </span>
                                <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-300 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-full sm:w-56 bg-gray-900/95 backdrop-blur-lg rounded-[12px] md:rounded-[20px] shadow-2xl border border-gray-700 overflow-hidden z-[9999]">
                                    {statusOptions.map((option) => {
                                        const IconComponent = option.icon;
                                        return (
                                            <button
                                                key={option.value}
                                                onClick={() => handleStatusSelect(option.label)}
                                                className="w-full px-2 md:px-4 py-2 md:py-3 text-left hover:bg-gray-800/80 flex items-center justify-between transition-colors group"
                                            >
                                                <div className="flex items-center gap-1.5 md:gap-3">
                                                    <IconComponent className={`w-3 h-3 md:w-4 md:h-4 ${option.color}`} />
                                                    <span className="text-gray-200 group-hover:text-white text-xs md:text-sm">
                                                        {option.label}
                                                    </span>
                                                </div>
                                                {watchStatus === option.label && (
                                                    <Check className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Кнопка избранного */}
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-2 sm:p-2.5 md:p-4 bg-white/10 backdrop-blur-sm rounded-[12px] md:rounded-[20px] hover:bg-white/20 transition-colors border border-white/20 z-[999] group flex-none"
                        >
                            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors ${isFavorite ? 'fill-red-400 text-red-400' : 'text-gray-300 group-hover:text-red-400'
                                }`} />
                        </button>
                    </div>

                    {/* Краткое описание для мобильных */}
                    {isMobile && anime.description && (
                        <p className="text-xs text-gray-300 mt-3 line-clamp-2">
                            {anime.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Градиент внизу */}
            <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'h-32' : 'h-40'} bg-gradient-to-t from-[#111111] to-transparent z-0`} />
        </div>
    );
};

export default AnimeHero;