from raspbot import Robot
from raspbot.types import LedColor


class RobotAdapter:
    def __init__(self):
        self._robot = Robot()

    ## LEDS
    def set_all_leds(self, color: LedColor):
        self._robot.leds.set_all(color=color)

    def leds_off(self):
        self._robot.leds.off_all()
    
    # MOTOR
    def move_forward(self, speed: int):
        self._robot.motors.forward(speed)

    def move_backward(self, speed: int):
        self._robot.motors.backward(speed)
    
    def turn_left(self, speed: int):
        self._robot.motors.turn_left(speed)

    def turn_right(self, speed: int):
        self._robot.motors.turn_right(speed)

    def stop(self):
        self._robot.motors.stop()