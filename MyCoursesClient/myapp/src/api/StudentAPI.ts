import axios from "axios";
import {TARGET_URL} from "./Settings";
import IAPIReponse from "./IAPIReponse";

export interface IStudentLogInData{
    email:string,
    password:string
}

export default class StudentAPI {
    private static instance: StudentAPI;

    private constructor() {
    }

    public static getInstance(): StudentAPI {
        if (!this.instance) this.instance = new StudentAPI();
        return this.instance;
    }

    public sendLogIn(data:IStudentLogInData):Promise<IAPIReponse>{
        return new Promise<IAPIReponse>((resolve, reject)=>{
            axios.post(TARGET_URL + "/student/login").then((response:any)=>{
                const jsonedReponse: IAPIReponse = JSON.parse(response);
                console.log(jsonedReponse);
                resolve(jsonedReponse);
            }).catch((e:any)=>{
                console.log(e);
                reject(e);
            })
        })
    }

}