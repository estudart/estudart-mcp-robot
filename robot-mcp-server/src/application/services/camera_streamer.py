import asyncio
import json

import cv2 as cv
import base64

from src.infrastructure.camera_adapter import CameraAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter
from src.infrastructure.image_prediction_adapter import ImagePredictorAdapter


class CameraStreamer:
    def __init__(
        self,
        camera_adapter: CameraAdapter,
        web_socket_adapter: WebSocketAdapter,
        image_predictor_adapter: ImagePredictorAdapter,
    ) -> None:
        self._camera_adapter = camera_adapter
        self._web_socket_adapter = web_socket_adapter
        self._image_predictor_adapter = image_predictor_adapter
        self._last_result = None
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
                    self._last_result = (
                        self._image_predictor_adapter
                        .predict_image(frame=frame)
                    )
                    self._count_frame = 0

                if self._last_result:
                    frame = self._last_result.plot(img=frame)

                await self._web_socket_adapter.send_message(
                    msg_type="camera-frame",
                    message=self.from_frame_to_b64(frame=frame)
                )
                self._count_frame+=1
            except Exception as err:
                print(f"Could not stream frame, reason: {err}")
                await asyncio.sleep(10)
