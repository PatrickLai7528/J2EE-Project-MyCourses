import IAPIResponse from "./IAPIResponse";
import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";
import {IReleasement} from "../types/entities";
import {EnumUtils} from "../utils/EnumUtils";

export interface ISendSlideData {
    rid: number
    title: string
    fileName: string
}

export default class SlideAPI {

    private static instance: SlideAPI;

    private constructor() { 
    }

    public static getInstance(): SlideAPI {
        if (!this.instance)
            this.instance = new SlideAPI();
        return this.instance;
    }

    public sendSlide(data: ISendSlideData): Promise<IAPIResponse<IReleasement>> {
        return new Promise<IAPIResponse<IReleasement>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/slide/add" +
                "?rid=" + data.rid +
                "&fileName=" + data.fileName +
                "&title=" + data.title;
            axios.post(url)
                .then((response: any) => {
                    const releasement:IReleasement = EnumUtils.changeStringToReleasementEnum(response.data.payload);
                    resolve({
                        isSuccess: response.data.code === 0,
                        code: response.data.code,
                        message: response.data.message,
                        payload: releasement
                    })
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                })
        });
    }

    public uploadSlide(formData: FormData): Promise<IAPIResponse<string>> {
        console.log(formData);
        return new Promise<IAPIResponse<string>>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP() + "/file/slide/upload",
                formData,
                {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
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
}