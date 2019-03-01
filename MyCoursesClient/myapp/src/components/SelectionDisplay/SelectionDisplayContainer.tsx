import * as React from "react";
import {SelectionDisplay} from "./SelectionDisplay";
import {UserStateProps} from "../App/GeneralProps";
import {IAppForStudentState} from "../App/App";
import {UserType} from "../../api/UserAPI";

export interface ISelectionDisplayContainerProps extends UserStateProps {
    forStudent: IAppForStudentState
    userType: UserType
}


export const SelectionDisplayContainer: React.FunctionComponent<ISelectionDisplayContainerProps> = (props: ISelectionDisplayContainerProps) => {
    if (props.forStudent.displayingSelection)
        return (
            <SelectionDisplay userType={props.userType} email={props.forStudent.email}
                              selection={props.forStudent.displayingSelection}
                              setDisplayingForum={props.forStudent.setDisplayingForum}
            />
        );
    else
        return null;
};