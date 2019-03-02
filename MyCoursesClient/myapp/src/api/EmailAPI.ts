import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";
export interface ISendBroadCastEmailData {
    content: string
    rid: number
}

export class EmailAPI {
    private static instance: EmailAPI;

    private constructor() {
    }

    public static getInstance(): EmailAPI {
        if (!this.instance)
            this.instance = new EmailAPI();
        return this.instance
    }

    public sendBroadCastEmail(data: ISendBroadCastEmailData): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            const url: string = NetworkSettings.getOpenNetworkIP() + "/selection/broadcast/" + data.rid;
            axios.post(url, encodeURI(data.content), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
            })
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