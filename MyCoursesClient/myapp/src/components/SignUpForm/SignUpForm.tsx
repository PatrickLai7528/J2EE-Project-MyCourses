import * as React from "react";
import {FormComponentProps, ValidationRule} from "antd/lib/form";
import {Checkbox, Form, Input, Select} from "antd";
import "./SignUpForm.css"
import UserAPI from "../../api/UserAPI";
import IAPIResponse from "../../api/IAPIResponse";
import {UserTypeFormItem, NameFormItem, StudentNoFormItem} from "./SignUpFormItem";

export interface ISignUpFormProps extends FormComponentProps {

}

interface ISignUpFormState {
    areaCodeSelector: React.ReactNode | undefined
    jobTypeOptions: string[] | undefined
}


export class SignUpForm extends React.Component<ISignUpFormProps, ISignUpFormState> {

    public constructor(props: ISignUpFormProps) {
        super(props);
        this.state = {
            areaCodeSelector: undefined,
            jobTypeOptions: undefined
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

    public async componentDidMount() {
        const responseOfAreaCode: IAPIResponse = await UserAPI.getInstance().getAreaCode();
        if (responseOfAreaCode && responseOfAreaCode.isSuccess) {
            const areaCodes = responseOfAreaCode.resultBody;
            this.setState({
                areaCodeSelector: (
                    <Select defaultValue={areaCodes[0]} style={{width: 80}}>
                        {
                            areaCodes.map((areCode: string) => {
                                return <Select.Option key={areCode} value={areCode}>{areCode}</Select.Option>
                            })
                        }
                    </Select>
                )
            })
        }
        const responseOfJobType: IAPIResponse = await UserAPI.getInstance().getJobTypeOptions();
        if (responseOfJobType && responseOfJobType.isSuccess) {
            const jobTypeOptions = responseOfJobType.resultBody; // be care of this
            this.setState({jobTypeOptions: jobTypeOptions});
        }
    }

    public render(): React.ReactNode {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form hideRequiredMark={true}>
                <Form.Item
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
                        <Input/>
                    )}
                </Form.Item>
                <NameFormItem getFieldDecorator={getFieldDecorator}/>
                <StudentNoFormItem getFieldDecorator={getFieldDecorator}
                                   areaCodeSelector={this.state.areaCodeSelector}/>
                <UserTypeFormItem getFieldDecorator={getFieldDecorator}/>
                <Form.Item
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
                {/*<Form.Item*/}
                {/*label="驗證碼"*/}
                {/*>*/}
                {/*<Row gutter={8}>*/}
                {/*<Col span={12}>*/}
                {/*{getFieldDecorator('captcha', {*/}
                {/*rules: [{required: true, message: 'Please input the captcha you got!'}],*/}
                {/*})(*/}
                {/*<Input/>*/}
                {/*)}*/}
                {/*</Col>*/}
                {/*<Col span={12}> /*not implement now*/}
                {/*<Button>取得驗證碼</Button>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                {/*</Form.Item>*/}
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