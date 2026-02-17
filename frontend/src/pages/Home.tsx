import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import TrendingAnimeSection from '../components/home/TrendingAnimeSection';
import GenresSection from '../components/home/GenresSection';
import CallToActionSection from '../components/home/CallToActionSection';
import ContinueWatchingSection from '../components/home/ContinueWatchingSection';

const Home: React.FC = () => {
    return (
        <div className="space-y-6 lg:space-y-8 w-full">
            {/* Герой секция с баннером */}
            <HeroSection />

            {/* Секция "Продолжить просмотр" */}
            <ContinueWatchingSection />
            
            {/* Секция статистики */}
            <StatsSection />
            
            {/* Секция популярных аниме */}
            <TrendingAnimeSection />
            
            {/* Секция жанров */}
            <GenresSection />
            
            {/* Призыв к регистрации */}
            <CallToActionSection />
            
            
        </div>
    );
};

export default Home;