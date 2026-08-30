import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { MCPAdapter } from "./infrastructure/mcp-adapter.js";
import { RobotAgent } from "./application/agents/robot-agent.js";
import { ROBOT_AGENT_SYSTEM_PROMPT } from "./application/agents/system-prompt.js"
import { RobotAssistent } from "./application/services/robot-assistent.service.js";


const client = await getClient();

const mcpAdapter = new MCPAdapter(client);
const robotAgent = new RobotAgent(
    ROBOT_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "qwen2.5:0.5b",
    process.env.OLLAMA_BASE_URL ?? "http://host.docker.internal:11434",
    mcpAdapter,
    await mcpAdapter.listTools(),
)
const robotAssistent = new RobotAssistent(robotAgent);

async function getClient() {
    const url = process.env.MCP_SERVER_URL ?? "http://localhost:8000/mcp"
    const transport = new StreamableHTTPClientTransport(new URL(url));
    const client = new Client(
        { name: "robot-server", version: "1.0.0"},
        { capabilities: {} }
    )
    await client.connect(transport);
    return client;
}

export { mcpAdapter, robotAgent, robotAssistent };
