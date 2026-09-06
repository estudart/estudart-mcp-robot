from fastapi import APIRouter

health_router = APIRouter(prefix="/api", tags=["health"])

@health_router.get("/health")
async def health_check():
    return { "status": "healthy" }
