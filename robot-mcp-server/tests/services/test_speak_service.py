import pytest
import logging

from src.infrastructure.speech_adapter import SpeechAdapter
from src.application.services.speak_service import SpeakService
from src.application.services.logging_service import LoggerService

def test_speak_can_speak():
    speech_adapter = SpeechAdapter()
    logger_service = LoggerService(level=logging.INFO)
    speak_service = SpeakService(
        logger_service=logger_service,
        speech_adapter=speech_adapter
    )

    has_spoken = speak_service.speak("Luke I am your father!")

    assert has_spoken
