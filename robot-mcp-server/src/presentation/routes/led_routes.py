import asyncio

from fastapi import APIRouter, HTTPException
from src.dependencies import get_robot_commander, get_speak_service

led_router = APIRouter(prefix="/api/led", tags=["led"])

@led_router.post("/set-all-leds")
async def set_all_leds(color: str):
    color = color.upper()
    print(color)
    try:
        get_robot_commander().set_all_leds(color=color)
        asyncio.create_task(get_speak_service().speak(f"Turning all LEDs to {color}"))
        return {"status": "ok"}
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"{err}")

