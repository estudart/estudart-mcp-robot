import { MCPAdapter } from "./infrastructure/mcp-adapter";


const mcpAdapter = new MCPAdapter({ url: "http://localhost:8000/mcp" });

export function getMCPAdapter (): MCPAdapter {
    return mcpAdapter;
}

