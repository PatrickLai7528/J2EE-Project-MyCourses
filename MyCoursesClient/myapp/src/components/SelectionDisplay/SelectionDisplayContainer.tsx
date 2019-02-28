import * as React from "react";
import {SelectionDisplay} from "./SelectionDisplay";
import {IForum, ISelection} from "../../types/entities";
import {UserStateProps} from "../App/GeneralProps";

export interface ISelectionDisplayContainerProps extends UserStateProps {

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