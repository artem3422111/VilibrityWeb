// frontend/src/components/layout/Footer.tsx
import React from 'react';
import {
    Heart,
    MessageSquare,
    Shield,
    FileText,
    HelpCircle,
    ExternalLink,
    Mail,
    Globe,
    Home,
    TrendingUp,
    Star,
    Sparkles,
    Github,
    Twitter,
    Instagram
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full relative overflow-hidden bg-[#111111] mt-8 lg:mt-12">
            {/* Градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a0a2a] to-[#2d1b69] opacity-90"></div>

            {/* Декоративные элементы */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

            {/* Контент */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Основная сетка футера */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">

                    {/* Колонка 1: О проекте */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-[16px] bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-transform duration-300">
                                <span className="text-white font-inter font-black text-xl sm:text-2xl lg:text-3xl">V</span>
                            </div>
                            <div>
                                <h3 className="text-white font-inter font-bold text-lg sm:text-xl lg:text-2xl leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Vilibrity
                                </h3>
                                <p className="text-gray-400 text-xs sm:text-sm">Аниме-стриминг</p>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Платформа для истинных ценителей аниме. Тысячи часов контента, регулярные обновления и превосходное качество.
                        </p>

                        {/* Социальные сети */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: MessageSquare, href: 'https://t.me/VilibrityOfficial', label: 'Telegram', color: 'from-[#0088cc] to-[#006699]' },
                                { icon: Github, href: '#', label: 'GitHub', color: 'from-gray-600 to-gray-800' },
                                { icon: Twitter, href: '#', label: 'Twitter', color: 'from-[#1DA1F2] to-[#1a8cd8]' },
                                { icon: Instagram, href: '#', label: 'Instagram', color: 'from-[#E4405F] to-[#D62E7F]' }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    aria-label={social.label}
                                >
                                    <div className={`absolute -inset-2 bg-gradient-to-r ${social.color} rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300`}></div>
                                    <div className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r ${social.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg`}>
                                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Колонка 2: Навигация */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-base sm:text-lg mb-4 sm:mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                            <Home className="w-4 h-4 text-purple-400" />
                            Навигация
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {[
                                { icon: Home, label: 'Главная', href: '/' },
                                { icon: TrendingUp, label: 'Популярное', href: '/trending' },
                                { icon: Sparkles, label: 'Новинки', href: '/new' },
                                { icon: Star, label: 'Избранное', href: '/favorites' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-all flex items-center gap-2 sm:gap-3 group text-sm sm:text-base"
                                    >
                                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                            <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                        </div>
                                        <span>{item.label}</span>
                                        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="w-3 h-3 text-gray-500" />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 3: Информация */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-base sm:text-lg mb-4 sm:mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            Информация
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {[
                                { icon: FileText, label: 'О проекте', href: '/about' },
                                { icon: Shield, label: 'Конфиденциальность', href: '/privacy' },
                                { icon: FileText, label: 'Условия использования', href: '/terms' },
                                { icon: HelpCircle, label: 'FAQ', href: '/faq' },
                                { icon: Mail, label: 'Контакты', href: '/contact' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={item.href}
                                        className="text-gray-400 hover:text-white transition-all flex items-center gap-2 sm:gap-3 group text-sm sm:text-base"
                                    >
                                        <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                                        <span>{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 4: Контакты и статус */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-base sm:text-lg mb-4 sm:mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            Контакты
                        </h4>
                        
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                            <a
                                href="mailto:support@vilibrity.com"
                                className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gray-500">Email</div>
                                    <div className="text-sm truncate">support@vilibrity.com</div>
                                </div>
                            </a>
                            
                            <a
                                href="https://t.me/VilibrityOfficial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-all flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#0088cc]/10 flex items-center justify-center group-hover:bg-[#0088cc]/20 transition-colors">
                                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#0088cc]" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gray-500">Telegram</div>
                                    <div className="text-sm truncate">@VilibrityOfficial</div>
                                </div>
                            </a>
                        </div>

                        {/* Статус сервиса */}
                        <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-xs sm:text-sm">Статус сервиса</span>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                    </div>
                                    <span className="text-green-400 text-xs font-medium">Online</span>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full w-[99.8%] bg-gradient-to-r from-green-500 to-emerald-400 rounded-full animate-pulse"></div>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">99.8% аптайм</p>
                        </div>
                    </div>
                </div>

                {/* Разделитель */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 sm:my-8"></div>

                {/* Нижняя часть футера */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                    {/* Копирайт */}
                    <div className="text-center sm:text-left order-2 sm:order-1">
                        <p className="text-gray-400 text-xs sm:text-sm">
                            © {currentYear} Vilibrity Media. Все права защищены.
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Контент предоставлен в ознакомительных целях.
                        </p>
                    </div>

                    {/* Версия и регион */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 order-1 sm:order-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center">
                                <span className="text-purple-400 text-xs font-bold">2.0</span>
                            </div>
                            <span className="text-gray-300 text-xs">RC</span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Globe className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300 text-xs">Worldwide</span>
                        </div>

                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-gray-300 text-xs">С любовью</span>
                        </div>
                    </div>

                    {/* Системный статус */}
                    <div className="order-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                            <div className="relative">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>
                            </div>
                            <span className="text-gray-300 text-xs whitespace-nowrap">Live</span>
                        </div>
                    </div>
                </div>

                {/* Важное примечание для мобильных */}
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-yellow-400 text-xs">!</span>
                        </div>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            Демонстрационный проект. Все данные предоставлены через публичные API и используются в образовательных целях.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;