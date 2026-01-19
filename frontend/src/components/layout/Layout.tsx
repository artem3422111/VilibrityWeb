// frontend/src/components/layout/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#121212] w-full overflow-x-hidden">
            <div className="flex flex-col lg:flex-row">
                {/* Сайдбар для десктопа */}
                <Sidebar />

                {/* Основная область с TopBar и контентом */}
                <div className="flex-1 w-full">
                    {/* TopBar */}
                    <TopBar />

                    {/* Контент страницы с отступами под TopBar и BottomBar */}
                    <div className="pt-16 lg:pt-0 pb-20 lg:pb-0 min-h-screen">
                        <div className="p-4 lg:p-6 lg:pb-8">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

            {/* BottomBar для мобильных устройств */}
            <BottomBar />
        </div>
    );
};

export default Layout;