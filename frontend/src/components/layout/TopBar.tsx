// frontend/src/components/layout/TopBar.tsx
import React, { useState } from 'react';
import { Search, Bell, Settings, User, Coins, Gem, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const TopBar: React.FC = () => {
    const location = useLocation();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notificationsCount] = useState(3);
    const [searchOpen, setSearchOpen] = useState(false);

    // Функция для получения хлебных крошек на основе текущего пути
    const getBreadcrumbsFromPath = (pathname: string): string[] => {
        if (pathname === '/') return ['Главная'];
        if (pathname === '/categories') return ['Категории'];
        if (pathname === '/recent') return ['Недавние'];
        if (pathname === '/favorites') return ['Избранное'];
        if (pathname === '/collection') return ['Коллекция'];
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
            const categoryName = categoryMap[category] || category;
            return ['Категории', categoryName];
        }
        return ['Главная'];
    };

    const breadcrumbs = getBreadcrumbsFromPath(location.pathname);

    const renderBreadcrumbs = () => {
        if (breadcrumbs.length === 1) {
            return (
                <span className="text-white font-inter text-sm font-normal leading-5">
                    {breadcrumbs[0]}
                </span>
            );
        } else {
            return (
                <div className="flex items-center gap-2 lg:gap-4">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span className="text-white font-inter text-sm font-normal leading-5">
                                {crumb}
                            </span>
                            {index < breadcrumbs.length - 1 && (
                                <div className="w-2 h-5 text-gray-400">{'>'}</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            );
        }
    };

    // Данные валют пользователя
    const userCurrency = {
        vic: 1024,
        vig: 128
    };

    return (
        <>
            {/* TopBar для десктопа */}
            <div className="hidden lg:flex w-full h-[70px] backdrop-blur-[30px] bg-[#111111]/80 border-b border-gray-800/50 z-30">
                <div className="w-full h-full px-4 lg:px-8 flex items-center justify-between">
                    {/* Левая часть - хлебные крошки */}
                    <div className="w-[250px] h-[44px] flex flex-row justify-start items-center gap-4">
                        <div className="flex items-center gap-4">
                            {renderBreadcrumbs()}
                        </div>
                    </div>

                    {/* Центральная часть - поиск */}
                    <div className="flex-1 max-w-[700px] h-[44px] rounded-[15px] bg-[#222222] flex items-center px-4 gap-3 border border-gray-700/50 hover:border-gray-600/50 transition-colors mx-4">
                        <Search className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Поиск аниме, серий, персонажей..."
                            className="w-full bg-transparent border-none outline-none text-gray-300 font-inter text-sm font-normal leading-[18px] placeholder:text-gray-500"
                        />
                    </div>

                    {/* Правая часть - валюта, иконки и пользователь */}
                    <div className="flex flex-row justify-end items-center gap-2 lg:gap-4 py-[5px]">
                        {/* Уведомления с счетчиком */}
                        {/* <div className="relative hidden lg:block">
                            <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-800/50 rounded-lg transition-colors group relative">
                                <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-300 group-hover:text-white transition-colors" />
                                {notificationsCount > 0 && (
                                    <>
                                        <span className="absolute -top-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">{notificationsCount}</span>
                                        </span>
                                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/10 to-red-600/10 animate-pulse"></div>
                                    </>
                                )}
                            </button>
                        </div> */}

                        {/* Настройки */}
                        {/* <button className="hidden lg:flex w-10 h-10 items-center justify-center hover:bg-gray-800/50 rounded-lg transition-colors group">
                            <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-gray-300 group-hover:text-white transition-colors group-hover:rotate-90 transition-transform duration-300" />
                        </button> */}

                        {/* Разделитель */}
                        <div className="hidden lg:block w-px h-8 bg-gray-700/50 mx-1"></div>

                        {/* ViCoin (бесплатная валюта) */}
                        <div className="hidden lg:flex items-center gap-1 px-[18px] py-[8px] rounded-full bg-gradient-to-r from-yellow-900/20 to-yellow-800/10 border border border-yellow-800/30 hover:border-yellow-700/50 transition-colors group cursor-pointer">
                            <div className="relative">
                                <Coins className="w-2 h-2 lg:w-5 lg:h-5 text-yellow-400" />
                                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-sm group-hover:bg-yellow-400/30 transition-colors"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-yellow-300 font-inter font-bold text-sm">{userCurrency.vic}</span>
                                {/* <span className="text-yellow-500/70 font-inter text-xs">ViC</span> */}
                            </div>
                        </div>

                        {/* ViGem (платная валюта) */}
                        <div className="hidden lg:flex items-center gap-1 px-[18px] py-[8px] rounded-full bg-gradient-to-r from-purple-900/20 to-purple-800/10 border border-purple-800/30 hover:border-purple-700/50 transition-colors group cursor-pointer">
                            <div className="relative">
                                <Gem className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                                <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-sm group-hover:bg-purple-400/30 transition-colors"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-purple-300 font-inter font-bold text-sm">{userCurrency.vig}</span>
                                {/* <span className="text-purple-500/70 font-inter text-xs">ViG</span> */}
                            </div>
                        </div>

                        {/* Профиль пользователя */}
                        <div className="relative">
                            <button
                                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 transition-colors group"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                            >
                                <div className="relative">
                                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center overflow-hidden">
                                        <User className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00f8ff]/30 to-[#9932cc]/30 blur-sm group-hover:blur-md transition-all"></div>
                                </div>
                                <span className="hidden lg:inline text-gray-300 font-inter text-sm font-medium group-hover:text-white transition-colors">
                                    Пользователь
                                </span>
                                <ChevronDown className={`hidden lg:block w-3 h-3 lg:w-4 lg:h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Выпадающее меню профиля */}
                            {userMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setUserMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden backdrop-blur-xl">
                                        {/* Заголовок профиля */}
                                        <div className="p-4 border-b border-gray-800/50 bg-gradient-to-r from-[#111111] to-[#1a1a1a]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center">
                                                    <User className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-inter font-bold">Пользователь</h3>
                                                    <p className="text-gray-400 font-inter text-sm">Уровень: Новичок</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Баланс в меню */}
                                        <div className="p-4 border-b border-gray-800/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-400 font-inter text-sm">Ваш баланс:</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Coins className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-white font-inter text-sm">ViCoin</span>
                                                    </div>
                                                    <span className="text-yellow-300 font-inter font-bold">{userCurrency.vic}</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Gem className="w-4 h-4 text-purple-400" />
                                                        <span className="text-white font-inter text-sm">ViGem</span>
                                                    </div>
                                                    <span className="text-purple-300 font-inter font-bold">{userCurrency.vig}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Меню действий */}
                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                                                <User className="w-4 h-4" />
                                                <span className="font-inter text-sm">Мой профиль</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                                                <Settings className="w-4 h-4" />
                                                <span className="font-inter text-sm">Настройки</span>
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                                                <Coins className="w-4 h-4 text-yellow-400" />
                                                <span className="font-inter text-sm">Пополнить баланс</span>
                                            </button>
                                        </div>

                                        {/* Выход */}
                                        <div className="p-2 border-t border-gray-800/50">
                                            <button className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span className="font-inter text-sm">Выйти</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* TopBar для телефона */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 backdrop-blur-[30px] bg-[#111111]/80 border-b border-gray-800/50 z-40">
                <div className="w-full h-full px-4 flex items-center justify-between">
                    {/* Левая часть: валюты */}
                    <div className="flex items-center gap-4">
                        {/* ViC (бесплатная валюта) */}
                        <div className="flex items-center gap-1 px-[18px] py-[8px] rounded-full bg-gradient-to-r from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-300 font-inter font-bold text-sm">{userCurrency.vic}</span>
                        </div>

                        {/* ViG (платная валюта) */}
                        <div className="flex items-center gap-1 px-[18px] py-[8px] rounded-full bg-gradient-to-r from-purple-900/20 to-purple-800/10 border border-purple-800/30">
                            <Gem className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-300 font-inter font-bold text-sm">{userCurrency.vig}</span>
                        </div>
                    </div>

                    {/* Правая часть: иконки */}
                    <div className="flex items-center gap-2">
                        {/* Кнопка поиска */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-gray-800/50 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5 text-gray-300" />
                        </button>

                        {/* Уведомления */}
                        <button className="relative w-10 h-10 flex items-center justify-center hover:bg-gray-800/50 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-gray-300" />
                            {notificationsCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{notificationsCount}</span>
                                </span>
                            )}
                        </button>

                        {/* Настройки */}
                        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-800/50 rounded-full transition-colors">
                            <Settings className="w-5 h-5 text-gray-300" />
                        </button>
                    </div>
                </div>

                {/* Строка поиска для мобильных устройств */}
                {searchOpen && (
                    <div className="absolute top-full left-0 right-0 p-3 bg-[#111111] border-b border-gray-800/90 z-50">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Поиск аниме..."
                                className="w-full h-10 rounded-[15px] bg-[#222222] border border-gray-700/90 pl-12 pr-4 text-gray-300 placeholder:text-gray-500 outline-none"
                                autoFocus
                                onBlur={() => setSearchOpen(false)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TopBar;