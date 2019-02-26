import * as React from "react";
import {Input, Form, Select, Row, Col, Button} from "antd";
import {GetFieldDecoratorOptions} from "antd/lib/form/Form";

export interface IGeneralFormItemProps {
    getFieldDecorator<T extends Object = {}>(id: keyof T, options?: GetFieldDecoratorOptions): (node: React.ReactNode) => React.ReactNode;

    placeholder?: string
}

export class NameFormItem extends React.Component<IGeneralFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                style={{marginBottom: 0}}
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


export class StudentNoFormItem extends React.Component<IGeneralFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item

                style={{marginBottom: 0}}
                label="學號/職員號"
            >
                {this.props.getFieldDecorator('number', {
                    rules: [
                        {
                            required: true, message: '學號/職員號不能為空'
                        },
                        {
                            whitespace: true, message: "學號/職員號不能為空"
                        }
                    ],

                })(
                    <Input style={{width: '100%'}}
                           placeholder={this.props.placeholder}/>
                )}
            </Form.Item>
        )
    }
}

// export interface IJobTypeFormItemProps extends IGeneralFormItemProps {
//     ptions: string[]
// }

export interface IVerifyCodeFormItemProps extends IGeneralFormItemProps {
    sendVerifyCodeAction: () => void;
    isLoading: boolean
}

export class VerifyCodeFormItem extends React.Component<IVerifyCodeFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                style={{marginBottom: 0}}
                label="驗證碼"
            >
                <Row gutter={8}>
                    <Col span={12}>
                        {this.props.getFieldDecorator('verifyCode', {
                            rules: [{required: true, message: 'Please input the verification code you got!'}],
                        })(
                            <Input/>
                        )}
                    </Col>
                    <Col span={12}>
                        <Button loading={this.props.isLoading} htmlType="button"
                                onClick={this.props.sendVerifyCodeAction}>取得驗證碼</Button>
                    </Col>
                </Row>
            </Form.Item>
        )
    }
}

export class UserTypeFormItem extends React.Component<IGeneralFormItemProps> {
    public render(): React.ReactNode {
        return (
            <Form.Item
                style={{marginBottom: 0}}
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