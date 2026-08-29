import readline from 'node:readline/promises';
import { RobotAgent } from "../agents/robot-agent.js";
import { read } from 'node:fs';


export class RobotAssistent {
    _readline;
    _robotAgent: RobotAgent;
    _isActive: boolean;

    constructor(robotAgent: RobotAgent) {
        this._readline = readline.createInterface({ 
            input: process.stdin,
            output: process.stdout
        });
        this._robotAgent = robotAgent;
        this._isActive = true;
    }

    async askUser() {
        return await this._readline.question(
            "Ask the Agent something: "
        )
    }

    async run() {
        while (this._isActive) {
            const question = this.askUser();
            console.log(`You have asked: ${question}`);
        }
    }
}