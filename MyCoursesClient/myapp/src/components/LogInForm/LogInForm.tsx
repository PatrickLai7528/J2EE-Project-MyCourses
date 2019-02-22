import * as React from "react";
import {FormComponentProps} from "antd/lib/form";
import {
    Form, Icon, Input, Checkbox
} from 'antd';
import "./LogInForm.css"
import {UserTypeFormItem} from "../SignUpForm/SignUpFormItem";
import {UserType} from "../../api/UserAPI";

export interface ILogInFormProps extends FormComponentProps {
    toSignUp: () => void
}

export class LogInForm extends React.Component<FormComponentProps> {
    public constructor(props: FormComponentProps) {
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
                                    required: true, message: 'Please input your email!'
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
                                required: true, message: 'Please input your Password!'
                            }
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                               placeholder="Password"/>
                    )}
                </Form.Item>
                <UserTypeFormItem getFieldDecorator={getFieldDecorator}/>
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

const WrappedLogInForm = Form.create()(LogInForm);
export default WrappedLogInForm;