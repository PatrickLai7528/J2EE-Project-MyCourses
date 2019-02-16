import {combineReducers, Reducer} from 'redux';
import {authReducer, IAuthState} from "./AuthReducer";

export interface IApplicationState{
    auth: IAuthState
}


export const reducer:Reducer<IApplicationState, any>= combineReducers({
    auth: authReducer
});