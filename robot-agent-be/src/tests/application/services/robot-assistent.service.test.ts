import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { RobotAssistent } from "../../../application/services/robot-assistent.service";
import { FakeRobotAgent } from "../../fakes/fake-robot-agent";
import { FakeArchAgent } from "../../fakes/fake-arch-agent";

describe(RobotAssistent.name, () => {
    let fakeRobotAgent!: FakeRobotAgent;
    let fakeArchAgent!: FakeArchAgent;
    let sut!: RobotAssistent;

    beforeEach(() => {
        fakeRobotAgent = new FakeRobotAgent();
        fakeArchAgent = new FakeArchAgent();
        sut = new RobotAssistent(fakeRobotAgent, fakeArchAgent);
    });

    it('It tests agents responses for the RobotAssistent', async () => {
        const question = "This is a test"
        const robotAgentResponse = await sut.invokeRobotAgent(question);
        const archAgentResponse = await sut.invokeArchitectureAgent(question);
        assert.strictEqual(robotAgentResponse, `FakeRobotAgent: ${question}`);
        assert.strictEqual(archAgentResponse, `FakeArchAgent: ${question}`);
    })
});
