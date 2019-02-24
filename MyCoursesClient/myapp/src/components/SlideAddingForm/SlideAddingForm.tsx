import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";
import {AssignmentAddingForm, IAssignmentAddingFormProps} from "../AssignmentAddingForm/AssignmentAddingForm";
import {TitleSlideAddingFormItem, UploadSlideAddingFormItem} from "./SlideAddingFormItem";

export interface ISlideAddingFormProps extends FormComponentProps {
    resetTrigger: boolean
}

interface ISlideAddingFormState {

}

export class SlideAddingForm extends React.Component<ISlideAddingFormProps, ISlideAddingFormState> {
    public constructor(props: ISlideAddingFormProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: Readonly<IAssignmentAddingFormProps>, nextContext: any): void {
        if (nextProps.resetTrigger != this.props.resetTrigger) {
            this.props.form.resetFields();
        }
    }

    public render(): React.ReactNode {
        const {getFieldDecorator, setFieldsValue} = this.props.form;
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
               <TitleSlideAddingFormItem getFieldDecorator={getFieldDecorator}/>
               <UploadSlideAddingFormItem setFieldsValue={setFieldsValue} getFieldDecorator={getFieldDecorator}/>
            </Form>
        )
    }
}
export const WrappedSlideAddingForm = Form.create()(SlideAddingForm);