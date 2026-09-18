from src.infrastructure.speech_adapter import SpeechAdapter


class SpeakService:
    def __init__(
        self,
        speech_adapter: SpeechAdapter,
    ) -> None:
        self._speech_adapter = speech_adapter
    
    def speak(self, text: str) -> True:
        self._speech_adapter.speak(text=text)
        return True
