from fastapi import APIRouter
from src.dependencies import get_robot_commander, get_speak_service

move_router = APIRouter(prefix="/api/move", tags=["move"])

@move_router.post("/forward")
async def move_forward():
    get_robot_commander().move_forward()
    get_speak_service().speak("Moving forward!")
    return {"status": "ok"}

@move_router.post("/backward")
async def move_backward():
    get_robot_commander().move_backward()
    get_speak_service().speak("Moving backward!")
    return {"status": "ok"}

@move_router.post("/turn-left")
async def turn_left():
    get_robot_commander().turn_left()
    get_speak_service().speak("Turning left!")
    return {"status": "ok"}

@move_router.post("/turn-right")
async def turn_right():
    get_robot_commander().turn_right()
    get_speak_service().speak("Turning right!")
    return {"status": "ok"}

@move_router.post("/stop")
async def move_forward():
    get_robot_commander().stop()
    get_speak_service().speak("Stopping...")
    return {"status": "ok"}
