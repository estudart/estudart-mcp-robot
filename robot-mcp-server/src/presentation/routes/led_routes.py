from fastapi import APIRouter, HTTPException
from src.dependencies import get_robot_commander

led_router = APIRouter(prefix="/led", tags=["led"])

@led_router.post("/set-all-leds")
async def set_all_leds(color: str):
    color = color.upper()
    try:
        get_robot_commander().set_all_leds(color=color)
        return {"status": "ok"}
    except Exception as err:
        raise HTTPException(status_code=404, detail=f"{err}")

