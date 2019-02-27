import IAPIResponse from "./IAPIResponse";
import {ISelection} from "../types/entities";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {toApprovalState, toSelectionState} from "../types/enums";

export interface ISendSelectionData{
    studentEmail:string,
    rid:number
}

export default class SelectionAPI {
    private static instance: SelectionAPI;

    private constructor() {
    }

    public static getInstance(): SelectionAPI {
        if (!SelectionAPI.instance)
            SelectionAPI.instance = new SelectionAPI();
        return SelectionAPI.instance;
    }

    public sendSelection(data:ISendSelectionData): Promise<IAPIResponse<ISelection[]>> {
        return new Promise<IAPIResponse<ISelection[]>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/selection/select" +
                "?rid=" + data.rid + "&studentEmail=" + data.studentEmail;
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

    public getSelectionOf(studentEmail: string): Promise<IAPIResponse<ISelection[]>> {
        return new Promise<IAPIResponse<ISelection[]>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/selection/of?studentEmail=" + studentEmail)
                .then((response: any) => {
                    console.log(response);
                    // 處理枚舉類
                    let selectionList: any[] = response.data.payload;
                    if (selectionList) {
                        for (let selection of selectionList) {
                            selection.selectionState = toSelectionState(selection.selectionState);
                            selection.releasementEntity.approvalState = toApprovalState(selection.releasementEntity.approvalState);
                            selection.releasementEntity.courseEntity.approvalState = toApprovalState(selection.releasementEntity.courseEntity.approvalState);
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
                })
        });
    }
}