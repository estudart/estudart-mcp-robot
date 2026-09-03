import { RobotAgentPort } from "../../application/ports/robot-agent.port";

export class FakeArchAgent implements RobotAgentPort {
    async invokeAgent(question: string): Promise<string | undefined> {
        const awaitResponse = new Promise<string>((resolve) =>
            setTimeout(() => resolve(`FakeArchAgent: ${question}`), 100)
        );
        return await awaitResponse;
    }
}