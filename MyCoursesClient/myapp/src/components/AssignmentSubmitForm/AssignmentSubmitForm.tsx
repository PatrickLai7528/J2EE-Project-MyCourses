import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";
import {AttachmentAssignmentAddingFormItem} from "./AssignmentSubmitFormItem";

export interface IAssignmentSubmitFormProps extends FormComponentProps {

}

interface IAssignmentSubmitFormState {

}

export class AssignmentSubmitForm extends React.Component<IAssignmentSubmitFormProps, IAssignmentSubmitFormState> {
    public constructor(props: IAssignmentSubmitFormProps) {
        super(props);
        this.state = {}
    }

    public render(): React.ReactNode {
        const {setFieldsValue, getFieldDecorator} = this.props.form;
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
                <AttachmentAssignmentAddingFormItem setFieldsValue={setFieldsValue}
                                                    getFieldDecorator={getFieldDecorator}/>
            </Form>
        )
    }
}

export const WrappedAssignmentSubmitForm = Form.create()(AssignmentSubmitForm);
