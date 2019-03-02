import IAPIResponse from "./IAPIResponse";
import {IReleasement} from "../types/entities";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {toApprovalState} from "../types/enums";
import {ISendReleasementData} from "./CourseAPI";
import {EnumUtils} from "../utils/EnumUtils";

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
                    if (payload) {
                        for (let releasement of payload) {
                            releasement.approvalState = toApprovalState(releasement.approvalState);
                        }
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

    public getReleasementByRid(rid: number): Promise<IAPIResponse<IReleasement>> {
        return new Promise<IAPIResponse<IReleasement>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/releasement/rid/" + rid)
                .then((response: any) => {
                    let payload: IReleasement = response.data.payload;
                    if (payload) {
                        // @ts-ignore
                        // here the enum approvalState is actually a string, so we need to make it right
                        payload.approvalState = toApprovalState(payload.approvalState);
                        // @ts-ignore
                        // same
                        payload.courseEntity.approvalState = toApprovalState(payload.courseEntity.approvalState);
                    }
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: response.data.payload
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }

    public getReleasementOf(teacherEmail: string): Promise<IAPIResponse<IReleasement[]>> {
        return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/releasement/of" +
                "?teacherEmail=" + teacherEmail;
            axios.get(url)
                .then((response: any) => {
                    if (response.data.payload) {
                        const releasementList: IReleasement[] = EnumUtils.changeStringsToReleasementEnums(response.data.payload);
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            payload: releasementList,
                            message: response.data.message
                        })
                    } else {
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            message: response.data.message
                        })
                    }
                })
        })
    }


    public sendReleasement(data: ISendReleasementData): Promise<IAPIResponse<IReleasement[]>> {
        return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
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
                    if (response.data.payload) {
                        const releasementList: IReleasement[] = EnumUtils.changeStringsToReleasementEnums(response.data.payload);
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            message: response.data.message,
                            payload: releasementList
                        })
                    } else {
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            message: response.data.message,
                        })
                    }
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                })
        })
    }

}