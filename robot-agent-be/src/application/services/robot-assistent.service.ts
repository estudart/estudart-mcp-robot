import { ContentBlock } from "langchain";
import { RobotAgentPort } from "../ports/robot-agent.port";

export class RobotAssistent {
    _robotAgent: RobotAgentPort;
    _architectureAgent: RobotAgentPort;
    _agentMap: Record<string, RobotAgentPort>;

    constructor(robotAgent: RobotAgentPort, architectureAgent: RobotAgentPort) {
        this._robotAgent = robotAgent;
        this._architectureAgent = architectureAgent;
        this._agentMap = {
            "robot-agent": this._robotAgent,
            "architecture-agent": this._architectureAgent,
        }
    }

    async invoke(agent: string, question: string) {
        return this._agentMap[agent].invokeAgent(question);
    }

    private async invokeRobotAgent(
        question: string
    ): Promise<string | (ContentBlock | Text)[] | undefined> {
        return await this._robotAgent.invokeAgent(question);
    }

    private async invokeArchitectureAgent(
        question: string
    ): Promise<string | (ContentBlock | Text)[] | undefined> {
        return await this._architectureAgent.invokeAgent(question);
    }
}