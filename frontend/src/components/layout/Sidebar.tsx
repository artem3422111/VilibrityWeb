// frontend/src/components/layout/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import {
    Home,
    Flame,
    Clock,
    Heart,
    Folder,
    Swords,
    Compass,
    Laugh,
    Drama,
    Sparkles,
    Heart as HeartRomance,
    Rocket,
    AlertTriangle,
    Menu,
    X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Проверка размера экрана
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Навигационные кнопки
    const navButtons = [
        { id: 'home', label: 'Главная', icon: <Home size={isMobile ? 24 : 32} /> },
        { id: 'category', label: 'Категории', icon: <Flame size={isMobile ? 24 : 32} /> },
        { id: 'recent', label: 'Недавние', icon: <Clock size={isMobile ? 24 : 32} /> },
        { id: 'favorites', label: 'Избранное', icon: <Heart size={isMobile ? 24 : 32} /> },
        { id: 'collection', label: 'Коллекция', icon: <Folder size={isMobile ? 24 : 32} /> },
    ];

    // Жанры
    const genres = [
        { id: 'action', label: 'Экшен', icon: <Swords size={isMobile ? 20 : 32} /> },
        { id: 'adventure', label: 'Приключения', icon: <Compass size={isMobile ? 20 : 32} /> },
        { id: 'comedy', label: 'Комедия', icon: <Laugh size={isMobile ? 20 : 32} /> },
        { id: 'drama', label: 'Драма', icon: <Drama size={isMobile ? 20 : 32} /> },
        { id: 'fantasy', label: 'Фэнтези', icon: <Sparkles size={isMobile ? 20 : 32} /> },
        { id: 'romance', label: 'Романтика', icon: <HeartRomance size={isMobile ? 20 : 32} /> },
        { id: 'scifi', label: 'Научная фантастика', icon: <Rocket size={isMobile ? 20 : 32} /> },
        { id: 'thriller', label: 'Триллер', icon: <AlertTriangle size={isMobile ? 20 : 32} /> },
    ];

    // Карта соответствия меток страниц и их путей
    const pagePaths: Record<string, string> = {
        'Главная': '/',
        'Категории': '/categories',
        'Недавние': '/recent',
        'Избранное': '/favorites',
        'Коллекция': '/collection',
        'Экшен': '/category/action',
        'Приключения': '/category/adventure',
        'Комедия': '/category/comedy',
        'Драма': '/category/drama',
        'Фэнтези': '/category/fantasy',
        'Романтика': '/category/romance',
        'Научная фантастика': '/category/scifi',
        'Триллер': '/category/thriller'
    };

    // Функция для определения активной страницы по URL
    const getActivePageFromPath = (pathname: string): string => {
        if (pathname === '/') return 'Главная';
        if (pathname === '/categories') return 'Категории';
        if (pathname === '/recent') return 'Недавние';
        if (pathname === '/favorites') return 'Избранное';
        if (pathname === '/collection') return 'Коллекция';
        if (pathname.startsWith('/category/')) {
            const category = pathname.split('/')[2];
            const categoryMap: Record<string, string> = {
                'action': 'Экшен',
                'adventure': 'Приключения',
                'comedy': 'Комедия',
                'drama': 'Драма',
                'fantasy': 'Фэнтези',
                'romance': 'Романтика',
                'scifi': 'Научная фантастика',
                'thriller': 'Триллер'
            };
            return categoryMap[category] || 'Главная';
        }
        return 'Главная';
    };

    const activePage = getActivePageFromPath(location.pathname);

    const renderSidebarContent = () => (
        <div className="w-full h-full bg-[#212121] flex flex-col">
            {/* Логотип */}
            <div className="w-full h-[70px] flex flex-row justify-center items-center gap-[10px] py-[10px] px-4">
                <Link
                    to="/"
                    className="flex items-center gap-[10px]"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className={`${isMobile ? 'w-[41px] h-[40px]' : 'w-[51px] h-[50px]'} rounded-[15px] bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center`}>
                        <span className={`text-white font-inter font-black ${isMobile ? 'text-[28px]' : 'text-[36px]'} leading-[44px]`}>V</span>
                    </div>
                    <span className={`text-white font-inter font-black ${isMobile ? 'text-[28px]' : 'text-[36px]'} leading-[44px]`}>Vilibrity</span>
                </Link>
            </div>

            {/* Навигационные кнопки */}
            <div className="w-full flex flex-col justify-start items-start gap-3 py-5 px-4 lg:px-6">
                {navButtons.map((button) => {
                    const path = pagePaths[button.label] || '/';
                    return (
                        <Link
                            key={button.id}
                            to={path}
                            onClick={() => setSidebarOpen(false)}
                            className={`w-full ${isMobile ? 'h-12' : 'h-[50px]'} rounded-[10px] flex flex-row justify-start items-center gap-3 px-4 transition-all duration-200 relative cursor-pointer ${activePage === button.label ? '' : 'bg-transparent hover:bg-[#641f86]'
                                }`}
                            style={activePage === button.label ? {
                                background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                                boxShadow: '0 0 15px rgba(180, 70, 230, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                            } : {}}
                        >
                            {/* Свечение для выбранной кнопки */}
                            {activePage === button.label && (
                                <div
                                    className="absolute inset-0 rounded-[10px] opacity-60"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(200, 100, 255, 0.4), rgba(123, 31, 162, 0.2))',
                                        filter: 'blur(8px)',
                                        zIndex: -1
                                    }}
                                />
                            )}

                            <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} flex items-center justify-center text-white`}>
                                {button.icon}
                            </div>
                            <span className={`text-white font-inter font-bold ${isMobile ? 'text-base' : 'text-[20px]'}`}>
                                {button.label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Жанры */}
            <div className="w-full flex flex-col justify-start items-start gap-3 py-0 px-4 lg:px-6 mt-4">
                <div className="w-full mb-2 px-4">
                    <span className="text-[#808080] font-inter font-bold text-lg">
                        Жанры
                    </span>
                </div>

                {genres.map((genre) => {
                    const path = pagePaths[genre.label] || '/';
                    return (
                        <Link
                            key={genre.id}
                            to={path}
                            onClick={() => setSidebarOpen(false)}
                            className={`w-full ${isMobile ? 'h-12' : 'h-[50px]'} rounded-[10px] flex flex-row justify-start items-center gap-3 px-4 transition-all duration-200 relative cursor-pointer ${activePage === genre.label ? '' : 'bg-transparent hover:bg-[#641f86]'
                                }`}
                            style={activePage === genre.label ? {
                                background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                                boxShadow: '0 0 15px rgba(180, 70, 230, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                            } : {}}
                        >
                            {/* Свечение для выбранной кнопки */}
                            {activePage === genre.label && (
                                <div
                                    className="absolute inset-0 rounded-[10px] opacity-60"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(200, 100, 255, 0.4), rgba(123, 31, 162, 0.2))',
                                        filter: 'blur(8px)',
                                        zIndex: -1
                                    }}
                                />
                            )}

                            <div className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} flex items-center justify-center text-white`}>
                                {genre.icon}
                            </div>
                            <span className={`text-white font-inter font-bold ${isMobile ? 'text-base' : 'text-[20px]'}`}>
                                {genre.label}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Дополнительное пространство внизу */}
            <div className="flex-1"></div>
        </div>
    );

    // Десктопная версия
    if (!isMobile) {
        return (
            <aside className="hidden lg:flex w-[300px] h-screen bg-[#212121] flex-col flex-shrink-0">
                {renderSidebarContent()}
            </aside>
        );
    }

    // Мобильная версия
    return (
        <>
            {/* Кнопка гамбургер для мобильных */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed left-4 top-4 z-40 lg:hidden w-12 h-12 rounded-[10px] bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center shadow-lg"
            >
                <Menu className="h-6 w-6 text-white" />
            </button>

            {/* Мобильное меню (сайдбар) */}
            {sidebarOpen && (
                <>
                    {/* Затемнение фона */}
                    <div
                        className="fixed inset-0 z-40 bg-black/70 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />

                    {/* Сайдбар */}
                    <div className="fixed left-0 top-0 z-50 h-screen w-72 lg:hidden animate-slide-in bg-[#212121]">
                        <div className="relative h-full">
                            {/* Кнопка закрытия */}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="absolute right-4 top-4 z-50 w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center hover:bg-[#641f86] transition-colors"
                            >
                                <X className="h-5 w-5 text-white" />
                            </button>

                            {renderSidebarContent()}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Sidebar;