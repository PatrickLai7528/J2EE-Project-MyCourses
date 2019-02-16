import axios from "axios";
import NetworkSettings from "../setting/NetworkSettings";

export default class ImageAPI {

    public static getInstance(): ImageAPI {
        if (!this.instance) {
            this.instance = new ImageAPI();
        }
        return this.instance;
    }

    private static instance: ImageAPI;

    private constructor() {
    }

    public postImage(image: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP()+"/image/", {data: image}).then(response => {
                resolve(response)
            }).catch(err => {
                reject(err);
            })

        })
    }

}