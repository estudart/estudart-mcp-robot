from src.infrastructure.camera_adapter import CameraAdapter

def test_can_capture_frame():
    camera_adapter = CameraAdapter()
    frame = camera_adapter.get_frame()
    assert isinstance(
        camera_adapter.from_frame_to_bytes(frame),
        bytes
    )
