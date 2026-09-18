import asyncio

import subprocess


class SpeechAdapter:
    async def speak(self, text: str) -> None:
        text = str(text).strip()
        if not text:
            print("Did not receive a valid text")
            return
        
        process = await asyncio.create_subprocess_exec(
            "espeak-ng",
            "-d", "plughw:CARD=Device,DEV=0",
            "-a", "200",
            "-s", "160",
            text
        )
        await process.wait()
