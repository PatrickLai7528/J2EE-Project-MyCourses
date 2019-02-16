import {AuthActionTypes} from "../actions/actions";
import {Reducer} from "redux";

type AuthStatus = "VISITOR" | "STUDENT" | "TEACHER" | "ADMIN"

export interface IAuthState {
    status: AuthStatus
}

const initialState: IAuthState = {
    status: "VISITOR"
};


export const authReducer: Reducer<IAuthState> = (state = initialState, action) => {
    // console.log(state);
    // console.log(action);
    switch (action.type) {
        case AuthActionTypes.LOG_IN:
            console.log("loging in ");
            return Object.assign({}, state, {status: "USER"});
        case AuthActionTypes.LOG_OUT:
            console.log("LOG_OUT");
            return Object.assign({}, state, {
                status: "VISITOR"
            });
        default:
            return state;
    }
};