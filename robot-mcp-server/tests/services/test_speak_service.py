import pytest

from src.infrastructure.speech_adapter import SpeechAdapter
from src.application.services.speak_service import SpeakService

def test_speak_can_speak():
    speech_adapter = SpeechAdapter()
    speak_service = SpeakService(speech_adapter=speech_adapter)

    has_spoken = speak_service.speak("Luke I am your father!")

    assert has_spoken
