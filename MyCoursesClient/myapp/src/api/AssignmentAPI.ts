import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import axios from "axios";
import {ByteUnit, fromByteUnitToString} from "../types/enums";

export interface ISendAssignmentData {
    title: string,
    description: string
    rid: number
    ddl: string
    fileSize: number,
    byteUnit: ByteUnit
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

    public sendAssignment(data: ISendAssignmentData): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/assignment/add" +
                "?title=" + data.title +
                "&desc=" + data.description +
                "&rid=" + data.rid +
                "&ddl=" + data.ddl +
                "&unit=" + fromByteUnitToString(data.byteUnit) +
                "&size=" + data.fileSize;
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