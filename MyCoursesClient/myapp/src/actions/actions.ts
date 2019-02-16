import {action} from "typesafe-actions";
import {Action, Dispatch} from "redux";
import {IStudentLogInData} from "../api/StudentAPI";

// export interface IAction {
//     type: ActionType,
//     payload?: any,
//     error?: boolean,
//     meta?: any
// }


// export enum ActionType {
//     LOG_IN, LOG_OUT, REGISTRY
// }

// export const LOG_OUT = "LOG_IN";
// export const REGISTRY = "REGISTRY";
// export const LOG_IN = "LOG_IN";

export enum AuthActionTypes {
    POST_LOG_IN_REQUEST = "@@auth/POST_LOG_IN_REQUEST",
    POST_LOG_IN_SUCCESS = "@@auth/POST_LOG_IN_SUCCESS",
    POST_LOG_IN_FAILURE = "@@auth/POST_LOG_IN_FAILURE",

    SENT_REGISTRY = "@@auth/SENT_REGISTRY",
    WAITING_REGISTRY = "@@auth/WAITING_REGISTRY",
    COMPLETED_REGISTRY = "@@auth/COMPLETED_REGISTRY",

    SENT_LOG_OUT = "@@auth/SENT_LOG_OUT",
    WAITING_LOG_OUT = "@@auth/WAITING_LOG_OUT",
    COMPLETED_LOG_OUT = "@@auth/COMPLETED_LOG_OUT",

    LOG_IN = '@@auth/LOG_IN',
    LOG_OUT = '@@auth/LOG_OUT',
    REGISTRY = '@@auth/REGISTRY',
}

// export interface AllAction extends Action {
//
// }

// Action Creator
export const logIn = () => action<AuthActionTypes>(AuthActionTypes.LOG_IN);
export const logOut = () => action<AuthActionTypes>(AuthActionTypes.LOG_OUT);

export const postLogInRequest = (data:IStudentLogInData)=>{
    return action<AuthActionTypes, IStudentLogInData>(AuthActionTypes.POST_LOG_IN_REQUEST, data)
};
export const sendLogIn = (dispatch:Dispatch, data:IStudentLogInData) => {
    dispatch(postLogInRequest(data));
    return new Promise<Action>((resolve, reject) => {
        U
    })
};
// export function logOut(email: string, password: string): IAction {
//     return {
//         type: ActionType.LOG_OUT,
//         payload: {email: email, password: password}
//     }
// }
//
//
// export function registry(email: string, password: string) {
//     return {
//         type: ActionType.REGISTRY,
//         payload: {email: email, password: password}
//     }