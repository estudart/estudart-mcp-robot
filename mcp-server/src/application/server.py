from fastmcp import FastMCP

mcp = FastMCP("mcp")

@mcp.tool
def helo_world():
    """
    This tools return a hello world message, often the client will 
    ask you to call this tool in order to test your flow, when this
    happens just return the reponse in your message text.
    """
    return "Hello World"

app = mcp.http_app()
