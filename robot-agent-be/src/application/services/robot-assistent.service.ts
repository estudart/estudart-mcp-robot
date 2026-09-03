import { RobotAgentPort } from "../ports/robot-agent.port";

export class RobotAssistent {
    _robotAgent: RobotAgentPort;
    _architectureAgent: RobotAgentPort;

    constructor(robotAgent: RobotAgentPort, architectureAgent: RobotAgentPort) {
        this._robotAgent = robotAgent;
        this._architectureAgent = architectureAgent;
    }

    async invokeRobotAgent(question: string): Promise<string | undefined> {
        return await this._robotAgent.invokeAgent(question);
    }

    async invokeArchitectureAgent(question: string): Promise<string | undefined> {
        return await this._architectureAgent.invokeAgent(question);
    }
}