import asyncio
import json

from src.infrastructure.robot_engine_adapter import RobotAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter

class DistanceStreamer:
    def __init__(
        self,
        robot_adapter: RobotAdapter,
        web_socket_adapter: WebSocketAdapter,
    ) -> None:
        self._robot_adapter = robot_adapter
        self._web_socket_adapter = web_socket_adapter

    async def connect_stream(self):
        await self._web_socket_adapter.connect()
        print("Connection stablished")
    
    def get_distance_cm(self):
        distance = self._robot_adapter.get_distance_cm()
        return distance
    
    async def stream_distance(self):
        await self.connect_stream()

        while True:
            try:
                distance = self.get_distance_cm()

                await self._web_socket_adapter.send_message(
                    msg_type="distance-cm",
                    message=distance
                )
            except Exception as err:
                print(f"Could not send robot distance, reason: {err}")

            await asyncio.sleep(0.4)
