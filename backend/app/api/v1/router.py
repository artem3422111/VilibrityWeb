"""API v1 router with all endpoints"""
from fastapi import APIRouter
from app.api.v1.endpoints import anime, health

# Create main API v1 router
router = APIRouter(prefix="/api/v1")

# Include endpoint routers
router.include_router(anime.router)
router.include_router(health.router)
