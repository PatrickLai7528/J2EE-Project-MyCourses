import {ITeacherStatistics} from "../types/entities";
import IAPIResponse from "./IAPIResponse";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {TokenUtils} from "../utils/TokenUtils";

export class StatisticsAPI {
    private static instance: StatisticsAPI;

    private constructor() {
    }

    public static getInstance(): StatisticsAPI {
        if (!this.instance)
            this.instance = new StatisticsAPI();
        return this.instance;
    }

    public getTeacherStatistics(teacherEmail: string): Promise<IAPIResponse<ITeacherStatistics>> {
        return new Promise<IAPIResponse<ITeacherStatistics>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/statistics/teacher?email=" + teacherEmail,{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    resolve({
                        isSuccess: response.data.code === 0,
                        message: response.data.message,
                        payload: response.data.payload,
                        code: response.data.code
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }
}