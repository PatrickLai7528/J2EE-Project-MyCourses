import * as React from "react";
import {IApplicationState} from "../../reducers/reducer";
import {connect} from "react-redux";
import {AuthSiderItem} from "../../components/AuthSiderItem/AuthSiderItem";


function mapStateToProps({auth}: IApplicationState) {
    // console.log("STATE")
    // console.log(auth);
    return {
        itemText: auth.status === "VISITOR" ? "登入" : "登出",
        toPath: auth.status === "VISITOR" ? "/login" : "/registry",
    }
}


export const AuthSiderItemContainer = connect(mapStateToProps)(AuthSiderItem);