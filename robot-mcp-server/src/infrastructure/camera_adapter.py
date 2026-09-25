import numpy as np
import base64

import cv2 as cv


class CameraAdapter:
    def __init__(self) -> None:
        self._cap = cv.VideoCapture(0)

    def get_frame(self, path: str = None):
        ret, frame = self._cap.read()
        if path:
            cv.imwrite(path, frame)
        return frame

    def read_image(self, path: str):
        return cv.imread(path)
    
    def from_frame_to_b64(self, frame) -> str:
        _, buffer = cv.imencode('.jpg', frame)
        b64_string = base64.b64encode(buffer).decode('utf-8')
        return b64_string
    
    def from_frame_to_bytes(self, frame) -> bytes:
        _, buffer = cv.imencode('.jpg', frame)
        return buffer.tobytes()
