from fastapi import APIRouter, HTTPException, Response

from src.dependencies import get_robot_commander

servos_router = APIRouter("/servo")

@servos_router.post("/set-pan-angle")
async def set_pan_angle(angle: int):
    service = get_robot_commander()
    try:
        service.set_pan_angle(angle=angle)
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
        return Response(
            content="Servo angle set to home!",
            status_code=200
        )
    except Exception as err:
        raise HTTPException(
            status_code=400,
            detail=f"Could not set servos to home, reason: {err}"
        )
