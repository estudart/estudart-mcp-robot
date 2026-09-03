import { RobotRestAdapterPort } from "../../infrastructure/ports/robot-rest-adapter.port";

export class RobotCommanderService {
    _robotAdapter: RobotRestAdapterPort;

    constructor(robotAdapter: RobotRestAdapterPort) {
        this._robotAdapter = robotAdapter;
    }
    async moveForward() {
        return await this._robotAdapter.moveForward()
    }

    async moveBackward() {
        return await this._robotAdapter.moveBackward()
    }

    async turnLeft() {
        return await this._robotAdapter.turLeft()
    }

    async turnRight() {
        return await this._robotAdapter.turnRight()
    }

    async stop() {
        return await this._robotAdapter.stop()
    }
}
