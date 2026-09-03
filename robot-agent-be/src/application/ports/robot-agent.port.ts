import { ContentBlock } from "langchain";

export interface RobotAgentPort {
    invokeAgent(question: string): Promise<string | (ContentBlock | Text)[] | undefined>;
}