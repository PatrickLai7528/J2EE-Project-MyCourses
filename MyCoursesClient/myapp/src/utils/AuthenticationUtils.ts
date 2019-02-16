import Cookies, {Cookie} from 'universal-cookie';

export default class AuthenticationUtils {
    public static isNowLogIned(): boolean {
        const cookie: Cookie = new Cookies();
        return cookie.get("token") === undefined;
    }

    public static getUserEmail(): string | undefined {
        const cookie: Cookie = new Cookies();
        return cookie.get("token")
    }
}