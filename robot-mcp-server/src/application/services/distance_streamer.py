import asyncio
import json

from src.infrastructure.robot_engine_adapter import RobotAdapter
from src.infrastructure.web_socket_adapter import WebSocketAdapter
from src.application.services.logging_service import LoggerService

class DistanceStreamer:
    def __init__(
        self,
        logger_service: LoggerService,
        robot_adapter: RobotAdapter,
        web_socket_adapter: WebSocketAdapter,
    ) -> None:
        self._logger_service = logger_service
        self._robot_adapter = robot_adapter
        self._web_socket_adapter = web_socket_adapter

    async def connect_stream(self):
        await self._web_socket_adapter.connect()
        self._logger_service.log_info_message("Connection stablished")
    
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
                self._logger_service.log_info_message(
                    f"Could not send robot distance, reason: {err}"
                )
                await asyncio.sleep(10)

            await asyncio.sleep(0.3)
