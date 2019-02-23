import * as React from "react";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";
import {Input, Form} from "antd";
import TextArea from "antd/es/input/TextArea";

export interface IGeneralAssignmentAddingFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export const TitleAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="標題"
        >
            {props.getFieldDecorator('title', {
                rules: [
                    {
                        required: true, message: '標題不能為空',
                    }
                ],
            })(
                <Input placeholder={"標題"}/>
            )}
        </Form.Item>
    )
};

export const DescriptionAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <Form.Item
            label="作業描述"
        >
            {props.getFieldDecorator('description', {
                rules: [
                    {
                        required: true, message: '作業描述不能為空',
                    }
                ],
            })(
                <TextArea placeholder="作業描述" autosize={{minRows: 1, maxRows: 6}}/>
            )}
        </Form.Item>
    )
};

export const AttachmentAssignmentAddingFormItem: React.FunctionComponent<IGeneralAssignmentAddingFormItemProps> = (props: IGeneralAssignmentAddingFormItemProps) => {
    return (
        <div>
            1jjkljk
        </div>
    )
}
