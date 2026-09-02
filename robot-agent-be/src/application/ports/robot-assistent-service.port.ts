export interface RobotAssistentPort {
    invokeRobotAgent(question: string): Promise<string | undefined>;
    invokeArchitectureAgent(question: string): Promise<string | undefined>;
}