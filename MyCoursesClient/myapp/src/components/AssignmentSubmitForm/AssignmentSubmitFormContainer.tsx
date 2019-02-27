import * as React from "react";
import {AssignmentSubmitForm, WrappedAssignmentSubmitForm} from "./AssignmentSubmitForm";

export interface IAssignmentSubmitFormContainerProps {

}

interface IAssignmentSubmitFormContainerState {
    // try to put it here, see what will happen
    form?: AssignmentSubmitForm
}

export class AssignmentSubmitFormContainer extends React.Component<IAssignmentSubmitFormContainerProps, IAssignmentSubmitFormContainerState> {


    public constructor(props: IAssignmentSubmitFormContainerProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        return (
            <WrappedAssignmentSubmitForm
                wrappedComponentRef={(form: AssignmentSubmitForm) => this.setState({form: form})}/>
        )
    }
}