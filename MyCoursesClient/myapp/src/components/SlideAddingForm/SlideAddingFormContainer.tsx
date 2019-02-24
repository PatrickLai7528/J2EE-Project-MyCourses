import * as React from "react";
import {SlideAddingForm} from "./SlideAddingForm";

export interface ISlideAddingFormContainerProps {

}

interface ISlideAddingFormContainerState {

}

export class SlideAddingFormContainer extends React.Component<ISlideAddingFormContainerProps, ISlideAddingFormContainerState> {
    public constructor(props: ISlideAddingFormContainerProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <SlideAddingForm/>
        )
    }
}