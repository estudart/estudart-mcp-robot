import logging

from src.infrastructure.redis_adapter import RedisAdapter
from src.application.services.logging_service import LoggerService

def test_redis_adapter_can_set_key() -> None:
    key = "robot:test"
    value = 35
    logger_service = LoggerService(level=logging.INFO)
    redis_adapter = RedisAdapter(logger_service)

    redis_adapter.set_key(key, value)

    assert value == redis_adapter.get_key(key)
