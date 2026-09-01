import { RobotAgent } from "../agents/robot/robot-agent.js";
import { ArchitectureAgent } from "../agents/architecture/architecture-agent.js";


export class RobotAssistent {
    _robotAgent: RobotAgent;
    _architectureAgent: ArchitectureAgent;

    constructor(robotAgent: RobotAgent, architectureAgent: ArchitectureAgent) {
        this._robotAgent = robotAgent;
        this._architectureAgent = architectureAgent;
    }

    async invokeRobotAgent(question: string) {
        return await this._robotAgent.invokeAgent(question);
    }

    async invokeArchitectureAgent(question: string) {
        return await this._architectureAgent.invokeAgent(question);
    }
}