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
            "CYAN": LedColor.CYAN,
            "WHITE": LedColor.WHITE
        }
    
    def set_all_leds(self, color: str) -> None:
        get_color = self._color_map[color.upper()]
        self._robot_adapter.set_all_leds(get_color)
