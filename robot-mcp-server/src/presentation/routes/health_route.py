from fastapi import APIRouter, Response

health_router = APIRouter(prefix="/api", tags=["health"])

@health_router.get("/health")
async def health_check():
    return Response(
        content={ "status": "healthy" },
        status_code=200
    )
