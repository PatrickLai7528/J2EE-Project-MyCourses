import * as React from "react";
import {Form} from "antd";
import {FormComponentProps} from "antd/lib/form";
import {TitleForumAddingFormItem} from "./ForumAddingFormItem";

export interface IForumAddingFormProps extends FormComponentProps {
    resetTrigger: boolean
}

interface IForumAddingFormState {

}

export class ForumAddingForm extends React.Component<IForumAddingFormProps, IForumAddingFormState> {
    public constructor(props: IForumAddingFormProps) {
        super(props);
        this.state = {}
    }

    public componentWillReceiveProps(nextProps: Readonly<IForumAddingFormProps>, nextContext: any): void {
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
                <TitleForumAddingFormItem getFieldDecorator={getFieldDecorator}/>
            </Form>
        )
    }
}

export const WrappedForumAddingForm = Form.create()(ForumAddingForm);