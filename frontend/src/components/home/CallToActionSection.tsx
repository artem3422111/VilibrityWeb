import React from 'react';

const CallToActionSection: React.FC = () => {
    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#212121] to-[#2a2a2a] p-6 md:p-8 border border-[#641f86]">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-white font-inter mb-4">
                    Присоединяйтесь к сообществу
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-6">
                    Создайте аккаунт, чтобы сохранять прогресс просмотра,
                    добавлять аниме в избранное и получать персональные рекомендации
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button className="rounded-lg bg-gradient-to-r from-[#641f86] to-[#9932cc] px-6 md:px-8 py-3 font-inter font-bold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95">
                        Зарегистрироваться
                    </button>
                    <button className="rounded-lg border-2 border-[#641f86] bg-transparent px-6 md:px-8 py-3 font-inter font-bold text-white transition-all hover:bg-[#641f86]/20">
                        Узнать больше
                    </button>
                </div>
            </div>

            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#641f86]/30 to-transparent" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#00f8ff]/30 to-transparent" />
        </div>
    );
};

export default CallToActionSection;