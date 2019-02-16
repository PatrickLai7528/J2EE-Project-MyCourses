import axios from "axios";
import IAPIResponse from "./IAPIResponse";
import {ICompetitionType} from "./CompetitionTypeAPI";
import NetworkSettings from "../setting/NetworkSettings";

export interface ICompetition {
    name: string;
    type: ICompetitionType;
    ddl: number;
    imagePath?: string[];
    base64Images?: File[];
    startDate: number;
    awardSum: number;
    foundDate?: number;
    description: string;
    mentionedTime?: number;
}

export interface ICrawledCompetition extends ICompetition {
    sourceType: string;
    sourceUrl: string;
}

export class CompetitionAPI {
    public static getInstance(): CompetitionAPI {
        if (!this.instance) {
            this.instance = new CompetitionAPI();
        }
        return this.instance;
    }

    private static instance: CompetitionAPI;

    private constructor() {
    }

    public getPosted(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP()+"/competition/posted/available/").then((response: any) => {
                let competitionList: ICompetition[] = [];
                let message = response.data;
                if (message.isSuccess) {
                    for (let competition of message.resultBody) {
                        competitionList.push({
                            name: competition.name,
                            ddl: competition.ddl,
                            startDate: competition.startDate,
                            foundDate: competition.foundDate,
                            imagePath: competition.imagePath,
                            type: competition.type,
                            description: competition.description,
                            mentionedTime: competition.mentionedTime,
                            awardSum: competition.awardSum
                        })
                    }
                    resolve({isSuccess: true, resultBody: competitionList});
                }
            }).catch((e: any) => {
                reject(e);
            })
        })
    }

    public getCrawled(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP()+"/competition/crawled/available/").then((response: any) => {
                let competitionList: ICrawledCompetition[] = [];
                let message = response.data;
                if (message.isSuccess) {
                    for (let competition of message.resultBody) {
                        competitionList.push({
                            name: competition.name,
                            ddl: competition.ddl,
                            startDate: competition.startDate,
                            foundDate: competition.foundDate,
                            imagePath: competition.imagePath,
                            sourceType: competition.sourceType,
                            sourceUrl: competition.sourceUrl,
                            type: competition.type,
                            description: competition.description,
                            mentionedTime: competition.mentionedTime,
                            awardSum: competition.awardSum
                        })
                    }
                    console.log(competitionList);
                    resolve({isSuccess: true, resultBody: competitionList});
                } else {
                    resolve({isSuccess: false})
                }
            }).catch((e: any) => {
                reject(e);
            })
        })
    }

    public post(data: ICompetition): Promise<IAPIResponse> {
        return new Promise((resolve, reject) => {
            axios.post(NetworkSettings.getOpenNetworkIP()+"/competition/", {data: JSON.stringify(data)}, {withCredentials: true}).then((response: any) => {
                console.log(response);
                const {isSuccess, resultBody, message} = response.data;
                resolve({isSuccess, message, resultBody});
            }).catch(e => {
                console.log(e);
                reject(e);
            })
        });
    }

    public getPopular(): Promise<IAPIResponse> {
        return new Promise<IAPIResponse>((resolve, reject) => {
            axios.get(NetworkSettings.getOpenNetworkIP()+"/competition/popular/").then((response: any) => {
                console.log(response);
                const {isSuccess, resultBody, message} = response.data;
                resolve({isSuccess, message, resultBody});
            }).catch(e => {
                console.log(e);
                reject(e);
            })
        })
    }
}
