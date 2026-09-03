import axios, { AxiosResponse } from "axios"
import { RobotRestAdapterPort } from "./ports/robot-rest-adapter.port";

export class RobotError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "RobotError";
    }
}
export class RobotRestAdapter implements RobotRestAdapterPort {
    _apiClientUrl: string;

    constructor(apiClientUrl: string) {
        this._apiClientUrl = apiClientUrl
    };

    async moveForward(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/forward`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to move: ${error}`);
        };
    };

    async moveBackward(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/backward`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to move: ${error}`);
        };
    };

    async turLeft(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/tubr-left`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to move: ${error}`);
        }
    }

    async turnRight(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/turn-right`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to move: ${error}`);
        }
    }

    async stop(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/stop`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to move: ${error}`);
        }
    }
}