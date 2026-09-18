import json

from fastapi import APIRouter, Response

from src.dependencies import get_speak_service

health_router = APIRouter(prefix="/api", tags=["health"])

@health_router.get("/health")
async def health_check():
    get_speak_service().speak("I'm healthy!")
    return Response(
        content=json.dumps({ "status": "healthy" }),
        status_code=200
    )
