import * as React from "react";
import {Icon} from "antd";
import {NavLink} from "react-router-dom";

export const SettingSiderItem = () => {
    return (
        //<div>
            <NavLink to={"/profile"} exact={true}>
                <Icon type="setting"/>
                設定
            </NavLink>
        //</div>
    )
};