import asyncio
import json

import cv2 as cv
import base64

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
    
    async def connect_stream(self):
        await self._web_socket_adapter.connect()
        print("Connection stablished")

    def from_frame_to_b64(self, frame) -> None:
        _, buffer = cv.imencode('.jpg', frame)
        b64_string = base64.b64encode(buffer).decode('utf-8')
        return b64_string

    async def stream_frame(self):
        await self.connect_stream()

        while True:
            frame = self._camera_adapter.get_frame()

            await self._web_socket_adapter.send_message(
                msg_type="camera-frame",
                message=self.from_frame_to_b64(frame=frame)
            )
            response = await self._web_socket_adapter.recv()

            print(f"Received response from server: {response}")

            await asyncio.sleep(0.1)
