export interface RobotAgentPort {
    invokeAgent(question: string): Promise<string | undefined>;
}