import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { MCPAdapter } from "./infrastructure/mcp-adapter.js";
import { RobotAgent } from "./application/agents/robot/robot-agent.js";
import { ROBOT_AGENT_SYSTEM_PROMPT } from "./application/agents/robot/system-prompt.js"
import { ArchitectureAgent } from "./application/agents/architecture/architecture-agent.js";
import { ARCHITECTURE_AGENT_SYSTEM_PROMPT } from "./application/agents/architecture/system-prompt.js";
import { RobotAssistent } from "./application/services/robot-assistent.service.js";


const client = await getClient();

const mcpAdapter = new MCPAdapter(client);
const robotAgent = new RobotAgent(
    ROBOT_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "llama3.2:3b",
    process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    mcpAdapter,
    await mcpAdapter.listTools(),
)
const architectureAgent = new ArchitectureAgent(
    ARCHITECTURE_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "llama3.2:3b",
    process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
)

const robotAssistent = new RobotAssistent(robotAgent, architectureAgent);

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

export { mcpAdapter, robotAgent, robotAssistent, architectureAgent };
