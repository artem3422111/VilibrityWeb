// frontend/src/components/layout/BottomBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Flame, Heart, Folder, User2 } from 'lucide-react';

const BottomBar: React.FC = () => {
    const location = useLocation();

    const navButtons = [
        { id: 'category', label: 'Категории', icon: Flame, path: '/categories' },
        { id: 'favorites', label: 'Избранное', icon: Heart, path: '/favorites' },
        { id: 'home', label: 'Главная', icon: Home, path: '/' },
        { id: 'collection', label: 'Коллекция', icon: Folder, path: '/collection' },
        { id: 'profile', label: 'Профиль', icon: User2, path: '/profile' },
    ];

    // Определяем активную страницу
    const getActivePageFromPath = (pathname: string): string => {
        if (pathname === '/') return 'Главная';
        if (pathname === '/categories') return 'Категории';
        if (pathname === '/recent') return 'Недавние';
        if (pathname === '/favorites') return 'Избранное';
        if (pathname === '/collection') return 'Коллекция';
        if (pathname === '/profile') return 'Профиль';
        return 'Главная';
    };

    const activePage = getActivePageFromPath(location.pathname);

    return (
        <>
            {/* BottomBar для мобильных устройств */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
                {/* Фон панели с градиентной обводкой */}
                <div className="relative h-20">
                    {/* Основной фон панели */}
                    <div className="absolute inset-0 bg-[#212121]/95 backdrop-blur-xl border-t border-gray-800/50" />

                    {/* Градиентная полоска сверху */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#641f86] to-transparent" />

                    {/* Навигационные кнопки */}
                    <div className="relative h-full flex items-center justify-around px-2">
                        {navButtons.map((button, index) => {
                            const Icon = button.icon;
                            const isActive = activePage === button.label;

                            // Позиция активной кнопки в процентах
                            const buttonPosition = (100 / navButtons.length) * index + (100 / navButtons.length) / 2;

                            return (
                                <React.Fragment key={button.id}>
                                    {/* Вырез для активной кнопки */}
                                    {isActive && (
                                        <div
                                            className="absolute top-0 pointer-events-none"
                                            style={{
                                                left: `calc(${buttonPosition}% - 48px)`,
                                                width: '96px'
                                            }}
                                        >
                                        </div>
                                    )}

                                    {/* Кнопка */}
                                    <Link
                                        to={button.path}
                                        className={`relative flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'z-50 -mt-12' : 'mt-2'
                                            }`}
                                    >
                                        {/* Активная кнопка */}
                                        {isActive ? (
                                            <div className="relative">
                                                {/* Свечение */}
                                                <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#641f86]/40 to-[#9932cc]/40 blur-lg" />

                                                {/* Градиентная кнопка */}
                                                <div
                                                    className="relative w-16 h-16 rounded-full flex items-center justify-center"
                                                    style={{
                                                        background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                                                        boxShadow: '0 0 25px rgba(180, 70, 230, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                                                    }}
                                                >
                                                    {/* Внутренний круг */}
                                                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#641f86] to-[#9932cc] opacity-90" />

                                                    {/* Иконка */}
                                                    <Icon className="w-7 h-7 text-white relative z-10" />
                                                </div>

                                                {/* Текст под кнопкой */}
                                                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[#00f8ff] whitespace-nowrap">
                                                    {button.label}
                                                </span>
                                            </div>
                                        ) : (
                                            /* Неактивная кнопка */
                                            <div className="flex flex-col items-center space-y-1">
                                                <div className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center hover:bg-gray-800 transition-colors">
                                                    <Icon className="w-5 h-5 text-gray-400" />
                                                </div>
                                                <span className="text-xs text-gray-500">{button.label}</span>
                                            </div>
                                        )}
                                    </Link>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BottomBar;