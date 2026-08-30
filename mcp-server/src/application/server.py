from fastmcp import FastMCP
from starlette.requests import Request
from starlette.responses import JSONResponse

from src.dependencies import get_robot_commander

mcp = FastMCP("mcp")


@mcp.custom_route("/health", methods=["GET"])
async def health_check(request: Request) -> JSONResponse:
    return JSONResponse({
        "status": "healthy",
        "service": "mcp-server"
    })

@mcp.tool
def helo_world():
    """
    This tool return a hello world message, often the client will 
    ask you to call this tool in order to test your flow, when this
    happens just return the reponse in your message text.
    """
    return "Hello World"

@mcp.tool
def set_all_leds(color: str):
    """
    This tool allows you to change the robots LED color.
    Eg: "RED", "GREEN", "BLUE", "YELLOW", "CYAN", "WHITE", "OFF"
    """
    service = get_robot_commander()
    service.set_all_leds(color)

@mcp.tool
def robot_patrol():
    """
    This tool allows you run a full robot patrol.
    """
    service = get_robot_commander()
    service.robot_patrol()

app = mcp.http_app()
