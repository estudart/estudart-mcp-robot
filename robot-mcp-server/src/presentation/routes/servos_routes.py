import asyncio

from fastapi import APIRouter, HTTPException, Response

from src.dependencies import get_robot_commander, get_speak_service

servos_router = APIRouter(prefix="/api/servo", tags=["servo"])

@servos_router.post("/set-pan-angle")
async def set_pan_angle(angle: int):
    service = get_robot_commander()
    try:
        service.set_pan_angle(angle=angle)
        asyncio.create_task(get_speak_service().speak(f"Set pan angle to {angle}"))
        return Response(
            content="Pan angle updated!",
            status_code=200
        )
    except Exception as err:
        raise HTTPException(
            status_code=400,
            detail=f"Could not set pan angle, reason: {err}"
        )

    
@servos_router.post("/set-tilt-angle")
def set_tilt_angle(angle: int):
    service = get_robot_commander()
    try:
        service.set_tilt_angle(angle=angle)
        asyncio.create_task(get_speak_service().speak(f"Set tilt angle to {angle}"))
        return Response(
            content="Tilt angle updated",
            status_code=200
        )
    except Exception as err:
        raise HTTPException(
            status_code=400,
            detail=f"Could not set tilt angle, reason: {err}"
        )

@servos_router.post("/servo-home")
def servo_home():
    service = get_robot_commander()
    try:
        service.servo_home()
        asyncio.create_task(get_speak_service().speak("Set angle to home"))
        return Response(
            content="Servo angle set to home!",
            status_code=200
        )
    except Exception as err:
        raise HTTPException(
            status_code=400,
            detail=f"Could not set servos to home, reason: {err}"
        )
