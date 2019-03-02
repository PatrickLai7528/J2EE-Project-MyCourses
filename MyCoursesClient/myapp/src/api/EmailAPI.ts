import axios from "axios";

export interface ISendBroadCastEmail{
    context:string
}

export class EmailAPI{
    private static instance:EmailAPI;
    private constructor(){}

    public static getInstance():EmailAPI{
        if(!this.instance)
            this.instance = new EmailAPI();
        return this.instance
    }

    public static sendBroadCastEmail(){

    }
}