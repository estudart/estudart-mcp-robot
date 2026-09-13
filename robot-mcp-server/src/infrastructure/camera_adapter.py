import numpy as np
import base64

import cv2 as cv


class CameraAdapter:
    def __init__(self) -> None:
        self._cap = cv.VideoCapture(0)

    def get_frame(self):
        ret, frame = self._cap.read()
        return frame
    
    def from_frame_to_b64(self, frame) -> None:
        _, buffer = cv.imencode('.jpg', frame)
        b64_string = base64.b64encode(buffer).decode('utf-8')
        return b64_string
