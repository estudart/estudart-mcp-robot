import time

import cv2

from src.infrastructure.camera_adapter import CameraAdapter

def test_can_capture_frame():
    camera_adapter = CameraAdapter()
    frame = camera_adapter.get_frame()
    assert isinstance(
        camera_adapter.from_frame_to_bytes(frame),
        bytes
    )

def test_can_store_frame():
    is_read = False
    image_path = "current_frame.jpg"
    camera_adapter = CameraAdapter()
    time.sleep(3)
    frame = camera_adapter.get_frame(path=image_path)
    image = camera_adapter.read_image(image_path)
    assert isinstance(image, cv2.typing.MatLike)
