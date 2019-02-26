import * as React from "react";
import {SelectionDisplay} from "./SelectionDisplay";

export interface ISelectionDisplayContainerProps {

}

interface ISelectionDisplayContainerState {

}

export class SelectionDisplayContainer extends React.Component<ISelectionDisplayContainerProps, ISelectionDisplayContainerState> {
    public render(): React.ReactNode {
        return (
            <SelectionDisplay/>
        )
    }
}