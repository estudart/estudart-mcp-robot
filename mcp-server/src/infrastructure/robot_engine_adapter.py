from raspbot import Robot
from raspbot.types import LedColor


class RobotAdapter:
    def __init__(self):
        self._robot = Robot()

    ## LEDS
    def set_all_leds(self, color: LedColor):
        self._robot.leds.set_all(color=color)
    
    # MOTOR
    def move_forward(self, speed: int):
        self._bot.motors.forward(speed)

    def move_backwards(self, speed: int):
        self._bot.motors.backwards(speed)
    
    def turn_left(self, speed: int):
        self._bot.motors.turn_left(speed)

    def turn_right(self, speed: int):
        self._bot.motors.turn_right(speed)