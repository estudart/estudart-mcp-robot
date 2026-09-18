from fastapi import APIRouter, BackgroundTasks
from src.dependencies import get_robot_commander, get_speak_service

move_router = APIRouter(prefix="/api/move", tags=["move"])

@move_router.post("/forward")
async def move_forward(background_tasks: BackgroundTasks):
    get_robot_commander().move_forward()
    background_tasks.add_task(get_speak_service().speak("Moving forward!"))
    return {"status": "ok"}

@move_router.post("/backward")
async def move_backward(background_tasks: BackgroundTasks):
    get_robot_commander().move_backward()
    background_tasks.add_task(get_speak_service().speak("Moving backward!"))
    return {"status": "ok"}

@move_router.post("/turn-left")
async def turn_left(background_tasks: BackgroundTasks):
    get_robot_commander().turn_left()
    background_tasks.add_task(get_speak_service().speak("Turning left!"))
    return {"status": "ok"}

@move_router.post("/turn-right")
async def turn_right(background_tasks: BackgroundTasks):
    get_robot_commander().turn_right()
    background_tasks.add_task(get_speak_service().speak("Turning right!"))
    return {"status": "ok"}

@move_router.post("/stop")
async def move_forward(background_tasks: BackgroundTasks):
    get_robot_commander().stop()
    background_tasks.add_task(get_speak_service().speak("Stopping..."))
    return {"status": "ok"}
