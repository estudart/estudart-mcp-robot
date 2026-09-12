import asyncio
import json

import cv2 as cv
import base64
from ultralytics import YOLO

from src.infrastructure.camera_adapter import CameraAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter


class CameraStreamer:
    def __init__(
        self,
        camera_adapter: CameraAdapter,
        web_socket_adapter: WebSocketAdapter,
    ) -> None:
        self._camera_adapter = camera_adapter
        self._web_socket_adapter = web_socket_adapter
        self._model = YOLO("yolo11n_ncnn_model")
        self._count_frame = 0
    
    async def connect_stream(self):
        await self._web_socket_adapter.connect()
        print("Connection stablished")

    def from_frame_to_b64(self, frame) -> None:
        _, buffer = cv.imencode('.jpg', frame)
        b64_string = base64.b64encode(buffer).decode('utf-8')
        return b64_string

    async def stream_frame(self):
        await self.connect_stream()
        print("Starting camera streaming...")
        while True:
            try:
                frame = self._camera_adapter.get_frame()

                if self._count_frame >= 5:
                    results = self._model.predict(frame, show=False)
                    frame = results[0].plot()
                    self._count_frame = 0

                await self._web_socket_adapter.send_message(
                    msg_type="camera-frame",
                    message=self.from_frame_to_b64(frame=frame)
                )
                self._count_frame+=1
            except Exception as err:
                print(f"Could not stream frame, reason: {err}")
                asyncio.sleep(10)
