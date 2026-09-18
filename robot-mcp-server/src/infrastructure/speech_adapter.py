import subprocess


class SpeechAdapter:
    def speak(self, text: str) -> None:
        text = str(text).strip()
        if not text:
            print("Did not receive a valid text")
            return
        
        subprocess.run([
            "espeak-ng",
            "-d", "plughw:CARD=Device,DEV=0",
            "-a", "200",
            "-s", "160",
            text
        ])
