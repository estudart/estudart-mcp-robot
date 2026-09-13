import asyncio

from src.dependencies import get_distance_streamer

if __name__ == "__main__":
    service = get_distance_streamer()
    asyncio.run(service.stream_distance())
