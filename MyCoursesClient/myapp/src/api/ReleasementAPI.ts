import IAPIResponse from "./IAPIResponse";
import {IReleasement} from "../types/entities";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {toApprovalState} from "../types/enums";
import {ISendReleasementData} from "./CourseAPI";

export default class ReleasementAPI {

    private static instance: ReleasementAPI;

    private constructor() {
    }

    public static getInstance(): ReleasementAPI {
        if (!ReleasementAPI.instance)
            ReleasementAPI.instance = new ReleasementAPI();
        return ReleasementAPI.instance;
    }

    public getAllReleasement(): Promise<IAPIResponse<IReleasement[]>> {
        return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/releasement/all")
                .then((response: any) => {
                    console.log(response);
                    // 處理枚舉類
                    let payload: any = response.data.payload; // 其實是IReleasement類型，但枚舉類是個字符串
                    for (let releasement of payload) {
                        releasement.approvalState = toApprovalState(releasement.approvalState);
                    }
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: response.data.payload
                    })
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                })
        });
    }

    public sendReleasement(data: ISendReleasementData): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url =
                NetworkSettings.getOpenNetworkIP() + "/releasement/add?" +
                "cid=" + data.cid +
                "&effectiveTime=" + data.effectiveTime +
                "&deadTime=" + data.deadTime +
                "&repeat=" + data.repeat +
                "&startHour=" + data.startHour +
                "&startMin=" + data.startMin +
                "&endHour=" + data.endHour +
                "&endMin=" + data.endMin +
                "&limitNumber=" + data.limitNumber;
            axios.post(url)
                .then((response: any) => {
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: response.data.payload
                    })
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                })
        })
    }

}