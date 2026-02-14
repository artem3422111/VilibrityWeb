import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage: React.FC = () => {
    const { genre } = useParams<{ genre: string }>();

    return (
        <div className="p-4 lg:p-6">
            <h1 className="text-3xl font-bold text-white mb-6">Категория: {genre}</h1>
            <p className="text-gray-400">Здесь будут аниме из категории {genre}</p>
        </div>
    );
};

export default CategoryPage;