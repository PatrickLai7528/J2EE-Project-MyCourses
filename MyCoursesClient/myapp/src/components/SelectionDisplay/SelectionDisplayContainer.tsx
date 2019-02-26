import * as React from "react";
import {SelectionDisplay} from "./SelectionDisplay";
import {UserType} from "../../api/UserAPI";
import {IForum, ISelection} from "../../types/entities";
import {Divider} from "antd";

export interface ISelectionDisplayContainerProps {
    userType: UserType
    email: string

    selection: ISelection
    setDisplayingForum: (forum: IForum) => void
}

interface ISelectionDisplayContainerState {

}

export class SelectionDisplayContainer extends React.Component<ISelectionDisplayContainerProps, ISelectionDisplayContainerState> {
    public render(): React.ReactNode {
        console.log(this.props)
        return (
            <div>
                <SelectionDisplay userType={this.props.userType} email={this.props.email}
                                  selection={this.props.selection}
                                  setDisplayingForum={this.props.setDisplayingForum}
                />
            </div>
        )
    }
}