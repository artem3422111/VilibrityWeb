// frontend/src/pages/Categories.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <div>
            <h1 className="mb-6 text-3xl font-bold text-white">Категории</h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <Card key={category.name} className="border-gray-800 bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-lg ${category.color}`}>
                                    {category.icon}
                                </div>
                                <span className="text-2xl font-bold text-white">{category.count}</span>
                            </div>
                            <CardTitle className="text-white mt-4">{category.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-400">
                                Нажмите, чтобы просмотреть все аниме в категории "{category.name}"
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Categories;