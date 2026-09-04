import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { RobotAssistent } from "../../../application/services/robot-assistent.service.js";
import { FakeRobotAgent } from "../../fakes/fake-robot-agent.js";
import { FakeArchAgent } from "../../fakes/fake-arch-agent.js";
import { UnknownAgentError } from "../../../application/errors/unknown-agent.error.js";

describe(RobotAssistent.name, () => {
    let fakeRobotAgent: FakeRobotAgent;
    let fakeArchAgent: FakeArchAgent;
    let sut: RobotAssistent;

    before(() => {
        fakeRobotAgent = new FakeRobotAgent();
        fakeArchAgent = new FakeArchAgent();
        sut = new RobotAssistent(fakeRobotAgent, fakeArchAgent);
    });

    it('It tests RobotAgent response for the RobotAssistent', async () => {
        const question = "This is a test"
        const robotAgentResponse = await sut.invoke("robot-agent", question);
        assert.strictEqual(robotAgentResponse, `FakeRobotAgent: ${question}`);
    });

    it('It tests ArchitectureAgent response for the RobotAssistent', async () => {
        const question = "This is a test"
        const archAgentResponse = await sut.invoke("architecture-agent", question);
        assert.strictEqual(archAgentResponse, `FakeArchAgent: ${question}`);
    });

    it('It tests bad agent name throws UnknownAgentError', async () => {
        const agent = "architeture-agent"
        await assert.rejects(async () => {
                await sut.invoke(agent, "question");
            },
            UnknownAgentError,
        )
    })
});
