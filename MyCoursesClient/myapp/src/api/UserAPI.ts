import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";

export type UserType = "teacher" | "student" | "visitor";

export interface ISignUpData {
    email: string,
    password: string,
    name: string,
    number: string,
    userType: UserType
    verifyCode: string
}

export interface ILoginData {
    email: string,
    password: string,
    userType: UserType
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

    public getAreaCode(): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/signup/areacodeoptions/").then((response: any) => {
                console.log(response);
                // resolve({isSuccess: true, resultBody: response.data});
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        });
    }

    public getJobTypeOptions(): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/signup/jobtypeoptions/").then((response: any) => {
                console.log(response);
                // resolve({isSuccess: true, resultBody: response.data});
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }

    public postSignUp(signUpData: ISignUpData): Promise<IAPIResponse<any>> {
        let url: string = "";
        const {email, password, number, name, verifyCode} = signUpData;
        let realSignUpData: any;
        switch (signUpData.userType) {
            case "teacher":
                url = "/teacher/registry/" + verifyCode;
                realSignUpData = {
                    teacherEmail: email, password, name, teacherNo: number
                };
                break;
            case "student":
                url = "/student/registry/" + verifyCode;
                realSignUpData = {
                    studentEmail: email, password, name, studentNo: number
                };
                break;
            default:
                throw Error("Unexpected user type");
        }


        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + url, JSON.stringify(realSignUpData), {headers: {"Content-Type": "application/json"}}).then((response: any) => {
                resolve({
                    isSuccess: response.data.code === 0,
                    code: response.data.code,
                    payload: response.data.payload,
                    message: response.data.message
                });
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }

    public postLogin(loginData: ILoginData): Promise<IAPIResponse<any>> {
        let url: string = "";
        const {email, password} = loginData;
        let realLogInData: any;
        switch (loginData.userType) {
            case "teacher":
                url = "/teacher/login";
                realLogInData = {
                    teacherEmail: email, password
                };
                break;
            case "student":
                url = "/student/login";
                realLogInData = {
                    studentEmail: email, password
                };
                break;
            default:
                throw Error("Unexpected user type");
        }

        return new Promise<IAPIResponse<any>>((resolve, rejects) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + url, JSON.stringify(realLogInData), {headers: {"Content-Type": "application/json"}}).then((response: any) => {
                resolve({
                    code: response.data.code,
                    isSuccess: response.data.code === 0,
                    message: response.data.message,
                    payload: response.data.payload
                });
            }).catch((e: any) => {
                console.log(e);
                rejects(e);
            })
        })
    }

    public getSimpleUserInfo(): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/user/info/simple/", {withCredentials: true}).then((response: any) => {
                resolve({
                    isSuccess: response.data.code === 0,
                    code: response.data.code,
                    message: response.data.message,
                    payload: response.data.payload
                });
            }).catch((e: any) => {
                console.log(e);
                reject(e);
            })
        })
    }

    public sendVerifyCode(email: string): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/verify/mail?email=" + email)
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