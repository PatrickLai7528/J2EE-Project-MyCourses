import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import NetworkSettings from "../setting/NetworkSettings";

export interface ICompetitionType {
    chinese: string,
    english: string,
    keywords: string[]
}

export class CompetitionTypeAPI {

    public static getInstance(): CompetitionTypeAPI {
        if (!this.instance) {
            this.instance = new CompetitionTypeAPI();
        }
        return this.instance;
    }

    private static instance: CompetitionTypeAPI;

    private constructor() {
    }

    public get(): Promise<IAPIResponse<any>> {
        return new Promise<IAPIResponse<any>>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP() + "/competition/type/",).then((response: any) => {
                let typeList: ICompetitionType[] = [];
                let message = response.data;
                if (message.isSuccess) {
                    for (let type of message.resultBody) {
                        typeList.push({
                            chinese: type._chinese,
                            english: type._english,
                            keywords: type._keywords
                        })
                    }
                    // resolve({isSuccess: true, resultBody: typeList});
                }
                // resolve({isSuccess: false})
            }).catch((e: any) => {
                reject(e);
            })
        })
    }
}
