from fastmcp import FastMCP

mcp = FastMCP("mcp")

@mcp.tool
def helo_world():
    return "Hello World"