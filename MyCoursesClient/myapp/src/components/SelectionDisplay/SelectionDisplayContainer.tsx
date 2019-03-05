import * as React from "react";
import {SelectionDisplay} from "./SelectionDisplay";
import {UserStateProps} from "../App/SendActionProps";
import {IAppForStudentState} from "../App/App";
import {UserType} from "../../api/UserAPI";
import ReleasementManageContainer from "../ReleasementManage/ReleasementManageContainer";

export interface ISelectionDisplayContainerProps extends UserStateProps {
    forStudent: IAppForStudentState
    userType: UserType
}


export const SelectionDisplayContainer: React.FunctionComponent<ISelectionDisplayContainerProps> = (props: ISelectionDisplayContainerProps) => {
    return (
        <ReleasementManageContainer userType={props.userType} forStudent={props.forStudent}/>
    )
};