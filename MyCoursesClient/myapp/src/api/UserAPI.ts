import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";

export type UserType = "teacher" | "student";

export interface ISignUpData {
    email: string,
    password: string,
    name: string,
    number: string,
    userType: UserType
}

export interface ILoginData {
    email: string,
    password: string,
}

export interface IUserSimpleInfo {
    email: string,
    nickname: string,
    jobType: string,
    phoneNumber: string,
    areaCode: string
    uploadedCompetitionNames: string[]
}

export default class UserAPI {
    public static getInstance(): UserAPI {
        if (!this.instance) {
            this.instance = new UserAPI();
        }
        return this.instance;
    }

    private static instance: UserAPI;

    private constructor() {
    }

    public getAreaCode(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/signup/areacodeoptions/").then((response: any) => {
                console.log(response);
                resolve({isSuccess: true, resultBody: response.data});
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        });
    }

    public getJobTypeOptions(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/signup/jobtypeoptions/").then((response: any) => {
                console.log(response);
                resolve({isSuccess: true, resultBody: response.data});
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }

    public postSignUp(signUpData: ISignUpData): Promise<IAPIResponse> {
        let url: string = "";
        const {email, password, number, name} = signUpData;
        let realSignUpData: any;
        switch (signUpData.userType) {
            case "teacher":
                url = "/api/auth/teacher/registry";
                realSignUpData = {
                    email, password, name, teacherNo: number
                };
                break;
            case "student":
                url = "/api/auth/student/registry";
                realSignUpData = {
                    email, password, name, studentNo: number
                };
                break;
            default:
                throw Error("Unexpected user type");
        }


        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + url, JSON.stringify(realSignUpData), {headers: {"Content-Type": "application/json"}}).then((response: any) => {
                console.log(response);
                resolve({
                    isSuccess: response.data.isSuccess,
                    message: response.data.message
                });
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }

    public postLogin(loginData: ILoginData): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, rejects) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/user/login/", {data: JSON.stringify(loginData)}).then((response: any) => {
                console.log(response);
                resolve({
                    isSuccess: response.data.isSuccess,
                    message: response.data.message,
                    resultBody: response.data.resultBody
                });
            }).catch((e: any) => {
                console.log(e);
                rejects(e);
            })
        })
    }

    public getSimpleUserInfo(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/info/simple/", {withCredentials: true}).then((response: any) => {
                resolve({
                    isSuccess: response.data.isSuccess,
                    message: response.data.message,
                    resultBody: response.data.resultBody
                });
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }
}