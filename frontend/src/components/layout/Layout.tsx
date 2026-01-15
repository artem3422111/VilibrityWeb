// frontend/src/components/layout/Layout.tsx
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#121212] w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row">
                {/* Сайдбар для десктопа */}
                <Sidebar />

                {/* Основная область с TopBar и контентом */}
                <div className="flex-1 min-h-screen w-full">
                    {/* TopBar */}
                    <TopBar />
                </div>
            </div>
        </div>
    );
};

export default Layout;