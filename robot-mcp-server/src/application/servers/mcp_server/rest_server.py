from fastapi import FastAPI
from fastmcp.utilities.lifespan import combine_lifespans
from contextlib import asynccontextmanager
import asyncio

from src.dependencies import get_distance_streamer
from src.presentation.routes.move_routes import move_router
from src.presentation.routes.health_route import health_router
from src.presentation.routes.led_routes import led_router
from src.application.servers.mcp_server.mcp_server import mcp

@asynccontextmanager
async def app_lifespan(app: FastAPI):
    service = get_distance_streamer()
    task = asyncio.create_task(service.stream_distance())
    yield
    await task.cancel()

mcp_app = mcp.http_app()

app = FastAPI(title="Robot REST API", lifespan=combine_lifespans(
    app_lifespan, mcp_app.lifespan))

app.include_router(move_router)
app.include_router(health_router)
app.include_router(led_router)

app.mount("/", mcp_app)
