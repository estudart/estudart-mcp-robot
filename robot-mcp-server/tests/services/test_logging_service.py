import logging

from src.application.services.logging_service import LoggerService


def test_logging_service():
    service = LoggerService(level=logging.INFO)
    service.log_info_message("Im logging a message")
