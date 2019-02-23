import * as React from "react";
import {Form} from "antd";
import {
    AttachmentAssignmentAddingFormItem, DDLAssignmentAddingFormItem,
    DescriptionAssignmentAddingFormItem,
    TitleAssignmentAddingFormItem
} from "./AssignmentAddingFormItem";
import {FormComponentProps} from "antd/lib/form";

export interface IAssignmentAddingFormProps extends FormComponentProps {

}

interface IAssignmentAddingFormState {

}

export class AssignmentAddingForm extends React.Component<IAssignmentAddingFormProps, IAssignmentAddingFormState> {
    public constructor(props: IAssignmentAddingFormProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
                <TitleAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <DDLAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <DescriptionAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <AttachmentAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
            </Form>
        )
    }
}

export const WrappedAssignmentAddingForm = Form.create()(AssignmentAddingForm);