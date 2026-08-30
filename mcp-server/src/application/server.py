from fastmcp import FastMCP

from src.dependencies import get_robot_commander

mcp = FastMCP("mcp")

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

app = mcp.http_app()
