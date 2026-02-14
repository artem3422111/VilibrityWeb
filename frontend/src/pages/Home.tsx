import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import TrendingAnimeSection from '../components/home/TrendingAnimeSection';
import GenresSection from '../components/home/GenresSection';
import CallToActionSection from '../components/home/CallToActionSection';

const Home: React.FC = () => {
    return (
        <div className="space-y-6 lg:space-y-8 w-full">
            {/* Герой секция с баннером */}
            <HeroSection />
            
            {/* Секция статистики */}
            <StatsSection />
            
            {/* Секция популярных аниме */}
            <TrendingAnimeSection />
            
            {/* Секция жанров */}
            <GenresSection />
            
            {/* Призыв к регистрации */}
            <CallToActionSection />
            
            {/* Место для дополнительных секций */}
            <div className="mt-8 p-4 border border-dashed border-gray-700 rounded-lg text-center">
                <p className="text-gray-400">Место для дополнительных секций</p>
                <p className="text-gray-500 text-sm mt-2">Здесь будут новые релизы, рекомендованные аниме и т.д.</p>
            </div>
        </div>
    );
};

export default Home;