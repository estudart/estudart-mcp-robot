import time

from raspbot.types import LedColor

from src.infrastructure.robot_engine_adapter import RobotAdapter


class RobotCommander:
    def __init__(self, robot_adapter: RobotAdapter):
        self._robot_adapter = robot_adapter
        self._color_map = {
            "RED": LedColor.RED,
            "GREEN": LedColor.GREEN,
            "BLUE": LedColor.BLUE,
            "YELLOW": LedColor.YELLOW,
            "PURPLE": LedColor.PURPLE,
            "CYAN": LedColor.CYAN,
            "WHITE": LedColor.WHITE
        }
    
    def set_all_leds(self, color: str) -> None:
        if color.upper() == "OFF":
            self._robot_adapter.leds_off()
            return
        get_color = self._color_map[color.upper()]
        self._robot_adapter.set_all_leds(get_color)
    
    def robot_patrol(self) -> None:
        self.set_all_leds("green")
        self._robot_adapter.move_forward(20)
        time.sleep(3)
        self._robot_adapter.move_backward(20)
        time.sleep(3)
        self._robot_adapter.stop()
        self.set_all_leds("red")

    def move_forward(self, speed: int = 20):
        self._robot_adapter.forward(speed)

    def move_backward(self, speed: int = 20):
        self._robot_adapter.backward(speed)
    
    def turn_left(self, speed: int = 20):
        self._robot_adapter.turn_left(speed)

    def turn_right(self, speed: int = 20):
        self._robot_adapter.turn_right(speed)

    def stop(self):
        self._robot_adapter.stop()


