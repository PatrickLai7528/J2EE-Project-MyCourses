import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import axios from "axios";
import {ByteUnit, fromByteUnitToString} from "../types/enums";
import {IReleasement, ISelection} from "../types/entities";
import {EnumUtils} from "../utils/EnumUtils";
import {TokenUtils} from "../utils/TokenUtils";

export interface ISendAssignmentData {
    title: string,
    description: string
    rid: number
    ddl: string
    fileSize: number,
    byteUnit: ByteUnit
    fileName: string
}

export interface ISendSubmissionData {
    slid: number
    assid: number
    email: string
    fileName: string
}

export default class AssignmentAPI {
    private static instance: AssignmentAPI;

    private constructor() {
    }

    public static getInstance(): AssignmentAPI {
        if (!AssignmentAPI.instance)
            AssignmentAPI.instance = new AssignmentAPI();
        return AssignmentAPI.instance
    }

    public sendSubmission(data: ISendSubmissionData): Promise<IAPIResponse<ISelection>> {
        return new Promise<IAPIResponse<ISelection>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/assignment/submit" +
                "?assid=" + data.assid +
                "&slid=" + data.slid +
                "&file=" + data.fileName +
                "&email=" + data.email;

            axios.post(url, {}, {headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: ISelection = response.data.payload;
                    payload.releasementEntity = EnumUtils.changeStringToReleasementEnum(payload.releasementEntity);
                    resolve({
                        isSuccess: response.data.code === 0,
                        payload: payload,
                        code: response.data.code,
                        message: response.data.message
                    })
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                })
        })
    }

    public uploadSubmission(formData: FormData): Promise<IAPIResponse<string>> {
        return new Promise<IAPIResponse<string>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/file/submission/upload",
                formData,
                {headers: {"Content-Type": "application/x-www-form-urlencoded", "Authorization": TokenUtils.getToken()}}
            )
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

    public uploadAttachment(formData: FormData): Promise<IAPIResponse<string>> {
        // console.log(formData);
        return new Promise<IAPIResponse<string>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/file/attachment/upload",
                formData,
                {headers: {"Content-Type": "application/x-www-form-urlencoded", "Authorization": TokenUtils.getToken()}}
            )
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

    public sendAssignment(data: ISendAssignmentData): Promise<IAPIResponse<IReleasement>> {
        return new Promise<IAPIResponse<IReleasement>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/assignment/add" +
                "?title=" + data.title +
                "&desc=" + data.description +
                "&rid=" + data.rid +
                "&ddl=" + data.ddl +
                "&unit=" + fromByteUnitToString(data.byteUnit) +
                "&size=" + data.fileSize +
                "&fileName=" + data.fileName;
            axios.post(url,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    if (response.data.payload) {
                        const releasement: IReleasement = EnumUtils.changeStringToReleasementEnum(response.data.payload);
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            message: response.data.message,
                            payload: releasement
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