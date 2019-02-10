import * as React from "react";
import {NavLink} from "react-router-dom";
import {Icon} from "antd";

export interface IAuthSiderItemProps {
    itemText: string
    toPath: string
}


export const AuthSiderItem: React.FunctionComponent<IAuthSiderItemProps> = (props: IAuthSiderItemProps) => {
    // console.log(props);
    return (
        //<div>
            <NavLink to={props.toPath}>
                <Icon type="user"/>
                {props.itemText}
            </NavLink>
        // </div>
    )
};