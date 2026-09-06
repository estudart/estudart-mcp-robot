from fastapi import FastAPI

from src.presentation.routes.move_routes import move_router
from src.presentation.routes.health_route import health_router
from src.presentation.routes.led_routes import led_router
from src.application.servers.mcp_server.mcp_server import mcp


mcp_app = mcp.http_app()

app = FastAPI(title="Robot REST API", lifespan=mcp_app.lifespan)
app.include_router(move_router)
app.include_router(health_router)
app.include_router(led_router)

app.mount("/", mcp_app)
