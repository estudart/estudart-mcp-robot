import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WS_SERVER_URL: str = "ws://localhost:8080"
    SHOULD_PREDICT: bool = True

settings = Settings()
