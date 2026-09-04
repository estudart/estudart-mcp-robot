import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { MCPPort } from "../application/ports/mcp-adapter.port.js";


export class MCPAdapter implements MCPPort {
    _client;

    constructor(client: Client) {
        this._client = client;
    }

    async listTools(): Promise<Record<string, any>[]> {
        const { tools } = await this._client.listTools();
        return tools.map((tool) => ({
            name: tool.name,
            description: tool.description ?? "",
            inputSchema: tool.inputSchema,
        }));
    };

    async callTool(toolName: string, args: Record<string, string>) {
        const result = await this._client.callTool({
            name: toolName,
            arguments: args
        })
        return result;
    }
}