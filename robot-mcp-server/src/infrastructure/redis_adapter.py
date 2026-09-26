import pickle

import redis.asyncio as redis

from src.application.services.logging_service import LoggerService
from src.config import settings

class RedisAdapter:
    def __init__(self, logger_service: LoggerService):
        self._logger_service = logger_service
        self._host = settings.REDIS_HOST
        self._port = settings.REDIS_PORT
        self._db: redis.Redis | None = None
    
    async def _create_connection(self):
        try:
            self._db = redis.Redis(
                host=self._host,
                port=self._port,
                ssl=False,
            )

            await self._db.ping()
            self._logger_service.log_info_message(
                f"Connection with Redis was established, "
                f"host: {self._host}:{self._port}"
            )
            return self._db
        except Exception as err:
            self._logger_service.log_error_message(
                f"Could not connect to Redis: {err}"
            )

    async def set_key(self, key: str, value: str) -> None:
        if not self._db:
            self._create_connection()

        try:
            await self._db.set(key, pickle.dumps(value))
            self._logger_service.log_debug_message(
                f"New key set to Redis, "
                f"key: {key}, value:{value}"
            )
        except Exception as err:
            self._logger_service.log_error_message(
                f"Could not set Redis key, reason: {err}"
            )

    async def get_key(self, key: str):
        if not self._db:
            self._create_connection()

        try:
            value = await self._db.get(key)
            self._logger_service.log_debug_message(
                f"New value retrieved from Redis: {value}"
            )
            return pickle.loads(value)
        except Exception as err:
            self._logger_service.log_error_message(
                f"Could not not fetch data from Redis"
            )
