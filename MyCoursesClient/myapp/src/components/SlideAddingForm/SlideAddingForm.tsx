import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";
import {TitleSlideAddingFormItem, UploadSlideAddingFormItem} from "./SlideAddingFormItem";

export interface ISlideAddingFormProps extends FormComponentProps {
}

interface ISlideAddingFormState {

}

export class SlideAddingForm extends React.Component<ISlideAddingFormProps, ISlideAddingFormState> {
    public constructor(props: ISlideAddingFormProps) {
        super(props);
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