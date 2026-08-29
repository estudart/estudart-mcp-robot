from raspbot import Robot
from raspbot.types import LedColor


class RobotAdapter:
    def __init__(self, robot: Robot):
        self._robot = robot

    def set_all_leds(self, color: LedColor):
        self._robot.leds.set_all(color=color)
