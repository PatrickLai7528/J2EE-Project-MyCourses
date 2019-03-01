import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import {ICourse} from "../types/entities";
import {toApprovalState} from "../types/enums";
import {EnumUtils} from "../utils/EnumUtils";


export interface ISendReleasementData {
    cid: number
    effectiveTime: string
    deadTime: string
    startHour: number
    startMin: number
    endHour: number
    endMin: number
    repeat: number
    limitNumber: number
}

export interface ISendAddCourseData {
    courseName: string,
    teacherEmail: string
}

export default class CourseAPI {
    private static instance: CourseAPI;

    private constructor() {
    }

    public static getInstance(): CourseAPI {
        if (!CourseAPI.instance)
            CourseAPI.instance = new CourseAPI();
        return CourseAPI.instance;
    }

    public sendCourse(data: ISendAddCourseData): Promise<IAPIResponse<ICourse[]>> {
        return new Promise<IAPIResponse<ICourse[]>>((resolve, reject) => {
            const url: string =
                NetworkSettings.getOpenNetworkIP()
                + "/course/add?teacherEmail=" + data.teacherEmail
                + "&courseName=" + data.courseName;
            axios.post(url)
                .then((response: any) => {
                    const courseList: ICourse[] = EnumUtils.changeStringsToCourseEnums(response.data.payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: courseList
                    })
                })
                .catch((e: any) => {
                    reject(e);
                })
        })
    }

    public getCourseOf(teacherEmail: string): Promise<IAPIResponse<ICourse[]>> {
        return new Promise<IAPIResponse<ICourse[]>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/course/of?teacherEmail=" + teacherEmail)
                .then((response: any) => {
                    // remember to deal with the enums
                    let payload: ICourse[] = response.data.payload;
                    if (payload)
                        for (let course of payload) {
                            // @ts-ignore
                            // here the enum approvalState is actually a string, so we need to make it right
                            course.approvalState = toApprovalState(course.approvalState)
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
        })
    }


    // public sendSelection(studentEmail: string, rid: string): Promise<IAPIResponse<ISelection[]>> {
    //     return new Promise<IAPIResponse<ISelection[]>>((resolve, reject) => {
    //         axios.post(NetworkSettings.getOpenNetworkIP() + "/selection/select/" + rid, studentEmail)
    //             .then((response: any) => {
    //                 resolve({
    //                     isSuccess: response.data.code === 0,
    //                     code: response.data.code,
    //                     message: response.data.message,
    //                     payload: response.data.payload
    //                 })
    //             })
    //             .catch((e: any) => {
    //                 console.log(e);
    //                 reject(e);
    //             })
    //     })
    // }

    // public getSelectionOf(studentEmail: string): Promise<IAPIResponse<ISelection[]>> {
    //     return new Promise<IAPIResponse<ISelection[]>>((resolve, reject) => {
    //         axios.get(NetworkSettings.getOpenNetworkIP() + "/selection/of?studentEmail=" + studentEmail)
    //             .then((response: any) => {
    //                 console.log(response);
    //                 // 處理枚舉類
    //                 let selectionList: any[] = response.data.payload;
    //                 for (let selection of selectionList) {
    //                     selection.selectionState = toSelectionState(selection.selectionState);
    //                     selection.releasementEntity.approvalState = toApprovalState(selection.releasementEntity.approvalState);
    //                     selection.releasementEntity.courseEntity.approvalState = toApprovalState(selection.releasementEntity.courseEntity.approvalState);
    //                 }
    //                 resolve({
    //                     isSuccess: response.data.code === 0,
    //                     code: response.data.code,
    //                     message: response.data.message,
    //                     payload: response.data.payload
    //                 })
    //             })
    //             .catch((e: any) => {
    //                 console.log(e);
    //             })
    //     });
    // }

    // public getAllReleasement(): Promise<IAPIResponse<IReleasement[]>> {
    //     return new Promise<IAPIResponse<IReleasement[]>>((resolve, reject) => {
    //         axios.get(NetworkSettings.getOpenNetworkIP() + "/releasement/all")
    //             .then((response: any) => {
    //                 console.log(response);
    //                 // 處理枚舉類
    //                 let payload: any = response.data.payload; // 其實是IReleasement類型，但枚舉類是個字符串
    //                 for (let releasement of payload) {
    //                     releasement.approvalState = toApprovalState(releasement.approvalState);
    //                 }
    //                 resolve({
    //                     isSuccess: response.data.code === 0,
    //                     code: response.data.code,
    //                     message: response.data.message,
    //                     payload: response.data.payload
    //                 })
    //             })
    //             .catch((e: any) => {
    //                 console.log(e);
    //                 reject(e);
    //             })
    //     });
    // }

    // public sendReleasement(data: ISendReleasementData): Promise<IAPIResponse<any>> {
    //     return new Promise<IAPIResponse<any>>((resolve, reject) => {
    //         const url =
    //             NetworkSettings.getOpenNetworkIP() + "/releasement/add?" +
    //             "cid=" + data.cid +
    //             "&effectiveTime=" + data.effectiveTime +
    //             "&deadTime=" + data.deadTime +
    //             "&repeat=" + data.repeat +
    //             "&startHour=" + data.startHour +
    //             "&startMin=" + data.startMin +
    //             "&endHour=" + data.endHour +
    //             "&endMin=" + data.endMin +
    //             "&limitNumber=" + data.limitNumber;
    //         axios.post(url)
    //             .then((response: any) => {
    //                 resolve({
    //                     isSuccess: response.data.code === 0,
    //                     code: response.data.code,
    //                     message: response.data.message,
    //                     payload: response.data.payload
    //                 })
    //             })
    //             .catch((e: any) => {
    //                 console.log(e);
    //                 reject(e);
    //             })
    //     })
    // }

}

