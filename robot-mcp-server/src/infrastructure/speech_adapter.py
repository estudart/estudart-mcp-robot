import subprocess
from threading import Lock


class SpeechAdapter:
    def __init__(self):
        self._speech_lock = Lock()

    def speak(self, text: str) -> None:
        text = str(text).strip()
        if not text:
            print("Did not receive a valid text")
            return
        
        with self._speech_lock:
            subprocess.run([
                "espeak-ng",
                "-d", "plughw:CARD=Device,DEV=0",
                "-a", "200",
                "-s", "160",
                text
            ])
