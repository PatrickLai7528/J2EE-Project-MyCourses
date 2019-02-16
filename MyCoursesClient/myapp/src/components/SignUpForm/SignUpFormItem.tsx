import * as React from "react";
import {Input, Form, Select} from "antd";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";

export interface IGeneralFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;

    placeholder?: string
}

export class NameFormItem extends React.Component<IGeneralFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                label="姓名"
            >
                {this.props.getFieldDecorator('name', {
                        rules: [
                            {
                                required: true, message: 'Please input your name!', whitespace: true
                            },
                            {
                                max: 6, message: "It is too long for a name"
                            },
                            {
                                min: 2, message: "It is too short for a name"
                            }
                        ],
                    }
                )(
                    <Input placeholder={this.props.placeholder}/>
                )}
            </Form.Item>
        )
    }
}

export interface IPhoneNumberFormProps extends IGeneralFormItemProps {
    areaCodeSelector: React.ReactNode
}

export class StudentNoFormItem extends React.Component<IPhoneNumberFormProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                label="學號/職員號"
            >
                {this.props.getFieldDecorator('number', {
                    rules: [
                        {
                            required: true, message: 'Please input your studentNo!'
                        },
                        {
                            whitespace: true, message: "StudentNo should not contain white space"
                        }
                    ],

                })(
                    <Input addonBefore={this.props.areaCodeSelector} style={{width: '100%'}}
                           placeholder={this.props.placeholder}/>
                )}
            </Form.Item>
        )
    }
}

// export interface IJobTypeFormItemProps extends IGeneralFormItemProps {
//     ptions: string[]
// }

export class UserTypeFormItem extends React.Component<IGeneralFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                label="用戶身份"
            >
                {this.props.getFieldDecorator('userType', {
                    rules: [{required: true, message: 'Please choose your user type'}],
                })(
                    <Select
                        style={{width: '100%'}}
                        showSearch={true}
                        placeholder={this.props.placeholder}
                        optionFilterProp="children"
                    >
                        <Select.Option value="teacher">
                            老師
                        </Select.Option>
                        <Select.Option value="student">
                            學生
                        </Select.Option>
                    </Select>
                )}
            </Form.Item>
        )
    }
}