import {IAdminStatistics, ITeacherStatistics} from "../types/entities";
import IAPIResponse from "./IAPIResponse";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {TokenUtils} from "../utils/TokenUtils";
import {EnumUtils} from "../utils/EnumUtils";
import {toApprovalState, toSelectionState} from "../types/enums";

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
            axios.get(NetworkSettings.getOpenNetworkIP() + "/statistics/teacher?email=" + teacherEmail, {headers: {"Authorization": TokenUtils.getToken()}})
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

    public getAdminStatistics(): Promise<IAPIResponse<IAdminStatistics>> {
        return new Promise<IAPIResponse<IAdminStatistics>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/statistics/admin", {headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    let payload: IAdminStatistics = response.data.payload;
                    if (payload) {
                        for (let item of payload.studentStatisticsList) {
                            for (let s of item.simplifySelectionList) {
                                // @ts-ignore
                                s.selectionState = toSelectionState(s.selectionState);
                            }
                        }
                        for (let item of payload.teacherStatisticsList) {
                            for (let r of item.simplifyReleasementList) {
                                // @ts-ignore
                                r.approvalState = toApprovalState(r.approvalState);
                            }
                            for (let s of item.simplifyCourseList) {
                                // @ts-ignore
                                s.approvalState = toApprovalState(s.approvalState);
                            }
                        }
                    }

                    resolve({
                        isSuccess: response.data.code === 0,
                        message: response.data.message,
                        payload: payload,
                        code: response.data.code
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }
}