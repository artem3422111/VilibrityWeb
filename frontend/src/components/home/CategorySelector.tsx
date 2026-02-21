// frontend/src/components/home/CategorySelector.tsx
import React, { useState } from 'react';

type CategoryType = 'all' | 'trending' | 'new' | 'popular';

interface CategorySelectorProps {
    onCategoryChange?: (category: CategoryType) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

    const categories = [
        { id: 'all', label: 'Все', icon: '📺' },
        { id: 'trending', label: 'В тренде', icon: '🔥' },
        { id: 'new', label: 'Новинки', icon: '🆕' },
        { id: 'popular', label: 'Популярное', icon: '⭐' },
        { id: 'action', label: 'Экшен', icon: '⚔️' },
        { id: 'romance', label: 'Романтика', icon: '❤️' },
    ];

    const handleCategoryClick = (category: CategoryType) => {
        setActiveCategory(category);
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    return (
        <div className="w-full">
            {/* Панель выбора категорий */}
            <div className="w-full flex flex-row justify-between items-center p-1.5 bg-[#2D2D2E] border border-white/5 rounded-2xl sm:rounded-[20px] backdrop-blur-sm">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id as CategoryType)}
                            className={`
                                flex-1 h-10 sm:h-11 md:h-12 px-2 sm:px-3 md:px-4
                                rounded-xl sm:rounded-2xl
                                transition-all duration-300 
                                flex items-center justify-center gap-1.5 sm:gap-2
                                relative overflow-hidden group
                                ${isActive
                                    ? 'bg-gradient-to-r from-[#00f8ff] to-[#9932cc] text-white shadow-lg shadow-purple-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                                }
                            `}
                        >
                            {/* Эффект свечения при наведении */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full" />
                            )}

                            {/* Иконка */}
                            <span className="text-base sm:text-lg md:text-xl">{category.icon}</span>

                            {/* Текст с адаптивным размером */}
                            <span className={`
                                font-inter font-medium text-center whitespace-nowrap
                                text-xs sm:text-sm md:text-base lg:text-lg
                                ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}
                            `}>
                                {category.label}
                            </span>

                            {/* Активный индикатор */}
                            {isActive && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-white rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Информация о выбранной категории (только на десктопе) */}
            <div className="hidden lg:block mt-3 text-gray-400 text-sm">
                {activeCategory === 'all' && 'Показаны все доступные аниме'}
                {activeCategory === 'trending' && 'Аниме, набирающие популярность'}
                {activeCategory === 'new' && 'Самые свежие релизы'}
                {activeCategory === 'popular' && 'Самые популярные аниме по оценкам'}
            </div>
        </div>
    );
};

export default CategorySelector;