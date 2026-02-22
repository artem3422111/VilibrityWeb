import requests
import json

# Базовый URL API (нужно будет уточнить из документации)
# Возможные варианты: https://anilibria.top/api/v1, https://api.anilibria.top/v1
BASE_API_URL = "https://anilibria.top/api/v1" # <-- СКОРЕЕ ВСЕГО, ТРЕБУЕТ УТОЧНЕНИЯ

# Предполагаемый эндпоинт для получения списка аниме
# В документации ищите что-то вроде: /anime, /title, /list, /popular
ENDPOINT = "/anime/relise" # <-- СКОРЕЕ ВСЕГО, ТРЕБУЕТ УТОЧНЕНИЯ

def get_popular_anime(limit=10):
    """
    Получает список популярных аниме с AniLibria API.
    """
    url = f"{BASE_API_URL}{ENDPOINT}"
    
    # Параметры запроса (нужно сверить с документацией!)
    params = {
        "limit": limit,          # Количество результатов
        "sort": "views",         # Сортировка по популярности (может быть "popular", "rating")
        "order": "desc"          # По убыванию
    }
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        "Accept": "application/json"
    }
    
    try:
        print(f"Пытаюсь подключиться к: {url}")
        response = requests.get(url, params=params, headers=headers, timeout=10)
        response.raise_for_status()  # Вызовет исключение для плохих статусов (4xx или 5xx)
        
        data = response.json()
        return data
        
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при запросе к API: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"Ошибка при обработке JSON-ответа: {e}")
        print(f"Текст ответа: {response.text[:200]}...")
        return None

# --- Запуск скрипта ---
if __name__ == "__main__":
    print("Получаем 10 популярных аниме с AniLibria...")
    result = get_popular_anime(limit=10)
    
    if result:
        print("\nУспешно получены данные! Вот первые 10 записей (структура может отличаться):")
        # Вывод данных зависит от реальной структуры ответа
        # Предположим, что результат - это список аниме
        if isinstance(result, list):
            for i, anime in enumerate(result, 1):
                # Здесь нужно адаптировать ключи под реальный ответ API
                title = anime.get('name', anime.get('title', 'Без названия'))
                print(f"{i}. {title}")
        else:
            # Если ответ - это словарь с ключом 'data' или подобным
            print(json.dumps(result, indent=2, ensure_ascii=False)[:500])
    else:
        print("\nНе удалось получить данные. Возможные причины:")
        print("1. Неверный базовый URL или эндпоинт. Проверьте документацию.")
        print("2. API требует авторизации (ключа).")
        print("3. Сайт AniLibria временно недоступен.")