import React, { useState } from 'react';

type CategoryType = 'all' | 'trending' | 'new' | 'popular';

interface CategorySelectorProps {
    onCategoryChange?: (category: CategoryType) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
    const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

    const categories = [
        {
            id: 'all',
            label: 'Все',
            icon: '📺'
        },
        {
            id: 'trending',
            label: 'В тренде',
            icon: '🔥'
        },
        {
            id: 'new',
            label: 'Новинки',
            icon: '🆕'
        },
        {
            id: 'popular',
            label: 'Популярное',
            icon: '⭐'
        }
    ];

    const handleCategoryClick = (category: CategoryType) => {
        setActiveCategory(category);
        if (onCategoryChange) {
            onCategoryChange(category);
        }
    };

    return (
        <div className="w-full max-w-[460px]">
            {/* Панель выбора категорий */}
            <div className="w-full flex flex-row justify-start items-center p-1 box-border border border-white/5 rounded-[16px] bg-[#2D2D2E] backdrop-blur-sm">
                {categories.map((category) => {
                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id as CategoryType)}
                            className={`h-[39px] px-4 rounded-[12px] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group flex-1 ${
                                isActive
                                    ? 'bg-gradient-to-r from-[#00f8ff] to-[#9932cc] text-white shadow-lg shadow-purple-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {/* Эффект свечения при наведении */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full" />
                            )}

                            {/* Иконка */}
                            <span className="text-sm">{category.icon}</span>

                            {/* Текст */}
                            <span className="font-inter text-[16px] lg:text-[18px] font-medium leading-[20px] text-center whitespace-nowrap">
                                {category.label}
                            </span>

                            {/* Активный индикатор */}
                            {isActive && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Информация о выбранной категории */}
            <div className="mt-3 text-gray-400 text-sm">
                {activeCategory === 'all' && 'Показаны все доступные аниме'}
                {activeCategory === 'trending' && 'Аниме, набирающие популярность'}
                {activeCategory === 'new' && 'Самые свежие релизы'}
                {activeCategory === 'popular' && 'Самые популярные аниме по оценкам'}
            </div>
        </div>
    );
};

export default CategorySelector;