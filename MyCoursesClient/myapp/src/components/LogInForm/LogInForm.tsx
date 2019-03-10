import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {Checkbox, Form, Icon, Input} from 'antd';
import "./LogInForm.css"
import {UserTypeFormItem} from "../SignUpForm/SignUpFormItem";

export interface ILogInFormProps extends FormComponentProps {
}

export class LogInForm extends React.Component<ILogInFormProps> {
    public constructor(props: ILogInFormProps) {
        super(props);
    }

    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className="login-form">
                <Form.Item label="郵箱">
                    {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true, message: '請輸入郵箱'
                                },
                                {
                                    type: 'email', message: '請輸入有效的email地址',
                                }
                            ],
                        }
                    )(
                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
                    )}
                </Form.Item>
                <Form.Item label="密碼">
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true, message: '請輸入密碼'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </Form.Item>
                <UserTypeFormItem adminVisible={true} getFieldDecorator={getFieldDecorator}/>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">忘記密碼</a>
                    {/*<Button type="primary" htmlType="button" className="login-form-button">*/}
                    {/*登入*/}
                    {/*</Button>*/}
                </Form.Item>
            </Form>
        )
    }
}

export const WrappedLogInForm = Form.create()(LogInForm);