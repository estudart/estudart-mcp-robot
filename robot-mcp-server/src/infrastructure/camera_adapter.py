import numpy as np
import cv2 as cv


class CameraAdapter:
    def __init__(self) -> None:
        self._cap = cv.VideoCapture(0)

    def get_frame(self):
        ret, frame = self._cap.read()
        return frame
