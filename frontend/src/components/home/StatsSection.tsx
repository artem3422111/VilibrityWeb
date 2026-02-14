import React from 'react';
import { Play, Star, TrendingUp, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
    const stats = [
        {
            id: 1,
            title: 'Аниме серий',
            value: '10,000+',
            icon: Play,
            gradient: 'from-[#00f8ff] to-[#0088cc]',
            description: 'Более 10 тысяч серий аниме'
        },
        {
            id: 2,
            title: 'Средний рейтинг',
            value: '9.2',
            icon: Star,
            gradient: 'from-[#9932cc] to-[#641f86]',
            description: 'Высокий рейтинг контента'
        },
        {
            id: 3,
            title: 'Новых в месяц',
            value: '500+',
            icon: TrendingUp,
            gradient: 'from-[#00cc88] to-[#008855]',
            description: 'Постоянное обновление'
        },
        {
            id: 4,
            title: 'Доступность',
            value: '24/7',
            icon: Clock,
            gradient: 'from-[#ff6b6b] to-[#cc5555]',
            description: 'Круглосуточный доступ'
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={stat.id}
                        className="rounded-xl bg-[#212121] p-4 border border-[#3a3a3a] hover:border-[#641f86] transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <div className={`rounded-lg bg-gradient-to-br ${stat.gradient} p-3 group-hover:scale-110 transition-transform`}>
                                <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white font-inter">{stat.value}</p>
                                <p className="text-sm text-gray-400 font-inter">{stat.title}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsSection;