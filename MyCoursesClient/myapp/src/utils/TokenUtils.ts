import Cookies from "universal-cookie/lib";

export class TokenUtils {
    public static getToken(): string {
        // const cookies:Cookies = new Cookies();
        // return cookies.get("token");
        const token: string | null = localStorage.getItem("token");
        if (token)
            return token;
        return "";
    }
}