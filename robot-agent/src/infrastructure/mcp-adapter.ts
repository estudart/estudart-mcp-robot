import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";


interface MCPAdapterConfig {
  url: string;
}

export class MCPAdapter {
    _connected;
    _client;
    _transport;
    constructor({ url }: MCPAdapterConfig) {
        this._transport = new StreamableHTTPClientTransport(new URL(url));
        this._client = new Client(
            { name: "robot-server", version: "1.0.0"},
            { capabilities: {} }
        )
        this._connected = false;
    }

    async connect() {
        if (this._connected) return;
        await this._client.connect(this._transport);
        this._connected = true;
    }

    async listTools() {
        await this._ensureConnected();
        const { tools } = await this._client.listTools();
        return tools.map((tool) => ({
            name: tool.name,
            description: tool.description ?? "",
            inputSchema: tool.inputSchema,
        }));
    };

    async callTool(toolName: string, args: Record<string, string>) {
        await this._ensureConnected();
        const result = await this._client.callTool({
            name: toolName,
            arguments: args
        })
        return result;
    }

    async _ensureConnected() {
        if (!this._connected) await this.connect();
    }
}