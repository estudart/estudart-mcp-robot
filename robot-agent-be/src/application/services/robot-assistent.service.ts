import { RobotAgent } from "../agents/robot-agent";
import { RobotAssistentPort } from "../ports/robot-assistent-service.port";


export class RobotAssistent implements RobotAssistentPort {
    _robotAgent: RobotAgent;
    _architectureAgent: RobotAgent;

    constructor(robotAgent: RobotAgent, architectureAgent: RobotAgent) {
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