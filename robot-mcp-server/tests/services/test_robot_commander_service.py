import pytest

from src.application.services.robot_commander_service import RobotCommander
from tests.fakes.fake_robot_adapter import FakeRobotAdapter

def test_robot_commander_raises_value_error_for_invalid_led():
    color = "TEST"
    robot_adapter = FakeRobotAdapter()
    robot_commander_service = RobotCommander(robot_adapter=robot_adapter)
    with pytest.raises(ValueError, match=f"Color {color}, is not valid"):
        robot_commander_service.set_all_leds(color=color)

@pytest.mark.parametrize("color", ["RED", "GREEN", "BLUE", "YELLOW", "PURPLE", "CYAN", "WHITE"])
def test_valid_led_color_is_accepeted(color):
    robot_adapter = FakeRobotAdapter()
    robot_commander_service = RobotCommander(robot_adapter=robot_adapter)
    response = robot_commander_service.set_all_leds(color=color)
    assert response == f"All leds set to: {color}"

def test_led_off_is_accepted():
    color = "OFF"
    robot_adapter = FakeRobotAdapter()
    robot_commander_service = RobotCommander(robot_adapter=robot_adapter)
    response = robot_commander_service.set_all_leds(color=color)
    assert response == "All leds off"
