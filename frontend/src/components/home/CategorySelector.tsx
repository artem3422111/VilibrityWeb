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
                                transition-all duration-200 
                                flex items-center justify-center gap-1.5 sm:gap-2
                                relative
                                ${isActive 
                                    ? '' // Стили применяются через inline style
                                    : 'bg-transparent hover:bg-[#641f86] text-gray-400 hover:text-white'
                                }
                            `}
                            style={isActive ? {
                                background: 'linear-gradient(135deg, rgb(180, 70, 230), rgb(123, 31, 162), rgb(80, 0, 120))',
                                boxShadow: '0 0 15px rgba(180, 70, 230, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                color: 'white'
                            } : {}}
                        >
                            {/* Свечение для выбранной кнопки */}
                            {isActive && (
                                <div
                                    className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-60"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(200, 100, 255, 0.4), rgba(123, 31, 162, 0.2))',
                                        filter: 'blur(8px)',
                                        zIndex: -1
                                    }}
                                />
                            )}

                            {/* Иконка */}
                            <span className={`text-base sm:text-lg md:text-xl ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                {category.icon}
                            </span>

                            {/* Текст с адаптивным размером */}
                            <span className={`
                                font-inter font-medium text-center whitespace-nowrap
                                text-xs sm:text-sm md:text-base lg:text-lg
                                ${isActive ? 'text-white' : 'text-gray-400'}
                            `}>
                                {category.label}
                            </span>
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