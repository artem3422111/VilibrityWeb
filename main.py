import requests
import json

# AniList GraphQL API endpoint
ANILIST_API_URL = "https://graphql.anilist.co"

# GraphQL query to search anime by title and get cover image
query = """
query ($search: String) {
  Media(search: $search, type: ANIME) {
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
    }
    siteUrl
  }
}
"""

# Anime titles to search for (in Russian)
titles = [
    "Attack on Titan",  # Attack on Titan
    "Наруто",         # Naruto
    "Ван Пис",        # One Piece
    "Мастера меча онлайн",  # Sword Art Online
    "Хоримия"         # Horimiya
]

def get_anime_cover(title):
    """Search for anime and return cover image URL"""
    variables = {"search": title}
    
    try:
        response = requests.post(
            ANILIST_API_URL,
            json={"query": query, "variables": variables},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("data", {}).get("Media"):
                media = data["data"]["Media"]
                return {
                    "title": media["title"]["romaji"] or media["title"]["english"],
                    "cover_url": media["coverImage"]["extraLarge"],
                    "site_url": media["siteUrl"]
                }
            else:
                return {"error": "Anime not found"}
        else:
            return {"error": f"API error: {response.status_code}"}
    except Exception as e:
        return {"error": f"Request failed: {e}"}

# Main execution
if __name__ == "__main__":
    print("=== Поиск аниме на AniList ===\n")
    
    for title in titles:
        print(f"Поиск: {title}")
        result = get_anime_cover(title)
        
        if "error" in result:
            print(f"❌ Ошибка: {result['error']}\n")
        else:
            print(f"✅ Найдено: {result['title']}")
            print(f"🖼️  URL изображения: {result['cover_url']}")
            print(f"🔗 Ссылка на AniList: {result['site_url']}\n")