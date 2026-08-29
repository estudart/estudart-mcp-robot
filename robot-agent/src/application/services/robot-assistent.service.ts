import readlineSync from "readline-sync";
import { RobotAgent } from "../agents/robot-agent.js";


export class RobotAssistent {
    _robotAgent: RobotAgent;
    _isActive: boolean;

    constructor(robotAgent: RobotAgent) {
        this._robotAgent = robotAgent;
        this._isActive = true;
    }

    askUser() {
        return readlineSync.question(
            "Ask the Agent something: "
        )
    }

    async run() {
        while (this._isActive) {
            const question = this.askUser();
            await this._robotAgent.invokeAgent(question);
            console.log(`You have asked: ${question}`);
        }
    }
}