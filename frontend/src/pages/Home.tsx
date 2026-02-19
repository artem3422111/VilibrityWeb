import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ContinueWatchingSection from '../components/home/ContinueWatchingSection';
import AnimeCatalogSection from '../components/home/AnimeCatalogSection';

const Home: React.FC = () => {
    return (
        <div className="space-y-6 lg:space-y-8 w-full">
            {/* Герой секция с баннером */}
            <HeroSection />

            {/* Секция "Продолжить просмотр" */}
            <ContinueWatchingSection /> 

            {/* Секция каталога аниме */}
            <AnimeCatalogSection hasPreviousSection={true} />
        </div>
    );
};

export default Home;
