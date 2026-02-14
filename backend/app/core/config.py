"""Application configuration"""
from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""
    
    # App
    APP_NAME: str = "Vilibrity API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    ENV: str = "development"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # API
    API_V1_STR: str = "/api/v1"
    
    # CORS - Accept as string and convert to list
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
    
    # AniList API
    ANILIST_API_URL: str = "https://graphql.anilist.co"
    ANILIST_TIMEOUT: int = 10
    
    # External APIs
    EXTERNAL_API_TIMEOUT: int = 15
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    def get_cors_origins(self) -> list:
        """Convert CORS_ORIGINS string to list"""
        if isinstance(self.CORS_ORIGINS, str):
            return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
        return self.CORS_ORIGINS


settings = Settings()
