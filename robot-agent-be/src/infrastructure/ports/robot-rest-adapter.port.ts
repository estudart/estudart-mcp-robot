import axios, { AxiosResponse } from "axios"


export interface RobotRestAdapterPort {
    moveForward(): Promise<AxiosResponse<any, any, {}, any>>;
    moveBackward(): Promise<AxiosResponse<any, any, {}, any>>;
    turnLeft(): Promise<AxiosResponse<any, any, {}, any>>;
    turnRight(): Promise<AxiosResponse<any, any, {}, any>>;
    stop(): Promise<AxiosResponse<any, any, {}, any>>;
    setAllLeds(color: String): Promise<AxiosResponse<any, any, {}, any>>;
    setPanAngle(angle: number): Promise<AxiosResponse<any, any, {}, any>>;
    setTiltAngle(angle: number): Promise<AxiosResponse<any, any, {}, any>>;
    setServoHome(): Promise<AxiosResponse<any, any, {}, any>>;
}
