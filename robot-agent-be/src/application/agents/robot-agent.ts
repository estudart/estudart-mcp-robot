import { createAgent, ReactAgent } from "langchain"
import { ChatOllama } from "@langchain/ollama"
import { MCPAdapter } from "../../infrastructure/mcp-adapter";
import { DynamicStructuredTool } from "@langchain/core/tools";


export class RobotAgent {
    _systemPrompt: string;
    _llmChat: ChatOllama;
    _agent: ReactAgent;
    _mcpAdapter: MCPAdapter;
    _mcpTools: Record<string, any>[];

    constructor(
        systemPrompt: string,
        ollamaModel: string,
        ollamaBaseUrl: string,
        mcpAdapter: MCPAdapter,
        mcpTools: Record<string, any>[]
    ) {
        this._systemPrompt = systemPrompt;

        this._mcpAdapter = mcpAdapter;
        this._mcpTools = mcpTools;

        this._llmChat = new ChatOllama({
            model: ollamaModel,
            baseUrl: ollamaBaseUrl,
        });

        this._agent = createAgent({
            model: this._llmChat,
            systemPrompt: this._systemPrompt,
            tools: this._mcpTools.map((tool) =>
                new DynamicStructuredTool({
                    name: tool.name,
                    description: tool.description,
                    schema: tool.inputSchema,
                    func: async (args: Record<string, string>) => {
                        const result = await this._mcpAdapter.callTool(tool.name, args)
                        return JSON.stringify(result);
                    }
                }))
        });
    }

    async invokeAgent(question: string) {
        const response = await this._agent.invoke({
            messages: [{ role: "user", content: question }],
        })
        const lastMessage = response.messages.at(-1)?.content;
        console.log(lastMessage);
        return lastMessage;
    };
}