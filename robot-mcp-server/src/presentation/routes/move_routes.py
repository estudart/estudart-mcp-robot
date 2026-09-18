from fastapi import APIRouter
from src.dependencies import get_robot_commander

move_router = APIRouter(prefix="/api/move", tags=["move"])

@move_router.post("/forward")
async def move_forward():
    get_robot_commander().move_forward()
    print("Moving forward!")
    return {"status": "ok"}

@move_router.post("/backward")
async def move_backward():
    get_robot_commander().move_backward()
    print("Moving backward!")
    return {"status": "ok"}

@move_router.post("/turn-left")
async def turn_left():
    get_robot_commander().turn_left()
    print("Turning left!")
    return {"status": "ok"}

@move_router.post("/turn-right")
async def turn_right():
    get_robot_commander().turn_right()
    print("Turning right!")
    return {"status": "ok"}

@move_router.post("/stop")
async def move_forward():
    get_robot_commander().stop()
    print("Stopping...")
    return {"status": "ok"}
