import { MCPAdapter } from "./infrastructure/mcp-adapter";
import { RobotAgent } from "./application/agents/robot-agent";
import { ROBOT_AGENT_SYSTEM_PROMPT } from "./application/agents/system-prompt"


const mcpAdapter = new MCPAdapter({ 
    url: process.env.MCP_SERVER_URL ?? "http://localhost:8000/mcp" 
});
const robotAgent = new RobotAgent(
    ROBOT_AGENT_SYSTEM_PROMPT,
    process.env.OLLAMA_MODEL ?? "llama3.2:1b",
    mcpAdapter,
    await mcpAdapter.listTools(),
)

export { mcpAdapter, robotAgent };
