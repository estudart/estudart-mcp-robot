import { createAgent, ReactAgent } from "langchain"
import { ChatOllama } from "@langchain/ollama"


export class ArchitectureAgent {
    _systemPrompt: string;
    _llmChat: ChatOllama;
    _agent: ReactAgent;

    constructor(
        systemPrompt: string,
        ollamaModel: string,
        ollamaBaseUrl: string,
    ) {
        this._systemPrompt = systemPrompt;

        this._llmChat = new ChatOllama({
            model: ollamaModel,
            baseUrl: ollamaBaseUrl,
        });

        this._agent = createAgent({
            model: this._llmChat,
            systemPrompt: this._systemPrompt,
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