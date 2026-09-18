import { RobotAgentPort } from "../ports/robot-agent.port.js";
import { RobotRestAdapterPort } from "../../infrastructure/ports/robot-rest-adapter.port.js";
import { UnknownAgentError } from "../errors/unknown-agent.error.js";

export class RobotAssistent {
    _robotRestAdapter: RobotRestAdapterPort;
    _robotAgent: RobotAgentPort;
    _architectureAgent: RobotAgentPort;
    _agentMap: Record<string, RobotAgentPort>;

    constructor(
        robotRestAdapter: RobotRestAdapterPort,
        robotAgent: RobotAgentPort,
        architectureAgent: RobotAgentPort
    ) {
        this._robotRestAdapter = robotRestAdapter;
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

    async speak(text: string): Promise<Boolean> {
        try {
            await this._robotRestAdapter.speak(text);
            return true
        } catch (error) {
            return false
        }
    }
}
