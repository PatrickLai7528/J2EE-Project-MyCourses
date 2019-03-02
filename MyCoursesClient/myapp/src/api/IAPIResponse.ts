export default interface IAPIResponse<T> {
    isSuccess: boolean; // added in client
    code: number;
    message: string;
    payload?: T
}