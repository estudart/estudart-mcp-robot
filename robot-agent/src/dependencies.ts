import { MCPAdapter } from "./infrastructure/mcp-adapter.js";
import { RobotAgent } from "./application/agents/robot-agent.js";
import { ROBOT_AGENT_SYSTEM_PROMPT } from "./application/agents/system-prompt.js"
import { RobotAssistent } from "./application/services/robot-assistent.service.js";

const mcpAdapter = new MCPAdapter({ 
    url: process.env.MCP_SERVER_URL ?? "http://localhost:8000/mcp" 
});
const robotAgent = new RobotAgent(
    ROBOT_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "qwen2.5:0.5b",
    process.env.OLLAMA_BASE_URL ?? "http://mcp-server:8000/mcp",
    mcpAdapter,
    await mcpAdapter.listTools(),
)
const robotAssistent = new RobotAssistent(robotAgent);

export { mcpAdapter, robotAgent, robotAssistent };
