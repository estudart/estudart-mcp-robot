import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WS_SERVER_URL: str = "ws://localhost:8080"
    SHOULD_PREDICT: bool = True
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    ROBOT_CAMERA_FRAME_KEY: str = "robot:camera:latest"

settings = Settings()
