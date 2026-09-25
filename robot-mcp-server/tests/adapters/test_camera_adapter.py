import time

import cv2

from src.infrastructure.camera_adapter import CameraAdapter

def test_can_capture_frame():
    camera_adapter = CameraAdapter()
    frame = camera_adapter.get_frame()
    from_frame_to_bytes = camera_adapter.from_frame_to_bytes(frame)
    
    assert isinstance(from_frame_to_bytes, bytes)

def test_can_store_frame():
    camera_adapter = CameraAdapter()
    image_path = "current_frame.jpg"

    time.sleep(3)

    frame = camera_adapter.get_frame(path=image_path)
    image = camera_adapter.read_image(image_path)

    assert isinstance(image, cv2.typing.MatLike)
