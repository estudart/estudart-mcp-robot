import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { MCPAdapter } from "./infrastructure/mcp-adapter.js";
import { RobotAgent } from "./application/agents/robot-agent.js";
import { ROBOT_AGENT_SYSTEM_PROMPT } from "./application/agents/prompts/robot-agent-prompt.js"
import { ARCHITECTURE_AGENT_SYSTEM_PROMPT } from "./application/agents/prompts/architecture-agent-prompt.js";
import { RobotAssistent } from "./application/services/robot-assistent.service.js";
import { WebSocketService } from "./application/services/wss-handler.service.js";
import { RobotRestAdapter } from "./infrastructure/robot-rest-adapter.js";
import { RobotCommanderService } from "./application/services/robot-commander.service.js";

const ROBOT_AGENT_TOOLS = ["hello_world", "set_all_leds", "robot_patrol"];
const ARCHITECTURE_AGENT_TOOLS = ["read_documentation"];
const robotServerUrl = process.env.ROBOT_SERVER_URL ?? "http://localhost:8000"

const robotRestAdapter = new RobotRestAdapter(`${robotServerUrl}/api`);
const robotCommanderService = new RobotCommanderService(robotRestAdapter);

const MCPUrl = `${robotServerUrl}/mcp`
const client = await getClient(MCPUrl);

const mcpAdapter = new MCPAdapter(client);
const mcpTools = await mcpAdapter.listTools();

const pick = (names: string[]) => mcpTools.filter((tool) => names.includes(tool.name));

const robotAgent = new RobotAgent(
    ROBOT_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "llama3.2:3b",
    process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    mcpAdapter,
    pick(ROBOT_AGENT_TOOLS),
)

const architectureAgent = new RobotAgent(
    ARCHITECTURE_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "llama3.2:3b",
    process.env.OLLAMA_BASE_URL ?? "http://localhost:11434",
    mcpAdapter,
    pick(ARCHITECTURE_AGENT_TOOLS),
)

const robotAssistent = new RobotAssistent(robotAgent, architectureAgent);

async function getClient(url: string) {
    const transport = new StreamableHTTPClientTransport(new URL(url));
    const client = new Client(
        { name: "robot-server", version: "1.0.0"},
        { capabilities: {} }
    )
    await client.connect(transport);
    return client;
}

const webSocketService = new WebSocketService(robotAssistent);

export { mcpAdapter, robotAgent, robotAssistent, architectureAgent, webSocketService, robotCommanderService };
