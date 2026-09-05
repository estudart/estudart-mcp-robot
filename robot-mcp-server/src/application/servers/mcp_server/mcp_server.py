from fastmcp import FastMCP
from starlette.requests import Request
from starlette.responses import JSONResponse
from fastmcp.exceptions import ToolError

from src.dependencies import get_robot_commander, get_file_reader_service
from src.application.servers.mcp_server.rest_server import rest_app

mcp = FastMCP("mcp")


@mcp.custom_route("/health", methods=["GET"])
async def health_check(request: Request) -> JSONResponse:
    return JSONResponse({
        "status": "healthy",
        "service": "mcp-server"
    })

@mcp.tool(tags={"diagnostics"})
def hello_world():
    """
    This tool return a hello world message, often the client will 
    ask you to call this tool in order to test your flow, when this
    happens just return the reponse in your message text.
    """
    return "Hello World"

@mcp.tool(tags={"leds"})
def set_all_leds(color: str):
    """
    This tool allows you to change the robots LED color.
    Eg: "RED", "GREEN", "BLUE", "YELLOW", "CYAN", "WHITE", "OFF"
    """
    try:
        service = get_robot_commander()
        service.set_all_leds(color)
    except Exception as err:
        err_msg = (
            f"CRITICAL ERROR: Cannot change LED to {color}. "
            f"The physical I2C connection failed (DeviceNotFoundError). "
            f"Hardware details: {err}. Please report this hardware failure to the user."
        )
        print(err_msg)
        raise ToolError(err_msg)

@mcp.tool(tags={"patrol"})
def robot_patrol():
    """
    This tool allows you run a full robot patrol.
    """
    try:
        service = get_robot_commander()
        service.robot_patrol()
    except Exception as err:
        err_msg = (
            f"CRITICAL ERROR: Cannot run robot patrol. "
            f"The physical motors or sensors failed to initialize via I2C. "
            f"Hardware details: {err}. Please report this navigation and hardware failure directly to the user."
        )
        print(err_msg)
        raise ToolError(err_msg)

@mcp.tool(tags={"read-file"})
def read_documentation():
    """
    This tool allows you read the documentation of the repo.
    """
    try:
        service = get_file_reader_service()
        return service.get_repo_documentation()
    except Exception as err:
        err_msg = (
            f"CRITICAL ERROR: Cannot read the repository documentation. "
            f"Details: {err}. Please report this failure to the user."
        )
        print(err_msg)
        raise ToolError(err_msg)



app = mcp.http_app()
app.mount("/api", rest_app)
