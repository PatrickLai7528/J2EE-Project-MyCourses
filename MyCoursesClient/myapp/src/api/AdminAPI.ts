import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import {any} from "prop-types";
import NetworkSettings from "../setting/NetworkSettings";
import {ICourse, IReleasement} from "../types/entities";
import {EnumUtils} from "../utils/EnumUtils";
import {TokenUtils} from "../utils/TokenUtils";

export interface ICourseApproveData {
    cid: number
}

export interface IReleasementApproveData {
    rid: number

}

export interface IReleasementRejectData {
    rid: number
}

export interface ICourseRejectData {
    cid: number
}

export class AdminAPI {
    private static instance: AdminAPI;

    private constructor() {
    }

    public static getInstance(): AdminAPI {
        if (!this.instance)
            this.instance = new AdminAPI();
        return this.instance;
    }

    public sendCourseApprove(data: ICourseApproveData): Promise<IAPIResponse<ICourse[]>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/admin/approve/course/" + data.cid,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: ICourse[] = response.data.payload;
                    payload = EnumUtils.changeStringsToCourseEnums(payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: payload
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }

    public sendCourseReject(data: ICourseRejectData): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/admin/reject/course/" + data.cid,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: ICourse[] = response.data.payload;
                    payload = EnumUtils.changeStringsToCourseEnums(payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: payload
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }

    public sendReleasementApprove(data: IReleasementApproveData): Promise<IAPIResponse<IReleasement[]>> {
        return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/admin/approve/releasement/" + data.rid,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: IReleasement[] = response.data.payload;
                    payload = EnumUtils.changeStringsToReleasementEnums(payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: payload
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }

    public sendReleasementReject(data: IReleasementRejectData): Promise<IAPIResponse<IReleasement[]>> {
        return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/admin/reject/releasement/" + data.rid,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: IReleasement[] = response.data.payload;
                    payload = EnumUtils.changeStringsToReleasementEnums(payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: payload
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }
}