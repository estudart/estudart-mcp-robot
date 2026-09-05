import pytest

from src.application.services.robot_commander_service import RobotCommander
from tests.fakes.fake_robot_adapter import FakeRobotAdapter

def test_robot_commander_raises_value_error_for_invalid_led():
    color = "TEST"
    robot_adapter = FakeRobotAdapter()
    robot_commander_service = RobotCommander(robot_adapter=robot_adapter)
    with pytest.raises(ValueError, match=f"Color {color}, is not valid"):
        robot_commander_service.set_all_leds(color=color)
