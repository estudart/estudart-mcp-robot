import { RobotAgentPort } from "../ports/robot-agent.port.js";
import { UnknownAgentError } from "../errors/unknown-agent.error.js";

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
        if (Object.keys(this._agentMap).includes(agent)) {
            return this._agentMap[agent].invokeAgent(question);
        } else {
            throw new UnknownAgentError(`Agent ${agent} does not exist!`);
        }
        
    }
}