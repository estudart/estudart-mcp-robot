from fastapi import APIRouter
from src.dependencies import get_robot_commander

move_router = APIRouter(prefix="/move", tags=["move"])

@move_router.post("/forward")
async def move_forward():
    get_robot_commander().move_forward()
    return {"status": "ok"}

@move_router.post("/turn-left")
async def turn_left():
    get_robot_commander().turn_left()
    return {"status": "ok"}

@move_router.post("/stop")
async def move_forward():
    get_robot_commander().stop()
    return {"status": "ok"}
