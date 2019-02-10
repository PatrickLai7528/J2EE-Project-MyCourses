import {applyMiddleware, createStore, Store} from "redux";
import {IApplicationState, reducer} from "../reducers/reducer";

import promiseMiddleware from 'redux-promise';

// const State = {
//    isLogIn :false
// };
//
// export const initialState: Store = {isLogIn: false};

export const store: Store<IApplicationState> = createStore(reducer,applyMiddleware(promiseMiddleware));