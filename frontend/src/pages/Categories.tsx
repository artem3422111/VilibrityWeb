import React from 'react';
import { Swords, Compass, Laugh, Drama, Sparkles, Heart, Rocket, AlertTriangle } from 'lucide-react';

const Categories: React.FC = () => {
    const categories = [
        { name: 'Экшен', icon: <Swords className="h-8 w-8" />, count: 1234, color: 'bg-red-500/20' },
        { name: 'Приключения', icon: <Compass className="h-8 w-8" />, count: 987, color: 'bg-blue-500/20' },
        { name: 'Комедия', icon: <Laugh className="h-8 w-8" />, count: 1567, color: 'bg-yellow-500/20' },
        { name: 'Драма', icon: <Drama className="h-8 w-8" />, count: 876, color: 'bg-purple-500/20' },
        { name: 'Фэнтези', icon: <Sparkles className="h-8 w-8" />, count: 1345, color: 'bg-green-500/20' },
        { name: 'Романтика', icon: <Heart className="h-8 w-8" />, count: 765, color: 'bg-pink-500/20' },
        { name: 'Научная фантастика', icon: <Rocket className="h-8 w-8" />, count: 543, color: 'bg-indigo-500/20' },
        { name: 'Триллер', icon: <AlertTriangle className="h-8 w-8" />, count: 432, color: 'bg-orange-500/20' },
    ];

    return (
        <div className="pt-4 lg:pt-0">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Категории</h1>
                <p className="text-gray-400">Исследуйте аниме по различным жанрам и категориям</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className="border border-gray-800 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors p-6 cursor-pointer hover:border-purple-600/50 hover:scale-[1.02] transition-all duration-300"
                        onClick={() => console.log(`Navigate to category: ${category.name}`)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${category.color}`}>
                                {category.icon}
                            </div>
                            <span className="text-2xl font-bold text-white">{category.count}</span>
                        </div>
                        <h3 className="text-white text-xl font-bold mb-3">{category.name}</h3>
                        <p className="text-gray-400 text-sm">
                            Нажмите, чтобы просмотреть все аниме в категории "{category.name}"
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-800">
                            <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
                                Просмотреть →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;