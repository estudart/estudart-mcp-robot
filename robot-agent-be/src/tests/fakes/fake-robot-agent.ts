import { RobotAgentPort } from "../../application/ports/robot-agent.port.js";

export class FakeRobotAgent implements RobotAgentPort {
    async invokeAgent(question: string): Promise<string | undefined> {
        const awaitResponse = new Promise<string>((resolve) =>
            setTimeout(() => resolve(
                `FakeRobotAgent: ${question}`), 100
            )
        );
        return await awaitResponse;
    }
}
