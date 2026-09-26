import logging
import pytest

from src.infrastructure.redis_adapter import RedisAdapter
from src.application.services.logging_service import LoggerService

@pytest.mark.asyncio
async def test_redis_adapter_can_set_key() -> None:
    logger_service = LoggerService(level=logging.INFO)

    key = "robot:test"
    value = 35

    redis_adapter = RedisAdapter(logger_service)
    await redis_adapter._create_connection()
    await redis_adapter.set_key(key, value)

    assert value == await redis_adapter.get_key(key)
