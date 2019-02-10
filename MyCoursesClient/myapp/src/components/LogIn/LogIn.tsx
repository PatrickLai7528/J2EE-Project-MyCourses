import * as React from "react";
import {Button, Form, Icon, Input} from "antd";
import {FormComponentProps} from "antd/es/form";
import "./LogIn.css"

export interface ILogInProps extends FormComponentProps {
    handleSubmit: () => void
}
const LogIn:React.FunctionComponent<ILogInProps> = (props:ILogInProps) => {
    const { getFieldDecorator } = props.form;
    return (
        <div className={"login"}>
            <Form onSubmit={props.handleSubmit}>
            <Form.Item>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
            </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登入
                </Button>
                <a href="">馬上注冊</a>
        </Form>
        </div>
    )
};


const WrappedLogIn = Form.create()(LogIn);
export default WrappedLogIn;