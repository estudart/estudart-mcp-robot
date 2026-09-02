import { RobotAgent } from "../agents/robot-agent";


export class RobotAssistent {
    _robotAgent: RobotAgent;
    _architectureAgent: RobotAgent;

    constructor(robotAgent: RobotAgent, architectureAgent: RobotAgent) {
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