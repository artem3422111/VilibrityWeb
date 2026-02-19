// frontend/src/components/layout/Layout.tsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomBar from './BottomBar';
import Footer from './Footer';

const Layout: React.FC = () => {
    useEffect(() => {
        // Убираем скроллбары у конкретных элементов
        const hideScrollbars = () => {
            const elements = document.querySelectorAll('.scroll-container, main, [class*="overflow"]');
            elements.forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.scrollbarWidth = 'none';
                }
            });
        };

        hideScrollbars();

        // Перепроверяем при изменении DOM
        const observer = new MutationObserver(hideScrollbars);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#121212] w-full overflow-x-hidden">
            <div className="flex min-h-screen">
                {/* Сайдбар для десктопа - фиксированный */}
                <div className="hidden lg:block fixed left-0 top-0 h-screen z-30">
                    <Sidebar />
                </div>

                {/* Основная область с TopBar, контентом и Footer */}
                <div className="flex-1 w-full lg:pl-[300px] flex flex-col min-h-screen">
                    {/* TopBar - фиксированный для десктопа */}
                    <div className="fixed top-0 left-0 lg:left-[300px] right-0 z-20">
                        <TopBar />
                    </div>

                    {/* Контент страницы с правильными отступами */}
                    <div className="pt-4 lg:pt-[70px] flex-1 overflow-y-auto">
                        <div className="p-4 lg:p-6 lg:pb-8">
                            <Outlet />
                        </div>
                    </div>

                    {/* Footer - теперь внутри основной области с отступом от сайдбара */}
                    <Footer />
                </div>
            </div>

            {/* BottomBar для мобильных устройств */}
            <BottomBar />
        </div>
    );
};

export default Layout;
