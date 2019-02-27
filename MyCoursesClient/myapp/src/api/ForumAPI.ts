import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import axios from "axios";
import {any} from "prop-types";

export interface ISendForumData {
    rid: number,
    questioner: string
    topic: string
}

export interface ISendCommentData {
    rid: number,
    replyTo?: number
    messageFrom: string,
    fid: number
    content: string
}

export default class ForumAPI {
    private static instance: ForumAPI;

    private constructor() {
    }

    public static getInstance(): ForumAPI {
        if (!this.instance)
            this.instance = new ForumAPI();
        return this.instance;
    }

    public sendComment(data: ISendCommentData): Promise<IAPIResponse<any>> {
        console.log(data);
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/forum/comment" +
                "?rid=" + data.rid +
                "&from=" + data.messageFrom +
                "&fid=" + data.fid +
                "&content=" + data.content + (data.replyTo ? "&replyTo=" + data.replyTo : "");
            axios.post(url)
                .then((response: any) => {
                    console.log(response);
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

    public sendForum(data: ISendForumData): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/forum/add" +
                "?rid=" + data.rid +
                "&topic=" + data.topic +
                "&questioner=" + data.questioner;
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
                    reject(e);
                })
        })
    }
}