import asyncio

from src.dependencies import get_camera_streamer

if __name__ == "__main__":
    service = get_camera_streamer()
    asyncio.run(service.stream_frame())
