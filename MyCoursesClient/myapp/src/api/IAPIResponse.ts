export default interface IAPIResponse {
    isSuccess: boolean;
    message?: string;
    resultBody?: any;
}