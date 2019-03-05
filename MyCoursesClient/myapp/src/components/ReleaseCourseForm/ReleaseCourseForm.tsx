import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Form} from "antd";
import {
    DeadTimeReleaseCourseFormItem,
    EffectiveTimeReleaseCourseFormItem,
    EndTimeReleaseCourseFormItem, LimitNumberReleaseCourseFormItem,
    RepeatReleaseCourseFormItem,
    StartTimeReleaseCourseFormItem
} from "./ReleaseCourseFormItem";

export interface IReleaseCourseFormProps extends FormComponentProps {
}

export class ReleaseCourseForm extends React.Component<IReleaseCourseFormProps> {
    public constructor(props: IReleaseCourseFormProps) {
        super(props);
    }


    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form
                hideRequiredMark={true}
                layout={"horizontal"}
            >
                <EffectiveTimeReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
                <DeadTimeReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
                <StartTimeReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
                <EndTimeReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
                <LimitNumberReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
                <RepeatReleaseCourseFormItem getFieldDecorator={getFieldDecorator}/>
            </Form>
        )
    }


}

const WrappedReleaseForm = Form.create()(ReleaseCourseForm);
export default WrappedReleaseForm;
// export default ReleaseCourseForm;