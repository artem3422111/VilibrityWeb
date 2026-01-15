// frontend/src/hooks/useCurrency.ts
import { useState, useEffect } from 'react';

interface CurrencyData {
    vic: number;
    vig: number;
}

export const useCurrency = () => {
    const [currency, setCurrency] = useState<CurrencyData>({ vic: 1250, vig: 85 });
    const [isLoading, setIsLoading] = useState(false);

    // В будущем можно добавить загрузку данных с бэкенда
    useEffect(() => {
        // Загрузка данных о валюте пользователя
        const loadCurrencyData = async () => {
            setIsLoading(true);
            try {
                // Здесь будет запрос к API
                // const response = await fetch('/api/user/currency');
                // const data = await response.json();
                // setCurrency(data);
            } catch (error) {
                console.error('Ошибка загрузки данных о валюте:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCurrencyData();
    }, []);

    const addViC = (amount: number) => {
        setCurrency(prev => ({ ...prev, vic: prev.vic + amount }));
    };

    const subtractViC = (amount: number) => {
        setCurrency(prev => ({ ...prev, vic: Math.max(0, prev.vic - amount) }));
    };

    const addViG = (amount: number) => {
        setCurrency(prev => ({ ...prev, vig: prev.vig + amount }));
    };

    const subtractViG = (amount: number) => {
        setCurrency(prev => ({ ...prev, vig: Math.max(0, prev.vig - amount) }));
    };

    return {
        currency,
        isLoading,
        addViC,
        subtractViC,
        addViG,
        subtractViG,
    };
};