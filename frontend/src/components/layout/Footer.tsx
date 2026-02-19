import React from 'react';
import {
    Heart,
    MessageSquare,
    Shield,
    FileText,
    HelpCircle,
    ExternalLink,
    Mail,
    Users,
    Globe,
    Home,
    TrendingUp,
    Star,
    Sparkles
} from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full mt-16 relative overflow-hidden">
            {/* Градиентный фон */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a0a2a] to-[#2d1b69] opacity-90"></div>

            {/* Блестки */}
            <div className="hidden md:block absolute top-10 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="hidden md:block absolute bottom-10 left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

            {/* Контент */}
            <div className="relative z-10 w-full lg:pl-[300px] px-4 sm:px-6 lg:px-8 py-16">
                {/* Верхняя часть футера */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-16">

                    {/* Колонка 1: О проекте */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[16px] bg-gradient-to-br from-[#00f8ff] to-[#9932cc] flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <span className="text-white font-inter font-black text-[24px] lg:text-[32px]">V</span>
                            </div>
                            <div>
                                <h3 className="text-white font-inter font-bold text-[20px] lg:text-[26px] leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                    Vilibrity
                                </h3>
                                <p className="text-gray-300 text-sm">Аниме-стриминг нового поколения</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Платформа для истинных ценителей аниме. Тысячи часов контента,
                            регулярные обновления и превосходное качество.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <a
                                href="https://t.me/VilibrityOfficial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative"
                                aria-label="Telegram канал"
                            >
                                <div className="absolute -inset-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg">
                                    <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                                </div>
                            </a>
                            <div className="group relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                                <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-lg cursor-help" title="Скоро...">
                                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Колонка 2: Быстрая навигация */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-lg lg:text-xl mb-6 lg:mb-8 pb-3 border-b border-white/10 flex items-center gap-3">
                            <Home className="w-4 lg:w-5 h-4 lg:h-5 text-purple-400" />
                            Быстрая навигация
                        </h4>
                        <ul className="space-y-3 lg:space-y-4">
                            {[
                                { icon: Home, label: 'Главная', color: 'text-purple-400' },
                                { icon: TrendingUp, label: 'В тренде', color: 'text-red-400' },
                                { icon: Sparkles, label: 'Новинки', color: 'text-blue-400' },
                                { icon: Star, label: 'Популярное', color: 'text-yellow-400' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-3 group"
                                    >
                                        <div className={`w-7 lg:w-8 h-7 lg:h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors ${item.color}`}>
                                            <item.icon className="w-3 lg:w-4 h-3 lg:h-4" />
                                        </div>
                                        <span className="font-medium text-sm lg:text-base">{item.label}</span>
                                        <div className="ml-auto w-1 h-1 bg-transparent group-hover:bg-purple-500 rounded-full transition-colors"></div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 3: Документы */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-lg lg:text-xl mb-6 lg:mb-8 pb-3 border-b border-white/10 flex items-center gap-3">
                            <Shield className="w-4 lg:w-5 h-4 lg:h-5 text-green-400" />
                            Документы
                        </h4>
                        <ul className="space-y-3 lg:space-y-4">
                            {[
                                { icon: FileText, label: 'Пользовательское соглашение' },
                                { icon: Shield, label: 'Политика конфиденциальности' },
                                { icon: FileText, label: 'Условия использования' },
                                { icon: ExternalLink, label: 'DMCA и авторские права' },
                                { icon: HelpCircle, label: 'Часто задаваемые вопросы' }
                            ].map((item, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-white transition-colors flex items-center gap-3 group"
                                    >
                                        <item.icon className="w-3 lg:w-4 h-3 lg:h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                                        <span className="text-sm lg:text-base">{item.label}</span>
                                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="w-2 lg:w-3 h-2 lg:h-3 text-gray-500" />
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Колонка 4: Контакты */}
                    <div>
                        <h4 className="text-white font-inter font-bold text-lg lg:text-xl mb-6 lg:mb-8 pb-3 border-b border-white/10 flex items-center gap-3">
                            <Mail className="w-4 lg:w-5 h-4 lg:h-5 text-blue-400" />
                            Свяжитесь с нами
                        </h4>
                        <div className="space-y-4 lg:space-y-6">
                            <div className="space-y-3 lg:space-y-4">
                                <a
                                    href="mailto:support@vilibrity.com"
                                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                                        <Mail className="w-4 lg:w-5 h-4 lg:h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <div className="text-xs lg:text-sm text-gray-400">Email</div>
                                        <div className="font-medium text-sm lg:text-base">support@vilibrity.com</div>
                                    </div>
                                </a>
                                <a
                                    href="https://t.me/VilibrityOfficial"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-lg bg-gradient-to-r from-[#0088cc]/20 to-[#0088cc]/30 flex items-center justify-center">
                                        <MessageSquare className="w-4 lg:w-5 h-4 lg:h-5 text-[#0088cc]" />
                                    </div>
                                    <div>
                                        <div className="text-xs lg:text-sm text-gray-400">Telegram</div>
                                        <div className="font-medium text-sm lg:text-base">@VilibrityOfficial</div>
                                    </div>
                                </a>
                            </div>

                            {/* Статус */}
                            <div className="p-3 lg:p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/2 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-300 text-xs lg:text-sm">Статус сервиса</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-green-400 text-xs lg:text-sm font-medium">Online</span>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full w-4/5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
                                </div>
                                <p className="text-gray-500 text-xs mt-2">99.8% uptime за последний месяц</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Разделитель */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

                {/* Нижняя часть футера */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">

                    {/* Левая часть - Копирайт */}
                    <div className="text-center lg:text-left">
                        <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                            <div className="w-5 lg:w-6 h-5 lg:h-6 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                                <span className="text-white text-xs lg:text-sm font-bold">V</span>
                            </div>
                            <span className="text-white font-medium text-sm lg:text-base">Vilibrity</span>
                        </div>
                        <p className="text-gray-400 text-xs lg:text-sm">
                            © {currentYear} Vilibrity Media. Все права защищены.
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Контент предоставлен в ознакомительных целях.
                        </p>
                    </div>

                    {/* Центр - Информация */}
                    <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 lg:w-8 h-6 lg:h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                <span className="text-purple-400 text-xs lg:text-sm font-bold">2.0</span>
                            </div>
                            <div>
                                <div className="text-gray-300 text-xs lg:text-sm font-medium">Версия</div>
                                <div className="text-gray-500 text-xs">Release Candidate</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 lg:w-8 h-6 lg:h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                <Globe className="w-3 lg:w-4 h-3 lg:h-4 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-gray-300 text-xs lg:text-sm font-medium">Регион</div>
                                <div className="text-gray-500 text-xs">Worldwide</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 lg:w-8 h-6 lg:h-8 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 flex items-center justify-center">
                                <Heart className="w-3 lg:w-4 h-3 lg:h-4 text-red-400" />
                            </div>
                            <div>
                                <div className="text-gray-300 text-xs lg:text-sm font-medium">Сделано с</div>
                                <div className="text-gray-500 text-xs">Любовью к аниме</div>
                            </div>
                        </div>
                    </div>

                    {/* Правая часть - Дополнительно */}
                    <div className="text-center lg:text-right">
                        <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg bg-gradient-to-r from-white/5 to-white/2 border border-white/10">
                            <div className="w-2 h-2 lg:w-2 lg:h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-gray-300 text-xs lg:text-sm">Система обновляется в реальном времени</span>
                        </div>
                    </div>
                </div>

                {/* Важное примечание */}
                <div className="mt-8 p-3 lg:p-4 rounded-xl bg-gradient-to-r from-white/3 to-white/1 border border-white/10 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <div className="w-5 lg:w-6 h-5 lg:h-6 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-yellow-400 text-sm">!</span>
                        </div>
                        <div>
                            <h5 className="text-white text-sm lg:text-base font-medium mb-1">Важное примечание</h5>
                            <p className="text-gray-400 text-xs lg:text-sm">
                                Данный проект является демонстрацией веб-разработки. Все аниме данные предоставлены через публичные API (AniList)
                                и используются исключительно в образовательных целях. Проект не предназначен для коммерческого использования
                                или распространения защищенного авторским правом контента.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;