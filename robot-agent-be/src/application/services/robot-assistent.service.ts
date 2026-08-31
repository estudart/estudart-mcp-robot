import { RobotAgent } from "../agents/robot-agent.js";


export class RobotAssistent {
    _robotAgent: RobotAgent;

    constructor(robotAgent: RobotAgent) {
        this._robotAgent = robotAgent;
    }

    async invoke(question: string) {
        return await this._robotAgent.invokeAgent(question);
    }
}