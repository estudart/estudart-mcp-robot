from fastapi import FastAPI

from src.presentation.routes.move_routes import move_router
from src.presentation.routes.health_route import health_router
from src.presentation.routes.led_routes import led_router

rest_app = FastAPI(title="Robot REST API")
rest_app.include_router(move_router)
rest_app.include_router(health_router)
rest_app.include_router(led_router)
