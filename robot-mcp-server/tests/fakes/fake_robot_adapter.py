from raspbot.types import LedColor

class FakeRobotAdapter:
    ## LEDS
    def set_all_leds(self, color: LedColor):
        print(f"All leds set to: {color}")

    def leds_off(self):
        print("All leds off")
    
    # MOTOR
    def move_forward(self, speed: int):
        print(f"Moved forward with speed: {speed}")

    def move_backward(self, speed: int):
        print(f"Moved backward with speed: {speed}")
    
    def turn_left(self, speed: int):
        print(f"Turned left with speed: {speed}")

    def turn_right(self, speed: int):
        print(f"Turned right with speed: {speed}")

    def stop(self):
        print("Stopped")
