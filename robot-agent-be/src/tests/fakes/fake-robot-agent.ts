import { RobotAgentPort } from "../../application/ports/robot-agent.port";

export class FakeRobotAgent implements RobotAgentPort {
    async invokeAgent(question: string): Promise<string | undefined> {
        const awaitResponse = new Promise<string>((resolve) =>
            setTimeout(() => resolve(
                `You asked this to the FakeRobotAgent: ${question}`), 1000
            )
        );
        return await awaitResponse;
    }
}
