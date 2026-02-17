export interface WatchingAnime {
    id: string;
    title: string;
    imageUrl: string;
    currentEpisode: number;
    totalEpisodes: number;
    watchedPercent: number;
    timeRemaining: number;
}

export const watchingData: WatchingAnime[] = [
    {
        id: 'dr-stone-final',
        title: 'Доктор Стоун: Финальная битва',
        imageUrl: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
        currentEpisode: 12,
        totalEpisodes: 12,
        watchedPercent: 95,
        timeRemaining: 5
    },
    {
        id: 'spy-x-family',
        title: 'Шпионская семья',
        imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a7b98e147a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
        currentEpisode: 8,
        totalEpisodes: 25,
        watchedPercent: 32,
        timeRemaining: 360
    },
    {
        id: 'demon-slayer',
        title: 'Демон слэйер: Клинок рассекающий демонов',
        imageUrl: 'https://images.unsplash.com/photo-1564413727500-6c3e5b290d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
        currentEpisode: 1,
        totalEpisodes: 26,
        watchedPercent: 4,
        timeRemaining: 460
    },
    {
        id: 'attack-on-titan',
        title: 'Атака титанов',
        imageUrl: 'https://images.unsplash.com/photo-1518791841219-5307dba70129?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
        currentEpisode: 75,
        totalEpisodes: 75,
        watchedPercent: 100,
        timeRemaining: 0
    },
    {
        id: 'my-hero-academia',
        title: 'Моя геройская академия',
        imageUrl: 'https://images.unsplash.com/photo-1591839350822-48828a7f7584?ixlib=rb-4.0.3&auto=format&fit=crop&w=1520&q=80',
        currentEpisode: 15,
        totalEpisodes: 138,
        watchedPercent: 11,
        timeRemaining: 1230
    }
];