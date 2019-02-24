import * as React from "react";
import {Form} from "antd";
import {
    AttachmentAssignmentAddingFormItem,
    ByteUnitAssignmentAddingFormItem,
    DDLAssignmentAddingFormItem,
    DescriptionAssignmentAddingFormItem,
    FileSizeLimitAssignmentAddingFormItem,
    TitleAssignmentAddingFormItem
} from "./AssignmentAddingFormItem";
import {FormComponentProps} from "antd/lib/form";

export interface IAssignmentAddingFormProps extends FormComponentProps {
    resetTrigger: boolean
}

interface IAssignmentAddingFormState {

}

export class AssignmentAddingForm extends React.Component<IAssignmentAddingFormProps, IAssignmentAddingFormState> {
    public constructor(props: IAssignmentAddingFormProps) {
        super(props);
        this.state = {}
    }

    public componentWillReceiveProps(nextProps: Readonly<IAssignmentAddingFormProps>, nextContext: any): void {
        if (nextProps.resetTrigger != this.props.resetTrigger) {
            this.props.form.resetFields();
        }
    }

    public render(): React.ReactNode {
        const {getFieldDecorator, setFieldsValue, resetFields} = this.props.form;
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
                <TitleAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <DDLAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <DescriptionAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <FileSizeLimitAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <ByteUnitAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}/>
                <AttachmentAssignmentAddingFormItem getFieldDecorator={getFieldDecorator}
                                                    setFieldsValue={setFieldsValue}/>
            </Form>
        )
    }
}

export const WrappedAssignmentAddingForm = Form.create()(AssignmentAddingForm);