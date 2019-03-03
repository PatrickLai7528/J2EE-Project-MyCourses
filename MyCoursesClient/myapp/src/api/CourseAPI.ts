import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import {ICourse} from "../types/entities";
import {EnumUtils} from "../utils/EnumUtils";
import {TokenUtils} from "../utils/TokenUtils";


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
            axios.post(url,{},{headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    if (response.data.payload) {
                        const courseList: ICourse[] = EnumUtils.changeStringsToCourseEnums(response.data.payload);
                        resolve({
                            isSuccess: response.data.code === 0,
                            code: response.data.code,
                            message: response.data.message,
                            payload: courseList
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
                    reject(e);
                })
        })
    }

    public getAllCourse(): Promise<IAPIResponse<ICourse[]>> {
        return new Promise<IAPIResponse<ICourse[]>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/course/all",{headers: {"Authorization": TokenUtils.getToken()}})
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

    public getCourseOf(teacherEmail: string): Promise<IAPIResponse<ICourse[]>> {
        return new Promise<IAPIResponse<ICourse[]>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/course/of?teacherEmail=" + teacherEmail, {headers: {"Authorization": TokenUtils.getToken()}})
                .then((response: any) => {
                    // remember to deal with the enums
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
                    console.log(e);
                    reject(e);
                })
        })
    }
}

