
export default class DateUtils{
    public static toShowableString(date:number):string{
        return new Date(date).toLocaleDateString();
    }
}