import axios, { AxiosResponse } from "axios"


export interface RobotRestAdapterPort {
    moveForward(): Promise<AxiosResponse<any, any, {}, any>>;
    moveBackward(): Promise<AxiosResponse<any, any, {}, any>>;
    turLeft(): Promise<AxiosResponse<any, any, {}, any>>;
    turnRight(): Promise<AxiosResponse<any, any, {}, any>>;
    stop(): Promise<AxiosResponse<any, any, {}, any>>;
}
