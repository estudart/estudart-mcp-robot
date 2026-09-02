import { describe, it, beforeEach, before } from "node:test";
import assert from "node:assert/strict";
import { RobotAssistent } from "../../../application/services/robot-assistent.service";
import { FakeRobotAgent } from "../../fakes/fake-robot-agent";
import { FakeArchAgent } from "../../fakes/fake-arch-agent";

describe(RobotAssistent.name, () => {
    let fakeRobotAgent, fakeArchAgent, sut;
    beforeEach(() => {
        fakeRobotAgent = new FakeRobotAgent;
        fakeArchAgent = new FakeArchAgent;
        sut = new RobotAssistent(fakeRobotAgent, fakeArchAgent);
    });
    it('')
        const testTrue = true;
        assert.strictEqual(testTrue, true);
});