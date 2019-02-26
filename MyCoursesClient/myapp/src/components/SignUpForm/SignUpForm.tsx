import * as React from "react";
import {FormComponentProps, ValidationRule} from "antd/lib/form";
import {Checkbox, Form, Input, message, Select} from "antd";
import "./SignUpForm.css"
import UserAPI from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {UserTypeFormItem, NameFormItem, StudentNoFormItem, VerifyCodeFormItem} from "./SignUpFormItem";

export interface ISignUpFormProps extends FormComponentProps {

}

interface ISignUpFormState {
    email?: string
    isVerifyCodeLoading: boolean
}


export class SignUpForm extends React.Component<ISignUpFormProps, ISignUpFormState> {

    public constructor(props: ISignUpFormProps) {
        super(props);
        this.state = {
            isVerifyCodeLoading: false
        }
    }

    private compareToFirstPassword(rule: ValidationRule, value: any, callback: (message?: string) => void): void {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    private validateToNextPassword(rule: ValidationRule, value: any, callback: (message?: string) => void): void {
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirmPassword'], {force: true});
        }
        callback();
    }


    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form hideRequiredMark={true}>
                <Form.Item
                    style={{marginBottom: 0}}
                    label="郵箱"
                >
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email', message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true, message: 'Please input your E-mail!',
                            }
                        ],
                    })(
                        <Input onBlur={(e: any) => { // dont know what type it is
                            const value: string = e.target.value; // should be ok to get the value of input
                            this.setState({email: value})
                        }}/>
                    )}
                </Form.Item>
                <NameFormItem getFieldDecorator={getFieldDecorator}/>
                <StudentNoFormItem getFieldDecorator={getFieldDecorator}
                                   />
                <UserTypeFormItem getFieldDecorator={getFieldDecorator}/>
                <Form.Item
                    style={{marginBottom: 0}}
                    label="密碼"
                >
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true, message: 'Please input your password!',
                            },
                            {
                                min: 6, message: "Password length should be 6~16"
                            },
                            {
                                max: 16, message: "Password length should be 6~16"
                            },
                            {
                                whitespace: true, message: "Password should not contain white space"
                            },
                            {
                                validator: this.validateToNextPassword.bind(this),
                            }
                        ],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <Form.Item
                    style={{marginBottom: 0}}
                    label="確定密碼"
                >
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true, message: 'Please confirm your password!',
                            },
                            {
                                min: 6, message: "Password length should be 6~16"
                            },
                            {
                                max: 16, message: "Password length should be 6~16"
                            },
                            {
                                whitespace: true, message: "Password should not contain white space"
                            },
                            {
                                validator: this.compareToFirstPassword.bind(this),
                            }
                        ],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <VerifyCodeFormItem isLoading={this.state.isVerifyCodeLoading} getFieldDecorator={getFieldDecorator}
                                    sendVerifyCodeAction={() => {
                                        const email: string | undefined = this.state.email;
                                        if (email === undefined) {
                                            message.warn("請先輸入郵箱")
                                        } else {
                                            this.setState({isVerifyCodeLoading: true});
                                            UserAPI.getInstance().sendVerifyCode(email)
                                                .then((response: IAPIResponse<any>) => {
                                                    if (response.isSuccess) {
                                                        message.success("驗證碼已發送")
                                                    } else {
                                                        message.error("驗證碼發送錯誤，請稍候再試")
                                                    }
                                                    this.setState({isVerifyCodeLoading: false});
                                                })
                                                .catch((e: any) => {
                                                    console.log(e);
                                                    message.error("驗證碼發送錯誤，請稍候再試");
                                                    this.setState({isVerifyCodeLoading: false});
                                                })
                                        }
                                    }}/>
                {/*<Form.Item>*/}
                {/*{getFieldDecorator('agreement', {*/}
                {/*valuePropName: 'checked',*/}
                {/*})(*/}
                {/*<Checkbox>I have read the <a href="">agreement</a></Checkbox>*/}
                {/*)}*/}
                {/*</Form.Item>*/}
                {/*<Form.Item>*/}
                {/*<Button type="primary" htmlType="submit" className="sign-up-form-button">註冊</Button>*/}
                {/*</Form.Item>*/}
            </Form>
        );
    }
}

const WrappedSignUpForm = Form.create()(SignUpForm);
export default WrappedSignUpForm;