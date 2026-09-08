import axios, { AxiosResponse } from "axios"
import { RobotRestAdapterPort } from "./ports/robot-rest-adapter.port.js";

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

    async turnLeft(): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/move/turn-left`
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

    async setAllLeds(color: String): Promise<AxiosResponse<any, any, {}, any>> {
        try {
            const response = await axios.post(
                `${this._apiClientUrl}/led/set-all-leds?color=${color}`
            );
            return response;
        } catch (error) {
            throw new RobotError(`Robot failed to change color: ${error}`);
        }
    }

    async setPanAngle(angle: number) {
        try {
            const { data } = await axios.post(
                `${this._apiClientUrl}/servo/set-pan-angle${angle}`
            )
            return data;
        } catch (error) {
            throw new RobotError("Could not set pan angle")
        }
    }

    async setTiltAngle(angle: number) {
        try {
            const { data } = await axios.post(
                `${this._apiClientUrl}/servo/set-tilt-angle${angle}`
            )
            return data;
        } catch (error) {
            throw new RobotError("Could not set tilt angle")
        }
    }

    async setServoHome() {
        try {
            const { data } = await axios.post(
                `${this._apiClientUrl}/servo/servo-home`
            )
            return data;
        } catch (error) {
            throw new RobotError("Could not set servo to home angle")
        }
    }
}