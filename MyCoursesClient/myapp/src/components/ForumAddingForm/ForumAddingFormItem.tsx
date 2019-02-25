import * as React from "react";
import {Form, Input} from "antd";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";

export interface IGeneralForumAddingFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;
}

export const TitleForumAddingFormItem: React.FunctionComponent<IGeneralForumAddingFormItemProps> = (props: IGeneralForumAddingFormItemProps) => {
    return (
        <Form.Item
            label="標題"
        >
            {props.getFieldDecorator('topic', {
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