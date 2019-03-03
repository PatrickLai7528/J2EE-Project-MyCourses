import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
import axios from "axios";
import {any} from "prop-types";
import {IForum, IReleasement} from "../types/entities";
import {EnumUtils} from "../utils/EnumUtils";
import {TokenUtils} from "../utils/TokenUtils";

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

    public sendComment(data: ISendCommentData): Promise<IAPIResponse<IForum>> {
        return new Promise<IAPIResponse<IForum>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/forum/comment" +
                "?rid=" + data.rid +
                "&from=" + data.messageFrom +
                "&fid=" + data.fid +
                "&content=" + data.content + (data.replyTo ? "&replyTo=" + data.replyTo : "");
            axios.post(url,{},{headers: {"Authorization": TokenUtils.getToken()}})
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

    public sendForum(data: ISendForumData): Promise<IAPIResponse<IReleasement>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/forum/add" +
                "?rid=" + data.rid +
                "&topic=" + data.topic +
                "&questioner=" + data.questioner;
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
                    reject(e);
                })
        })
    }
}