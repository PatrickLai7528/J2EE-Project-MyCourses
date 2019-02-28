import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";

export interface IAssignmentSubmitFormProps extends FormComponentProps{

}

interface IAssignmentSubmitFormState{

}

export class AssignmentSubmitForm extends React.Component<IAssignmentSubmitFormProps, IAssignmentSubmitFormState>{
    public constructor(props:IAssignmentSubmitFormProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
            </Form>
        )
    }
}

export const WrappedAssignmentSubmitForm = Form.create()(AssignmentSubmitForm);
